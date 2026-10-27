create extension if not exists pgcrypto;

create table if not exists public.consultas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  telefono text not null,
  email text not null,
  servicio text not null,
  mensaje text not null
);

alter table public.consultas enable row level security;
