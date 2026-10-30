-- ============================================================
--  LÍMITE DE INTENTOS DEL PANEL · RED INFORMÁTICA
--  Pega todo esto en Supabase → SQL Editor → Run (una sola vez).
--  Guarda los intentos fallidos de login para que el bloqueo
--  funcione aunque Vercel reinicie el servidor.
-- ============================================================

create table if not exists public.panel_login_intentos (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  ip          text not null
);

create index if not exists panel_login_intentos_ip_idx
  on public.panel_login_intentos (ip, created_at desc);

-- RLS activado SIN políticas = solo el servidor (service role) puede usarla.
alter table public.panel_login_intentos enable row level security;
