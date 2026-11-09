// Unit 5: Transport (Medios de transporte) — contenidos de la guía, listos para armar preguntas.
// Claves de ítem (para el registro de respuestas y el refuerzo):  t:<palabra>  ·  s:<id frase>  ·  r:<id lectura>

export const CATEGORIAS5 = [
  { id: "todo",            label: "Todo",                emoji: "⭐" },
  { id: "transporte",      label: "Means of transport",  emoji: "🚌" },
  { id: "tierra",          label: "Land",                emoji: "🚚" },
  { id: "aire",            label: "Air",                 emoji: "🚁" },
  { id: "agua",            label: "Water",               emoji: "🚢" },
  { id: "caracteristicas", label: "Características",    emoji: "📏" },
  { id: "partes",          label: "Partes",              emoji: "🛞" },
  { id: "numeros",         label: "Números 10–100",      emoji: "🔢" },
  { id: "verde",           label: "Green transport",     emoji: "🌱" },
  { id: "lugares",         label: "Lugares",             emoji: "📍" },
  { id: "opiniones",       label: "Opiniones",           emoji: "💬" },
  { id: "ventajas",        label: "Bike & bus",          emoji: "🚲" },
  { id: "acciones",        label: "Acciones",            emoji: "🏃" },
  { id: "ambiente",        label: "Planet & energy",     emoji: "🌍" },
  { id: "expresiones",     label: "Expresiones",         emoji: "🗣️" },
];

