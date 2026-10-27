-- ============================================================
--  PANEL PRIVADO · RED INFORMÁTICA
--  Pega todo esto en Supabase → SQL Editor → Run (una sola vez)
-- ============================================================

create extension if not exists pgcrypto;

-- Archivos y enlaces guardados
create table if not exists public.panel_archivos (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  descripcion text not null default '',
  categoria   text not null default 'General',
  tipo        text not null default 'archivo' check (tipo in ('archivo', 'enlace')),
  ruta        text,          -- ruta dentro del bucket (si es archivo)
  url         text,          -- enlace externo (si es enlace)
  tamano      bigint,
  mime        text
);

-- Guías paso a paso
create table if not exists public.panel_guias (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  titulo      text not null,
  categoria   text not null default 'General',
  descripcion text not null default '',
  pasos       jsonb not null default '[]'::jsonb,
  notas       text not null default ''
);

-- RLS activado SIN políticas = nadie puede leer/escribir desde fuera.
-- Solo el servidor de tu web (con la service role key) tiene acceso.
alter table public.panel_archivos enable row level security;
alter table public.panel_guias    enable row level security;

-- Bucket PRIVADO para los archivos
insert into storage.buckets (id, name, public)
values ('panel-archivos', 'panel-archivos', false)
on conflict (id) do update set public = false;
