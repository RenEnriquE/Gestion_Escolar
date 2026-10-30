-- GestiónEscolar · Sexo del apoderado titular y suplente (para estadísticas)
-- Valores: 'M' (Masculino), 'F' (Femenino) o vacío (sin indicar).
-- EJECUTAR ANTES de publicar la nueva versión de la app (si no, el guardado de alumnos fallaría).
alter table alumnos add column if not exists apod1_sexo text default '';
alter table alumnos add column if not exists apod2_sexo text default '';

-- Estadística de ejemplo (apoderados titulares)
select coalesce(nullif(apod1_sexo,''),'Sin indicar') as sexo_titular, count(*) from alumnos group by 1 order by 2 desc;
