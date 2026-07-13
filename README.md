# CloserFit — diagnóstico interactivo de ventas remotas

**Proyecto 3 (Platzi):** una herramienta que entrega valor antes de solicitar datos. CloserFit evalúa oferta, agenda, seguimiento y métricas; muestra un diagnóstico inmediato y ofrece una hoja de ruta personalizada de 7 días a cambio del contacto.

## Flujo
1. La persona responde cuatro preguntas y recibe su score (sin formulario previo).
2. Ve su cuello de botella y una recomendación concreta.
3. Si quiere el plan de siete días, deja nombre y correo.
4. `POST /api/lead` valida y guarda el resultado en Supabase.

## Seguridad
La service role key solo se usa en `api/lead.js`. La tabla `closerfit_diagnostics` tiene RLS y grants únicamente para `service_role`; el navegador no puede leer ni escribir datos directamente.

## Variables de Vercel
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Desarrollo
`npm install` y luego `vercel dev`.
