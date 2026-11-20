// Ciencias Naturales · Las Plantas (3° Básico)
// Basado en las guías de clases: "Las Plantas: sus Partes y Funciones", "La Magia de la Fotosíntesis",
// "¿De dónde vienen las plantas nuevas?" (polinización, dispersión, germinación), guías del ciclo de vida
// de una planta y el cuaderno. Temas de la prueba: polinización, dispersión, estructuras y funciones de los
// órganos de la planta, ciclo de vida, germinación, usos de las plantas y plantas nativas de Chile.
// Cada pregunta tiene una clave estable "c:<modo>:<id>" para guardar el historial por alumno
// y poder rearmarla en "Reforzar mis errores".

// grupo = sección del menú de Ciencias
export const GRUPOS = [
  { id: "estructura", label: "🌱 Estructura y función de la planta" },
  { id: "nueva", label: "🐝 Cómo nace una planta nueva" },
  { id: "tipos", label: "🇨🇱 Tipos, usos y plantas de Chile" },
  { id: "prueba", label: "📝 Prepárate para la prueba" },
];

export const MODOS = [
  { id: "partes", grupo: "estructura", label: "Partes de la planta", emoji: "🌸", color: "#ec4899",
    desc: "Rotula la planta: ¿qué parte es cada número?",
    recuerda: "Las partes de la planta son la raíz, el tallo, las hojas, la flor y el fruto. En el dibujo de la guía: 1 flor, 2 fruto, 3 hoja, 4 tallo y 5 raíz." },
  { id: "funciones", grupo: "estructura", label: "¿Qué función cumple cada parte?", emoji: "🔧", color: "#8b5cf6",
    desc: "Raíz, tallo, hojas, flor y fruto: para qué sirve cada uno",
    recuerda: "La raíz sostiene la planta y absorbe agua y sales minerales gracias a sus pelos absorbentes. El tallo conduce el agua y los minerales hasta las hojas, sostiene la planta y lleva el alimento a todas sus partes. Las hojas fabrican el alimento. La flor contiene las partes reproductivas y de ella se forma el fruto. El fruto contiene y protege las semillas." },
  { id: "necesidades", grupo: "estructura", label: "Lo que necesitan las plantas", emoji: "💧", color: "#0ea5e9",
    desc: "Agua, luz y aire · ¿por qué son importantes las plantas?",
    recuerda: "Las plantas son seres vivos. Para vivir y crecer necesitan agua, luz y aire. Si no reciben agua, se secan. Nos entregan alimento, oxígeno para respirar y algunas se usan como medicina." },
  { id: "fotosintesis", grupo: "estructura", label: "La fábrica verde: fotosíntesis", emoji: "☀️", color: "#f59e0b",
    desc: "Qué entra, qué sale y cómo fabrica su alimento",
    recuerda: "Las plantas son seres autótrofos: fabrican su propio alimento mediante la fotosíntesis. Necesitan luz solar, agua y dióxido de carbono (entran) y producen glucosa, su alimento, y liberan oxígeno (salen). El dióxido de carbono entra por los estomas, unos poros diminutos de las hojas." },
  { id: "orden", grupo: "estructura", label: "Ordena la fotosíntesis", emoji: "🔢", color: "#10b981",
    desc: "Pon los pasos del proceso en el orden correcto",
    recuerda: "1. La planta absorbe agua y sales minerales por las raíces. 2. Toma dióxido de carbono del aire. 3. La luz del sol le da energía. 4. Fabrica su alimento (azúcares). 5. Libera oxígeno al aire." },

  { id: "flor", grupo: "nueva", label: "La flor y sus partes", emoji: "🌼", color: "#f472b6",
    desc: "Pétalo, estambre y pistilo: qué hace cada uno",
    recuerda: "La flor tiene tres partes: los pétalos (tienen colores y llaman a los insectos), el estambre (es la parte masculina y tiene el polen, un polvito amarillo) y el pistilo (es la parte femenina; ahí nace la semilla). En la flor están el polen y el óvulo." },
  { id: "polinizacion", grupo: "nueva", label: "Polinización", emoji: "🐝", color: "#eab308",
    desc: "El polen viaja de una flor a otra: ¿quién lo lleva y para qué?",
    recuerda: "Polinizar es llevar el polen de una flor a otra flor. Lo transportan las abejas, las mariposas, los colibríes (aves), otros insectos y el viento. Cuando el polen llega al pistilo se forma una semilla y la flor se convierte en fruto. Las semillas están dentro del fruto." },
  { id: "ordenpolin", grupo: "nueva", label: "Ordena la polinización", emoji: "🔢", color: "#ca8a04",
    desc: "Pon la historia de la abeja y el polen en orden",
    recuerda: "1. La abeja llega a la flor. 2. El polen se pega a su cuerpo. 3. La abeja va a otra flor. 4. El polen llega al pistilo y nace una semilla." },
  { id: "dispersion", grupo: "nueva", label: "Dispersión de las semillas", emoji: "🌬️", color: "#06b6d4",
    desc: "Las semillas viajan lejos: con el viento, el agua o los animales",
    recuerda: "Dispersar es llevar las semillas lejos de la planta madre, para tener espacio, luz y agua. Las semillas viajan con el viento (livianas, con pelitos o alas, como el diente de león), con el agua (flotan, como el coco) y con los animales (se las comen, como la mora, o se pegan al pelo, como el abrojo)." },
  { id: "germinacion", grupo: "nueva", label: "Germinación", emoji: "🌰", color: "#84cc16",
    desc: "Cuando una semilla empieza a crecer",
    recuerda: "Germinar es cuando una semilla empieza a crecer. Para germinar necesita agua, aire y calor (temperatura adecuada). Primero sale la raíz y después el tallo con hojas: nace la plántula, o planta joven." },
  { id: "ciclo", grupo: "nueva", label: "Ciclo de vida de una planta", emoji: "🔄", color: "#22c55e",
    desc: "Semilla, germinación, plántula, crecimiento, floración y fruto",
    recuerda: "Una planta comienza su vida como una semilla. Con agua, aire y temperatura apropiada germina (la planta nace). Luego es una plántula (planta joven), crece hasta ser una planta adulta, florece (reproducción) y después de la polinización se forma el fruto con semillas, que pueden dar origen a nuevas plantas." },
  { id: "ordenciclo", grupo: "nueva", label: "Ordena el ciclo de vida", emoji: "🔢", color: "#16a34a",
    desc: "Las 6 etapas del ciclo de vida, en orden",
    recuerda: "1. Semilla. 2. Germinación (la planta nace). 3. Plántula (planta joven). 4. Crecimiento (planta adulta). 5. Floración (reproducción). 6. Fruto." },
  { id: "ordenviaje", grupo: "nueva", label: "De la flor a una planta nueva", emoji: "🔢", color: "#0d9488",
    desc: "Flor, polinización, semilla y fruto, dispersión, germinación",
    recuerda: "Flor → Polinización → Semilla y fruto → Dispersión → Germinación → Planta nueva. Y la planta nueva tendrá flores, y todo empieza otra vez." },

  { id: "tipos", grupo: "tipos", label: "Tipos de plantas", emoji: "🌲", color: "#14b8a6",
    desc: "Sin semilla, con semillas desnudas, con flor y fruto",
    recuerda: "Según sus semillas hay tres tipos: plantas SIN semilla (S): musgo y helecho. Plantas con semillas DESNUDAS (D): pino y araucaria, no tienen flor ni fruto. Plantas con FLOR y FRUTO (F): naranjo, manzano y tomate. El helecho no tiene flores, frutos ni semillas." },
  { id: "usos", grupo: "tipos", label: "Usos de las plantas", emoji: "🧺", color: "#f97316",
    desc: "Alimenticio, medicinal, ornamental e industrial",
    recuerda: "Las plantas tienen distintos usos. Alimenticio: nos sirven de alimento (lechuga, zanahoria, manzana). Medicinal: se usan como remedio (manzanilla, boldo). Ornamental: adornan jardines y casas (rosa, clavel). Industrial: se transforman en productos (madera y papel del pino, telas de algodón)." },
  { id: "nativas", grupo: "tipos", label: "Plantas nativas de Chile", emoji: "🇨🇱", color: "#dc2626",
    desc: "Las que crecen de forma natural en nuestro país",
    recuerda: "Una planta nativa es la que crece de forma natural en un lugar, sin que la hayan traído las personas. Plantas nativas de Chile: araucaria, copihue (la flor nacional), boldo, quillay, canelo, palma chilena y maqui. El pino, el eucalipto, el naranjo y el manzano vinieron de otros lugares (son introducidos)." },

  { id: "ensayo", grupo: "prueba", label: "Ensayo de la prueba", emoji: "📝", color: "#ef4444",
    desc: "20 preguntas de toda la materia de Plantas",
    recuerda: "Practica todo lo que se evaluará: polinización, dispersión, estructuras y funciones de los órganos de la planta, ciclo de vida, germinación, usos de las plantas y plantas nativas de Chile. ¡Tú puedes!" },
];

