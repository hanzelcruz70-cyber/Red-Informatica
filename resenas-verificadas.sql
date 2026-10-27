-- ============================================================
--  RESEÑAS VERIFICADAS · RED INFORMÁTICA
--  Pega todo esto en Supabase → SQL Editor → Run (una sola vez).
--  Requiere haber ejecutado antes resenas-schema.sql.
-- ============================================================

-- Invitaciones: un enlace único por cada trabajo terminado.
create table if not exists public.resena_invitaciones (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  token       text not null unique,
  cliente     text not null,
  servicio    text not null default '',
  usada_at    timestamptz,
  resena_id   uuid
);

alter table public.resena_invitaciones enable row level security;

-- Nuevos datos en las reseñas
alter table public.resenas add column if not exists verificada    boolean not null default false;
alter table public.resenas add column if not exists invitacion_id uuid references public.resena_invitaciones(id) on delete set null;
alter table public.resenas add column if not exists ciudad        text not null default '';
alter table public.resenas add column if not exists respuesta     text not null default '';

-- Una invitación solo puede producir una reseña
create unique index if not exists resenas_invitacion_unica on public.resenas (invitacion_id) where invitacion_id is not null;

-- Las reseñas sin verificar del formulario anterior dejan de mostrarse
update public.resenas set aprobada = false where verificada = false;
