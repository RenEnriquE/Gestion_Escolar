-- GestiónEscolar - Setup de tablas en Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor

-- 1. Alumnos
create table if not exists alumnos (
  id text primary key,
  nombres text,
  apellidos text,
  nombre text,
  fecha_nac text,
  sexo text,
  apoderado text,
  apoderado2 text,
  telefono text,
  email text,
  observaciones text,
  socio_aprendilandia boolean default false
);

-- 2. Tipos de actividad
create table if not exists tipos (
  id text primary key,
  nombre text,
  color text,
  "order" integer default 0
);

-- 3. Actividades
create table if not exists actividades (
  id text primary key,
  nombre text,
  fecha text,
  tipos text[],
  recurrencia text,
  estado text,
  descripcion text,
  encuesta_id text
);

-- 4. Participación
create table if not exists participacion (
  act_id text,
  alum_id text,
  participo boolean default false,
  primary key (act_id, alum_id)
);

-- 5. Encuestas
create table if not exists encuestas (
  id text primary key,
  nombre text,
  fecha text,
  descripcion text,
  estado text,
  actividad_id text,
  opciones jsonb,
  respuestas jsonb default '{}'
);

-- 6. Configuración (visibilidad y claves)
create table if not exists configuracion (
  clave text primary key,
  valor jsonb
);

-- Deshabilitar RLS para acceso público (la app maneja auth propia)
alter table alumnos disable row level security;
alter table tipos disable row level security;
alter table actividades disable row level security;
alter table participacion disable row level security;
alter table encuestas disable row level security;
alter table configuracion disable row level security;
