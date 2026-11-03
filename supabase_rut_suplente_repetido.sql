-- ============================================================================
-- Suplentes cuyo RUT es igual al del apoderado titular
-- Ejecutar en Supabase → SQL Editor. Los pasos 2 y 3 son opcionales.
-- ============================================================================

-- 1) LISTAR: todos los alumnos donde el RUT del suplente coincide con el del titular
select id,
       alumno_nombre_corto,
       apod1_nombre  as titular,
       apod1_rut     as rut_titular,
       apod2_nombre  as suplente,
       apod2_rut     as rut_suplente,
       case when upper(trim(coalesce(apod1_nombre,''))) = upper(trim(coalesce(apod2_nombre,'')))
            then 'MISMO NOMBRE (¿suplente duplicado?)'
            else 'NOMBRES DISTINTOS (RUT mal copiado)' end as diagnostico
from (
  select a.*, trim(concat_ws(' ', nombres, apellidos)) as alumno_nombre_corto
  from alumnos a
) x
where coalesce(trim(apod2_rut),'') <> ''
  and regexp_replace(upper(apod1_rut), '[^0-9K]', '', 'g') = regexp_replace(upper(apod2_rut), '[^0-9K]', '', 'g')
order by nullif(regexp_replace(id, '[^0-9]', '', 'g'), '')::int;

-- 2) (OPCIONAL) Vaciar el RUT del suplente SOLO donde los nombres son distintos,
--    porque lo más probable es que se haya copiado el del titular por error.
--    Revisa primero el listado del paso 1.
-- update alumnos
-- set apod2_rut = ''
-- where coalesce(trim(apod2_rut),'') <> ''
--   and regexp_replace(upper(apod1_rut), '[^0-9K]', '', 'g') = regexp_replace(upper(apod2_rut), '[^0-9K]', '', 'g')
--   and upper(trim(coalesce(apod1_nombre,''))) <> upper(trim(coalesce(apod2_nombre,'')));

-- 3) Verificación (debe devolver 0 filas con nombres distintos)
-- select count(*) from alumnos
-- where coalesce(trim(apod2_rut),'') <> ''
--   and regexp_replace(upper(apod1_rut), '[^0-9K]', '', 'g') = regexp_replace(upper(apod2_rut), '[^0-9K]', '', 'g');