// ── Datos base ─────────────────────────────────────────────────────────
// n = número que lleva cada parte en el dibujo de la guía (Actividad 3)
export const PARTES = [
  { n: 1, id: "flor",  nombre: "Flor",  art: "La flor",   corta: "contiene las partes reproductivas de la planta" },
  { n: 2, id: "fruto", nombre: "Fruto", art: "El fruto",  corta: "contiene y protege las semillas" },
  { n: 3, id: "hoja",  nombre: "Hoja",  art: "La hoja",   corta: "fabrica el alimento de la planta" },
  { n: 4, id: "tallo", nombre: "Tallo", art: "El tallo",  corta: "conduce el agua y los minerales y sostiene la planta" },
  { n: 5, id: "raiz",  nombre: "Raíz",  art: "La raíz",   corta: "sostiene la planta y absorbe agua y minerales del suelo" },
];

export const PASOS = [
  "La planta absorbe agua y sales minerales por las raíces.",
  "La planta toma dióxido de carbono del aire.",
  "La luz del sol le da energía.",
  "La planta fabrica su alimento (azúcares).",
  "La planta libera oxígeno al aire.",
];

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

// Pregunta de alternativas con distractores fijos
const mc = (modo, id, enunciado, correcta, malas, explicacion, extra = {}) => ({
  key: `c:${modo}:${id}`, modo, etiqueta: extra.etiqueta || enunciado, enunciado, sub: extra.sub || null,
  visual: extra.visual || null, correcta, malas, explicacion: explicacion || `Respuesta: ${correcta}.`, solucion: extra.solucion || correcta,
});

