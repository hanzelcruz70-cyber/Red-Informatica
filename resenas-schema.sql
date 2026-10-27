-- ============================================================
--  RESEÑAS DE CLIENTES · RED INFORMÁTICA
--  Pega todo esto en Supabase → SQL Editor → Run (una sola vez)
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.resenas (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  servicio    text not null default '',
  estrellas   smallint not null check (estrellas between 1 and 5),
  comentario  text not null,
  aprobada    boolean not null default false
);

create index if not exists resenas_aprobada_idx on public.resenas (aprobada, created_at desc);

-- RLS activado SIN políticas = nadie puede leer/escribir desde fuera.
-- Solo el servidor de tu web (con la service role key) tiene acceso.
-- Las reseñas nuevas llegan con aprobada = false y tú las apruebas desde /panel.
alter table public.resenas enable row level security;
