-- ============================================================
--  RESEÑAS DE GOOGLE EN TU PÁGINA · RED INFORMÁTICA
--  Pega todo esto en Supabase → SQL Editor → Run (una sola vez).
--  Si nunca ejecutaste resenas-verificadas.sql, ejecuta ese primero.
-- ============================================================

-- De dónde viene cada reseña: 'enlace' (cliente verificado) o 'google' (copiada de Google Maps)
alter table public.resenas add column if not exists origen text not null default 'enlace';
alter table public.resenas drop constraint if exists resenas_origen_check;
alter table public.resenas add constraint resenas_origen_check check (origen in ('enlace', 'google'));

-- Fecha en que el cliente la publicó en Google (para mostrarla igual que allá)
alter table public.resenas add column if not exists fecha_resena date;