// ── Banco de preguntas fijas ───────────────────────────────────────────
const FIJAS = [
  // Funciones (Actividad 4 y 5 de la guía + apuntes del cuaderno)
  mc("funciones", "raiz", "¿Cuál es la función principal de la raíz?", "Sostener la planta y absorber agua y minerales",
    ["Fabricar el alimento de la planta", "Contener las semillas", "Producir flores"],
    "La raíz crece bajo la tierra: sostiene la planta y absorbe agua y minerales del suelo."),
  mc("funciones", "tallo_conduce", "¿Qué parte de la planta conduce el agua desde la raíz hasta las hojas?", "El tallo",
    ["La flor", "El fruto", "La raíz"],
    "El tallo conduce el agua y los minerales desde la raíz hasta las hojas."),
  mc("funciones", "hojas_alimento", "¿Qué parte de la planta fabrica su alimento usando la luz del sol?", "Las hojas",
    ["El tallo", "La raíz", "El fruto"],
    "Las hojas fabrican el alimento usando la luz del sol, el agua y el aire."),
  mc("funciones", "fruto_semillas", "¿Qué parte de la planta contiene y protege las semillas?", "El fruto",
    ["La hoja", "El tallo", "La raíz"],
    "El fruto contiene y protege las semillas, que darán origen a nuevas plantas."),
  mc("funciones", "tallo_funcion", "¿Cuál es la función del tallo?", "Conducir agua y minerales y sostener la planta",
    ["Absorber el agua del suelo", "Fabricar el alimento de la planta", "Contener las semillas"],
    "El tallo conduce el agua y los minerales, y sostiene las ramas, hojas, flores y frutos."),
  mc("funciones", "flor_repro", "¿Qué parte de la planta contiene las partes reproductivas?", "La flor",
    ["La raíz", "El tallo", "Las hojas"],
    "La flor contiene las partes reproductivas de la planta."),
  mc("funciones", "fruto_origen", "¿De qué parte de la planta se forma el fruto?", "De la flor",
    ["De la raíz", "Del tallo", "De la hoja"],
    "A partir de la flor se forma el fruto."),
  mc("funciones", "semillas_origen", "Las semillas que protege el fruto darán origen a…", "Nuevas plantas",
    ["Más agua para la planta", "Aire para respirar", "Tierra nueva"],
    "Las semillas darán origen a nuevas plantas."),
  mc("funciones", "hojas_usan", "Las hojas fabrican el alimento de la planta usando…", "La luz del sol, el agua y el aire",
    ["Solo tierra", "Solo agua", "La luz de la luna"],
    "Para fabricar su alimento las hojas usan la luz del sol, el agua y el aire."),
  mc("funciones", "tallo_sostiene", "¿Qué parte sostiene las ramas, las hojas, las flores y los frutos?", "El tallo",
    ["La raíz", "El fruto", "La flor"],
    "El tallo mantiene erguidas las hojas, las flores y los frutos."),
  mc("funciones", "soy_raiz", "Absorbo del suelo el agua y las sales minerales. ¿Qué parte soy?", "La raíz",
    ["El tallo", "La hoja", "La flor"],
    "La raíz absorbe el agua y las sales minerales que la planta necesita para vivir.", { etiqueta: "Absorbe agua y sales minerales del suelo → ¿qué parte es?" }),
  mc("funciones", "soy_flor", "Sirvo para la reproducción de la planta. ¿Qué parte soy?", "La flor",
    ["La raíz", "El tallo", "La hoja"],
    "La flor sirve para la reproducción; de ella pueden formarse los frutos y las semillas.", { etiqueta: "Sirve para la reproducción → ¿qué parte es?" }),
  mc("funciones", "soy_hoja", "Elaboro el alimento de la planta con luz, agua y aire. ¿Qué parte soy?", "La hoja",
    ["La raíz", "El fruto", "El tallo"],
    "La hoja elabora el alimento de la planta y también intercambia gases con el entorno.", { etiqueta: "Elabora el alimento de la planta → ¿qué parte es?" }),
  mc("funciones", "soy_fruto", "Contengo y protejo las semillas. ¿Qué parte soy?", "El fruto",
    ["La hoja", "La raíz", "El tallo"],
    "El fruto contiene y protege las semillas.", { etiqueta: "Contiene y protege las semillas → ¿qué parte es?" }),

  // Necesidades e importancia (Actividad 1 y 5)
  mc("necesidades", "necesita", "¿Qué necesita una planta para poder vivir y crecer?", "Agua, luz y aire",
    ["Solo tierra", "Solo agua", "Solo luz"],
    "Para vivir y crecer, una planta necesita agua, luz y aire."),
  mc("necesidades", "importantes", "¿Por qué son importantes las plantas?", "Nos entregan alimento y oxígeno para respirar",
    ["Solo sirven para adornar las casas", "No son seres vivos", "Solo dan sombra"],
    "Las plantas nos entregan alimento y oxígeno para respirar, y algunas se usan como medicina."),
  mc("necesidades", "seres", "Las plantas son seres…", "Vivos",
    ["Sin vida", "Que no crecen", "Que no necesitan agua"],
    "Las plantas son seres vivos: crecen, se reproducen y necesitan agua, luz y aire.", { etiqueta: "Las plantas son seres… (vivos)" }),
  mc("necesidades", "oxigeno", "¿Qué gas entregan las plantas para que podamos respirar?", "Oxígeno",
    ["Dióxido de carbono", "Humo", "Helio"],
    "Las plantas entregan oxígeno, el gas que necesitamos para respirar."),
  mc("necesidades", "medicina", "Además de alimento y oxígeno, algunas plantas se usan como…", "Medicina",
    ["Metal", "Plástico", "Vidrio"],
    "Algunas plantas se usan incluso como medicina."),
  mc("necesidades", "funcion_partes", "Cada parte de la planta cumple una función que le permite…", "Vivir, crecer y reproducirse",
    ["Caminar, correr y saltar", "Hablar y escuchar", "Dormir y soñar"],
    "Cada parte cumple una función que le permite vivir, crecer y reproducirse."),
  mc("necesidades", "luz_donde", "La luz que necesitan las plantas viene principalmente…", "Del sol",
    ["De la tierra", "De la raíz", "Del viento"],
    "La luz del sol es la energía que usan las plantas para fabricar su alimento."),

  // Fotosíntesis (guía "La Fábrica Verde")
  mc("fotosintesis", "autotrofo", "Las plantas son seres AUTÓTROFOS. ¿Qué significa?", "Fabrican su propio alimento",
    ["Comen a otros seres vivos", "No necesitan alimento", "Se alimentan de otras plantas"],
    "Autótrofo significa que puede fabricar su propio alimento, mediante la fotosíntesis."),
  mc("fotosintesis", "proceso", "¿Cómo se llama el proceso con el que la planta fabrica su alimento?", "Fotosíntesis",
    ["Digestión", "Evaporación", "Congelación"],
    "La fotosíntesis es el proceso con el que las plantas fabrican su alimento."),
  mc("fotosintesis", "estomas", "El dióxido de carbono entra a la hoja por unos poros diminutos llamados…", "Estomas",
    ["Raíces", "Pétalos", "Semillas"],
    "El dióxido de carbono entra a la hoja por unos poros diminutos llamados estomas.",
    { sub: "Completa la oración", etiqueta: "El dióxido de carbono entra a la hoja por unos poros llamados… (estomas)" }),
  mc("fotosintesis", "libera", "Al terminar el proceso, las hojas liberan al aire un gas vital llamado…", "Oxígeno",
    ["Dióxido de carbono", "Nitrógeno", "Estomas"],
    "Al terminar la fotosíntesis, las hojas liberan oxígeno al aire.",
    { sub: "Completa la oración", etiqueta: "Las hojas liberan al aire un gas vital llamado… (oxígeno)" }),
  mc("fotosintesis", "glucosa", "La glucosa que produce la planta es…", "Su alimento (un azúcar)",
    ["Un gas que libera al aire", "Un tipo de agua", "La luz del sol"],
    "La glucosa es el alimento (azúcar) que fabrica la planta."),
  mc("fotosintesis", "agua_por", "La planta absorbe el agua y las sales minerales por…", "Las raíces",
    ["Las hojas", "Las flores", "Los frutos"],
    "El agua y las sales minerales entran a la planta por las raíces."),
  mc("fotosintesis", "co2_de", "La planta toma el dióxido de carbono…", "Del aire",
    ["Del suelo", "De las raíces", "De la flor"],
    "La planta toma el dióxido de carbono del aire."),
  mc("fotosintesis", "luz_hace", "¿Qué hace la luz del sol en la fotosíntesis?", "Le da energía a la planta",
    ["La riega", "Le entrega tierra", "La protege del frío"],
    "La luz del sol le da a la planta la energía para fabricar su alimento."),
  mc("fotosintesis", "cocina", "Las hojas son «la gran cocina» de la planta porque…", "Ahí se fabrica el alimento",
    ["Ahí se absorbe el agua del suelo", "Ahí nacen las semillas", "Ahí se guarda la tierra"],
    "En las hojas se fabrica el alimento de la planta."),

  // ── Más sobre estructuras y funciones (presentación "Estructuras de la planta") ──
  mc("funciones", "pelos", "La raíz absorbe el agua y las sales minerales gracias a sus…", "Pelos absorbentes",
    ["Estomas", "Pétalos", "Frutos"],
    "La raíz absorbe agua y sales minerales gracias a los pelos absorbentes que tiene.",
    { sub: "Completa la oración", etiqueta: "La raíz absorbe agua gracias a sus… (pelos absorbentes)" }),
  mc("funciones", "raiz_crece", "¿Hacia dónde crece generalmente la raíz?", "Hacia abajo, dentro del suelo",
    ["Hacia arriba, hacia el cielo", "Hacia el sol", "Se queda siempre quieta"],
    "Las raíces generalmente crecen hacia abajo, dentro del suelo."),
  mc("funciones", "tallo_crece", "El tallo crece generalmente…", "Hacia arriba, al contrario de la raíz",
    ["Hacia abajo, igual que la raíz", "Solo hacia los lados", "Debajo de la tierra"],
    "El tallo crece generalmente hacia arriba, en sentido contrario a la raíz."),
  mc("funciones", "savia", "El tallo también lleva la savia elaborada, que se fabrica en las hojas, hacia…", "Todas las partes de la planta",
    ["Solo la raíz", "Solo las flores", "Fuera de la planta"],
    "El tallo transporta la savia elaborada desde las hojas hacia todas las partes de la planta."),
  mc("funciones", "hojas_nacen", "Las hojas nacen en…", "El tallo o las ramas",
    ["La raíz", "El fruto", "Las semillas"],
    "Las hojas nacen en el tallo o en las ramas y generalmente son de color verde."),
  mc("funciones", "hoja_color", "¿De qué color son generalmente las hojas?", "Verde",
    ["Azul", "Café", "Morado"],
    "Las hojas generalmente son de color verde."),
  mc("funciones", "haz_enves", "Las dos caras de una hoja se llaman…", "Haz y envés",
    ["Raíz y tallo", "Pétalo y estambre", "Fruto y semilla"],
    "Las dos caras de la hoja son el haz y el envés."),
  mc("funciones", "hoja_poros", "Las hojas tienen unos poros muy pequeños llamados…", "Estomas",
    ["Pelos absorbentes", "Pétalos", "Semillas"],
    "Los estomas son poros diminutos de las hojas: por ahí entra el dióxido de carbono."),
  mc("funciones", "esquema", "Las plantas están formadas por raíz, tallo y hojas. ¿Qué parte absorbe agua y sales minerales del suelo?", "La raíz",
    ["Las hojas", "El tallo", "La flor"],
    "La raíz absorbe el agua y las sales minerales del suelo; las hojas fabrican los nutrientes de la planta.",
    { etiqueta: "Esquema: ¿qué parte absorbe agua y sales minerales del suelo?" }),

  // ── Necesidades: ¿qué pasa si falta agua o luz? (guía de Mateo y plant.pdf) ──
  mc("necesidades", "sin_agua", "¿Qué le puede ocurrir a una planta si no recibe agua?", "Se seca y no puede crecer ni fabricar su alimento",
    ["Crece más rápido", "Se convierte en una flor", "No le pasa nada"],
    "Sin agua la planta se seca: el agua es necesaria para vivir, crecer y fabricar su alimento."),
  mc("necesidades", "macetas", "Mateo plantó 3 semillas iguales. A: con agua y con luz. B: sin agua y con luz. C: con agua y sin luz. ¿En qué maceta crecerá mejor la planta?", "En la A, porque tiene agua y luz",
    ["En la B, porque tiene luz", "En la C, porque tiene agua", "En todas crecerá igual"],
    "La planta crece mejor en la maceta A, que tiene agua y luz. En las otras le falta algo que necesita para desarrollarse.",
    { etiqueta: "Macetas de Mateo: ¿dónde crece mejor la planta? (A: agua y luz)" }),
  mc("necesidades", "macetas_porque", "En las macetas B y C la planta no crecería bien porque…", "Necesita agua y luz para poder desarrollarse",
    ["No necesita nada para crecer", "Solo necesita tierra", "Las macetas son de otro color"],
    "Las plantas necesitan agua y luz para poder desarrollarse; en B falta el agua y en C falta la luz."),

  // ── La flor y sus partes (presentación de polinización y guías) ──
  mc("flor", "tres", "¿Cuáles son las tres partes de la flor que vimos en clases?", "Pétalo, estambre y pistilo",
    ["Raíz, tallo y hoja", "Fruto, semilla y polen", "Pétalo, polen y fruto"],
    "Las tres partes de la flor son el pétalo, el estambre y el pistilo."),
  mc("flor", "petalos", "¿Qué parte de la flor tiene colores y llama a los insectos?", "Los pétalos",
    ["El estambre", "El pistilo", "El tallo"],
    "Los pétalos tienen colores vistosos y llaman a los insectos."),
  mc("flor", "estambre", "¿Qué parte de la flor tiene el polen?", "El estambre",
    ["Los pétalos", "El pistilo", "El fruto"],
    "El estambre tiene el polen, un polvito amarillo."),
  mc("flor", "pistilo", "¿En qué parte de la flor nace la semilla?", "En el pistilo",
    ["En los pétalos", "En el estambre", "En la raíz"],
    "En el pistilo nace la semilla."),
  mc("flor", "polen", "El polen es…", "Un polvito amarillo que está en el estambre",
    ["Una semilla grande", "El agua que absorbe la raíz", "Una hoja pequeña"],
    "El polen es un polvito amarillo que se encuentra en el estambre."),
  mc("flor", "masculina", "La parte masculina de la flor se llama…", "Estambre",
    ["Pistilo", "Pétalo", "Fruto"],
    "El estambre es la parte masculina de la flor: ahí está el polen.",
    { sub: "Completa la oración", etiqueta: "La parte masculina de la flor se llama… (estambre)" }),
  mc("flor", "femenina", "La parte femenina de la flor se llama…", "Pistilo",
    ["Estambre", "Pétalo", "Raíz"],
    "El pistilo es la parte femenina de la flor: ahí nace la semilla.",
    { sub: "Completa la oración", etiqueta: "La parte femenina de la flor se llama… (pistilo)" }),
  mc("flor", "polen_ovulo", "¿Qué parte de la planta contiene el polen y el óvulo?", "La flor",
    ["La raíz", "El fruto", "La hoja"],
    "En la flor se encuentran el polen y el óvulo."),
  mc("flor", "colores", "¿Para qué sirven los colores de los pétalos?", "Para llamar a los insectos",
    ["Para absorber agua", "Para fabricar oxígeno", "Para proteger la raíz"],
    "Los pétalos tienen colores para llamar a los insectos, que ayudan a llevar el polen."),

  // ── Polinización ──
  mc("polinizacion", "que", "¿Qué es polinizar?", "Llevar el polen de una flor a otra flor",
    ["Llevar las semillas lejos de la planta madre", "Hacer que una semilla empiece a crecer", "Absorber agua del suelo"],
    "Polinizar es llevar el polen de una flor a otra flor."),
  mc("polinizacion", "quien", "¿Cuál de estos animales participa en la polinización?", "La abeja",
    ["El perro", "El pez", "El conejo"],
    "La abeja lleva el polen de una flor a otra y así poliniza."),
  mc("polinizacion", "agentes", "¿Quiénes pueden transportar el polen?", "Las abejas, las mariposas, las aves y el viento",
    ["Solo las abejas", "Solo el agua", "Los peces y las piedras"],
    "El polen puede ser transportado por abejas, mariposas, colibríes y otras aves, y también por el viento."),
  mc("polinizacion", "lleva", "¿Qué transporta la abeja de una flor a otra?", "Polen",
    ["Agua", "Tierra", "Semillas"],
    "La abeja transporta el polen de una flor a otra."),
  mc("polinizacion", "desde", "En la polinización el polen viaja desde el estambre hasta el…", "Pistilo",
    ["Pétalo", "Tallo", "Fruto"],
    "El polen llega desde el estambre (parte masculina) hasta el pistilo (parte femenina).",
    { sub: "Completa la oración", etiqueta: "El polen viaja desde el estambre hasta el… (pistilo)" }),
  mc("polinizacion", "se_pega", "Cuando la abeja visita una flor, el polen se pega a…", "Su cuerpo",
    ["Sus alas solamente, y se cae", "El agua", "La raíz de la flor"],
    "El polen se pega al cuerpo de la abeja y ella lo lleva a otra flor."),
  mc("polinizacion", "pistilo_pasa", "Cuando el polen llega al pistilo, se forma…", "Una semilla",
    ["Una raíz", "Un pétalo", "Agua"],
    "Cuando el polen llega al pistilo, se forma una semilla."),
  mc("polinizacion", "flor_fruto", "Después de la polinización, la flor se convierte en…", "Fruto",
    ["Raíz", "Tallo", "Polen"],
    "Después de la polinización la flor se convierte en fruto, y dentro del fruto están las semillas."),
  mc("polinizacion", "importa", "¿Por qué es importante la polinización para las plantas?", "Porque se forman frutos con semillas y comienza un nuevo ciclo",
    ["Porque la planta absorbe más agua", "Porque la planta fabrica más oxígeno", "Porque la raíz crece más rápido"],
    "La polinización permite que se formen frutos con semillas, y de las semillas nacen nuevas plantas."),
  mc("polinizacion", "sin_abejas", "Un jardín se queda sin abejas. ¿Qué pasará con las flores y las semillas?", "Habrá menos polinización y se formarán menos semillas y frutos",
    ["Habrá más frutos y semillas", "Las flores se convertirán en raíces", "No cambiará nada"],
    "Sin abejas el polen no viaja de una flor a otra, así que se forman menos semillas y frutos."),
  mc("polinizacion", "manzanas", "En primavera los manzanos florecieron, pero casi no había abejas. En verano dieron muy pocas manzanas. ¿Qué etapa NO ocurrió bien?", "La polinización",
    ["La germinación", "El crecimiento", "La dispersión"],
    "Faltaron las abejas para llevar el polen de flor en flor: no ocurrió bien la polinización.",
    { etiqueta: "El agricultor y las manzanas: ¿qué etapa no ocurrió bien? (polinización)" }),
  mc("polinizacion", "accion", "¿Qué puede hacer el agricultor para tener más manzanas el próximo año?", "Poner abejas y panales para que puedan polinizar",
    ["Sacarles las flores a los árboles", "Espantar a los insectos del huerto", "Dejar de regar el huerto"],
    "Con abejas y panales en el huerto habrá más polinización, y por eso más manzanas.",
    { etiqueta: "Agricultor: ¿qué hacer para tener más manzanas? (poner abejas)" }),
  mc("polinizacion", "cuidar", "¿Qué puedo hacer para cuidar las plantas y los insectos que las ayudan?", "No pisar las flores, regar una planta o plantar una semilla",
    ["Arrancar todas las flores", "Espantar a las abejas", "Dejar las plantas sin agua"],
    "Podemos cuidar las plantas no pisando las flores, regándolas y plantando semillas."),

  // ── Dispersión de las semillas ──
  mc("dispersion", "que", "¿Qué es dispersar?", "Llevar las semillas lejos de la planta madre",
    ["Llevar el polen de una flor a otra", "Hacer que una semilla empiece a crecer", "Fabricar el alimento de la planta"],
    "Dispersar es llevar las semillas lejos de la planta madre."),
  mc("dispersion", "para", "¿Para qué se dispersan las semillas?", "Para tener espacio, luz y agua",
    ["Para tener más polen", "Para que el fruto sea más grande", "Para que la planta madre crezca más"],
    "Las semillas viajan lejos de la planta madre para tener espacio, luz y agua."),
  mc("dispersion", "agentes", "¿Con qué pueden viajar las semillas?", "Con el viento, el agua y los animales",
    ["Solo con la tierra", "Solo con la luz del sol", "Solo con las raíces"],
    "Las semillas viajan con el viento, con el agua y con los animales."),
  mc("dispersion", "diente", "El diente de león tiene pelitos livianos. ¿Cómo viajan sus semillas?", "Con el viento",
    ["Con el agua", "Con los animales"],
    "Las semillas del diente de león son livianas y el viento las lleva volando.", { etiqueta: "Diente de león (pelitos livianos): ¿cómo viaja? (viento)" }),
  mc("dispersion", "coco", "El coco flota en el agua. ¿Cómo viaja su semilla?", "Con el agua",
    ["Con el viento", "Con los animales"],
    "El coco flota, así que el agua lo lleva lejos.", { etiqueta: "Coco (flota en el agua): ¿cómo viaja? (agua)" }),
  mc("dispersion", "mora", "La mora es un fruto rico para comer. ¿Cómo viajan sus semillas?", "Con los animales",
    ["Con el viento", "Con el agua"],
    "Los animales se comen el fruto y las semillas viajan con ellos.", { etiqueta: "Mora (fruto rico para comer): ¿cómo viaja? (animales)" }),
  mc("dispersion", "abrojo", "El abrojo se pega al pelo de los animales. ¿Cómo viajan sus semillas?", "Con los animales",
    ["Con el viento", "Con el agua"],
    "El abrojo se pega al pelo y los animales lo llevan lejos.", { etiqueta: "Abrojo (se pega al pelo): ¿cómo viaja? (animales)" }),
  mc("dispersion", "alas", "Una semilla con alas es liviana y gira. ¿Cómo viaja?", "Con el viento",
    ["Con el agua", "Con los animales"],
    "Las semillas con alas son livianas y el viento las hace girar y volar.", { etiqueta: "Semilla con alas (liviana y gira): ¿cómo viaja? (viento)" }),
  mc("dispersion", "debajo", "Una semilla cae justo debajo de su planta madre. ¿Qué problema puede tener?", "Tendrá poco espacio, luz y agua",
    ["Tendrá demasiado espacio", "Se convertirá en polen", "Ninguno: es el mejor lugar"],
    "Debajo de la planta madre hay poco espacio, luz y agua; por eso conviene que las semillas viajen lejos.",
    { etiqueta: "Semilla bajo su planta madre: ¿qué problema tiene? (poco espacio, luz y agua)" }),
  mc("dispersion", "viento", "¿Cuál de estas semillas viaja con el viento?", "La que es liviana y tiene pelitos o alas",
    ["La que flota en el agua", "La que se pega al pelo", "La que está dentro de un fruto rico para comer"],
    "Las semillas livianas, con pelitos o alas, son llevadas por el viento."),
  mc("dispersion", "despues", "En el ciclo de vida, después de formarse el fruto con semillas, las semillas…", "Caen o son dispersadas",
    ["Se convierten en flores", "Se transforman en polen", "Se convierten en raíces"],
    "Las semillas caen o son dispersadas, y si encuentran agua, aire y calor, germinan."),

  // ── Germinación ──
  mc("germinacion", "que", "¿Qué es germinar?", "Cuando una semilla empieza a crecer",
    ["Cuando una flor se convierte en fruto", "Cuando el polen llega al pistilo", "Cuando las semillas viajan lejos"],
    "Germinar es cuando una semilla empieza a crecer."),
  mc("germinacion", "necesita", "Para germinar, la semilla necesita…", "Agua, aire y calor",
    ["Solo luz de la luna", "Abejas y polen", "Mucha tierra y nada de agua"],
    "Para germinar la semilla necesita agua, aire y calor (una temperatura adecuada)."),
  mc("germinacion", "primero", "Cuando una semilla germina, ¿qué sale primero?", "La raíz",
    ["El tallo", "La flor", "El fruto"],
    "Primero sale la raíz y después sale el tallo con hojas."),
  mc("germinacion", "despues", "Después de que sale la raíz, sale…", "El tallo con hojas",
    ["El fruto", "La flor", "El polen"],
    "Después de la raíz sale el tallo con hojas."),
  mc("germinacion", "origen", "Cuando una semilla germina, da origen a…", "Una planta nueva",
    ["Polen", "Un fruto", "Una abeja"],
    "De la semilla que germina nace una planta nueva."),
  mc("germinacion", "poroto", "Martina plantó una semilla de poroto. Después de algunos días apareció…", "Una pequeña raíz",
    ["Un fruto", "Una flor", "Una abeja"],
    "Después de algunos días aparece una pequeña raíz y luego el tallo.", { etiqueta: "Martina y el poroto: después de algunos días apareció… (una raíz)" }),
  mc("germinacion", "sin_agua", "Una semilla no recibe agua y no germina. ¿Por qué?", "Porque necesita agua para germinar",
    ["Porque faltaron abejas", "Porque el polen no llegó", "Porque ya es una planta adulta"],
    "El agua es una de las cosas que la semilla necesita para germinar."),
  mc("germinacion", "tibio", "En el experimento del poroto, el vaso se deja en un lugar tibio porque…", "La semilla necesita calor para germinar",
    ["El poroto necesita estar solo", "Así el algodón se seca", "Las abejas llegan más rápido"],
    "La semilla necesita agua, aire y calor para germinar.", { etiqueta: "Experimento del poroto: ¿por qué un lugar tibio? (necesita calor)" }),
  mc("germinacion", "materiales", "Para germinar un poroto en la sala necesitamos…", "Poroto, algodón, vaso y agua",
    ["Poroto, polen, abeja y vaso", "Poroto, aceite y piedras", "Solo un poroto"],
    "Se pone algodón en el vaso, el poroto sobre el algodón, un poquito de agua y se deja en un lugar tibio.",
    { etiqueta: "Experimento del poroto: ¿qué materiales se usan?" }),
  mc("germinacion", "plantula", "La planta pequeña que aparece cuando germina la semilla se llama…", "Plántula (planta joven)",
    ["Fruto", "Polen", "Estambre"],
    "La plántula es la planta joven que nace de la semilla germinada."),

  // ── Ciclo de vida ──
  mc("ciclo", "inicia", "Una planta comienza su vida como…", "Una semilla",
    ["Una flor", "Un fruto", "Una planta adulta"],
    "El ciclo de vida de una planta comienza con una semilla."),
  mc("ciclo", "etapas", "¿Cuál es el orden correcto de las etapas del ciclo de vida de una planta?", "Semilla, germinación, plántula, crecimiento, floración y fruto",
    ["Semilla, plántula, germinación, floración, crecimiento y fruto", "Germinación, semilla, fruto, plántula, floración y crecimiento", "Fruto, floración, crecimiento, plántula, germinación y semilla"],
    "Las etapas son: 1 semilla, 2 germinación, 3 plántula, 4 crecimiento (planta adulta), 5 floración y 6 fruto."),
  mc("ciclo", "condiciones", "La semilla comienza a germinar cuando encuentra condiciones adecuadas, como…", "Agua, aire y temperatura apropiada",
    ["Solo sol y viento", "Polen y abejas", "Poca agua y mucho frío"],
    "Con agua, aire y temperatura apropiada la semilla comienza a germinar."),
  mc("ciclo", "plantula", "La plántula es…", "Una planta joven",
    ["Una semilla dormida", "Un fruto pequeño", "La flor de la planta"],
    "La plántula (o planta joven) es la pequeña planta que continúa creciendo hasta convertirse en adulta."),
  mc("ciclo", "germ", "En la etapa de germinación…", "La planta nace",
    ["La planta produce frutos", "La planta ya es adulta", "Las semillas viajan lejos"],
    "Germinación: la planta nace."),
  mc("ciclo", "crecimiento", "La etapa de crecimiento corresponde a la…", "Planta adulta",
    ["Semilla", "Planta que está naciendo", "Flor del fruto"],
    "Crecimiento: la planta joven sigue creciendo hasta ser una planta adulta."),
  mc("ciclo", "adulta", "La planta adulta puede producir…", "Flores",
    ["Solo raíces", "Abejas", "Agua"],
    "La planta adulta puede producir flores."),
  mc("ciclo", "floracion", "La etapa de floración también se llama…", "Reproducción",
    ["Germinación", "Dispersión", "Crecimiento"],
    "Floración (reproducción): la planta tiene flores que permiten formar semillas."),
  mc("ciclo", "fruto_contiene", "Después de la polinización y fecundación, algunas flores forman frutos que contienen…", "Semillas",
    ["Raíces", "Polen", "Agua"],
    "Los frutos contienen semillas, y las semillas pueden dar origen a nuevas plantas."),
  mc("ciclo", "def_fruto", "¿Qué es el fruto?", "Lo que protege a las semillas mientras se forman",
    ["El traslado del polen de una flor a otra", "La parte donde están el polen y el óvulo", "Lo que tiene dentro la nueva planta"],
    "El fruto protege a las semillas mientras se forman.", { etiqueta: "Definición: ¿qué es el fruto?" }),
  mc("ciclo", "def_semilla", "¿Qué es la semilla?", "Dentro de ella está la nueva planta",
    ["Lo que protege a los frutos", "El traslado del polen", "La parte donde están el polen y el óvulo"],
    "Dentro de la semilla está la nueva planta en desarrollo.", { etiqueta: "Definición: ¿qué es la semilla?" }),
  mc("ciclo", "d_fruto", "¿A qué etapa corresponde? «El fruto protege a las semillas en su interior».", "Fruto",
    ["Germinación", "Plántula (planta joven)", "Floración"],
    "El fruto protege a las semillas en su interior.", { etiqueta: "«El fruto protege a las semillas…» → ¿qué etapa es? (fruto)" }),
  mc("ciclo", "d_plantula", "¿A qué etapa corresponde? «La planta crece y se forman la raíz, el tallo y las hojas».", "Plántula (planta joven)",
    ["Fruto", "Germinación", "Floración"],
    "Cuando la planta crece y tiene raíz, tallo y hojas es una plántula, o planta joven.", { etiqueta: "«La planta crece y se forman raíz, tallo y hojas» → ¿qué etapa es? (plántula)" }),
  mc("ciclo", "d_floracion", "¿A qué etapa corresponde? «En las flores están el polen y el óvulo. La polinización la hacen el viento, las aves y los insectos».", "Floración",
    ["Fruto", "Germinación", "Plántula (planta joven)"],
    "En la floración están las flores, donde ocurre la polinización.", { etiqueta: "«En las flores están el polen y el óvulo…» → ¿qué etapa es? (floración)" }),
  mc("ciclo", "d_germinacion", "¿A qué etapa corresponde? «Con agua, aire y temperatura adecuada, la semilla da origen a una nueva planta».", "Germinación",
    ["Fruto", "Floración", "Plántula (planta joven)"],
    "Cuando las condiciones son favorables, la semilla germina y da origen a una nueva planta.", { etiqueta: "«Con agua, aire y temperatura adecuada, la semilla…» → ¿qué etapa es? (germinación)" }),
  mc("ciclo", "reinicia", "Cuando la semilla germina y la planta nueva crece, el ciclo de vida…", "Comienza otra vez",
    ["Termina para siempre", "Retrocede a la flor", "Se detiene en el fruto"],
    "El ciclo de vida se repite: la planta nueva tendrá flores y todo empieza otra vez."),

  // ── Tipos de plantas (guía de refuerzo: S, D y F) ──
  mc("tipos", "def_s", "Plantas sin semilla, como…", "El musgo y el helecho",
    ["El pino y la araucaria", "El naranjo y el manzano", "El tomate y el poroto"],
    "El musgo y el helecho son plantas sin semilla (S)."),
  mc("tipos", "def_d", "Plantas con semillas desnudas, como…", "El pino y la araucaria",
    ["El musgo y el helecho", "El naranjo y el manzano", "El tomate y el rosal"],
    "El pino y la araucaria tienen semillas desnudas (D): no tienen flor ni fruto."),
  mc("tipos", "def_f", "Plantas con flor y fruto, como…", "El naranjo y el manzano",
    ["El musgo y el helecho", "El pino y la araucaria", "El helecho y el pino"],
    "El naranjo y el manzano tienen flor y fruto (F)."),
  mc("tipos", "martina", "Martina dice: «El helecho tiene flores y produce frutos con semillas». ¿Es correcto?", "Es incorrecto: el helecho no tiene flores, frutos ni semillas",
    ["Es correcto: el helecho tiene flores y frutos", "Es incorrecto: el helecho tiene flores pero no frutos", "Es correcto: el helecho solo tiene semillas"],
    "El helecho es una planta sin semilla (S): no tiene flores, frutos ni semillas.", { etiqueta: "Martina dice «el helecho tiene flores y frutos» → ¿es correcto? (no)" }),
  mc("tipos", "desnudas", "Las plantas con semillas desnudas (como el pino) tienen semillas, pero no tienen…", "Flor ni fruto",
    ["Raíz ni tallo", "Hojas ni raíz", "Agua ni luz"],
    "Las plantas con semillas desnudas tienen semillas, pero no flor ni fruto."),
  mc("tipos", "musgo", "El musgo es una planta…", "Sin semilla",
    ["Con semillas desnudas", "Con flor y fruto", "Con muchas semillas"],
    "El musgo es una planta sin semilla (S)."),

  // ── Usos de las plantas ──
  mc("usos", "def_ali", "Las plantas de uso alimenticio son las que…", "Nos sirven de alimento",
    ["Se usan como remedio", "Adornan los jardines", "Se transforman en madera y papel"],
    "Las plantas alimenticias nos sirven de alimento: frutas, verduras, cereales."),
  mc("usos", "def_med", "Las plantas de uso medicinal son las que…", "Se usan como remedio para aliviar malestares",
    ["Nos sirven de comida", "Solo adornan las casas", "Se usan para fabricar telas"],
    "Las plantas medicinales se usan como remedio, por ejemplo en infusiones."),
  mc("usos", "def_orn", "Las plantas de uso ornamental son las que…", "Se usan para decorar jardines, casas y lugares",
    ["Se usan como remedio", "Se comen en el almuerzo", "Se transforman en papel"],
    "Las plantas ornamentales adornan y embellecen jardines, casas y lugares."),
  mc("usos", "def_ind", "Las plantas de uso industrial son las que…", "Se transforman en productos, como madera, papel o telas",
    ["Se usan solo para adornar", "Se toman como té para el dolor de guata", "Solo se comen en ensalada"],
    "Las plantas de uso industrial se transforman en productos: madera, papel, telas, etc."),
  mc("usos", "madera", "La madera para fabricar muebles y el papel se obtienen de los árboles. ¿Qué uso es ese?", "Industrial",
    ["Alimenticio", "Medicinal", "Ornamental"],
    "Es un uso industrial: la planta se transforma en productos como la madera y el papel."),
  mc("usos", "te", "Tomar un té de manzanilla o de boldo cuando duele la guata es un uso…", "Medicinal",
    ["Alimenticio", "Ornamental", "Industrial"],
    "Es un uso medicinal: la planta se usa como remedio."),

  // ── Plantas nativas de Chile ──
  mc("nativas", "que", "¿Qué es una planta nativa?", "La que crece de forma natural en un lugar, sin que la hayan traído las personas",
    ["La que viene de otro país", "La que solo crece en macetas", "La que se compra en una tienda"],
    "Una planta nativa crece de forma natural en un lugar, sin haber sido traída por las personas."),
  mc("nativas", "introducida", "Una planta introducida es la que…", "Fue traída desde otro lugar por las personas",
    ["Siempre ha crecido de forma natural en el lugar", "No tiene raíz", "Nunca da semillas"],
    "Las plantas introducidas no son de ese lugar: las personas las trajeron desde otros lugares."),
  mc("nativas", "copihue", "¿Cuál es la flor nacional de Chile?", "El copihue",
    ["La rosa", "El tulipán", "El clavel"],
    "El copihue es la flor nacional de Chile y una planta nativa."),
  mc("nativas", "boldo", "El boldo es una planta nativa de Chile que se usa como…", "Planta medicinal, en infusiones",
    ["Planta industrial para hacer telas", "Planta que no se usa", "Planta que vive en el agua"],
    "El boldo es nativo de Chile y se usa como planta medicinal."),
  mc("nativas", "importa", "¿Por qué es importante cuidar las plantas nativas de Chile?", "Porque son parte de nuestro ambiente natural y sirven de alimento y refugio a animales",
    ["Porque son las únicas plantas que existen", "Porque no necesitan agua ni luz", "Porque no son seres vivos"],
    "Las plantas nativas forman parte del ambiente natural de Chile y ayudan a muchos animales."),
];

