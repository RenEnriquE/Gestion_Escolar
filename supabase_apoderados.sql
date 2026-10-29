-- GestiónEscolar · Apoderado titular y suplente por alumno
-- Fuente: capturas 'Detalle Estudiante' del sistema del colegio (29-oct-2026).
-- Solo escribe nombres (apoderado/apod1_nombre y apoderado2/apod2_nombre). No toca RUT, teléfono ni email.
-- Si la captura no mostraba suplente, el campo del suplente se deja como está.
-- Ejecutar una vez en el SQL Editor de Supabase.

-- Por si aún no existen estas columnas (no hace nada si ya existen)
alter table alumnos add column if not exists apod1_nombre text;
alter table alumnos add column if not exists apod2_nombre text;

begin;

update alumnos set apoderado='Luz Denia Martinez', apod1_nombre='Luz Denia Martinez' where id='a1';
update alumnos set apoderado='Yessica Yurany Salazar Buritica', apod1_nombre='Yessica Yurany Salazar Buritica', apoderado2='Diego Alonso Aguado Bustos', apod2_nombre='Diego Alonso Aguado Bustos' where id='a2';
update alumnos set apoderado='Conztanza Camila Lizana Sanchez', apod1_nombre='Conztanza Camila Lizana Sanchez', apoderado2='Jonny Bahamondes Cea', apod2_nombre='Jonny Bahamondes Cea' where id='a3';
update alumnos set apoderado='Nislen del Valle Quintero Bastardo', apod1_nombre='Nislen del Valle Quintero Bastardo', apoderado2='Miguel Antonio Caraballo Martinez', apod2_nombre='Miguel Antonio Caraballo Martinez' where id='a4';
update alumnos set apoderado='Maria Jose Burgos Burgos', apod1_nombre='Maria Jose Burgos Burgos' where id='a5';
update alumnos set apoderado='Lorena Cortez Bastidas', apod1_nombre='Lorena Cortez Bastidas', apoderado2='Francisco Javier Cordovez Gonzalez', apod2_nombre='Francisco Javier Cordovez Gonzalez' where id='a6';
update alumnos set apoderado='Belén Ayala Valenzuela', apod1_nombre='Belén Ayala Valenzuela', apoderado2='Monica Pamela Valenzuela Pizarro', apod2_nombre='Monica Pamela Valenzuela Pizarro' where id='a7';
update alumnos set apoderado='Alixbel Carolina Vegas Garcia', apod1_nombre='Alixbel Carolina Vegas Garcia', apoderado2='Maribel Garcia de la Vega', apod2_nombre='Maribel Garcia de la Vega' where id='a8';
update alumnos set apoderado='Maria Luisa Araya Rodriguez', apod1_nombre='Maria Luisa Araya Rodriguez' where id='a9';
update alumnos set apoderado='Camila Isabel Marquez Quivira', apod1_nombre='Camila Isabel Marquez Quivira', apoderado2='Daniel Antonio Ferrada Caro', apod2_nombre='Daniel Antonio Ferrada Caro' where id='a10';
update alumnos set apoderado='Candy Virginia Lola Ramos Icochea', apod1_nombre='Candy Virginia Lola Ramos Icochea', apoderado2='Yerson Pablo Gallardo Pascual', apod2_nombre='Yerson Pablo Gallardo Pascual' where id='a11';
update alumnos set apoderado='Susana Sanchez Hernandez', apod1_nombre='Susana Sanchez Hernandez', apoderado2='Gregori Gaston', apod2_nombre='Gregori Gaston' where id='a12';
update alumnos set apoderado='Nilianys Gonzalez Machado', apod1_nombre='Nilianys Gonzalez Machado' where id='a13';
update alumnos set apoderado='Scarlet Alejandra Leal Vásquez', apod1_nombre='Scarlet Alejandra Leal Vásquez', apoderado2='Cesar Antonio Guzman Leal', apod2_nombre='Cesar Antonio Guzman Leal' where id='a14';
update alumnos set apoderado='Carolina Stephania Parra Jorquera', apod1_nombre='Carolina Stephania Parra Jorquera', apoderado2='Rene Enrique Lillo Valles', apod2_nombre='Rene Enrique Lillo Valles' where id='a15';
update alumnos set apoderado='Elizet Yovana Aros Rosales', apod1_nombre='Elizet Yovana Aros Rosales', apoderado2='Keiko Araos', apod2_nombre='Keiko Araos' where id='a16';
update alumnos set apoderado='Ana María Bucarey Sepulveda', apod1_nombre='Ana María Bucarey Sepulveda' where id='a17';
update alumnos set apoderado='Catalina Francisca Mendoza Manrriquez', apod1_nombre='Catalina Francisca Mendoza Manrriquez', apoderado2='Christian Andres Marchant Gallardo', apod2_nombre='Christian Andres Marchant Gallardo' where id='a18';
update alumnos set apoderado='Alejandra Figueroa Yañez', apod1_nombre='Alejandra Figueroa Yañez', apoderado2='Rosario de las Mercedes Molina Magaña', apod2_nombre='Rosario de las Mercedes Molina Magaña' where id='a19';
update alumnos set apoderado='Claudia Lorena Molina Soto', apod1_nombre='Claudia Lorena Molina Soto', apoderado2='Johan Erick Medina Campos', apod2_nombre='Johan Erick Medina Campos' where id='a20';
update alumnos set apoderado='Eukaris Gabriela Aranguren Colina', apod1_nombre='Eukaris Gabriela Aranguren Colina', apoderado2='Anxoni Eduardo Melendez Soteldo', apod2_nombre='Anxoni Eduardo Melendez Soteldo' where id='a21';
update alumnos set apoderado='Marlyn Rivas Guerrero', apod1_nombre='Marlyn Rivas Guerrero' where id='a22';
update alumnos set apoderado='Keina Virginia Bolaño', apod1_nombre='Keina Virginia Bolaño', apoderado2='Eduardo Jose Molina Castro', apod2_nombre='Eduardo Jose Molina Castro' where id='a23';
update alumnos set apoderado='Emely Rivas Macuado', apod1_nombre='Emely Rivas Macuado', apoderado2='Luis Angel Montachez Salazar', apod2_nombre='Luis Angel Montachez Salazar' where id='a24';
update alumnos set apoderado='Estefania Vizcaya Frei', apod1_nombre='Estefania Vizcaya Frei' where id='a25';
update alumnos set apoderado='Andrea Joselyn Guala Fuentes', apod1_nombre='Andrea Joselyn Guala Fuentes', apoderado2='Patricio Aguera Pizarro', apod2_nombre='Patricio Aguera Pizarro' where id='a26';
update alumnos set apoderado='Mayuri Pimentel Saldaña', apod1_nombre='Mayuri Pimentel Saldaña' where id='a27';
update alumnos set apoderado='Cesar Notari Valenzuela', apod1_nombre='Cesar Notari Valenzuela' where id='a28';
update alumnos set apoderado='Paulina Veronica Valenzuela Vidal', apod1_nombre='Paulina Veronica Valenzuela Vidal', apoderado2='Cristian Oliva Fontecilla', apod2_nombre='Cristian Oliva Fontecilla' where id='a29';
update alumnos set apoderado='Rodrigo Orellana Vetancio', apod1_nombre='Rodrigo Orellana Vetancio', apoderado2='Elizabeth Andrea Cabezas Opazo', apod2_nombre='Elizabeth Andrea Cabezas Opazo' where id='a30';
update alumnos set apoderado='Olisbely Maria Duque Viera', apod1_nombre='Olisbely Maria Duque Viera' where id='a31';
update alumnos set apoderado='Valentina Paola Garrido Orellana', apod1_nombre='Valentina Paola Garrido Orellana', apoderado2='Victor Garrido Sasso', apod2_nombre='Victor Garrido Sasso' where id='a32';
update alumnos set apoderado='Yohammy Raga', apod1_nombre='Yohammy Raga', apoderado2='Antony Jose Oviedo Figueroa', apod2_nombre='Antony Jose Oviedo Figueroa' where id='a33';
update alumnos set apoderado='Belssi Espinoza', apod1_nombre='Belssi Espinoza', apoderado2='Eliu Pinto', apod2_nombre='Eliu Pinto' where id='a34';
update alumnos set apoderado='Katherine Diana Cardenas Cabezas', apod1_nombre='Katherine Diana Cardenas Cabezas', apoderado2='Kevin Jesus Rivera Cardenas', apod2_nombre='Kevin Jesus Rivera Cardenas' where id='a35';
update alumnos set apoderado='Martina Alejandra Salinas Urzua', apod1_nombre='Martina Alejandra Salinas Urzua', apoderado2='Marco Antonio Rojas Faus', apod2_nombre='Marco Antonio Rojas Faus' where id='a36';
update alumnos set apoderado='Giovanna Perini Moyano', apod1_nombre='Giovanna Perini Moyano', apoderado2='Daniel Andres Soto Alvarez', apod2_nombre='Daniel Andres Soto Alvarez' where id='a37';
update alumnos set apoderado='Rosa Ramos', apod1_nombre='Rosa Ramos' where id='a38';
update alumnos set apoderado='Gianina Paz Fierro Moncada', apod1_nombre='Gianina Paz Fierro Moncada', apoderado2='Israel Salomon Teran Rivas', apod2_nombre='Israel Salomon Teran Rivas' where id='a39';
update alumnos set apoderado='Johana Astudillo Montecinos', apod1_nombre='Johana Astudillo Montecinos' where id='a40';
update alumnos set apoderado='Carolina Rubilar Cruz', apod1_nombre='Carolina Rubilar Cruz', apoderado2='Yerko Andres Vasquez Gonzalez', apod2_nombre='Yerko Andres Vasquez Gonzalez' where id='a41';
update alumnos set apoderado='Nicole Barrenechea Martell', apod1_nombre='Nicole Barrenechea Martell', apoderado2='Luis Alejandro Viacava Espinoza', apod2_nombre='Luis Alejandro Viacava Espinoza' where id='a42';
update alumnos set apoderado='Yeimily Gabriela Rodriguez Martinez', apod1_nombre='Yeimily Gabriela Rodriguez Martinez', apoderado2='Fernando Jose Vicuña Rodriguez', apod2_nombre='Fernando Jose Vicuña Rodriguez' where id='a43';
update alumnos set apoderado='Evelyn Cardenas Tapia', apod1_nombre='Evelyn Cardenas Tapia', apoderado2='Victor Fernando Villegas Contreras', apod2_nombre='Victor Fernando Villegas Contreras' where id='a44';
update alumnos set apoderado='Any Gabriella Gomez Izquierdo', apod1_nombre='Any Gabriella Gomez Izquierdo', apoderado2='Clemente del Jesus Zacarias Marin', apod2_nombre='Clemente del Jesus Zacarias Marin' where id='a45';

commit;

-- Verificación (debería devolver 45 filas con apoderado titular):
select id, apellidos, nombres, apod1_nombre, apod2_nombre from alumnos order by apellidos;
