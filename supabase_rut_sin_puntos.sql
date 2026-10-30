-- GestiónEscolar · RUT sin puntos (formato 12345678-9, K en mayúscula)

-- 1) VER cómo están guardados hoy y cuáles hay que corregir
select id, rut, apod1_rut, apod2_rut,
  case when rut       ~ '[^0-9K-]' or (rut       <> '' and rut       !~ '^[0-9]+-[0-9K]$') then 'CORREGIR' end as alumno,
  case when apod1_rut ~ '[^0-9K-]' or (apod1_rut <> '' and apod1_rut !~ '^[0-9]+-[0-9K]$') then 'CORREGIR' end as titular,
  case when apod2_rut ~ '[^0-9K-]' or (apod2_rut <> '' and apod2_rut !~ '^[0-9]+-[0-9K]$') then 'CORREGIR' end as suplente
from alumnos
order by id;

-- 2) CORREGIR: quita puntos, espacios y cualquier símbolo; K en mayúscula; deja cuerpo-DV
update alumnos set
  rut       = case when coalesce(rut,'')       = '' then rut       else regexp_replace(upper(regexp_replace(rut,       '[^0-9kK]','','g')), '^([0-9]+)([0-9K])$', '\1-\2') end,
  apod1_rut = case when coalesce(apod1_rut,'') = '' then apod1_rut else regexp_replace(upper(regexp_replace(apod1_rut, '[^0-9kK]','','g')), '^([0-9]+)([0-9K])$', '\1-\2') end,
  apod2_rut = case when coalesce(apod2_rut,'') = '' then apod2_rut else regexp_replace(upper(regexp_replace(apod2_rut, '[^0-9kK]','','g')), '^([0-9]+)([0-9K])$', '\1-\2') end;

-- 3) VERIFICAR: no debería salir ninguna fila (todo lo que no sea vacío o 12345678-9)
select id, rut, apod1_rut, apod2_rut
from alumnos
where (coalesce(rut,'')       <> '' and rut       !~ '^[0-9]+-[0-9K]$')
   or (coalesce(apod1_rut,'') <> '' and apod1_rut !~ '^[0-9]+-[0-9K]$')
   or (coalesce(apod2_rut,'') <> '' and apod2_rut !~ '^[0-9]+-[0-9K]$');