// Entra / Sale (Actividad 1 de la guía de fotosíntesis)
const ENTRA = "Entra: la planta lo necesita";
const SALE = "Sale: la planta lo produce o libera";
const ELEMENTOS = [
  { id: "luz",    txt: "☀️ La luz solar",              entra: true,  exp: "La luz solar entra: la planta la necesita para fabricar su alimento." },
  { id: "agua",   txt: "💧 El agua (H₂O)",              entra: true,  exp: "El agua entra: la planta la absorbe por las raíces." },
  { id: "co2",    txt: "💨 El dióxido de carbono (CO₂)", entra: true,  exp: "El dióxido de carbono entra: la planta lo toma del aire." },
  { id: "oxigeno",txt: "🫧 El oxígeno",                  entra: false, exp: "El oxígeno sale: la planta lo libera al aire." },
  { id: "glucosa",txt: "🍬 La glucosa (el alimento)",    entra: false, exp: "La glucosa sale: es el alimento que produce la planta." },
];

// ── Datos dinámicos ───────────────────────────────────────────────────

// Partes de la flor (dibujo con A, B y C)
const FLOR = [
  { l: "A", id: "petalo",   nombre: "Pétalo",   corta: "tiene colores y llama a los insectos" },
  { l: "B", id: "estambre", nombre: "Estambre", corta: "tiene el polen (un polvito amarillo)" },
  { l: "C", id: "pistilo",  nombre: "Pistilo",  corta: "es donde nace la semilla" },
];

