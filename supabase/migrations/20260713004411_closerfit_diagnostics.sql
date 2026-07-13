create table if not exists public.closerfit_diagnostics (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  score smallint not null check (score between 4 and 12),
  category text not null check (category in ('Despegando', 'En tracción', 'Listo para escalar')),
  answers jsonb not null,
  source text not null default 'closerfit'
);
create unique index if not exists closerfit_diagnostics_email_key on public.closerfit_diagnostics (lower(email));
alter table public.closerfit_diagnostics enable row level security;
revoke all on table public.closerfit_diagnostics from anon, authenticated;
grant select, insert, update, delete on table public.closerfit_diagnostics to service_role;
comment on table public.closerfit_diagnostics is 'Leads y resultados del diagnóstico CloserFit (Proyecto 3 Platzi).';
