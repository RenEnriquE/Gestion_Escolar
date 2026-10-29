-- GestiónEscolar · Apoderado titular y suplente por alumno
-- Fuente: capturas 'Detalle Estudiante' del sistema del colegio (29-oct-2026).
-- Los nombres quedan en MAYÚSCULAS (con tildes y ñ respetadas).
-- Solo escribe nombres (apoderado/apod1_nombre y apoderado2/apod2_nombre). No toca RUT, teléfono ni email.
-- Si la captura no mostraba suplente, el campo del suplente se deja como está.
-- Ejecutar una vez en el SQL Editor de Supabase.

-- Por si aún no existen estas columnas (no hace nada si ya existen)
alter table alumnos add column if not exists apod1_nombre text;
alter table alumnos add column if not exists apod2_nombre text;

begin;

update alumnos set apoderado='LUZ DENIA MARTINEZ', apod1_nombre='LUZ DENIA MARTINEZ' where id='a1';
update alumnos set apoderado='YESSICA YURANY SALAZAR BURITICA', apod1_nombre='YESSICA YURANY SALAZAR BURITICA', apoderado2='DIEGO ALONSO AGUADO BUSTOS', apod2_nombre='DIEGO ALONSO AGUADO BUSTOS' where id='a2';
update alumnos set apoderado='CONZTANZA CAMILA LIZANA SANCHEZ', apod1_nombre='CONZTANZA CAMILA LIZANA SANCHEZ', apoderado2='JONNY BAHAMONDES CEA', apod2_nombre='JONNY BAHAMONDES CEA' where id='a3';
update alumnos set apoderado='NISLEN DEL VALLE QUINTERO BASTARDO', apod1_nombre='NISLEN DEL VALLE QUINTERO BASTARDO', apoderado2='MIGUEL ANTONIO CARABALLO MARTINEZ', apod2_nombre='MIGUEL ANTONIO CARABALLO MARTINEZ' where id='a4';
update alumnos set apoderado='MARIA JOSE BURGOS BURGOS', apod1_nombre='MARIA JOSE BURGOS BURGOS' where id='a5';
update alumnos set apoderado='LORENA CORTEZ BASTIDAS', apod1_nombre='LORENA CORTEZ BASTIDAS', apoderado2='FRANCISCO JAVIER CORDOVEZ GONZALEZ', apod2_nombre='FRANCISCO JAVIER CORDOVEZ GONZALEZ' where id='a6';
update alumnos set apoderado='BELÉN AYALA VALENZUELA', apod1_nombre='BELÉN AYALA VALENZUELA', apoderado2='MONICA PAMELA VALENZUELA PIZARRO', apod2_nombre='MONICA PAMELA VALENZUELA PIZARRO' where id='a7';
update alumnos set apoderado='ALIXBEL CAROLINA VEGAS GARCIA', apod1_nombre='ALIXBEL CAROLINA VEGAS GARCIA', apoderado2='MARIBEL GARCIA DE LA VEGA', apod2_nombre='MARIBEL GARCIA DE LA VEGA' where id='a8';
update alumnos set apoderado='MARIA LUISA ARAYA RODRIGUEZ', apod1_nombre='MARIA LUISA ARAYA RODRIGUEZ' where id='a9';
update alumnos set apoderado='CAMILA ISABEL MARQUEZ QUIVIRA', apod1_nombre='CAMILA ISABEL MARQUEZ QUIVIRA', apoderado2='DANIEL ANTONIO FERRADA CARO', apod2_nombre='DANIEL ANTONIO FERRADA CARO' where id='a10';
update alumnos set apoderado='CANDY VIRGINIA LOLA RAMOS ICOCHEA', apod1_nombre='CANDY VIRGINIA LOLA RAMOS ICOCHEA', apoderado2='YERSON PABLO GALLARDO PASCUAL', apod2_nombre='YERSON PABLO GALLARDO PASCUAL' where id='a11';
update alumnos set apoderado='SUSANA SANCHEZ HERNANDEZ', apod1_nombre='SUSANA SANCHEZ HERNANDEZ', apoderado2='GREGORI GASTON', apod2_nombre='GREGORI GASTON' where id='a12';
update alumnos set apoderado='NILIANYS GONZALEZ MACHADO', apod1_nombre='NILIANYS GONZALEZ MACHADO' where id='a13';
update alumnos set apoderado='SCARLET ALEJANDRA LEAL VÁSQUEZ', apod1_nombre='SCARLET ALEJANDRA LEAL VÁSQUEZ', apoderado2='CESAR ANTONIO GUZMAN LEAL', apod2_nombre='CESAR ANTONIO GUZMAN LEAL' where id='a14';
update alumnos set apoderado='CAROLINA STEPHANIA PARRA JORQUERA', apod1_nombre='CAROLINA STEPHANIA PARRA JORQUERA', apoderado2='RENE ENRIQUE LILLO VALLES', apod2_nombre='RENE ENRIQUE LILLO VALLES' where id='a15';
update alumnos set apoderado='ELIZET YOVANA AROS ROSALES', apod1_nombre='ELIZET YOVANA AROS ROSALES', apoderado2='KEIKO ARAOS', apod2_nombre='KEIKO ARAOS' where id='a16';
update alumnos set apoderado='ANA MARÍA BUCAREY SEPULVEDA', apod1_nombre='ANA MARÍA BUCAREY SEPULVEDA' where id='a17';
update alumnos set apoderado='CATALINA FRANCISCA MENDOZA MANRRIQUEZ', apod1_nombre='CATALINA FRANCISCA MENDOZA MANRRIQUEZ', apoderado2='CHRISTIAN ANDRES MARCHANT GALLARDO', apod2_nombre='CHRISTIAN ANDRES MARCHANT GALLARDO' where id='a18';
update alumnos set apoderado='ALEJANDRA FIGUEROA YAÑEZ', apod1_nombre='ALEJANDRA FIGUEROA YAÑEZ', apoderado2='ROSARIO DE LAS MERCEDES MOLINA MAGAÑA', apod2_nombre='ROSARIO DE LAS MERCEDES MOLINA MAGAÑA' where id='a19';
update alumnos set apoderado='CLAUDIA LORENA MOLINA SOTO', apod1_nombre='CLAUDIA LORENA MOLINA SOTO', apoderado2='JOHAN ERICK MEDINA CAMPOS', apod2_nombre='JOHAN ERICK MEDINA CAMPOS' where id='a20';
update alumnos set apoderado='EUKARIS GABRIELA ARANGUREN COLINA', apod1_nombre='EUKARIS GABRIELA ARANGUREN COLINA', apoderado2='ANXONI EDUARDO MELENDEZ SOTELDO', apod2_nombre='ANXONI EDUARDO MELENDEZ SOTELDO' where id='a21';
update alumnos set apoderado='MARLYN RIVAS GUERRERO', apod1_nombre='MARLYN RIVAS GUERRERO' where id='a22';
update alumnos set apoderado='KEINA VIRGINIA BOLAÑO', apod1_nombre='KEINA VIRGINIA BOLAÑO', apoderado2='EDUARDO JOSE MOLINA CASTRO', apod2_nombre='EDUARDO JOSE MOLINA CASTRO' where id='a23';
update alumnos set apoderado='EMELY RIVAS MACUADO', apod1_nombre='EMELY RIVAS MACUADO', apoderado2='LUIS ANGEL MONTACHEZ SALAZAR', apod2_nombre='LUIS ANGEL MONTACHEZ SALAZAR' where id='a24';
update alumnos set apoderado='ESTEFANIA VIZCAYA FREI', apod1_nombre='ESTEFANIA VIZCAYA FREI' where id='a25';
update alumnos set apoderado='ANDREA JOSELYN GUALA FUENTES', apod1_nombre='ANDREA JOSELYN GUALA FUENTES', apoderado2='PATRICIO AGUERA PIZARRO', apod2_nombre='PATRICIO AGUERA PIZARRO' where id='a26';
update alumnos set apoderado='MAYURI PIMENTEL SALDAÑA', apod1_nombre='MAYURI PIMENTEL SALDAÑA' where id='a27';
update alumnos set apoderado='CESAR NOTARI VALENZUELA', apod1_nombre='CESAR NOTARI VALENZUELA' where id='a28';
update alumnos set apoderado='PAULINA VERONICA VALENZUELA VIDAL', apod1_nombre='PAULINA VERONICA VALENZUELA VIDAL', apoderado2='CRISTIAN OLIVA FONTECILLA', apod2_nombre='CRISTIAN OLIVA FONTECILLA' where id='a29';
update alumnos set apoderado='RODRIGO ORELLANA VETANCIO', apod1_nombre='RODRIGO ORELLANA VETANCIO', apoderado2='ELIZABETH ANDREA CABEZAS OPAZO', apod2_nombre='ELIZABETH ANDREA CABEZAS OPAZO' where id='a30';
update alumnos set apoderado='OLISBELY MARIA DUQUE VIERA', apod1_nombre='OLISBELY MARIA DUQUE VIERA' where id='a31';
update alumnos set apoderado='VALENTINA PAOLA GARRIDO ORELLANA', apod1_nombre='VALENTINA PAOLA GARRIDO ORELLANA', apoderado2='VICTOR GARRIDO SASSO', apod2_nombre='VICTOR GARRIDO SASSO' where id='a32';
update alumnos set apoderado='YOHAMMY RAGA', apod1_nombre='YOHAMMY RAGA', apoderado2='ANTONY JOSE OVIEDO FIGUEROA', apod2_nombre='ANTONY JOSE OVIEDO FIGUEROA' where id='a33';
update alumnos set apoderado='BELSSI ESPINOZA', apod1_nombre='BELSSI ESPINOZA', apoderado2='ELIU PINTO', apod2_nombre='ELIU PINTO' where id='a34';
update alumnos set apoderado='KATHERINE DIANA CARDENAS CABEZAS', apod1_nombre='KATHERINE DIANA CARDENAS CABEZAS', apoderado2='KEVIN JESUS RIVERA CARDENAS', apod2_nombre='KEVIN JESUS RIVERA CARDENAS' where id='a35';
update alumnos set apoderado='MARTINA ALEJANDRA SALINAS URZUA', apod1_nombre='MARTINA ALEJANDRA SALINAS URZUA', apoderado2='MARCO ANTONIO ROJAS FAUS', apod2_nombre='MARCO ANTONIO ROJAS FAUS' where id='a36';
update alumnos set apoderado='GIOVANNA PERINI MOYANO', apod1_nombre='GIOVANNA PERINI MOYANO', apoderado2='DANIEL ANDRES SOTO ALVAREZ', apod2_nombre='DANIEL ANDRES SOTO ALVAREZ' where id='a37';
update alumnos set apoderado='ROSA RAMOS', apod1_nombre='ROSA RAMOS' where id='a38';
update alumnos set apoderado='GIANINA PAZ FIERRO MONCADA', apod1_nombre='GIANINA PAZ FIERRO MONCADA', apoderado2='ISRAEL SALOMON TERAN RIVAS', apod2_nombre='ISRAEL SALOMON TERAN RIVAS' where id='a39';
update alumnos set apoderado='JOHANA ASTUDILLO MONTECINOS', apod1_nombre='JOHANA ASTUDILLO MONTECINOS' where id='a40';
update alumnos set apoderado='CAROLINA RUBILAR CRUZ', apod1_nombre='CAROLINA RUBILAR CRUZ', apoderado2='YERKO ANDRES VASQUEZ GONZALEZ', apod2_nombre='YERKO ANDRES VASQUEZ GONZALEZ' where id='a41';
update alumnos set apoderado='NICOLE BARRENECHEA MARTELL', apod1_nombre='NICOLE BARRENECHEA MARTELL', apoderado2='LUIS ALEJANDRO VIACAVA ESPINOZA', apod2_nombre='LUIS ALEJANDRO VIACAVA ESPINOZA' where id='a42';
update alumnos set apoderado='YEIMILY GABRIELA RODRIGUEZ MARTINEZ', apod1_nombre='YEIMILY GABRIELA RODRIGUEZ MARTINEZ', apoderado2='FERNANDO JOSE VICUÑA RODRIGUEZ', apod2_nombre='FERNANDO JOSE VICUÑA RODRIGUEZ' where id='a43';
update alumnos set apoderado='EVELYN CARDENAS TAPIA', apod1_nombre='EVELYN CARDENAS TAPIA', apoderado2='VICTOR FERNANDO VILLEGAS CONTRERAS', apod2_nombre='VICTOR FERNANDO VILLEGAS CONTRERAS' where id='a44';
update alumnos set apoderado='ANY GABRIELLA GOMEZ IZQUIERDO', apod1_nombre='ANY GABRIELLA GOMEZ IZQUIERDO', apoderado2='CLEMENTE DEL JESUS ZACARIAS MARIN', apod2_nombre='CLEMENTE DEL JESUS ZACARIAS MARIN' where id='a45';

commit;

-- Deja también en mayúsculas cualquier otro apoderado ya guardado (ej.: suplentes cargados antes)
update alumnos set
  apoderado    = upper(apoderado),
  apoderado2   = upper(apoderado2),
  apod1_nombre = upper(apod1_nombre),
  apod2_nombre = upper(apod2_nombre);

-- Verificación (debería devolver 45 filas con apoderado titular):
select id, apellidos, nombres, apod1_nombre, apod2_nombre from alumnos order by apellidos;