// Secuencias para las actividades de ordenar (cada paso se pregunta con la clave c:<modo>:p<n>)
export const SECUENCIAS = {
  orden: {
    titulo: "Ordena la fotosíntesis", intro: "La planta es una fábrica verde: primero consigue lo que necesita (agua, aire y luz), después fabrica su alimento y al final libera oxígeno.",
    instruccion: "Toca los pasos en el orden en que ocurre la fotosíntesis", unidad: "paso", sust: "el paso", proceso: "la fotosíntesis",
    pasos: PASOS, iconos: ["💧", "💨", "☀️", "🍬", "🫧"],
  },
  ordenpolin: {
    titulo: "Ordena la polinización", intro: "Una abeja visita una flor, se lleva el polen y lo deja en otra flor: así se forman las semillas.",
    instruccion: "Toca las tarjetas en el orden en que ocurre la polinización", unidad: "paso", sust: "el paso", proceso: "la polinización",
    pasos: ["La abeja llega a la flor.", "El polen se pega a su cuerpo.", "La abeja va a otra flor.", "El polen llega al pistilo y nace una semilla."],
    iconos: ["🐝", "🟡", "🌸", "🌰"],
  },
  ordenciclo: {
    titulo: "Ordena el ciclo de vida", intro: "El ciclo de vida de una planta tiene 6 etapas: empieza en una semilla y termina en un fruto con nuevas semillas.",
    instruccion: "Toca las etapas en el orden del ciclo de vida de una planta", unidad: "etapa", sust: "la etapa", proceso: "el ciclo de vida de una planta",
    pasos: ["Semilla", "Germinación (la planta nace)", "Plántula (planta joven)", "Crecimiento (planta adulta)", "Floración (reproducción)", "Fruto (guarda las semillas)"],
    iconos: ["🌰", "🌱", "🌿", "🌳", "🌸", "🍎"],
  },
  ordenviaje: {
    titulo: "De la flor a una planta nueva", intro: "Todo empieza en la flor y, cuando nace una planta nueva, tendrá flores y todo empieza otra vez.",
    instruccion: "Toca las etapas en el orden en que nace una planta nueva", unidad: "etapa", sust: "la etapa", proceso: "cómo nace una planta nueva",
    pasos: ["Flor", "Polinización (el polen pasa de una flor a otra)", "Semilla y fruto", "Dispersión (las semillas viajan lejos)", "Germinación (la semilla empieza a crecer)", "Planta nueva"],
    iconos: ["🌸", "🐝", "🍎", "🌬️", "🌱", "🌳"],
  },
};