export const VOCAB5 = [
  // Means of transport (p. 86–87)
  { cat: "transporte", en: "plane",      es: "avión",         emoji: "✈️" },
  { cat: "transporte", en: "boat",       es: "bote",          emoji: "🚤" },
  { cat: "transporte", en: "scooter",    es: "scooter",       emoji: "🛴" },
  { cat: "transporte", en: "bike",       es: "bicicleta",     emoji: "🚲" },
  { cat: "transporte", en: "bus",        es: "bus",           emoji: "🚌" },
  { cat: "transporte", en: "subway",     es: "metro",         emoji: "🚇" },
  { cat: "transporte", en: "car",        es: "auto",          emoji: "🚗" },
  { cat: "transporte", en: "train",      es: "tren",          emoji: "🚆" },

  // Land transport
  { cat: "tierra", en: "motorcycle",     es: "motocicleta",   emoji: "🏍️" },
  { cat: "tierra", en: "ambulance",      es: "ambulancia",    emoji: "🚑" },
  { cat: "tierra", en: "van",            es: "furgoneta",     emoji: "🚐" },
  { cat: "tierra", en: "truck",          es: "camión",        emoji: "🚚" },
  { cat: "tierra", en: "high-speed train", es: "tren de alta velocidad", emoji: "🚄" },

  // Air transport
  { cat: "aire", en: "hot air balloon",  es: "globo aerostático", emoji: "🎈" },
  { cat: "aire", en: "sea plane",        es: "hidroavión",    emoji: "🛩️" },
  { cat: "aire", en: "helicopter",       es: "helicóptero",   emoji: "🚁" },
  { cat: "aire", en: "rocket",           es: "cohete",        emoji: "🚀" },

  // Water transport
  { cat: "agua", en: "ship",             es: "barco (grande)", emoji: "🚢" },
  { cat: "agua", en: "raft",             es: "balsa" },
  { cat: "agua", en: "sailboat",         es: "velero",        emoji: "⛵" },
  { cat: "agua", en: "canoe",            es: "canoa",         emoji: "🛶" },
  { cat: "agua", en: "submarine",        es: "submarino" },

  // Características
  { cat: "caracteristicas", en: "old",   es: "viejo" },
  { cat: "caracteristicas", en: "new",   es: "nuevo" },
  { cat: "caracteristicas", en: "slow",  es: "lento" },
  { cat: "caracteristicas", en: "fast",  es: "rápido" },
  { cat: "caracteristicas", en: "big",   es: "grande" },
  { cat: "caracteristicas", en: "small", es: "pequeño" },
  { cat: "caracteristicas", en: "long",  es: "largo" },
  { cat: "caracteristicas", en: "long distance",  es: "larga distancia" },
  { cat: "caracteristicas", en: "short distance", es: "corta distancia" },

  // Partes
  { cat: "partes", en: "wheels",       es: "ruedas",           emoji: "🛞" },
  { cat: "partes", en: "engine",       es: "motor" },
  { cat: "partes", en: "wings",        es: "alas" },
  { cat: "partes", en: "horn",         es: "bocina" },
  { cat: "partes", en: "wipers",       es: "limpiaparabrisas" },
  { cat: "partes", en: "doors",        es: "puertas",          emoji: "🚪" },
  { cat: "partes", en: "solar panel",  es: "panel solar",      emoji: "☀️" },

  // Números
  { cat: "numeros", en: "ten",         es: "10" },
  { cat: "numeros", en: "twenty",      es: "20" },
  { cat: "numeros", en: "thirty",      es: "30" },
  { cat: "numeros", en: "forty",       es: "40" },
  { cat: "numeros", en: "fifty",       es: "50" },
  { cat: "numeros", en: "sixty",       es: "60" },
  { cat: "numeros", en: "seventy",     es: "70" },
  { cat: "numeros", en: "eighty",      es: "80" },
  { cat: "numeros", en: "ninety",      es: "90" },
  { cat: "numeros", en: "one hundred", es: "100" },

  // Green transport
  { cat: "verde", en: "walking",               es: "caminar",                 emoji: "🚶" },
  { cat: "verde", en: "carpooling",            es: "compartir el auto",       emoji: "🚘" },
  { cat: "verde", en: "public transportation", es: "transporte público" },
  { cat: "verde", en: "electric vehicles",     es: "vehículos eléctricos",    emoji: "🔌" },
  { cat: "verde", en: "solar vehicles",        es: "vehículos solares" },
  { cat: "verde", en: "hybrid vehicles",       es: "vehículos híbridos" },

  // Lugares
  { cat: "lugares", en: "airport",     es: "aeropuerto" },
  { cat: "lugares", en: "pier",        es: "muelle" },
  { cat: "lugares", en: "park",        es: "parque",   emoji: "🌳" },
  { cat: "lugares", en: "street",      es: "calle" },
  { cat: "lugares", en: "lighthouse",  es: "faro" },
  { cat: "lugares", en: "canals",      es: "canales" },

  // Guía Lesson 1 · texto de Steven (bike vs. bus)
  { cat: "ventajas", en: "noise",          es: "ruido",               emoji: "🔊" },
  { cat: "ventajas", en: "helmet",         es: "casco" },
  { cat: "ventajas", en: "wind",           es: "viento",              emoji: "💨" },
  { cat: "ventajas", en: "parking space",  es: "estacionamiento",     emoji: "🅿️" },
  { cat: "ventajas", en: "protection",     es: "protección",          emoji: "🛡️" },
  { cat: "ventajas", en: "advantage",      es: "ventaja" },
  { cat: "ventajas", en: "disadvantage",   es: "desventaja" },
  { cat: "ventajas", en: "timetable",      es: "horario" },
  { cat: "ventajas", en: "weather",        es: "clima",               emoji: "🌦️" },
  { cat: "ventajas", en: "author",         es: "autor" },
  { cat: "ventajas", en: "topic",          es: "tema" },
  { cat: "ventajas", en: "means of transport", es: "medio de transporte" },

  // Opiniones y adjetivos (guías Lesson 1 y 2)
  { cat: "opiniones", en: "noisy",         es: "ruidoso",             emoji: "🔊" },
  { cat: "opiniones", en: "quiet",         es: "silencioso",          emoji: "🤫" },
  { cat: "opiniones", en: "comfortable",   es: "cómodo" },
  { cat: "opiniones", en: "expensive",     es: "caro",                emoji: "💰" },
  { cat: "opiniones", en: "empty",         es: "vacío" },
  { cat: "opiniones", en: "safe",          es: "seguro",              emoji: "🛡️" },
  { cat: "opiniones", en: "strong",        es: "fuerte",              emoji: "💪" },
  { cat: "opiniones", en: "special",       es: "especial",            emoji: "⭐" },
  { cat: "opiniones", en: "easy",          es: "fácil" },
  { cat: "opiniones", en: "important",     es: "importante" },
  { cat: "opiniones", en: "crazy",         es: "loco",                emoji: "🤪" },

  // Acciones
  { cat: "acciones", en: "float",          es: "flotar",              emoji: "🛟" },
  { cat: "acciones", en: "move around",    es: "moverse (de un lugar a otro)" },
  { cat: "acciones", en: "wait",           es: "esperar",             emoji: "⏳" },
  { cat: "acciones", en: "ride",           es: "andar (en bici)",     emoji: "🚴" },
  { cat: "acciones", en: "drive",          es: "conducir",            emoji: "🚗" },
  { cat: "acciones", en: "feel",           es: "sentir" },
  { cat: "acciones", en: "need",           es: "necesitar" },
  { cat: "acciones", en: "forget",         es: "olvidar" },
  { cat: "acciones", en: "share",          es: "compartir" },
  { cat: "acciones", en: "contaminate",    es: "contaminar" },
  { cat: "acciones", en: "transform",      es: "transformar" },

  // Guía Lesson 2 · texto de Lola (vehículo solar)
  { cat: "ambiente", en: "planet",         es: "planeta",             emoji: "🌍" },
  { cat: "ambiente", en: "environment",    es: "medio ambiente",      emoji: "🌳" },
  { cat: "ambiente", en: "environmentally friendly", es: "amigable con el medio ambiente", emoji: "♻️" },
  { cat: "ambiente", en: "solar power",    es: "energía solar",       emoji: "☀️" },
  { cat: "ambiente", en: "electricity",    es: "electricidad",        emoji: "⚡" },
  { cat: "ambiente", en: "energy",         es: "energía" },
  { cat: "ambiente", en: "roof",           es: "techo",               emoji: "🏠" },
  { cat: "ambiente", en: "gasoline",       es: "bencina",             emoji: "⛽" },
  { cat: "ambiente", en: "negative effect", es: "efecto negativo" },
  { cat: "ambiente", en: "city",           es: "ciudad",              emoji: "🏙️" },
  { cat: "ambiente", en: "vehicle",        es: "vehículo" },

  // Expresiones útiles
  { cat: "expresiones", en: "always",          es: "siempre" },
  { cat: "expresiones", en: "never",           es: "nunca" },
  { cat: "expresiones", en: "on time",         es: "a tiempo" },
  { cat: "expresiones", en: "too many",        es: "demasiados" },
  { cat: "expresiones", en: "a long time",     es: "mucho tiempo" },
  { cat: "expresiones", en: "the most",        es: "el que más" },
  { cat: "expresiones", en: "the least",       es: "el que menos" },
  { cat: "expresiones", en: "at home",         es: "en casa" },
  { cat: "expresiones", en: "outside the city", es: "fuera de la ciudad" },
];

// ── Oraciones para completar ────────────────────────────────────────────────
// texto: líneas separadas por "|"; el hueco es "___".
// es: ayuda en español (se muestra al responder).
const F = (id, emoji, texto, correcta, incorrectas, es) => ({ id, emoji, texto, correcta, incorrectas, es });

