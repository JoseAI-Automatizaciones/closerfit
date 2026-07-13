# CloserFit — contexto del proyecto

Herramienta interactiva del Proyecto 3 de Platzi. Primero calcula un diagnóstico de preparación para ventas high-ticket remotas; después ofrece una hoja de ruta de 7 días a cambio de nombre y correo.

- Repo: https://github.com/JoseAI-Automatizaciones/closerfit
- Demo: https://closerfit.vercel.app

- `index.html`: flujo inmersivo fullscreen (inicio → preguntas → resultado → captura → PDF), con score y recomendación inmediata.
- `api/lead.js`: valida el lead, aplica rate limit por `x-real-ip`, guarda score/categoría/respuestas y emite un token HMAC temporal (15 min).
- `api/plan.js`: exige ese token para generar el PDF de 7 días con `pdf-lib`. El incentivo es la descarga del PDF (no se usa email).
- `supabase/migrations/`: tabla `closerfit_diagnostics` con RLS y grants explícitos para `service_role`.

Usa el Supabase compartido de Proyectos para Platzi. La service role key nunca puede llegar al navegador. Antes de commit/push: review de Codex sin excepción.