// Tipos de plantas según sus semillas (guía de refuerzo: S, D y F)
const TIPO_OPC = { S: "Sin semilla (S)", D: "Con semillas desnudas (D)", F: "Con flor y fruto (F)" };
const PLANTAS_TIPO = [
  { id: "araucaria", e: "🌲", nombre: "Araucaria", t: "D", exp: "La araucaria tiene semillas desnudas (D): no tiene flor ni fruto." },
  { id: "musgo",     e: "🟢", nombre: "Musgo",     t: "S", exp: "El musgo es una planta sin semilla (S)." },
  { id: "pino",      e: "🌲", nombre: "Pino",      t: "D", exp: "El pino tiene semillas desnudas (D): no tiene flor ni fruto." },
  { id: "naranjo",   e: "🍊", nombre: "Naranjo",   t: "F", exp: "El naranjo es una planta con flor y fruto (F)." },
  { id: "manzano",   e: "🍎", nombre: "Manzano",   t: "F", exp: "El manzano es una planta con flor y fruto (F)." },
  { id: "helecho",   e: "🌿", nombre: "Helecho",   t: "S", exp: "El helecho es una planta sin semilla (S): no tiene flores, frutos ni semillas." },
  { id: "tomate",    e: "🍅", nombre: "Tomate",    t: "F", exp: "El tomate es una planta con flor y fruto (F)." },
];
// ¿Tiene flor, fruto, semillas? (naranjo, pino y helecho, como en la guía)
const TIENE = {
  naranjo: { nombre: "naranjo", flor: true,  fruto: true,  semillas: true },
  pino:    { nombre: "pino",    flor: false, fruto: false, semillas: true },
  helecho: { nombre: "helecho", flor: false, fruto: false, semillas: false },
};
const PARTE_TXT = { flor: "flor", fruto: "fruto", semillas: "semillas" };

