-- GestiónEscolar — Registro de respuestas de ¡Aprendo! (reporte de errores + reforzamiento)
-- Ejecutar en: Supabase Dashboard → SQL Editor (una sola vez, antes de publicar esta versión)
--
-- Cada respuesta de una actividad se guarda aquí. Cada persona solo puede insertar y ver
-- las suyas; los administradores ven todas (para el reporte) y pueden borrar.

create table if not exists respuestas_aprendo (
  id bigint generated always as identity primary key,
  email text not null default public.mi_email(),   -- cuenta Google de quien responde
  alum_id text,                                     -- alumno asociado a la cuenta (si lo tiene)
  actividad text not null,                          -- ej. 'ingles.unit4', 'ingles.unit4oraciones'
  item text not null,                               -- pregunta/palabra: 'v:owl', 'o:owl|has|wings'
  etiqueta text,                                    -- texto legible para el reporte
  correcta boolean not null,
  elegida text,                                     -- alternativa que marcó
  refuerzo boolean not null default false,          -- true si fue en el modo "Reforzar mis errores"
  creado_en timestamptz not null default now()
);
create index if not exists respuestas_aprendo_email_item on respuestas_aprendo (email, item);
create index if not exists respuestas_aprendo_creado on respuestas_aprendo (creado_en desc);

alter table respuestas_aprendo enable row level security;

drop policy if exists "insertar_propias" on respuestas_aprendo;
create policy "insertar_propias" on respuestas_aprendo for insert to authenticated
  with check (es_aprobado() and email = mi_email());

drop policy if exists "ver_propias_o_admin" on respuestas_aprendo;
create policy "ver_propias_o_admin" on respuestas_aprendo for select to authenticated
  using (email = mi_email() or es_admin());

drop policy if exists "borrar_admin" on respuestas_aprendo;
create policy "borrar_admin" on respuestas_aprendo for delete to authenticated
  using (es_admin());
