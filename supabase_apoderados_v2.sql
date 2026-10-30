-- GestiónEscolar · Apoderado titular y suplente (v2: cruza por NOMBRE, no por id)
-- Corrige el caso en que los id de alumno en la base no son a1..a45.
-- Clave: 4 primeras letras del 1er apellido + 3 primeras del 1er nombre (sin tildes).
-- Si la captura no mostraba suplente, el suplente queda VACÍO (así el Excel calza con las capturas).
-- No toca RUT, teléfono ni email. Ejecutar completo en el SQL Editor de Supabase.

alter table alumnos add column if not exists apod1_nombre text;
alter table alumnos add column if not exists apod2_nombre text;

create temp table _apod (ap4 text, nom3 text, titular text, suplente text, ref text);
insert into _apod values
  ('ACOS','JEI','LUZ DENIA MARTINEZ','','a1'),
  ('AGUA','LIL','YESSICA YURANY SALAZAR BURITICA','DIEGO ALONSO AGUADO BUSTOS','a2'),
  ('BAHA','SIM','CONZTANZA CAMILA LIZANA SANCHEZ','JONNY BAHAMONDES CEA','a3'),
  ('CARA','MIA','NISLEN DEL VALLE QUINTERO BASTARDO','MIGUEL ANTONIO CARABALLO MARTINEZ','a4'),
  ('CARM','TOM','MARIA JOSE BURGOS BURGOS','','a5'),
  ('CORD','LUC','LORENA CORTEZ BASTIDAS','FRANCISCO JAVIER CORDOVEZ GONZALEZ','a6'),
  ('COVA','AMA','BELÉN AYALA VALENZUELA','MONICA PAMELA VALENZUELA PIZARRO','a7'),
  ('DIAZ','MAT','ALIXBEL CAROLINA VEGAS GARCIA','MARIBEL GARCIA DE LA VEGA','a8'),
  ('ECHA','MAI','MARIA LUISA ARAYA RODRIGUEZ','','a9'),
  ('FERR','BAS','CAMILA ISABEL MARQUEZ QUIVIRA','DANIEL ANTONIO FERRADA CARO','a10'),
  ('GALL','KOR','CANDY VIRGINIA LOLA RAMOS ICOCHEA','YERSON PABLO GALLARDO PASCUAL','a11'),
  ('GAST','JEA','SUSANA SANCHEZ HERNANDEZ','GREGORI GASTON','a12'),
  ('GONZ','DIE','NILIANYS GONZALEZ MACHADO','','a13'),
  ('GUZM','OPA','SCARLET ALEJANDRA LEAL VÁSQUEZ','CESAR ANTONIO GUZMAN LEAL','a14'),
  ('LILL','ROB','CAROLINA STEPHANIA PARRA JORQUERA','RENE ENRIQUE LILLO VALLES','a15'),
  ('LINO','FRE','ELIZET YOVANA AROS ROSALES','KEIKO ARAOS','a16'),
  ('LOYO','VIC','ANA MARÍA BUCAREY SEPULVEDA','','a17'),
  ('MARC','AMP','CATALINA FRANCISCA MENDOZA MANRRIQUEZ','CHRISTIAN ANDRES MARCHANT GALLARDO','a18'),
  ('MART','AMA','ALEJANDRA FIGUEROA YAÑEZ','ROSARIO DE LAS MERCEDES MOLINA MAGAÑA','a19'),
  ('MEDI','BEN','CLAUDIA LORENA MOLINA SOTO','JOHAN ERICK MEDINA CAMPOS','a20'),
  ('MELE','ASH','EUKARIS GABRIELA ARANGUREN COLINA','ANXONI EDUARDO MELENDEZ SOTELDO','a21'),
  ('MINA','DER','MARLYN RIVAS GUERRERO','','a22'),
  ('MOLI','ARA','KEINA VIRGINIA BOLAÑO','EDUARDO JOSE MOLINA CASTRO','a23'),
  ('MONT','MAR','EMELY RIVAS MACUADO','LUIS ANGEL MONTACHEZ SALAZAR','a24'),
  ('MORA','IGN','ESTEFANIA VIZCAYA FREI','','a25'),
  ('MUNO','VIC','ANDREA JOSELYN GUALA FUENTES','PATRICIO AGUERA PIZARRO','a26'),
  ('MUNO','THI','MAYURI PIMENTEL SALDAÑA','','a27'),
  ('NOTA','MAT','CESAR NOTARI VALENZUELA','','a28'),
  ('OLIV','FAC','PAULINA VERONICA VALENZUELA VIDAL','CRISTIAN OLIVA FONTECILLA','a29'),
  ('OREL','JOS','RODRIGO ORELLANA VETANCIO','ELIZABETH ANDREA CABEZAS OPAZO','a30'),
  ('OSOR','SAM','OLISBELY MARIA DUQUE VIERA','','a31'),
  ('PERE','ISA','VALENTINA PAOLA GARRIDO ORELLANA','VICTOR GARRIDO SASSO','a32'),
  ('PESA','GEM','YOHAMMY RAGA','ANTONY JOSE OVIEDO FIGUEROA','a33'),
  ('PINT','GAH','BELSSI ESPINOZA','ELIU PINTO','a34'),
  ('RIVE','AGU','KATHERINE DIANA CARDENAS CABEZAS','KEVIN JESUS RIVERA CARDENAS','a35'),
  ('ROJA','TRI','MARTINA ALEJANDRA SALINAS URZUA','MARCO ANTONIO ROJAS FAUS','a36'),
  ('SOTO','EMI','GIOVANNA PERINI MOYANO','DANIEL ANDRES SOTO ALVAREZ','a37'),
  ('TABA','SAM','ROSA RAMOS','','a38'),
  ('TERA','ISA','GIANINA PAZ FIERRO MONCADA','ISRAEL SALOMON TERAN RIVAS','a39'),
  ('TRUJ','BRU','JOHANA ASTUDILLO MONTECINOS','','a40'),
  ('VASQ','MAT','CAROLINA RUBILAR CRUZ','YERKO ANDRES VASQUEZ GONZALEZ','a41'),
  ('VIAC','MAT','NICOLE BARRENECHEA MARTELL','LUIS ALEJANDRO VIACAVA ESPINOZA','a42'),
  ('VICU','MIL','YEIMILY GABRIELA RODRIGUEZ MARTINEZ','FERNANDO JOSE VICUÑA RODRUIGUEZ','a43'),
  ('VILL','LAU','EVELYN CARDENAS TAPIA','VICTOR FERNANADO VILLEGAS CONTRERAS','a44'),
  ('ZACA','AMI','ANY GABRIELLA GOMEZ IZQUIERDO','CLEMENTE DEL JESUS ZACARIAS MARIN','a45');

-- Actualiza
update alumnos a set
  apoderado   = p.titular,
  apod1_nombre = p.titular,
  apoderado2  = p.suplente,
  apod2_nombre = p.suplente
from _apod p
where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4
  and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3;

-- DIAGNÓSTICO 1: filas de la lista que NO encontraron alumno (debería salir vacío)
select p.ref, p.ap4, p.nom3, p.titular
from _apod p
where not exists (
  select 1 from alumnos a
  where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4
    and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3);

-- DIAGNÓSTICO 2: alumnos de la base que NO calzaron con ninguna fila (sobran o tienen otro nombre)
select a.id, a.nombres, a.apellidos, a.apoderado, a.apoderado2
from alumnos a
where not exists (
  select 1 from _apod p
  where left(regexp_replace(translate(upper(split_part(trim(a.apellidos),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),4) = p.ap4
    and left(regexp_replace(translate(upper(split_part(trim(a.nombres),' ',1)),'ÁÉÍÓÚÜÑ','AEIOUUN'),'[^A-Z]','','g'),3) = p.nom3)
order by a.apellidos;

-- RESULTADO FINAL para revisar
select id, nombres, apellidos, apod1_nombre as titular, apod2_nombre as suplente from alumnos order by apellidos, nombres;