// Usos de las plantas
const USO_OPC = { ali: "Alimenticio (nos sirve de alimento)", med: "Medicinal (sirve como remedio)", orn: "Ornamental (adorna jardines y casas)", ind: "Industrial (se transforma en productos)" };
const PLANTAS_USO = [
  { id: "lechuga",   e: "🥬", nombre: "La lechuga",   u: "ali", exp: "La lechuga se come: es una planta alimenticia." },
  { id: "zanahoria", e: "🥕", nombre: "La zanahoria", u: "ali", exp: "La zanahoria se come: es una planta alimenticia." },
  { id: "manzano",   e: "🍎", nombre: "El manzano (su fruta)", u: "ali", exp: "La manzana se come: el manzano es una planta alimenticia." },
  { id: "manzanilla",e: "🌼", nombre: "La manzanilla", u: "med", exp: "La manzanilla se toma en infusión para aliviar malestares: es medicinal." },
  { id: "boldo",     e: "🍃", nombre: "El boldo",     u: "med", exp: "El boldo se toma en infusión para aliviar malestares: es medicinal." },
  { id: "matico",    e: "🌿", nombre: "El matico",    u: "med", exp: "El matico se usa como remedio para sanar heridas: es medicinal." },
  { id: "rosa",      e: "🌹", nombre: "La rosa",      u: "orn", exp: "La rosa adorna jardines y casas: es ornamental." },
  { id: "clavel",    e: "🌺", nombre: "El clavel",    u: "orn", exp: "El clavel adorna jardines y casas: es ornamental." },
  { id: "tulipan",   e: "🌷", nombre: "El tulipán",   u: "orn", exp: "El tulipán adorna: es ornamental." },
  { id: "algodon",   e: "☁️", nombre: "El algodón",   u: "ind", exp: "Del algodón se fabrican telas y ropa: es de uso industrial." },
  { id: "pino",      e: "🌲", nombre: "El pino (su madera)", u: "ind", exp: "Con la madera del pino se fabrican muebles y papel: es de uso industrial." },
];

// Plantas nativas de Chile / introducidas
const NAT_OPC = { n: "Nativa de Chile", i: "Introducida (la trajeron de otro lugar)" };
const PLANTAS_NAT = [
  { id: "araucaria", e: "🌲", nombre: "La araucaria", n: true,  exp: "La araucaria (pehuén) es una planta nativa del sur de Chile." },
  { id: "copihue",   e: "🌺", nombre: "El copihue",   n: true,  exp: "El copihue es nativo de Chile: es nuestra flor nacional." },
  { id: "boldo",     e: "🍃", nombre: "El boldo",     n: true,  exp: "El boldo es una planta nativa de Chile." },
  { id: "quillay",   e: "🌳", nombre: "El quillay",   n: true,  exp: "El quillay es un árbol nativo de Chile." },
  { id: "canelo",    e: "🌳", nombre: "El canelo",    n: true,  exp: "El canelo es un árbol nativo de Chile." },
  { id: "palma",     e: "🌴", nombre: "La palma chilena", n: true, exp: "La palma chilena es nativa de Chile." },
  { id: "maqui",     e: "🫐", nombre: "El maqui",     n: true,  exp: "El maqui es una planta nativa de Chile." },
  { id: "pino",      e: "🌲", nombre: "El pino (pino radiata)", n: false, exp: "El pino de las plantaciones fue traído desde otro lugar: es una planta introducida." },
  { id: "eucalipto", e: "🌳", nombre: "El eucalipto", n: false, exp: "El eucalipto fue traído desde Australia: es una planta introducida." },
  { id: "naranjo",   e: "🍊", nombre: "El naranjo",   n: false, exp: "El naranjo fue traído desde otro lugar: es una planta introducida." },
  { id: "manzano",   e: "🍎", nombre: "El manzano",   n: false, exp: "El manzano fue traído desde otro lugar: es una planta introducida." },
];

