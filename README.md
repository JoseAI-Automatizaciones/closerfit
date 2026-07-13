# CloserFit — diagnóstico interactivo de ventas remotas

**Demo:** https://closerfit.vercel.app · **Repo:** https://github.com/JoseAI-Automatizaciones/closerfit

**Proyecto 3 (Platzi):** una herramienta que entrega valor antes de solicitar datos. CloserFit evalúa oferta, agenda, seguimiento y métricas; muestra un diagnóstico inmediato y ofrece una hoja de ruta personalizada de 7 días a cambio del contacto.

## Flujo
1. La persona responde cuatro preguntas y recibe su score (sin formulario previo).
2. Ve su cuello de botella y una recomendación concreta.
3. Si quiere el plan de siete días, deja nombre y correo.
4. `POST /api/lead` valida y guarda el resultado en Supabase, y devuelve un token temporal (HMAC, 15 min).
5. `GET /api/plan` valida ese token y genera el PDF personalizado de 7 días para descargar.

## Seguridad
La service role key solo se usa en el servidor (`api/lead.js` y `api/plan.js`). La tabla `closerfit_diagnostics` tiene RLS y grants únicamente para `service_role`; el navegador no puede leer ni escribir datos directamente. La descarga del PDF está protegida por un token HMAC temporal.

## Variables de Vercel
- `SUPABASE_URL` — en desarrollo local el código también acepta `PROJECT_URL` (el del `.env.local` compartido de Platzi).
- `SUPABASE_SERVICE_ROLE_KEY`

## Desarrollo
`npm install` y luego `vercel dev`.

## PDF descargable
El endpoint `api/plan.js` genera un PDF personalizado de siete días con pdf-lib. Requiere el token temporal que emite `api/lead.js`, así la descarga queda protegida. El incentivo es la descarga del PDF (no se usa email).