export const FRASES5 = [
  // Diálogos de la guía
  F("car-old",     "🚗", "Is your car old?|No, it ___. It's new!",                    "isn't",   ["is", "doesn't", "can't"], "¿Tu auto es viejo? No. ¡Es nuevo!"),
  F("it-fast",     "🏎️", "Is it fast?|Yes, it ___.",                                  "is",      ["isn't", "does", "can"], "¿Es rápido? Sí."),
  F("it-small",    "🛴", "Is it big?|No, it isn't. It's ___ (pequeño).",              "small",   ["slow", "old", "fast"], "¿Es grande? No. Es pequeño."),
  F("like-it",     "😊", "Do you like it?|Yes, I ___.",                               "do",      ["does", "am", "can"], "¿Te gusta? Sí, me gusta."),
  F("it-plane",    "✈️", "Is it a plane?|No, it ___.",                                "isn't",   ["doesn't", "can't", "don't"], "¿Es un avión? No."),
  F("plane-slow",  "✈️", "Is a plane slow?|No, it ___. It's fast.",                   "isn't",   ["is", "doesn't", "can't"], "¿Un avión es lento? No. Es rápido."),

  // Does it have…? / Can it…?
  F("car-wheels",  "🚗", "Does a car have two wheels?|No, it ___. It has four.",      "doesn't", ["isn't", "can't", "don't"], "¿Un auto tiene dos ruedas? No. Tiene cuatro."),
  F("rocket-wings","🚀", "Does a rocket have wings?|No, it ___.",                     "doesn't", ["isn't", "can't", "don't"], "¿Un cohete tiene alas? No."),
  F("balloon-eng", "🎈", "Does a hot air balloon have an engine?|No, it ___.",        "doesn't", ["isn't", "can't", "don't"], "¿Un globo aerostático tiene motor? No."),
  F("canoe-eng",   "🛶", "Does a canoe have an engine?|No, it ___.",                  "doesn't", ["isn't", "can't", "don't"], "¿Una canoa tiene motor? No."),
  F("truck-wheels","🚚", "Does a truck have wheels?|Yes, it ___.",                    "does",    ["is", "can", "do"], "¿Un camión tiene ruedas? Sí."),
  F("seaplane-w",  "🛩️", "Does a sea plane have wings?|Yes, it ___.",                 "does",    ["is", "can", "do"], "¿Un hidroavión tiene alas? Sí."),
  F("sub-wings",   "🚢", "Does a submarine have wings?|No, it ___.",                  "doesn't", ["isn't", "can't", "don't"], "¿Un submarino tiene alas? No."),
  F("seaplane-fly","🛩️", "Can a sea plane fly?|Yes, it ___.",                         "can",     ["does", "is", "do"], "¿Un hidroavión puede volar? Sí."),

  // Qué tiene cada transporte
  F("seaplane-has","🛩️", "A sea plane has ___ and an engine.",                       "wings",   ["wheels", "horn"], "Un hidroavión tiene alas y motor."),
  F("truck-hasnt", "🚚", "A truck has wheels and an engine. It hasn't got ___.",      "wings",   ["wheels", "an engine", "a horn"], "Un camión no tiene alas."),

  // Canción "The wheels on the bus"
  F("song-wheels", "🚌", "The wheels on the bus go round and ___, all through the town.", "round", ["up", "big", "fast"], "Las ruedas del bus giran y giran."),
  F("song-wipers", "🚌", "The ___ on the bus go swish, swish, swish.",               "wipers",  ["wheels", "horn", "doors"], "Los limpiaparabrisas hacen swish."),
  F("song-horn",   "🚌", "The ___ on the bus goes beep, beep, beep.",                 "horn",    ["doors", "engine"], "La bocina hace beep."),
  F("song-doors",  "🚌", "The ___ on the bus go open and shut.",                      "doors",   ["wheels", "horn", "wipers"], "Las puertas se abren y se cierran."),

  // Tipos de transporte (land / air / water)
  F("t-helicopter","🚁", "A helicopter is ___ transport.",                            "air",     ["land", "water"], "El helicóptero es transporte aéreo."),
  F("t-submarine", "🌊", "A submarine is ___ transport.",                             "water",   ["land", "air"], "El submarino es transporte acuático."),
  F("t-truck",     "🚚", "A truck is ___ transport.",                                 "land",    ["air", "water"], "El camión es transporte terrestre."),
  F("t-rocket",    "🚀", "A rocket is ___ transport.",                                "air",     ["land", "water"], "El cohete es transporte aéreo."),
  F("t-canoe",     "🛶", "A canoe is ___ transport.",                                 "water",   ["land", "air"], "La canoa es transporte acuático."),
  F("t-ambulance", "🚑", "An ambulance is ___ transport.",                            "land",    ["air", "water"], "La ambulancia es transporte terrestre."),
  F("t-balloon",   "🎈", "A hot air balloon is ___ transport.",                       "air",     ["land", "water"], "El globo aerostático es transporte aéreo."),
  F("t-ship",      "🚢", "A ship is ___ transport.",                                  "water",   ["land", "air"], "El barco es transporte acuático."),
  F("t-motorcycle","🏍️", "A motorcycle is ___ transport.",                            "land",    ["air", "water"], "La moto es transporte terrestre."),
  F("t-sailboat",  "⛵", "A sailboat is ___ transport.",                              "water",   ["land", "air"], "El velero es transporte acuático."),

  // Números 10–100
  F("n-30",        "🔢", "ten, twenty, ___, forty",                                   "thirty",  ["fifty", "sixty", "thirteen"], "10, 20, 30, 40"),
  F("n-70",        "🔢", "fifty, sixty, ___, eighty",                                 "seventy", ["ninety", "sixteen", "seventeen"], "50, 60, 70, 80"),
  F("n-90",        "🔢", "seventy, eighty, ___, one hundred",                         "ninety",  ["nineteen", "sixty", "fifty"], "70, 80, 90, 100"),
  F("n-boats",     "⛵", "There are ___ boats. (20)",                                  "twenty",  ["twelve", "thirty", "forty"], "Hay 20 botes."),
  F("n-cars",      "🚗", "There are ___ cars. (40)",                                   "forty",   ["fourteen", "fifty", "thirty"], "Hay 40 autos."),
  F("n-buses",     "🚌", "There are ___ buses. (30)",                                  "thirty",  ["thirteen", "twenty", "forty"], "Hay 30 buses."),
  F("n-planes",    "✈️", "There are ___ blue planes. (20)",                            "twenty",  ["twelve", "thirty", "ten"], "Hay 20 aviones azules."),
  F("n-park",      "🌳", "There are ___ old red buses in the park. (60)",              "sixty",   ["sixteen", "seventy", "fifty"], "Hay 60 buses rojos viejos en el parque."),
  F("n-100",       "💯", "Ninety and one ___. (100)",                                  "hundred", ["thousand", "ten", "twenty"], "Noventa y cien."),

  // Crucigrama y repaso de la Lesson 1
  F("x-bike",      "🚲", "I ride my ___ to school.",                                  "bike",    ["plane", "submarine", "rocket"], "Voy en mi bicicleta al colegio."),
  F("x-plane",     "✈️", "I can fly on a ___.",                                       "plane",   ["bike", "car", "boat"], "Puedo volar en un avión."),
  F("x-car",       "🚗", "My father washes his ___ on Sundays.",                      "car",     ["plane", "subway", "train"], "Mi papá lava su auto los domingos."),
  F("x-subway",    "🚇", "A ___ is an underground train.",                            "subway",  ["bus", "scooter", "boat"], "El metro es un tren subterráneo."),
  F("x-big",       "🐘", "The opposite of big is ___.",                               "small",   ["old", "fast"], "Lo opuesto de grande es pequeño."),
  F("x-slow",      "🐢", "The opposite of slow is ___.",                              "fast",    ["old", "small", "new"], "Lo opuesto de lento es rápido."),
  F("x-old",       "👴", "The opposite of old is ___.",                               "new",     ["slow", "big", "small"], "Lo opuesto de viejo es nuevo."),
  F("x-twister",   "🚆", "Faith took a ___ to Spain on a rainy day.",                 "train",   ["bus", "car", "bike"], "Trabalenguas con el sonido /ai/."),

  // Guías: texto de Steven y texto de Lola
  F("g-helmet",    "🚴", "I never forget my ___! It's important for my protection.", "helmet", ["bus", "wind", "horn"], "Nunca olvido mi casco: es importante para mi protección."),
  F("g-wind",      "💨", "I feel the ___ on my face.",                                "wind",    ["helmet", "engine", "wheels"], "Siento el viento en mi cara."),
  F("g-people",    "🚌", "The bus is slow. There are too many ___.",                  "people",  ["wheels", "helmets", "engines"], "El bus es lento. Hay demasiada gente."),
  F("g-noisy",     "🔊", "The bus is slow and very ___.",                             "noisy",   ["quiet", "fast", "safe"], "El bus es lento y muy ruidoso."),
  F("g-bike-fast", "🚲", "Steven's bike is small and ___.",                           "fast",    ["slow", "noisy", "big"], "La bici de Steven es pequeña y rápida."),
  F("g-solar",     "☀️", "Lola's car uses ___ power.",                                "solar",   ["slow", "noisy", "crazy"], "El auto de Lola usa energía solar."),
  F("g-contam",    "🌳", "It does not ___, so it is good for the environment.",       "contaminate", ["transform", "wait", "ride"], "No contamina, por eso es bueno para el medio ambiente."),
  F("g-electric",  "⚡", "Solar panels transform the sun's energy into ___.",         "electricity", ["gasoline", "a helmet", "a wheel"], "Los paneles solares la transforman en electricidad."),
  F("g-roof",      "🏠", "The solar panels are on the ___ of the vehicle.",           "roof",    ["wheels", "horn", "street"], "Los paneles están en el techo del vehículo."),
  F("g-safe",      "🚗", "Lola's car is fast, big and ___.",                          "safe",    ["noisy", "slow", "small"], "El auto de Lola es rápido, grande y seguro."),
  F("g-env",       "🌍", "Lola's car is good for the ___.",                           "environment", ["gasoline", "roof", "helmet"], "Es bueno para el medio ambiente."),
  F("g-wheels4",   "🚗", "Lola's vehicle has four ___.",                              "wheels",  ["wings", "sails", "helmets"], "El vehículo de Lola tiene cuatro ruedas."),
];