// ── API ────────────────────────────────────────────────────────────────
export function construir(key) {
  const p = String(key).split(":");
  if (p[0] !== "c") return null;
  let q = null;
  if (p[1] === "partes" && p[2] === "rot") {
    const pt = PARTES.find(x => String(x.n) === p[3]); if (!pt) return null;
    q = { key, modo: "partes", etiqueta: `Rotular: ¿qué parte es el número ${pt.n}?`,
      enunciado: `¿Qué parte de la planta es el número ${pt.n}?`, sub: "Mira el dibujo", visual: { tipo: "planta", marca: pt.n },
      correcta: pt.nombre, malas: barajar(PARTES.filter(x => x !== pt).map(x => x.nombre)).slice(0, 3),
      explicacion: `${pt.nombre}: ${pt.corta}.`, solucion: `${pt.n} = ${pt.nombre}` };
  } else if (p[1] === "partes" && p[2] === "num") {
    const pt = PARTES.find(x => x.id === p[3]); if (!pt) return null;
    q = { key, modo: "partes", etiqueta: `Rotular: ¿qué número señala ${pt.art.toLowerCase()}?`,
      enunciado: `¿Qué número señala ${pt.art.toLowerCase()} en el dibujo?`, sub: "Mira el dibujo", visual: { tipo: "planta", marca: null },
      correcta: String(pt.n), malas: barajar(PARTES.filter(x => x !== pt).map(x => String(x.n))).slice(0, 3),
      explicacion: `${pt.nombre}: número ${pt.n}.`, solucion: `${pt.nombre} = ${pt.n}` };
  } else if (p[1] === "flor" && p[2] === "rot") {
    const f = FLOR.find(x => x.l === p[3]); if (!f) return null;
    q = { key, modo: "flor", etiqueta: `Rotular la flor: ¿qué parte es la letra ${f.l}?`,
      enunciado: `¿Qué parte de la flor es la letra ${f.l}?`, sub: "Mira el dibujo", visual: { tipo: "flor", marca: f.l },
      correcta: f.nombre, malas: FLOR.filter(x => x !== f).map(x => x.nombre),
      explicacion: `${f.nombre}: ${f.corta}.`, solucion: `${f.l} = ${f.nombre}` };
  } else if (p[1] === "fotosintesis" && p[2] === "es") {
    const el = ELEMENTOS.find(x => x.id === p[3]); if (!el) return null;
    q = { key, modo: "fotosintesis", etiqueta: `Fotosíntesis: ${el.txt.replace(/^\S+\s/, "")} → ¿entra o sale?`,
      enunciado: `En la fotosíntesis: ${el.txt}`, sub: "¿Entra a la planta o sale de ella?", visual: null,
      correcta: el.entra ? ENTRA : SALE, malas: [el.entra ? SALE : ENTRA], explicacion: el.exp, solucion: el.entra ? "Entra" : "Sale" };
  } else if (SECUENCIAS[p[1]] && /^p[1-9]$/.test(p[2])) {
    const sq = SECUENCIAS[p[1]];
    const i = parseInt(p[2].slice(1), 10) - 1;
    if (i >= sq.pasos.length) return null;
    q = { key, modo: p[1], etiqueta: `${sq.titulo}: ${sq.unidad} ${i + 1}`,
      enunciado: `En ${sq.proceso}, ¿qué ocurre en ${sq.sust} ${i + 1}?`, sub: `Ordena del 1 al ${sq.pasos.length}`, visual: null,
      correcta: sq.pasos[i], malas: barajar(sq.pasos.filter((_, j) => j !== i)).slice(0, 3),
      explicacion: `${sq.unidad[0].toUpperCase() + sq.unidad.slice(1)} ${i + 1}: ${sq.pasos[i]}`, solucion: `${sq.unidad[0].toUpperCase() + sq.unidad.slice(1)} ${i + 1}: ${sq.pasos[i]}` };
  } else if (p[1] === "tipos" && p[2] === "es") {
    const pl = PLANTAS_TIPO.find(x => x.id === p[3]); if (!pl) return null;
    q = { key, modo: "tipos", etiqueta: `Tipo de planta: ${pl.nombre} → ${TIPO_OPC[pl.t]}`,
      enunciado: `${pl.e} ${pl.nombre}: ¿qué tipo de planta es?`, sub: "Según sus semillas: sin semilla, semillas desnudas, o flor y fruto", visual: null,
      correcta: TIPO_OPC[pl.t], malas: Object.keys(TIPO_OPC).filter(k => k !== pl.t).map(k => TIPO_OPC[k]),
      explicacion: pl.exp, solucion: TIPO_OPC[pl.t] };
  } else if (p[1] === "tipos" && p[2] === "tiene") {
    const pl = TIENE[p[3]]; if (!pl || !PARTE_TXT[p[4]]) return null;
    const si = pl[p[4]];
    const art = p[4] === "semillas" ? "tiene" : "tiene";
    q = { key, modo: "tipos", etiqueta: `¿El ${pl.nombre} ${art} ${PARTE_TXT[p[4]]}? → ${si ? "Sí" : "No"}`,
      enunciado: `¿El ${pl.nombre} ${art} ${p[4] === "semillas" ? "semillas" : p[4] === "flor" ? "flor" : "fruto"}?`, sub: "Compara las plantas", visual: null,
      correcta: si ? "Sí" : "No", malas: [si ? "No" : "Sí"],
      explicacion: `${pl.nombre[0].toUpperCase() + pl.nombre.slice(1)}: ${pl.flor ? "tiene flor" : "no tiene flor"}, ${pl.fruto ? "tiene fruto" : "no tiene fruto"} y ${pl.semillas ? "tiene semillas" : "no tiene semillas"}.`,
      solucion: si ? "Sí" : "No" };
  } else if (p[1] === "usos" && p[2] === "es") {
    const pl = PLANTAS_USO.find(x => x.id === p[3]); if (!pl) return null;
    q = { key, modo: "usos", etiqueta: `Uso de ${pl.nombre.toLowerCase()} → ${USO_OPC[pl.u].split(" (")[0]}`,
      enunciado: `${pl.e} ${pl.nombre}: ¿qué uso tiene?`, sub: "Alimenticio, medicinal, ornamental o industrial", visual: null,
      correcta: USO_OPC[pl.u], malas: Object.keys(USO_OPC).filter(k => k !== pl.u).map(k => USO_OPC[k]),
      explicacion: pl.exp, solucion: USO_OPC[pl.u].split(" (")[0] };
  } else if (p[1] === "nativas" && p[2] === "es") {
    const pl = PLANTAS_NAT.find(x => x.id === p[3]); if (!pl) return null;
    q = { key, modo: "nativas", etiqueta: `${pl.nombre}: ¿nativa o introducida? → ${pl.n ? "Nativa" : "Introducida"}`,
      enunciado: `${pl.e} ${pl.nombre}: ¿es nativa de Chile o introducida?`, sub: "Nativa: crece de forma natural en Chile", visual: null,
      correcta: pl.n ? NAT_OPC.n : NAT_OPC.i, malas: [pl.n ? NAT_OPC.i : NAT_OPC.n],
      explicacion: pl.exp, solucion: pl.n ? "Nativa de Chile" : "Introducida" };
  } else {
    q = FIJAS.find(x => x.key === key) || null;
    if (q) q = { ...q };
  }
  return q;
}

const fijas = (modo) => FIJAS.filter(x => x.modo === modo).map(x => x.key);
const cache = {};
export function clavesDe(modo) {
  if (cache[modo]) return cache[modo];
  let k = [];
  if (modo === "partes") k = [...PARTES.map(x => `c:partes:rot:${x.n}`), ...PARTES.map(x => `c:partes:num:${x.id}`)];
  else if (modo === "fotosintesis") k = [...fijas(modo), ...ELEMENTOS.map(x => `c:fotosintesis:es:${x.id}`)];
  else if (modo === "flor") k = [...FLOR.map(x => `c:flor:rot:${x.l}`), ...fijas(modo)];
  else if (SECUENCIAS[modo]) k = SECUENCIAS[modo].pasos.map((_, i) => `c:${modo}:p${i + 1}`);
  else if (modo === "tipos") k = [...PLANTAS_TIPO.map(x => `c:tipos:es:${x.id}`),
    ...Object.keys(TIENE).flatMap(pl => Object.keys(PARTE_TXT).map(pt => `c:tipos:tiene:${pl}:${pt}`)), ...fijas(modo)];
  else if (modo === "usos") k = [...PLANTAS_USO.map(x => `c:usos:es:${x.id}`), ...fijas(modo)];
  else if (modo === "nativas") k = [...PLANTAS_NAT.map(x => `c:nativas:es:${x.id}`), ...fijas(modo)];
  else if (modo === "ensayo") return (cache[modo] = []);
  else k = fijas(modo);
  return (cache[modo] = k);
}

// Ensayo: reparte las preguntas entre todos los temas de la prueba (20 preguntas)
const CUOTA_ENSAYO = { partes: 2, funciones: 2, necesidades: 1, fotosintesis: 1, orden: 1,
  flor: 1, polinizacion: 2, dispersion: 2, germinacion: 2, ciclo: 2, ordenciclo: 1, tipos: 1, usos: 1, nativas: 1 };
export function clavesEnsayo(total = 20) {
  const out = [];
  Object.entries(CUOTA_ENSAYO).forEach(([m, n]) => out.push(...barajar(clavesDe(m)).slice(0, n)));
  return barajar(out).slice(0, total);
}

export const esClavePlantas = (item) => typeof item === "string" && item.startsWith("c:");
