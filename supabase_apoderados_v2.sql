-- GestiónEscolar · Apoderado titular, suplente y cumpleaños (v2: cruza por NOMBRE, no por id)
-- Clave: 4 primeras letras del 1er apellido + 3 primeras del 1er nombre (sin tildes).
-- Apoderados: si la captura no mostraba suplente, el suplente queda VACÍO.
-- Cumpleaños: se actualiza día y mes según las capturas; el AÑO se conserva el que ya tiene el alumno
--   (si no tiene año, se usa 2017). Formato guardado: AAAA-MM-DD.
-- No toca RUT, teléfono ni email. Ejecutar completo en el SQL Editor de Supabase.

alter table alumnos add column if not exists apod1_nombre text;
alter table alumnos add column if not exists apod2_nombre text;

create temp table _apod (ap4 text, nom3 text, titular text, suplente text, mmdd text, ref text);
insert into _apod values
  ('ACOS','JEI','LUZ DENIA MARTINEZ','','02-20','a1'),
  ('AGUA','LIL','YESSICA YURANY SALAZAR BURITICA','DIEGO ALONSO AGUADO BUSTOS','03-11','a2'),
  ('BAHA','SIM','CONZTANZA CAMILA LIZANA SANCHEZ','JONNY BAHAMONDES CEA','06-14','a3'),
  ('CARA','MIA','NISLEN DEL VALLE QUINTERO BASTARDO','MIGUEL ANTONIO CARABALLO MARTINEZ','09-15','a4'),
  ('CARM','TOM','MARIA JOSE BURGOS BURGOS','','04-07','a5'),
  ('CORD','LUC','LORENA CORTEZ BASTIDAS','FRANCISCO JAVIER CORDOVEZ GONZALEZ','09-21','a6'),
  ('COVA','AMA','BELÉN AYALA VALENZUELA','MONICA PAMELA VALENZUELA PIZARRO','06-19','a7'),
  ('DIAZ','MAT','ALIXBEL CAROLINA VEGAS GARCIA','MARIBEL GARCIA DE LA VEGA','05-31','a8'),
  ('ECHA','MAI','MARIA LUISA ARAYA RODRIGUEZ','','11-09','a9'),
  ('FERR','BAS','CAMILA ISABEL MARQUEZ QUIVIRA','DANIEL ANTONIO FERRADA CARO','10-20','a10'),
  ('GALL','KOR','CANDY VIRGINIA LOLA RAMOS ICOCHEA','YERSON PABLO GALLARDO PASCUAL','09-28','a11'),
  ('GAST','JEA','SUSANA SANCHEZ HERNANDEZ','GREGORI GASTON','04-05','a12'),
  ('GONZ','DIE','NILIANYS GONZALEZ MACHADO','','03-15','a13'),
  ('GUZM','OPA','SCARLET ALEJANDRA LEAL VÁSQUEZ','CESAR ANTONIO GUZMAN LEAL','09-26','a14'),
  ('LILL','ROB','CAROLINA STEPHANIA PARRA JORQUERA','RENE ENRIQUE LILLO VALLES','06-23','a15'),
  ('LINO','FRE','ELIZET YOVANA AROS ROSALES','KEIKO ARAOS','01-14','a16'),
  ('LOYO','VIC','ANA MARÍA BUCAREY SEPULVEDA','','09-15','a17'),
  ('MARC','AMP','CATALINA FRANCISCA MENDOZA MANRRIQUEZ','CHRISTIAN ANDRES MARCHANT GALLARDO','03-21','a18'),
  ('MART','AMA','ALEJANDRA FIGUEROA YAÑEZ','ROSARIO DE LAS MERCEDES MOLINA MAGAÑA','08-24','a19'),
  ('MEDI','BEN','CLAUDIA LORENA MOLINA SOTO','JOHAN ERICK MEDINA CAMPOS','05-29','a20'),
  ('MELE','ASH','EUKARIS GABRIELA ARANGUREN COLINA','ANXONI EDUARDO MELENDEZ SOTELDO','10-07','a21'),
  ('MINA','DER','MARLYN RIVAS GUERRERO','','11-14','a22'),
  ('MOLI','ARA','KEINA VIRGINIA BOLAÑO','EDUARDO JOSE MOLINA CASTRO','02-14','a23'),
  ('MONT','MAR','EMELY RIVAS MACUADO','LUIS ANGEL MONTACHEZ SALAZAR','08-17','a24'),
  ('MORA','IGN','ESTEFANIA VIZCAYA FREI','','10-03','a25'),
  ('MUNO','VIC','ANDREA JOSELYN GUALA FUENTES','PATRICIO AGUERA PIZARRO','06-28','a26'),
  ('MUNO','THI','MAYURI PIMENTEL SALDAÑA','','07-16','a27'),
  ('NOTA','MAT','CESAR NOTARI VALENZUELA','','12-07','a28'),
  ('OLIV','FAC','PAULINA VERONICA VALENZUELA VIDAL','CRISTIAN OLIVA FONTECILLA','11-07','a29'),
  ('OREL','JOS','RODRIGO ORELLANA VETANCIO','ELIZABETH ANDREA CABEZAS OPAZO','07-03','a30'),
  ('OSOR','SAM','OLISBELY MARIA DUQUE VIERA','','10-08','a31'),
  ('PERE','ISA','VALENTINA PAOLA GARRIDO ORELLANA','VICTOR GARRIDO SASSO','06-19','a32'),
  ('PESA','GEM','YOHAMMY RAGA','ANTONY JOSE OVIEDO FIGUEROA','02-20','a33'),
  ('PINT','GAH','BELSSI ESPINOZA','ELIU PINTO','07-22','a34'),
  ('RIVE','AGU','KATHERINE DIANA CARDENAS CABEZAS','KEVIN JESUS RIVERA CARDENAS','05-15','a35'),
  ('ROJA','TRI','MARTINA ALEJANDRA SALINAS URZUA','MARCO ANTONIO ROJAS FAUS','01-27','a36'),
  ('SOTO','EMI','GIOVANNA PERINI MOYANO','DANIEL ANDRES SOTO ALVAREZ','12-06','a37'),
  ('TABA','SAM','ROSA RAMOS','','11-27','a38'),
  ('TERA','ISA','GIANINA PAZ FIERRO MONCADA','ISRAEL SALOMON TERAN RIVAS','08-11','a39'),
  ('TRUJ','BRU','JOHANA ASTUDILLO MONTECINOS','','06-28','a40'),
  ('VASQ','MAT','CAROLINA RUBILAR CRUZ','YERKO ANDRES VASQUEZ GONZALEZ','02-01','a41'),
  ('VIAC','MAT','NICOLE BARRENECHEA MARTELL','LUIS ALEJANDRO VIACAVA ESPINOZA','08-08','a42'),
  ('VICU','MIL','YEIMILY GABRIELA RODRIGUEZ MARTINEZ','FERNANDO JOSE VICUÑA RODRUIGUEZ','08-14','a43'),
  ('VILL','LAU','EVELYN CARDENAS TAPIA','VICTOR FERNANADO VILLEGAS CONTRERAS','11-08','a44'),
  ('ZACA','AMI','ANY GABRIELLA GOMEZ IZQUIERDO','CLEMENTE DEL JESUS ZACARIAS MARIN','02-28','a45');

update alumnos a set
  apoderado    = p.titular,
  apod1_nombre = p.titular,
  apoderado2   = p.suplente,
  apod2_nombre = p.suplente,
  fecha_nac    = case when a.fecha_nac ~ '^[0-9]{4}-' then left(a.fecha_nac,4) else '2017' end || '-' || p.mmdd
from _apod p
where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4 and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3;

-- DIAGNÓSTICO 1: filas de la lista que NO encontraron alumno (debería salir vacío)
select p.ref, p.ap4, p.nom3, p.titular
from _apod p
where not exists (select 1 from alumnos a where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4 and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3);

-- DIAGNÓSTICO 2: alumnos de la base que NO calzaron con ninguna fila
select a.id, a.nombres, a.apellidos, a.apoderado, a.apoderado2
from alumnos a
where not exists (select 1 from _apod p where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4 and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3)
order by a.apellidos;

-- RESULTADO FINAL para revisar
select id, nombres, apellidos, apod1_nombre as titular, apod2_nombre as suplente, fecha_nac from alumnos order by apellidos, nombres;