// ── Lectura y comprensión ───────────────────────────────────────────────────
// tipo "vf": verdadero/falso · tipo "mc": alternativas
const R = (id, emoji, caption, texto, correcta, incorrectas, es, vf = false) => ({ id, emoji, caption, texto, correcta, incorrectas, es, vf });

export const LECTURA5 = [
  // Connecting with Social studies: London, Amsterdam, Venice
  R("ss-london-boat",   "🇬🇧", "London · True or False", "In London many people travel by boat.",        "False", ["True"], "En Londres mucha gente NO viaja en bote: usa bus, bicicleta, auto, taxi y metro.", true),
  R("ss-tube",          "🚇", "London · True or False", "The Tube is the name of the London subway.",   "True",  ["False"], "The Tube es el metro de Londres.", true),
  R("ss-doubledecker",  "🚌", "London · True or False", "In London there are double-decker buses.",     "True",  ["False"], "En Londres hay buses de dos pisos.", true),
  R("ss-amsterdam-bikes","🚲", "Amsterdam · True or False", "In Amsterdam there are more people than bikes.", "False", ["True"], "En Ámsterdam hay más bicicletas que personas.", true),
  R("ss-amsterdam-more","🚲", "Amsterdam · True or False", "In Amsterdam there are more bikes than people.", "True",  ["False"], "En Ámsterdam hay más bicicletas que personas.", true),
  R("ss-venice-canals", "🛶", "Venice · True or False", "In Venice people move around canals.",         "True",  ["False"], "En Venecia la gente se mueve por canales.", true),
  R("ss-gondolas",      "🛶", "Venice · True or False", "Gondolas are big water buses.",               "False", ["True"], "Las góndolas NO son buses acuáticos grandes.", true),
  R("ss-venice-roads",  "🛶", "Venice · True or False", "In Venice there are no roads.",               "True",  ["False"], "En Venecia no hay calles: hay canales.", true),

  // Story time: The lighthouse!
  R("st-bus",        "🚌", "Story · The lighthouse!", "Amy and Jamie go to the lighthouse by ___.",           "bus",        ["boat", "helicopter", "train"], "Amy y Jamie van al faro en bus."),
  R("st-light",      "🏠", "Story · The lighthouse!", "When it's night, the ships can see the ___.",          "light",      ["wings", "wheels", "horn"], "De noche, los barcos ven la luz del faro."),
  R("st-helicopter", "🚁", "Story · The lighthouse!", "How do Amy and Jamie go to the boat in the end?",     "By helicopter", ["By bus", "By canoe", "By train"], "Al final van en helicóptero."),
  R("st-faster",     "🚁", "Story · The lighthouse!", "Which is faster in the story?",                        "The helicopter", ["The boat", "The bus"], "El bote es lento, pero el helicóptero es muy rápido."),

  // Adivina qué transporte es
  R("g-moto",   "🏍️", "Guess the transport", "It is land transport. It has two wheels and an engine. It can carry two people.", "motorcycle", ["ship", "helicopter", "canoe"], "Es la motocicleta."),
  R("g-plane",  "✈️", "Guess the transport", "It is air transport. It is big and fast. It has an engine and wings.",            "plane",      ["ship", "truck", "canoe"], "Es el avión."),
  R("g-ship",   "🚢", "Guess the transport", "It is water transport. It is very big. It has an engine. It carries many people or products.", "ship", ["canoe", "raft", "helicopter"], "Es el barco."),
  R("g-scooter","🛴", "Guess the transport", "It's small, new and light blue. What is it?",                                     "scooter",    ["bus", "plane", "train"], "Es el scooter."),
  R("g-subway", "🚇", "Guess the transport", "It goes under the city. It is an underground train. What is it?",                  "subway",     ["plane", "boat", "scooter"], "Es el metro."),

  // Tabla rueda / motor / alas
  R("tb-wings",  "🛩️", "Wheels · Engine · Wings", "Which one has wings and an engine?",                          "sea plane", ["canoe", "truck", "scooter"], "El hidroavión tiene alas y motor."),
  R("tb-none",   "🛶", "Wheels · Engine · Wings", "Which one has no wheels, no engine and no wings?",            "canoe",     ["sea plane", "truck", "scooter"], "La canoa no tiene ruedas, motor ni alas."),
  R("tb-scooter","🛴", "Wheels · Engine · Wings", "Which one has wheels but no engine and no wings?",           "scooter",   ["truck", "submarine", "sea plane"], "El scooter tiene ruedas, pero no motor ni alas."),
  R("tb-sub",    "🌊", "Wheels · Engine · Wings", "Which one has an engine but no wheels and no wings?",        "submarine", ["scooter", "truck", "canoe"], "El submarino tiene motor, pero no ruedas ni alas."),
  R("tb-truck",  "🚚", "Wheels · Engine · Wings", "Which one has wheels and an engine, but no wings?",          "truck",     ["sea plane", "canoe", "scooter"], "El camión tiene ruedas y motor, pero no alas."),

  // Think Green
  R("gr-bike",   "🌱", "Think Green", "Which one is a green means of transport?",                  "bike",  ["rocket", "truck", "plane"], "La bicicleta es un transporte verde."),
  R("gr-walk",   "🚶", "Think Green · True or False", "Walking is a green means of transport.",     "True",  ["False"], "Caminar es un transporte verde.", true),
  R("gr-carpool","🚘", "Think Green · True or False", "Carpooling is a green means of transport.",  "True",  ["False"], "Compartir el auto es un transporte verde.", true),
  R("gr-solar",  "☀️", "Think Green · True or False", "A solar car has a solar panel.",              "True",  ["False"], "Un auto solar tiene un panel solar.", true),
  R("gr-wings",  "☀️", "Think Green · True or False", "A solar car has wings.",                     "False", ["True"], "El auto solar no tiene alas.", true),
  R("gr-engine", "☀️", "Think Green · True or False", "A solar car doesn't have an engine.",        "False", ["True"], "El auto solar tiene un motor especial.", true),

  // Guía Lesson 1 · texto de Steven
  R("sv-author",   "✉️", "Steven's text", "Who is the author of the message?",                    "Steven",  ["Lola", "Katie", "Matt"], "El autor del mensaje es Steven."),
  R("sv-topic",    "🚲", "Steven's text", "What is Steven going to talk about in the text?",      "Means of transport", ["His favorite food", "His hobbies"], "Steven habla de los medios de transporte."),
  R("sv-most",     "🚲", "Steven's text", "What means of transport does Steven like the most?",   "The bike", ["The bus", "The car"], "A Steven le gusta más la bicicleta."),
  R("sv-least",    "🚌", "Steven's text", "What means of transport does Steven like the least?",  "The bus",  ["The bike", "The car"], "A Steven le gusta menos el bus."),
  R("sv-why-bike", "🚲", "Steven's text", "Why does Steven like his bike?",                       "It's small and fast", ["It's comfortable and quiet", "It's big and slow"], "Le gusta porque es pequeña y rápida."),
  R("sv-adv",      "💨", "Steven's text", "What is one of the advantages of riding a bike mentioned in the text?", "You can feel the wind on your face", ["You need a parking space", "It can be used in any weather"], "Ventaja: sientes el viento en la cara (y no necesitas estacionamiento)."),
  R("sv-helmet",   "⛑️", "Steven's text", "What must Steven do when riding a bike?",              "Wear a helmet", ["Wait for the bus", "Share his bike with others"], "Debe usar casco."),
  R("sv-bus-1",    "🔊", "Steven's text", "What does Steven dislike about the bus?",              "It is very noisy", ["It is fast", "It is always on time"], "No le gusta que el bus es muy ruidoso."),
  R("sv-bus-2",    "🚌", "Steven's text", "What other thing does Steven dislike about the bus?",  "There are many people", ["It's very expensive", "It's always empty"], "Tampoco le gusta que hay mucha gente."),
  R("sv-bus-dis",  "🐢", "Steven's text", "What is one disadvantage of the bus?",                 "It is too slow", ["The bus timetable changes a lot", "It is the only means of transport available"], "Desventaja: es demasiado lento."),

  // Guía Lesson 2 · texto de Lola
  R("lo-idea",     "💡", "Lola's text", "What is Lola's great idea?",                             "A new means of transport that is good for our planet", ["A new school bus", "A new video game"], "Su idea es un nuevo medio de transporte bueno para el planeta."),
  R("lo-type",     "🚗", "Lola's text", "What type of transport is Lola's dream vehicle?",        "Land transport", ["Air transport", "Water transport"], "Es transporte terrestre."),
  R("lo-help",     "🌍", "Lola's text · True or False", "This vehicle helps the environment.",     "True",  ["False"], "Sí, ayuda al medio ambiente.", true),
  R("lo-a",        "🚗", "Lola's text · True or False", "Lola's dream vehicle is not fast, but it is safe.", "False", ["True"], "Es rápido y seguro.", true),
  R("lo-b",        "🔧", "Lola's text · True or False", "The vehicle has two strong engines.",     "False", ["True"], "Tiene un motor fuerte (uno).", true),
  R("lo-c",        "🌳", "Lola's text · True or False", "The vehicle does not contaminate the environment.", "True", ["False"], "No contamina.", true),
  R("lo-d",        "⛽", "Lola's text · True or False", "The vehicle uses gasoline for energy.",   "False", ["True"], "Usa energía solar, no bencina.", true),
  R("lo-e",        "☀️", "Lola's text · True or False", "Solar panels are used in the vehicle.",   "True",  ["False"], "Usa paneles solares.", true),
  R("lo-f",        "🛞", "Lola's text · True or False", "The vehicle has four small wheels.",      "False", ["True"], "Tiene cuatro ruedas, y es un vehículo grande.", true),
  R("lo-g",        "🚗", "Lola's text · True or False", "Lola's vehicle is fast, big, and safe.",  "True",  ["False"], "Es rápido, grande y seguro.", true),
  R("lo-h",        "🌍", "Lola's text · True or False", "The vehicle has a negative effect on the planet.", "False", ["True"], "No tiene efecto negativo: ayuda al planeta.", true),
];

