-- ============================================================================
-- Alumnos de otros cursos / hermanos (fuera del 3° C)
-- Ejecutar UNA VEZ en Supabase → SQL Editor, ANTES de publicar la nueva versión
-- (si no, el guardado automático de alumnos fallará por columnas inexistentes).
-- ============================================================================

alter table alumnos add column if not exists externo       boolean not null default false;
alter table alumnos add column if not exists curso_externo text    not null default '';
alter table alumnos add column if not exists vinculo       text    not null default '';

-- Verificación (debe mostrar las 3 columnas)
select column_name, data_type, column_default
from information_schema.columns
where table_name = 'alumnos' and column_name in ('externo','curso_externo','vinculo');
