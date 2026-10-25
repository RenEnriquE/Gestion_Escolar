// "Efraín en La Vega" (Mario Carvajal y Víctor Hugo Riveros) — preguntas con alternativas.
// Cada fila: [capítulo, pregunta, respuesta correcta, [3 alternativas incorrectas]]
// El id de cada pregunta es "capítulo.número" según su orden dentro del capítulo.
// ⚠️ Para no perder el historial de los alumnos: agrega preguntas nuevas AL FINAL de su capítulo
//    y no cambies el orden de las existentes.

export const CAPITULOS = [
  { id: "0",  titulo: "Sobre el libro",           emoji: "📖" },
  { id: "1",  titulo: "Primer día de vacaciones", emoji: "🌅" },
  { id: "2",  titulo: "El subterráneo",           emoji: "🔦" },
  { id: "3",  titulo: "El canto misterioso",      emoji: "🎶" },
  { id: "4",  titulo: "El Sopita",                emoji: "👴" },
  { id: "5",  titulo: "Joselote y Cocoliso",      emoji: "👦" },
  { id: "6",  titulo: "Compañeros de aventura",   emoji: "🤝" },
  { id: "7",  titulo: "La niña fantasma",         emoji: "👻" },
  { id: "8",  titulo: "Buscando a Segundo",       emoji: "🔎" },
  { id: "9",  titulo: "La liberación",            emoji: "🕯️" },
  { id: "10", titulo: "De vuelta al colegio",     emoji: "🎒" },
];