// Pistas de sonido /ai/ (diphthong)
LECTURA5.push(
  R("ph-ai", "🔊", "Sound /ai/", "Which word has the same sound as 'train'?", "sailboat", ["bus", "bike", "scooter"], "Train y sailboat tienen el sonido /ai/ (ai).")
);

// ── Construcción de preguntas ───────────────────────────────────────────────
export const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

// ── Fotos de las tarjetas (Flashcards Unit 5) — archivos en /public/unit5 ───
export const FOTOS = {
  boat: "/unit5/boat.jpg", buses: "/unit5/buses.jpg", car: "/unit5/car.jpg", plane: "/unit5/plane.jpg",
  subway: "/unit5/subway.jpg", oldcar: "/unit5/oldcar.jpg", hsr: "/unit5/hsr.jpg", truck: "/unit5/truck.jpg",
  train: "/unit5/train.jpg", sailboat: "/unit5/sailboat.jpg",
};
// Palabra de vocabulario → foto
const FOTO_DE = { boat: "boat", bus: "buses", car: "car", plane: "plane", subway: "subway", train: "train", truck: "truck", sailboat: "sailboat", "high-speed train": "hsr" };

// foto: id de FOTOS · desc: qué se ve (para el Reporte) · tipo: "id" = "What is it?"
const Q = (id, foto, desc, texto, correcta, incorrectas, es, tipo = "mc") => ({ id, foto, desc, texto, correcta, incorrectas, es, tipo });

