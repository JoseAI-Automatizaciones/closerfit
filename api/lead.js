import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.PROJECT_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
const hits = new Map();
const allowed = new Set(['Despegando', 'En tracción', 'Listo para escalar']);
const clean = (value, max) => String(value ?? '').trim().slice(0, max);
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((at) => now - at < 60_000);
  recent.push(now); hits.set(ip, recent);
  return recent.length > 8;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  if (!supabase) return res.status(500).json({ error: 'Falta configurar Supabase.' });
  if (limited(req.headers['x-real-ip'] || 'anon')) return res.status(429).json({ error: 'Espera un minuto antes de intentar nuevamente.' });
  try {
    const body = req.body || {};
    const full_name = clean(body.full_name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const score = Number(body.score);
    const category = clean(body.category, 40);
    const answers = Array.isArray(body.answers) ? body.answers.map((n) => Number(n)).filter((n) => Number.isInteger(n) && n >= 1 && n <= 3) : [];
    if (clean(body.website, 200)) return res.status(200).json({ ok: true });
    if (full_name.length < 2 || !emailOk(email) || !Number.isInteger(score) || score < 4 || score > 12 || !allowed.has(category) || answers.length !== 4) {
      return res.status(400).json({ error: 'Revisa tus datos e intenta nuevamente.' });
    }
    const { error } = await supabase.from('closerfit_diagnostics').insert({ full_name, email, score, category, answers, source: 'closerfit' });
    if (error?.code === '23505') return res.status(200).json({ ok: true, message: 'Tu plan ya está reservado. Revisa tu correo pronto.' });
    if (error) { console.error('Supabase:', error); return res.status(502).json({ error: 'No pude guardar tu plan. Intenta de nuevo.' }); }
    return res.status(200).json({ ok: true, message: 'Plan reservado. Te llegará tu hoja de ruta personalizada.' });
  } catch (error) { console.error('Lead:', error); return res.status(500).json({ error: 'Ocurrió un error inesperado.' }); }
}