const RAW = [
  // ── Sobre el libro ──
  ["0", "¿Quiénes escribieron este libro?", "Mario Carvajal y Víctor Hugo Riveros", ["Mario Carvajal y Pablo Neruda", "Víctor Hugo y Gabriela Mistral", "Alfaguara y Víctor Riveros"]],
  ["0", "¿En qué lugar ocurre casi toda la historia?", "En La Vega, un mercado de Santiago", ["En una playa cerca de El Tabo", "En un colegio de la ciudad", "En un campo del sur de Chile"]],
  ["0", "¿Qué tipo de historia es esta?", "Una aventura con fantasmas y misterio", ["Un cuento de princesas y castillos", "Una historia sobre viajes al espacio", "Un relato de piratas en el mar"]],

  // ── 1. Primer día de vacaciones ──
  ["1", "¿A dónde iba Efraín todos los años de vacaciones?", "A El Tabo", ["A Algarrobo", "A Rancagua", "Al campo de sus primos"]],
  ["1", "¿Por qué Efraín iba al negocio de su tío?", "Sus padres trabajaban y no podía quedarse solo", ["Quería juntar plata para comprarse algo", "Lo habían castigado en el colegio", "Su tío estaba enfermo y necesitaba ayuda"]],
  ["1", "¿Cómo se llamaba el negocio del tío Abelardo?", "El Paraíso", ["La Bodeguita", "Santa Elena", "La Vega"]],
  ["1", "¿Qué animal le cerró un ojo a Efraín?", "Un gato gordo", ["Un perro grande", "Una rata gris", "Un pájaro negro"]],
  ["1", "¿A qué hora empiezan a trabajar en La Vega?", "Muy temprano, cuando aún es de noche", ["Al mediodía, después del almuerzo", "A las diez, cuando sale el sol", "En la tarde, cuando hace calor"]],
  ["1", "¿Qué trabajo le propuso el tío a Efraín?", "Limpiar y ordenar el subterráneo", ["Vender las frutas y verduras", "Cargar los carretones de cajas", "Cuidar el negocio por las tardes"]],

  // ── 2. El subterráneo ──
  ["2", "¿Qué le pasó el tío a Efraín para bajar?", "Una linterna", ["Una vela", "Una llave", "Un farol"]],
  ["2", "¿Qué eran las figuras de extraños sombreros?", "Maniquíes de una tienda de ropa", ["Fantasmas de dos personas", "Estatuas de piedra muy viejas", "Muñecos de trapo rellenos"]],
  ["2", "¿Qué nombre estaba firmado en la caja?", "Jacinta", ["Segundo", "Rayén", "Abelardo"]],
  ["2", "¿Por qué Efraín no pudo abrir la caja?", "Tenía un candado y faltaba la llave", ["Estaba muy pesada y no podía moverla", "Su tío le había prohibido abrirla", "Estaba rota y se había atascado"]],
  ["2", "¿Dónde se quedó dormido Efraín?", "En un viejo sofá junto a los maniquíes", ["En los escalones de la escalera", "Encima de unas cajas de fruta", "Sobre la mesa llena de polvo"]],
  ["2", "¿Qué le susurraba la niña de su sueño?", "Que la llave estaba junto al reloj", ["Que debía salir del subterráneo", "Que tenía que buscar a su hermano", "Que abriera la puerta del pasillo"]],

  // ── 3. El canto misterioso ──
  ["3", "¿Dónde encontró Efraín la llave plateada?", "En un cajón, junto a un reloj", ["Debajo de la escalera de madera", "Dentro de un baúl con ropa vieja", "En el bolsillo de un maniquí"]],
  ["3", "¿Qué había dentro de la caja de Jacinta?", "Fotos y dibujos con poesías", ["Monedas antiguas y joyas", "Ropa vieja y sombreros", "Mapas de La Vega y Santiago"]],
  ["3", "¿Qué escuchó Efraín de pronto?", "La voz de una niña cantando", ["Un llanto de bebé a lo lejos", "Los gritos de su tío Abelardo", "Música de una radio vieja"]],
  ["3", "¿Qué encontró detrás de los maniquíes?", "Una pequeña puerta hacia un pasillo", ["Una ventana que daba a la calle", "Otra escalera que subía al negocio", "Un baúl lleno de monedas"]],
  ["3", "¿Qué sintió al abrir la puertecita?", "Una brisa muy helada", ["Un calor sofocante", "Un fuerte olor a flores", "Un ruido que le dolió los oídos"]],
  ["3", "¿Qué excusa le dio a su mamá cuando lo vio preocupado?", "Que estaba adolorido de mover cajas", ["Que había visto un fantasma en la calle", "Que se sentía mal del estómago", "Que se había peleado con su tío"]],

  // ── 4. El Sopita ──
  ["4", "¿Por qué Efraín no volvía al subterráneo?", "No se atrevía a bajar solo", ["Su tío no lo dejaba bajar", "Ya había terminado de ordenar", "Estaba enfermo y con fiebre"]],
  ["4", "¿Qué le aconsejó el tío si se cansaba mucho?", "Pedir ayuda a otros niños de La Vega", ["Dejar el trabajo para el próximo verano", "Contarles todo a sus padres", "Contratar a un adulto para que lo ayudara"]],
  ["4", "¿Por qué le decían «el Sopita»?", "Porque no tenía dientes y solo tomaba sopa", ["Porque vendía sopa en un puesto", "Porque caminaba muy lento y despacio", "Porque siempre andaba mojado"]],
  ["4", "¿En qué paseó Efraín con el Sopita?", "Sobre un carretón de mano", ["En un camión del tío Abelardo", "En una bicicleta de reparto", "Montado en un caballo"]],
  ["4", "¿Cómo se llamó La Vega al principio?", "Gran Mercado de Abastos de la Ciudad", ["Gran Mercado Central de Santiago", "Feria Grande de la Capital", "Mercado Nuevo del Mapocho"]],
  ["4", "¿Cerca de qué río está La Vega?", "El río Mapocho", ["El río Maipo", "El río Biobío", "El río Cachapoal"]],
  ["4", "¿Qué le contó el Sopita sobre los fantasmas?", "Que hay fantasmas, hasta perros y gatos", ["Que los fantasmas no existen de verdad", "Que solo aparecen en el campo", "Que salen a pasear durante el día"]],

  // ── 5. Joselote y Cocoliso ──
  ["5", "¿Cuántos años tenía Efraín?", "Once", ["Ocho", "Nueve", "Doce"]],
  ["5", "¿Dónde dormían Joselote y Cocoliso?", "Debajo de un puente del río", ["En la bodega del Sopita", "En una casa con su mamá", "En el subterráneo del tío"]],
  ["5", "¿Quién era Cocoliso para Joselote?", "Su hermano chico", ["Su primo mayor", "Su amigo del colegio", "Su vecino de La Vega"]],
  ["5", "¿Cómo ganaban «unas luquitas» los hermanos?", "Cargando frutas y verduras", ["Vendiendo diarios en la calle", "Limpiando zapatos a los clientes", "Cantando en los pasillos"]],
  ["5", "¿Qué hacía Cocoliso cuando conversaban?", "Repetía lo que decían los demás", ["Hablaba en otro idioma", "No decía ni una palabra", "Gritaba para que lo escucharan"]],
  ["5", "¿Cuántos años decían que tenía el Sopita?", "Más de cien años", ["Cincuenta años", "Setenta años", "Treinta años"]],
  ["5", "¿Qué pensaba Joselote de los fantasmas?", "Que existen, aunque se hacía el valiente", ["Que no existen y son puros cuentos", "Que son muy malos y les tenía pánico", "Que solo asustan a los niños chicos"]],

  // ── 6. Compañeros de aventura ──
  ["6", "¿Qué les ofreció Efraín a Joselote y Cocoliso?", "Un trabajo pagado en el subterráneo", ["Un paseo por el río Mapocho", "Unos juguetes viejos del tío", "Comida gratis todo el verano"]],
  ["6", "¿Qué secreto les contó Efraín?", "Que en el subterráneo canta una niña", ["Que su tío escondía un gran tesoro", "Que había un gato fantasma en La Vega", "Que el Sopita tenía más de cien años"]],
  ["6", "¿Qué niños se sumaron frente a la carnicería?", "Rayén y Ramoncito", ["Juancho y Lucho", "Petronila y Eliana", "Segundo y Jacinta"]],
  ["6", "¿Por qué Ramoncito hablaba con zetas?", "Su papá era español, igual que él", ["Era muy tímido y hablaba bajito", "Vivía en el sur de Chile", "Se comía las letras al hablar"]],
  ["6", "¿Qué quería ser Ramoncito cuando grande?", "Torero", ["Futbolista", "Carnicero", "Cocinero"]],
  ["6", "¿Qué era la mamá de Rayén?", "Una machi mapuche", ["Una doctora del consultorio", "Una vendedora de hierbas", "Una profesora del colegio"]],

  // ── 7. La niña fantasma ──
  ["7", "¿Por qué pudieron bajar sin que nadie los molestara?", "El tío salió a buscar limones a Rancagua", ["El tío se había quedado dormido", "El tío estaba en una reunión", "El negocio estaba cerrado ese día"]],
  ["7", "¿Qué apareció en el espejo del pasillo?", "Un esqueleto horrible", ["Un lobo con ojos rojos", "Una niña sonriendo", "El rostro de los cinco niños"]],
  ["7", "¿Qué le pasó a Cocoliso por el susto?", "Se hizo pipí", ["Se desmayó en el suelo", "Salió corriendo hacia la escalera", "Se puso a cantar muy fuerte"]],
  ["7", "¿Qué le pasa al fantasma cuando la gente la mira un rato?", "Se convierte en una joven bonita", ["Se hace gigante y asusta más", "Desaparece de repente", "Se convierte en un gato negro"]],
  ["7", "¿Para qué viajó Jacinta a Santiago?", "Para reunirse con su hermano", ["Para estudiar en un colegio", "Para trabajar en una panadería", "Para visitar a su mamá enferma"]],
  ["7", "¿Cómo murió Jacinta?", "La atropelló un auto en la calle", ["Se cayó por la escalera de la mansión", "Se enfermó muy grave en invierno", "Se perdió en el campo sin comida"]],
  ["7", "¿Para qué cantaba Jacinta?", "Para que no le tuvieran miedo", ["Para llamar a su hermano Segundo", "Para asustar a la gente del local", "Para entretenerse mientras trabajaba"]],
  ["7", "¿Qué necesitaba Jacinta para poder irse?", "Que encontraran a su hermano", ["Que le devolvieran su caja de recuerdos", "Que alguien limpiara el subterráneo", "Que los niños dejaran de visitarla"]],

  // ── 8. Buscando a Segundo ──
  ["8", "¿Qué había dicho la mamá de Rayén sobre Jacinta?", "Que era un alma en pena y buscaba a su hermano", ["Que era una niña mala y peligrosa", "Que solo aparecía en las noches de invierno", "Que había que olvidarla y no volver"]],
  ["8", "¿Por qué el vendedor de quesos no era el Segundo buscado?", "Se crió en el norte y no tenía hermana", ["Era demasiado joven para serlo", "No quiso mirar la foto que le mostraron", "Era el tío de Rayén y Ramoncito"]],
  ["8", "¿A quién acudieron los niños a pedir ayuda?", "Al Sopita", ["A don Lucho", "Al tío Abelardo", "A Juancho, el lustrabotas"]],
  ["8", "¿Quién resultó ser Segundo, el hermano de Jacinta?", "El Sopita", ["Don Lucho, el de los pescados", "El tío Abelardo", "El vendedor de quesos"]],
  ["8", "¿Dónde trabajaba Segundo cuando era joven?", "En una panadería de Santiago", ["En una carnicería del mercado", "En un negocio de frutas y verduras", "En un fundo del campo"]],
  ["8", "¿Por qué Segundo se quedó a vivir en La Vega?", "Esperaba encontrar algún día a Jacinta", ["Tenía mucho trabajo y no podía irse", "Le encantaba el ambiente del mercado", "No tenía otro lugar donde vivir"]],
  ["8", "¿Qué debían hacer para ayudar a Jacinta a salir?", "Hacer un fuego con hierbas aromáticas", ["Romper el espejo del pasillo", "Rezar una oración todos juntos", "Cantarle la canción que ella amaba"]],
  ["8", "¿Qué día acordaron ir al subterráneo?", "El viernes", ["El lunes", "El sábado", "El domingo"]],

  // ── 9. La liberación ──
  ["9", "¿Cómo llegó vestido el Sopita ese día?", "Con lo más elegante que tenía", ["Con su ropa de trabajo de siempre", "Con un disfraz de fantasma", "Con un pijama y chalas"]],
  ["9", "¿Qué llevaba Rayén en su bolso?", "Hierbas de su mamá", ["Fotos de la familia", "Velas y fósforos", "Comida para todos"]],
  ["9", "¿Dónde prendió Rayén el pequeño fuego?", "Dentro de un cántaro", ["En una olla grande de fierro", "En una caja de madera vieja", "En un tarro de pintura"]],
  ["9", "¿Qué dijo el Sopita al ver al esqueleto?", "Que esa no era su hermana y mejor se iban", ["Que ya la había visto muchas veces", "Que quería hablar a solas con ella", "Que todo era una broma de los niños"]],
  ["9", "¿Qué pasó cuando el Sopita trató de tocarla?", "No había nada, solo aire", ["Ella lo abrazó muy fuerte", "Ella se escondió detrás del espejo", "Ella lo empujó con rabia"]],
  ["9", "¿Qué pasó con Jacinta al final?", "Se desvaneció en el espejo mientras cantaba", ["Salió caminando por la escalera", "Se quedó dormida en el pasillo", "Se fue volando por la ventana"]],

  // ── 10. De vuelta al colegio ──
  ["10", "¿Qué recuerdo se llevó Efraín?", "La caja de dibujos de Jacinta", ["Una linterna con pilas", "Un reloj antiguo de cadena", "Un libro de mapas viejos"]],
  ["10", "¿Qué se llevó Cocoliso?", "Una locomotora de juguete", ["Una brújula de metal", "Unas máscaras de colores", "Un sombrero de ala ancha"]],
  ["10", "¿Qué se llevó Ramoncito?", "Una brújula", ["Un álbum de estampillas", "Un vestido de fiesta", "Una locomotora de juguete"]],
  ["10", "¿Qué se llevó Joselote?", "Un álbum de estampillas", ["Unos collares de colores", "Una caja de monedas antiguas", "Un libro de mapas del mundo"]],
  ["10", "¿Por qué Efraín no contó su aventura en el colegio?", "Pensó que no le iban a creer", ["Se le había olvidado por completo", "Le dio vergüenza que se rieran", "Su tío le pidió que guardara el secreto"]],
  ["10", "¿Cómo se llamaba la profesora de Efraín?", "La señorita Mercedes", ["La señorita Javiera", "La señora Petronila", "La señorita Rayén"]],
  ["10", "¿Qué pasó con el Sopita al final del libro?", "Desapareció para irse donde su hermana", ["Se fue a vivir con Efraín", "Se enfermó y lo llevaron al hospital", "Vendió su carretón y viajó a El Tabo"]],
];

const contador = {};
export const PREGUNTAS = RAW.map(([cap, q, correcta, malas]) => {
  contador[cap] = (contador[cap] || 0) + 1;
  const id = `${cap}.${contador[cap]}`;
  return { id, key: `l:efrain:${id}`, cap, q, correcta, malas };
});