export const FOTOQ5 = [
  // Lesson 1
  Q("boat-float",  "boat", "bote rojo", "Does it float?",  "Yes, it does.", ["No, it doesn't.", "Yes, it is.", "No, it isn't."], "¿Flota? Sí."),
  Q("boat-is",     "boat", "bote rojo", "Is it a boat?",   "Yes, it is.",   ["No, it isn't.", "Yes, it does.", "No, it doesn't."], "¿Es un bote? Sí."),
  Q("buses-many",  "buses", "4 buses azules", "How many buses are there?", "There are four buses.", ["There are two buses.", "There are three buses.", "There are five buses."], "¿Cuántos buses hay? Hay cuatro."),
  Q("buses-color", "buses", "4 buses azules", "They are big, black and ___.", "blue", ["red", "white", "green"], "Son grandes, negros y azules."),
  Q("car-wheels",  "car", "auto rojo pequeño", "It's small, it's red, and it has ___ wheels.", "four", ["two", "three", "six"], "Es pequeño, rojo y tiene cuatro ruedas."),
  Q("car-is",      "car", "auto rojo pequeño", "Is it a car?", "Yes, it is.", ["No, it isn't.", "Yes, it does.", "No, it doesn't."], "¿Es un auto? Sí."),
  Q("plane-wings", "plane", "avión", "It's big, it's fast, and it has two ___.", "wings", ["wheels", "wipers", "helmets"], "Es grande, rápido y tiene dos alas."),
  Q("plane-is",    "plane", "avión", "Is it a plane?", "Yes, it is.", ["No, it isn't.", "Yes, it does.", "No, it doesn't."], "¿Es un avión? Sí."),
  Q("subway-is",   "subway", "metro", "It's big, it's long, and it's fast. Is it the ___?", "subway", ["boat", "truck", "sailboat"], "Es grande, largo y rápido: el metro."),
  // Lesson 2
  Q("oldcar-go",   "oldcar", "auto antiguo blanco y rojo", "How do you move around? I go by ___.", "car", ["plane", "boat", "bike"], "¿Cómo te mueves? Voy en auto."),
  Q("oldcar-color","oldcar", "auto antiguo blanco y rojo", "It's old, it's white and ___.", "red", ["blue", "black", "green"], "Es viejo, blanco y rojo."),
  Q("hsr-is",      "hsr", "tren rápido", "Look at that! It's long, and it's really fast. It's a ___ train.", "high-speed", ["slow", "small", "old"], "¡Mira! Es largo y muy rápido: un tren de alta velocidad."),
  Q("truck-is",    "truck", "camión", "What's that noise? It's a big ___.", "truck", ["boat", "plane", "bike"], "¿Qué es ese ruido? Es un camión grande."),
  Q("truck-color", "truck", "camión", "It's black and ___.", "white", ["red", "blue", "green"], "Es negro y blanco."),
  Q("train-small", "train", "tren sobre un puente", "Is this train small?", "No, it isn't.", ["Yes, it is.", "No, it doesn't.", "Yes, it does."], "¿Es pequeño este tren? No."),
  Q("train-slow",  "train", "tren sobre un puente", "Is this train slow?", "Yes, it is.", ["No, it isn't.", "Yes, it does.", "No, it doesn't."], "¿Es lento este tren? Sí."),
  Q("sail-water",  "sailboat", "velero", "Is it water transport?", "Yes, it is.", ["No, it isn't.", "Yes, it does.", "No, it doesn't."], "¿Es transporte acuático? Sí."),
  Q("sail-what",   "sailboat", "velero", "It's big, it's new and it's water transport. It's a ___!", "sailboat", ["plane", "truck", "subway"], "Es un velero."),
  // "What is it?" con foto
  ...[["boat", "boat", "bote rojo"], ["buses", "bus", "buses"], ["car", "car", "auto rojo pequeño"], ["plane", "plane", "avión"],
      ["subway", "subway", "metro"], ["oldcar", "car", "auto antiguo"], ["hsr", "high-speed train", "tren rápido"],
      ["truck", "truck", "camión"], ["train", "train", "tren sobre un puente"], ["sailboat", "sailboat", "velero"]]
    .map(([f, nombre, desc]) => Q(f + "-what", f, desc, "What is it?", nombre, [], "Es: " + nombre, "id")),
];

