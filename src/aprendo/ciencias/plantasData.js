// Ciencias Naturales · Las Plantas: sus partes y funciones (3° Básico)
// Basado en la guía "Las Plantas: sus Partes y Funciones" y "La Magia de la Fotosíntesis: La Fábrica Verde".
// Cada pregunta tiene una clave estable "c:<modo>:<id>" para guardar el historial por alumno
// y poder rearmarla en "Reforzar mis errores".

export const MODOS = [
  { id: "partes", label: "Partes de la planta", emoji: "🌸", color: "#ec4899",
    desc: "Rotula la planta: ¿qué parte es cada número?",
    recuerda: "Las partes de la planta son la raíz, el tallo, las hojas, la flor y el fruto. En el dibujo de la guía: 1 flor, 2 fruto, 3 hoja, 4 tallo y 5 raíz." },
  { id: "funciones", label: "¿Qué función cumple cada parte?", emoji: "🔧", color: "#8b5cf6",
    desc: "Raíz, tallo, hojas, flor y fruto: para qué sirve cada uno",
    recuerda: "La raíz sostiene la planta y absorbe agua y minerales. El tallo conduce el agua y los minerales hasta las hojas y sostiene la planta. Las hojas fabrican el alimento. La flor contiene las partes reproductivas y de ella se forma el fruto. El fruto contiene y protege las semillas." },
  { id: "necesidades", label: "Lo que necesitan las plantas", emoji: "💧", color: "#0ea5e9",
    desc: "Agua, luz y aire · ¿por qué son importantes las plantas?",
    recuerda: "Las plantas son seres vivos. Para vivir y crecer necesitan agua, luz y aire. Nos entregan alimento, oxígeno para respirar y algunas se usan como medicina." },
  { id: "fotosintesis", label: "La fábrica verde: fotosíntesis", emoji: "☀️", color: "#f59e0b",
    desc: "Qué entra, qué sale y cómo fabrica su alimento",
    recuerda: "Las plantas son seres autótrofos: fabrican su propio alimento mediante la fotosíntesis. Necesitan luz solar, agua y dióxido de carbono (entran) y producen glucosa, su alimento, y liberan oxígeno (salen). El dióxido de carbono entra por los estomas, unos poros diminutos de las hojas." },
  { id: "orden", label: "Ordena la fotosíntesis", emoji: "🔢", color: "#10b981",
    desc: "Pon los pasos del proceso en el orden correcto",
    recuerda: "1. La planta absorbe agua y sales minerales por las raíces. 2. Toma dióxido de carbono del aire. 3. La luz del sol le da energía. 4. Fabrica su alimento (azúcares). 5. Libera oxígeno al aire." },
  { id: "ensayo", label: "Ensayo de la prueba", emoji: "📝", color: "#ef4444",
    desc: "15 preguntas de toda la materia de Plantas",
    recuerda: "Practica todo lo que se evaluará: partes de la planta, sus funciones, lo que necesitan para vivir y la fotosíntesis. ¡Tú puedes!" },
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
  } else if (p[1] === "fotosintesis" && p[2] === "es") {
    const el = ELEMENTOS.find(x => x.id === p[3]); if (!el) return null;
    q = { key, modo: "fotosintesis", etiqueta: `Fotosíntesis: ${el.txt.replace(/^\S+\s/, "")} → ¿entra o sale?`,
      enunciado: `En la fotosíntesis: ${el.txt}`, sub: "¿Entra a la planta o sale de ella?", visual: null,
      correcta: el.entra ? ENTRA : SALE, malas: [el.entra ? SALE : ENTRA], explicacion: el.exp, solucion: el.entra ? "Entra" : "Sale" };
  } else if (p[1] === "orden" && /^p[1-5]$/.test(p[2])) {
    const i = parseInt(p[2].slice(1), 10) - 1;
    q = { key, modo: "orden", etiqueta: `Orden de la fotosíntesis: paso ${i + 1}`,
      enunciado: `En la fotosíntesis, ¿qué ocurre en el paso ${i + 1}?`, sub: "Ordena el proceso del 1 al 5", visual: null,
      correcta: PASOS[i], malas: barajar(PASOS.filter((_, j) => j !== i)).slice(0, 3),
      explicacion: `Paso ${i + 1}: ${PASOS[i]}`, solucion: `Paso ${i + 1}: ${PASOS[i]}` };
  } else {
    q = FIJAS.find(x => x.key === key) || null;
    if (q) q = { ...q };
  }
  return q;
}

const cache = {};
export function clavesDe(modo) {
  if (cache[modo]) return cache[modo];
  let k = [];
  if (modo === "partes") k = [...PARTES.map(x => `c:partes:rot:${x.n}`), ...PARTES.map(x => `c:partes:num:${x.id}`)];
  else if (modo === "fotosintesis") k = [...FIJAS.filter(x => x.modo === modo).map(x => x.key), ...ELEMENTOS.map(x => `c:fotosintesis:es:${x.id}`)];
  else if (modo === "orden") k = [1, 2, 3, 4, 5].map(i => `c:orden:p${i}`);
  else if (modo === "ensayo") return (cache[modo] = []);
  else k = FIJAS.filter(x => x.modo === modo).map(x => x.key);
  return (cache[modo] = k);
}

// Ensayo: reparte las preguntas entre todos los temas de la prueba
export function clavesEnsayo(total = 15) {
  const cuota = { partes: 3, funciones: 5, necesidades: 2, fotosintesis: 4, orden: 1 };
  const out = [];
  Object.entries(cuota).forEach(([m, n]) => out.push(...barajar(clavesDe(m)).slice(0, n)));
  return barajar(out).slice(0, total);
}

export const esClavePlantas = (item) => typeof item === "string" && item.startsWith("c:");
