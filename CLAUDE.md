# CloserFit — contexto del proyecto

Herramienta interactiva del Proyecto 3 de Platzi. Primero calcula un diagnóstico de preparación para ventas high-ticket remotas; después ofrece una hoja de ruta de 7 días a cambio de nombre y correo.

- `index.html`: quiz, score y recomendación inmediata.
- `api/lead.js`: valida el lead y guarda score, categoría y respuestas.
- `supabase/migrations/`: tabla `closerfit_diagnostics` con RLS y grants explícitos para `service_role`.

Usa el Supabase compartido de Proyectos para Platzi. La service role key nunca puede llegar al navegador. Antes de commit/push: review de Codex sin excepción.