// Opciones para "What is it?": nunca se mezclan nombres que se parecen (train/subway/high-speed train, boat/sailboat)
const NOMBRES_FOTO = ["boat", "sailboat", "bus", "car", "plane", "subway", "train", "high-speed train", "truck", "scooter", "bike", "helicopter"];
const PARECIDOS = [["train", "subway", "high-speed train"], ["boat", "sailboat"]];
const distractoresFoto = (nombre) => {
  const grupo = PARECIDOS.find(g => g.includes(nombre)) || [nombre];
  return barajar(NOMBRES_FOTO.filter(n => !grupo.includes(n))).slice(0, 3);
};


export const ACT_VOCAB = "ingles.unit5";
export const ACT_ORAC = "ingles.unit5oraciones";
export const ACT_LECT = "ingles.unit5lectura";
export const ACT_ENSAYO = "ingles.unit5ensayo";
export const ACT_FOTOS = "ingles.unit5fotos";

const itemVocab = (en) => VOCAB5.find(v => v.en === en);
const frase = (id) => FRASES5.find(f => f.id === id);
const lectura = (id) => LECTURA5.find(l => l.id === id);
const fotoq = (id) => FOTOQ5.find(f => f.id === id);

export const rellenar = (texto, resp) => texto.split("|").join(" ").replace("___", resp);

export const preguntaVocab = (v, direccion = "en-es") => {
  const dir = direccion === "mezclado" ? (Math.random() < 0.5 ? "en-es" : "es-en") : direccion;
  const campo = dir === "en-es" ? "es" : "en";
  const vistos = new Set([v[campo].toLowerCase()]);
  const distractores = [];
  barajar(VOCAB5.filter(x => x.cat === v.cat && x.en !== v.en)).forEach(x => {
    const k = x[campo].toLowerCase();
    if (!vistos.has(k) && distractores.length < 3) { vistos.add(k); distractores.push(x[campo]); }
  });
  const num = v.cat === "numeros";
  return {
    key: "t:" + v.en, act: ACT_VOCAB, tipo: "vocab",
    emoji: v.emoji || "", foto: FOTOS[FOTO_DE[v.en]] || "", caption: "",
    lineas: [dir === "en-es" ? v.en : v.es],
    grande: true, habla: v.en, hablaAlElegir: false,
    consigna: dir === "en-es" ? (num ? "¿Qué número es?" : "¿Qué significa en español?") : (num ? "¿Cómo se dice en inglés?" : "¿Cómo se dice en inglés?"),
    opciones: barajar([v[campo], ...distractores]), correcta: v[campo],
    etiqueta: `${v.en} = ${v.es}`, explicacion: `${v.en} = ${v.es}`,
  };
};

export const preguntaFrase = (f) => ({
  key: "s:" + f.id, act: ACT_ORAC, tipo: "frase",
  emoji: f.emoji, caption: "Complete the sentence",
  lineas: f.texto.split("|"), habla: rellenar(f.texto, f.correcta).replace(/\s*\([^)]*\)/g, ""), hablaAlElegir: true,
  consigna: "Completa la oración",
  opciones: barajar([f.correcta, ...f.incorrectas]), correcta: f.correcta,
  etiqueta: rellenar(f.texto, f.correcta), explicacion: f.es,
});

export const preguntaLectura = (l) => ({
  key: "r:" + l.id, act: ACT_LECT, tipo: "lectura",
  emoji: l.emoji, caption: l.caption,
  lineas: [l.texto], habla: l.texto.replace("___", "").trim(), hablaAlElegir: false,
  consigna: l.vf ? "¿Verdadero o falso?" : (l.texto.includes("___") ? "Completa la oración" : "Elige la respuesta correcta"),
  opciones: l.vf ? ["True", "False"] : barajar([l.correcta, ...l.incorrectas]), fijo: l.vf, correcta: l.correcta,
  etiqueta: l.texto + " → " + l.correcta, explicacion: l.es,
});

export const preguntaFoto = (f) => {
  const id = f.tipo === "id";
  return {
    key: "f:" + f.id, act: ACT_FOTOS, tipo: "foto",
    emoji: "", foto: FOTOS[f.foto], caption: id ? "Look and answer" : "Look and answer",
    lineas: [f.texto], habla: f.texto.replace("___", f.correcta), hablaAlElegir: false,
    consigna: id ? "¿Qué medio de transporte es?" : (f.texto.includes("___") ? "Completa la oración" : "Elige la respuesta correcta"),
    opciones: barajar([f.correcta, ...(id ? distractoresFoto(f.correcta) : f.incorrectas)]), correcta: f.correcta,
    etiqueta: `📷 ${f.desc}: ${f.texto} → ${f.correcta}`, explicacion: f.es,
  };
};

// Pregunta a partir de una clave guardada (para "Reforzar mis errores")
export const preguntaDeClave = (key) => {
  if (key.startsWith("t:")) { const v = itemVocab(key.slice(2)); return v ? preguntaVocab(v, "mezclado") : null; }
  if (key.startsWith("s:")) { const f = frase(key.slice(2)); return f ? preguntaFrase(f) : null; }
  if (key.startsWith("r:")) { const l = lectura(key.slice(2)); return l ? preguntaLectura(l) : null; }
  if (key.startsWith("f:")) { const f = fotoq(key.slice(2)); return f ? preguntaFoto(f) : null; }
  return null;
};

export const clavesValidas5 = new Set([
  ...VOCAB5.map(v => "t:" + v.en),
  ...FRASES5.map(f => "s:" + f.id),
  ...LECTURA5.map(l => "r:" + l.id),
  ...FOTOQ5.map(f => "f:" + f.id),
]);

// Respuesta correcta legible (Reporte)
export const respuestaCorrecta5 = (key) => {
  if (key.startsWith("t:")) { const v = itemVocab(key.slice(2)); return v ? `${v.en} = ${v.es}` : null; }
  if (key.startsWith("s:")) { const f = frase(key.slice(2)); return f ? rellenar(f.texto, f.correcta) : null; }
  if (key.startsWith("r:")) { const l = lectura(key.slice(2)); return l ? l.correcta : null; }
  if (key.startsWith("f:")) { const f = fotoq(key.slice(2)); return f ? `${f.texto.replace("___", f.correcta)}${f.texto.includes("___") ? "" : " → " + f.correcta}` : null; }
  return null;
};

export const crearVocab = (cat, direccion, total = 10) => {
  const pool = cat === "todo" ? VOCAB5 : VOCAB5.filter(v => v.cat === cat);
  return barajar(pool).slice(0, total).map(v => preguntaVocab(v, direccion));
};
export const crearFrases = (total = 10) => barajar(FRASES5).slice(0, total).map(preguntaFrase);
export const crearFotos = (total = 10) => barajar(FOTOQ5).slice(0, total).map(preguntaFoto);
export const crearLectura = (total = 10) => barajar(LECTURA5).slice(0, total).map(preguntaLectura);
export const crearEnsayo = () => barajar([
  ...barajar(VOCAB5).slice(0, 5).map(v => preguntaVocab(v, "mezclado")),
  ...barajar(FRASES5).slice(0, 5).map(preguntaFrase),
  ...barajar(LECTURA5).slice(0, 4).map(preguntaLectura),
  ...barajar(FOTOQ5).slice(0, 4).map(preguntaFoto),
]).map(q => ({ ...q, act: ACT_ENSAYO }));
export const crearDeClaves = (keys, total = 10) => barajar(keys).slice(0, total).map(preguntaDeClave).filter(Boolean);
