// Matemáticas · Unidad "Ecuaciones y Patrones" (3° Básico)
// Cada pregunta se identifica con una clave estable ("e:..." para ecuaciones y "p:..." para patrones)
// para guardar el historial por alumno y rearmar la pregunta cuando necesita refuerzo.
// Los cálculos se hacen en la hoja y en la app se elige el resultado correcto.

export const GRUPOS = [
  { id: "ecuaciones", label: "🟰 Ecuaciones" },
  { id: "patrones",  label: "🔁 Patrones" },
  { id: "prueba",    label: "📝 Prepara la prueba" },
];

export const MODOS = [
  { id: "eq_incognita", grupo: "ecuaciones", label: "Encuentra la incógnita", emoji: "🔍", color: "#a855f7",
    desc: "△ + 6 = 15 · ¿cuánto vale el símbolo?",
    recuerda: "Una ecuación es una igualdad con un número desconocido (la incógnita). Para encontrarlo usa la operación inversa: la suma se resuelve con una resta y la resta con una suma. Calcula en tu hoja y ¡comprueba!" },
  { id: "eq_balanza", grupo: "ecuaciones", label: "La balanza", emoji: "⚖️", color: "#0ea5e9",
    desc: "Los dos lados de la balanza pesan lo mismo",
    recuerda: "En una igualdad los dos lados valen lo mismo, como una balanza equilibrada. Si 20 = ? + 6, al número que falta lo encuentras restando: 20 − 6 = 14." },
  { id: "eq_comprobar", grupo: "ecuaciones", label: "Operación inversa y comprobación", emoji: "✅", color: "#10b981",
    desc: "¿Qué cálculo hago? ¿Cómo lo compruebo?",
    recuerda: "Operación inversa: si la ecuación suma, resuelves restando; si resta, resuelves sumando. Para comprobar, reemplaza el símbolo por tu resultado y mira si se cumple la igualdad: 16 + 6 = 22 ✓." },
  { id: "eq_figuras", grupo: "ecuaciones", label: "Figuras con valores", emoji: "🐻", color: "#f59e0b",
    desc: "Cada dibujo esconde un número",
    recuerda: "Los dibujos iguales valen lo mismo. Si ♡ + ♡ = 4, cada ♡ vale 2. Si te dan dos ecuaciones, resuelve primero la que tiene un solo dibujo y luego usa ese valor en la otra." },
  { id: "eq_problemas", grupo: "ecuaciones", label: "Problemas: ¿qué número es?", emoji: "💭", color: "#ef4444",
    desc: "“Pensé en un número y le sumé…”",
    recuerda: "Lee el problema, busca los datos (en rojo) y la pregunta (en azul). Escribe la ecuación con un símbolo para el número desconocido, resuélvela con la operación inversa y comprueba." },
  { id: "eq_plantea", grupo: "ecuaciones", label: "Plantea la ecuación", emoji: "✏️", color: "#ec4899",
    desc: "Elige la ecuación que representa el problema",
    recuerda: "“Le sumé” → □ + número = resultado. “Le resté” → □ − número = resultado. El símbolo □ es el número que no conocemos." },

  { id: "pa_secuencia", grupo: "patrones", label: "Completa la secuencia", emoji: "🔢", color: "#3b82f6",
    desc: "5, 7, 9, 11, ❓ · ¿qué número falta?",
    recuerda: "Un patrón numérico sigue una regla: siempre se suma o se resta el mismo número. Encuentra la regla mirando cuánto cambia de un número al siguiente." },
  { id: "pa_regla", grupo: "patrones", label: "¿Cuál es la regla?", emoji: "🧠", color: "#8b5cf6",
    desc: "Descubre el patrón de formación",
    recuerda: "La regla (o patrón de formación) dice qué se hace para pasar de un número al siguiente: sumar o restar siempre el mismo número. Si los números crecen se suma; si bajan, se resta." },
  { id: "pa_figuras", grupo: "patrones", label: "Figuras y colores", emoji: "🔴", color: "#14b8a6",
    desc: "¿Qué figura sigue en el patrón?",
    recuerda: "Un patrón también puede ser de figuras, colores o sonidos. Encuentra el grupo que se repite y así sabrás qué viene después." },

  { id: "ep_ensayo", grupo: "prueba", label: "Ensayo de la prueba", emoji: "📝", color: "#f97316",
    desc: "Ecuaciones y Patrones mezclados, como en la prueba",
    recuerda: "Preguntas de Ecuaciones y de Patrones mezcladas. Usa tu hoja para calcular y recuerda comprobar tus resultados." },
];

const SIMBOLOS = ["△", "★", "□", "♡", "☀️", "😊"];
const ANIMALES = ["🐰", "🐻", "🐶", "🐱", "🐸", "🦊"];
const FIGS = ["🔴", "🟦", "🟣", "⭐", "❤️", "🟢", "🟨", "🔷"];
const OBJ = ["figuritas", "láminas", "galletas", "stickers", "bolitas", "lápices"];

// 3 números distintos, no negativos y distintos de la respuesta correcta
const tres = (correcta, candidatos) => {
  const out = [];
  for (const c of candidatos) {
    if (Number.isInteger(c) && c >= 0 && c !== correcta && !out.includes(c)) out.push(c);
    if (out.length === 3) break;
  }
  for (let k = 1; out.length < 3; k++) {
    for (const c of [correcta + k, correcta - k]) if (out.length < 3 && c >= 0 && c !== correcta && !out.includes(c)) out.push(c);
  }
  return out.map(String);
};
const unicos = (correcta, lista, n = 3) => {
  const out = [];
  for (const c of lista) if (c !== correcta && !out.includes(c) && out.length < n) out.push(c);
  return out;
};

// ── Ecuaciones con símbolo ────────────────────────────────────────────────────
// forma s: S + a = c · t: a + S = c · v: c = S + a · r: S − a = c
const PAR_SUMA = [[6, 16], [3, 29], [41, 58], [37, 13], [14, 11], [18, 43], [19, 9], [31, 32], [1, 6], [26, 13], [10, 11], [27, 24], [45, 15], [22, 38], [34, 25]];
const PAR_RESTA = [[53, 18], [65, 54], [41, 18], [73, 61], [28, 8], [45, 15], [60, 25], [82, 37], [56, 29], [90, 45], [44, 17], [35, 12]];

const ecuacion = (forma, S, x, a) => {
  if (forma === "r") { const c = x - a; return { c, texto: `${S} − ${a} = ${c}` }; }
  const c = x + a;
  if (forma === "s") return { c, texto: `${S} + ${a} = ${c}` };
  if (forma === "t") return { c, texto: `${a} + ${S} = ${c}` };
  return { c, texto: `${c} = ${S} + ${a}` };
};

function bInc([forma, xs, as, si]) {
  const x = +xs, a = +as, S = SIMBOLOS[+si % SIMBOLOS.length];
  const { c, texto } = ecuacion(forma, S, x, a);
  const malas = tres(x, forma === "r" ? [c - a, a, c, x + 1, x - 1, x + 10, x - 10] : [c + a, a, c, x + 1, x - 1, x + 10, x - 10]);
  const expl = forma === "r"
    ? `Es una resta, así que usas la operación inversa (suma): ${c} + ${a} = ${x}. Comprobación: ${x} − ${a} = ${c} ✓`
    : `Es una suma, así que usas la operación inversa (resta): ${c} − ${a} = ${x}. Comprobación: ${a} + ${x} = ${c} ✓`;
  const pasos = forma === "r" ? [
    `La ecuación es ${texto}. La incógnita es ${S}: el número que no conocemos.`,
    `Con ${S} se resta ${a}. La operación inversa de restar es sumar.`,
    `En tu hoja: ${c} + ${a} = ${x}. Entonces ${S} = ${x}.`,
    `Comprueba: ${x} − ${a} = ${c} ✓ (se cumple la igualdad).`,
  ] : [
    `La ecuación es ${texto}. La incógnita es ${S}: el número que no conocemos.`,
    `Con ${S} se suma ${a}. La operación inversa de sumar es restar.`,
    `En tu hoja: ${c} − ${a} = ${x}. Entonces ${S} = ${x}.`,
    `Comprueba: ${a} + ${x} = ${c} ✓ (se cumple la igualdad).`,
  ];
  return { modo: "eq_incognita", estilo: "ecuacion", enunciado: texto, sub: `¿Cuánto vale ${S}?`, etiqueta: texto,
    correcta: String(x), malas, explicacion: expl, pasos, solucion: `${S} = ${x}` };
}

// ── Balanza ───────────────────────────────────────────────────────────────────
const PAR_BAL = [[14, 6], [10, 15], [17, 8], [6, 24], [13, 13], [9, 11], [25, 35], [12, 28], [30, 40], [8, 17], [18, 22], [7, 33]];
function bBal([tipo, xs, as]) {
  const x = +xs, a = +as, T = x + a;
  const izq = tipo === "d" ? `${a} + ?` : `${T}`;
  const der = tipo === "d" ? `${T}` : `? + ${a}`;
  const texto = `${izq} = ${der}`;
  return { modo: "eq_balanza", estilo: "ecuacion", enunciado: texto, sub: "La balanza está equilibrada. ¿Qué número falta?", etiqueta: `Balanza: ${texto}`,
    visual: { tipo: "balanza", izq, der, x },
    correcta: String(x), malas: tres(x, [T + a, a, T, x + 1, x - 1, x + 10, x - 10]),
    explicacion: `Los dos lados pesan lo mismo. ${T} − ${a} = ${x}. Comprobación: ${a} + ${x} = ${T} ✓`,
    pasos: [
      `La balanza está equilibrada: los dos lados valen lo mismo (${texto}).`,
      `Un lado tiene ${a} y el otro lado vale ${T}. Falta cuánto hay que sumarle a ${a} para llegar a ${T}.`,
      `La operación inversa de sumar es restar. En tu hoja: ${T} − ${a} = ${x}.`,
      `Comprueba: ${a} + ${x} = ${T} ✓ (los dos lados quedan iguales).`,
    ], solucion: `? = ${x}` };
}

// ── Operación inversa y comprobación ──────────────────────────────────────────
const PAR_COM = [[6, 16], [41, 58], [37, 13], [19, 9], [31, 32], [14, 11]];
const PAR_COM_R = [[53, 18], [65, 54], [41, 18], [73, 61], [45, 15], [28, 8]];
function bCom([tipo, forma, xs, as, si]) {
  const x = +xs, a = +as, S = SIMBOLOS[+si % SIMBOLOS.length];
  const { c, texto } = ecuacion(forma, S, x, a);
  const esResta = forma === "r";
  if (tipo === "op") {
    const ok = esResta ? `${c} + ${a}` : `${c} − ${a}`;
    const malasOp = esResta
      ? [`${Math.max(a, c)} − ${Math.min(a, c)}`, `${a} + ${a}`, `${c} + ${c}`, `${a} − ${c > a ? 0 : c}`]
      : [`${c} + ${a}`, `${a} + ${a}`, `${c} + ${c}`, `${c} − ${c - 1}`];
    return { modo: "eq_comprobar", estilo: "ecuacion", enunciado: texto, sub: `¿Qué cálculo haces en tu hoja para encontrar ${S}?`, etiqueta: `Operación inversa: ${texto}`,
      correcta: ok, malas: unicos(ok, malasOp),
      explicacion: esResta ? `La ecuación resta, entonces usas la operación inversa: sumar. ${c} + ${a} = ${x}.` : `La ecuación suma, entonces usas la operación inversa: restar. ${c} − ${a} = ${x}.`,
      pasos: esResta ? [
        `Mira la ecuación ${texto}: con ${S} se resta ${a}.`,
        `La operación inversa de restar es sumar. Por eso el cálculo es ${ok} (el resultado ${c} más el número que se restó, ${a}).`,
        `En tu hoja: ${ok} = ${x}. Entonces ${S} = ${x}.`,
      ] : [
        `Mira la ecuación ${texto}: con ${S} se suma ${a}.`,
        `La operación inversa de sumar es restar. Por eso el cálculo es ${ok} (al resultado ${c} le quitas el número que ya está, ${a}).`,
        `En tu hoja: ${ok} = ${x}. Entonces ${S} = ${x}.`,
      ],
      solucion: `${ok} = ${x}` };
  }
  const comp = forma === "s" ? `${x} + ${a} = ${c}` : forma === "t" ? `${a} + ${x} = ${c}` : `${x} − ${a} = ${c}`;
  const malasC = esResta
    ? [`${x} + ${a} = ${c}`, `${c} − ${a} = ${x}`, `${a} − ${x} = ${c}`]
    : [`${x} − ${a} = ${c}`, `${c} + ${a} = ${x}`, `${a} − ${x} = ${c}`];
  return { modo: "eq_comprobar", estilo: "ecuacion", enunciado: texto, sub: `Si ${S} = ${x}, ¿cuál es la comprobación correcta?`, etiqueta: `Comprobación: ${texto} (${S} = ${x})`,
    correcta: comp, malas: unicos(comp, malasC),
    explicacion: `Para comprobar, cambias ${S} por ${x} en la ecuación original y revisas que se cumpla: ${comp} ✓`,
    pasos: [
      `La ecuación original es ${texto} y ${S} = ${x}.`,
      `Comprobar es cambiar ${S} por ${x} en la ecuación original, sin cambiar la operación: ${comp}.`,
      `Revisa que ambos lados den lo mismo: ${comp.replace(" = ", " → ").split(" → ")[0]} da ${c} ✓.`,
      `Las otras alternativas cambian la operación o los números de lugar, y no se cumplen.`,
    ],
    solucion: comp };
}

// ── Figuras con valores ───────────────────────────────────────────────────────
const X_DOBLE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25];
const X_TRIPLE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];
const CADENA = [[4, 5, 4], [6, 4, 9], [3, 7, 12], [8, 2, 5], [10, 5, 7], [12, 6, 8], [9, 1, 10], [5, 9, 15]];
function bFig([tipo, ...p]) {
  if (tipo === "d" || tipo === "t") {
    const x = +p[0], E = ANIMALES[+p[1] % ANIMALES.length], n = tipo === "d" ? 2 : 3, T = x * n;
    const texto = Array(n).fill(E).join(" + ") + ` = ${T}`;
    return { modo: "eq_figuras", estilo: "ecuacion", enunciado: texto, sub: `¿Cuánto vale cada ${E}?`, etiqueta: texto,
      correcta: String(x), malas: tres(x, tipo === "d" ? [T, x + 1, x - 1, x + 2, x * 2 + 2] : [T, x + 1, x - 1, T - x, x + 2]),
      explicacion: `${n === 2 ? "Dos" : "Tres"} dibujos iguales suman ${T}: ${Array(n).fill(x).join(" + ")} = ${T}. Cada ${E} vale ${x}.`,
      pasos: [
        `Los dibujos iguales valen lo mismo: hay ${n === 2 ? "dos" : "tres"} ${E} y juntos suman ${T}.`,
        `Buscamos el número que, sumado ${n === 2 ? "2 veces" : "3 veces"}, da ${T}. Puedes probar con la tabla del ${n}.`,
        `${Array(n).fill(x).join(" + ")} = ${T}, y también ${n} • ${x} = ${T}. (Como división: ${T} : ${n} = ${x}).`,
        `Entonces cada ${E} vale ${x}.`,
      ], solucion: `${E} = ${x}` };
  }
  const x1 = +p[0], a = +p[1], x2 = +p[2], i = +p[3] || 0;
  const E1 = ANIMALES[i % ANIMALES.length], E2 = ANIMALES[(i + 1) % ANIMALES.length];
  const c1 = x1 + a, c2 = x1 + x2;
  const texto = `${E1} + ${a} = ${c1}\n${E1} + ${E2} = ${c2}`;
  return { modo: "eq_figuras", estilo: "ecuacion", enunciado: texto, sub: `¿Cuánto vale ${E2}?`, etiqueta: `${E1} + ${a} = ${c1} · ${E1} + ${E2} = ${c2}`,
    correcta: String(x2), malas: tres(x2, [x1, c2, c1, x2 + 1, x2 - 1, x2 + 2]),
    explicacion: `Primero la ecuación con un solo dibujo: ${c1} − ${a} = ${x1}, entonces ${E1} = ${x1}. Luego ${c2} − ${x1} = ${x2}, entonces ${E2} = ${x2}.`,
    pasos: [
      `Empieza por la ecuación que tiene un solo dibujo: ${E1} + ${a} = ${c1}.`,
      `Operación inversa: ${c1} − ${a} = ${x1}. Entonces ${E1} = ${x1}.`,
      `Usa ese valor en la otra ecuación: ${E1} + ${E2} = ${c2} queda ${x1} + ${E2} = ${c2}.`,
      `Operación inversa: ${c2} − ${x1} = ${x2}. Entonces ${E2} = ${x2}.`,
      `Comprueba: ${x1} + ${x2} = ${c2} ✓`,
    ], solucion: `${E2} = ${x2}` };
}

// ── Problemas ─────────────────────────────────────────────────────────────────
// S: le sumé · R: le resté · O: obtuve… después de sumar · G: tenía y me regalaron · P: tenía y regalé (¿cuántas tenía?) · F: tenía y regalé algunas (¿cuántas regalé?)
const PAR_PRO = {
  S: [[14, 11], [27, 18], [36, 25], [52, 13], [19, 21]],
  R: [[45, 15], [60, 28], [73, 31], [38, 17], [90, 40]],
  O: [[65, 15], [32, 24], [47, 19], [58, 12], [70, 25]],
  G: [[18, 12], [25, 14], [33, 22], [40, 16], [29, 27]],
  P: [[30, 12], [45, 18], [52, 20], [38, 15], [64, 26]],
  F: [[12, 35], [20, 50], [15, 40], [26, 60], [9, 30]],
};
const problemaTexto = (t, x, a, n) => {
  const c = t === "R" || t === "P" ? x - a : t === "F" ? a - x : x + a;
  const obj = OBJ[n % OBJ.length];
  const txt = {
    S: `A un número le sumé ${a} y obtuve ${c}. ¿Cuál es el número?`,
    R: `Pensé en un número y le resté ${a}. Obtuve como resultado ${c}. ¿Cuál es el número?`,
    O: `Obtuve como resultado ${c}, después de pensar en un número y sumarle ${a}. ¿Cuál es el número?`,
    G: `Tenía algunas ${obj} y mi tía me regaló ${a} más. Ahora tengo ${c} ${obj}. ¿Cuántas ${obj} tenía al principio?`,
    P: `Tenía algunas ${obj}, regalé ${a} a mi amigo y me quedaron ${c}. ¿Cuántas ${obj} tenía al principio?`,
    F: `Tenía ${a} ${obj}, regalé algunas y me quedaron ${c}. ¿Cuántas ${obj} regalé?`,
  }[t];
  return { c, txt };
};
const ecPlantea = (t, a, c) => ({ S: `□ + ${a} = ${c}`, G: `□ + ${a} = ${c}`, R: `□ − ${a} = ${c}`, P: `□ − ${a} = ${c}`, O: `${c} = □ + ${a}`, F: `${a} − □ = ${c}` }[t]);

const PISTA = {
  S: "“Le sumé” significa que el número aumentó: □ + número = resultado.",
  R: "“Le resté” significa que el número disminuyó: □ − número = resultado.",
  O: "“Obtuve… después de sumarle” significa que el resultado es □ + número.",
  G: "“Me regalaron más” significa sumar: lo que tenía + lo que me dieron = lo que tengo ahora.",
  P: "“Regalé” significa restar: lo que tenía − lo que regalé = lo que me quedó.",
  F: "Tenía una cantidad, regalé algunas (□) y me quedaron otras: cantidad − □ = lo que quedó.",
};

function bPro([t, xs, as, ns]) {
  const x = +xs, a = +as;
  const { c, txt } = problemaTexto(t, x, a, +ns);
  const suma = t === "S" || t === "O" || t === "G";
  const cand = suma ? [c + a, a, c, x + 1, x - 1, x + 10, x - 10] : t === "F" ? [a + c, a, c, x + 1, x - 1, x + 10] : [c - a, a, c, x + 1, x - 1, x + 10, x - 10];
  const op = suma ? `${c} − ${a} = ${x}` : t === "F" ? `${a} − ${c} = ${x}` : `${c} + ${a} = ${x}`;
  const comp = suma ? `${x} + ${a} = ${c}` : t === "F" ? `${a} − ${x} = ${c}` : `${x} − ${a} = ${c}`;
  return { modo: "eq_problemas", estilo: "problema", enunciado: txt, etiqueta: txt, correcta: String(x), malas: tres(x, cand),
    explicacion: `Ecuación: ${ecPlantea(t, a, c)}. Operación inversa: ${op}. Comprobación: ${comp} ✓`,
    pasos: [
      `Datos (en rojo): ${a} y ${c}. Pregunta (en azul): el número que no conocemos, lo llamamos □.`,
      `${PISTA[t]} La ecuación es ${ecPlantea(t, a, c)}.`,
      `Resuelve con la operación inversa. En tu hoja: ${op}. Entonces □ = ${x}.`,
      `Comprueba: ${comp} ✓`,
    ], solucion: `${x} (${ecPlantea(t, a, c)})` };
}

function bPla([t, xs, as, ns]) {
  const x = +xs, a = +as;
  const { c, txt } = problemaTexto(t, x, a, +ns);
  const ok = ecPlantea(t, a, c);
  const mal = {
    S: [`□ − ${a} = ${c}`, `${c} + ${a} = □`, `□ + ${c} = ${a}`], G: [`□ − ${a} = ${c}`, `${c} + ${a} = □`, `□ + ${c} = ${a}`],
    R: [`□ + ${a} = ${c}`, `${a} − □ = ${c}`, `${c} − ${a} = □`], P: [`□ + ${a} = ${c}`, `${a} − □ = ${c}`, `${c} − ${a} = □`],
    O: [`${c} = □ − ${a}`, `${c} + ${a} = □`, `${a} = □ + ${c}`],
    F: [`□ − ${a} = ${c}`, `□ + ${a} = ${c}`, `${c} − ${a} = □`],
  }[t];
  return { modo: "eq_plantea", estilo: "problema", enunciado: txt, sub: "¿Qué ecuación representa el problema? (□ es el número que no conocemos)", etiqueta: `Plantea: ${txt}`,
    correcta: ok, malas: unicos(ok, mal), explicacion: `La ecuación es ${ok}. Al resolverla: el número es ${x}.`,
    pasos: [
      `Datos (en rojo): ${a} y ${c}. El número que no conocemos lo escribimos como □.`,
      PISTA[t],
      `La ecuación correcta es ${ok}.`,
      `Para comprobar que es la correcta, resuélvela: □ = ${x} y ${ok.replace("□", x)} ✓. Las otras alternativas no se cumplen con ${x}.`,
    ], solucion: ok };
}

// ── Patrones numéricos ────────────────────────────────────────────────────────
// [primer número, paso] · la secuencia tiene 6 números
const PAT = [[5, 2], [18, -3], [4, 3], [42, -6], [42, -7], [5, 5], [48, -4], [12, 4], [60, -10], [25, 5], [97, -3], [230, 20], [10, 50], [900, -50], [300, 50], [530, 50], [620, 50], [630, -10], [150, 5], [20, 10]];
const termino = (s, p, i) => s + p * i;
const verbo = (p) => (p > 0 ? "Sumar" : "Restar");

function bSec([ss, ps, pos]) {
  const s = +ss, p = +ps, h = +pos;
  const t = Array.from({ length: 6 }, (_, i) => termino(s, p, i));
  const x = t[h], m = Math.abs(p), d = m >= 20 ? 10 : m >= 10 ? 5 : 1;
  const prev = t[h - 1];
  const malas = tres(x, [prev + (p > 0 ? m + d : -(m + d)), prev + (p > 0 ? m - d : -(m - d)), x + 1, x - 1, x + 10, x - 10, x + 2]);
  const vista = t.map((n, i) => (i === h ? "__" : n)).join(", ");
  return { modo: "pa_secuencia", estilo: "texto", enunciado: "Completa la secuencia", sub: "Calcula en tu hoja y elige el número que falta", etiqueta: vista,
    visual: { tipo: "seq", terms: t, hueco: h },
    correcta: String(x), malas,
    explicacion: `La regla es ${verbo(p).toLowerCase()} ${m}: ${prev} ${p > 0 ? "+" : "−"} ${m} = ${x}.`,
    pasos: [
      `Busca la regla con dos números seguidos que sí se ven: de ${t[0]} a ${t[1]} ${p > 0 ? "sube" : "baja"} ${m} (${p > 0 ? `${t[1]} − ${t[0]}` : `${t[0]} − ${t[1]}`} = ${m}).`,
      `Los números ${p > 0 ? "suben" : "bajan"}, así que la regla es ${verbo(p).toLowerCase()} ${m} cada vez.`,
      `Aplica la regla al número anterior al hueco: ${prev} ${p > 0 ? "+" : "−"} ${m} = ${x}.`,
      ...(h < t.length - 1 ? [`Comprueba con el que sigue: ${x} ${p > 0 ? "+" : "−"} ${m} = ${t[h + 1]} ✓`] : [`Comprueba con el anterior: ${x} ${p > 0 ? "−" : "+"} ${m} = ${prev} ✓`]),
    ], solucion: `${x} (${verbo(p).toLowerCase()} ${m})` };
}

function bReg([ss, ps]) {
  const s = +ss, p = +ps, m = Math.abs(p);
  const t = Array.from({ length: 5 }, (_, i) => termino(s, p, i));
  const d = m >= 20 ? 10 : m >= 10 ? 5 : 1;
  const ok = `${verbo(p)} ${m}`;
  const op = verbo(-p);
  const malas = unicos(ok, [`${op} ${m}`, `${verbo(p)} ${m + d}`, `${verbo(p)} ${Math.max(1, m - d)}`, `${op} ${m + d}`]);
  const tabla = m <= 10 && t.every(n => n % m === 0) ? ` Son números de la tabla del ${m}.` : "";
  return { modo: "pa_regla", estilo: "texto", enunciado: "¿Cuál es la regla del patrón?", sub: "Mira cuánto cambia de un número al siguiente", etiqueta: t.join(", "),
    visual: { tipo: "seq", terms: t, hueco: -1 },
    correcta: ok, malas,
    explicacion: `De ${t[0]} a ${t[1]} ${p > 0 ? "sube" : "baja"} ${m}, y pasa lo mismo en todo el patrón: la regla es ${ok.toLowerCase()}.${tabla}`,
    pasos: [
      `Mira si los números suben o bajan: de ${t[0]} a ${t[1]} ${p > 0 ? "suben" : "bajan"}, así que la regla es ${p > 0 ? "sumar" : "restar"}.`,
      `Calcula cuánto cambia entre dos números seguidos: ${p > 0 ? `${t[1]} − ${t[0]}` : `${t[0]} − ${t[1]}`} = ${m}.`,
      `Comprueba con otro par: ${p > 0 ? `${t[3]} − ${t[2]}` : `${t[2]} − ${t[3]}`} = ${m} ✓. Siempre cambia lo mismo.`,
      `La regla es ${ok.toLowerCase()}.${tabla}`,
    ], solucion: ok };
}

// ── Patrones de figuras ───────────────────────────────────────────────────────
const PATRONES_FIG = ["AB", "AAB", "ABB", "ABC", "AABB"];
const SETS_FIG = ["012", "345", "670", "135", "246"];
function bPFig([pat, set, js]) {
  const cyc = pat.length, j = +js;
  const sim = (ch) => FIGS[+set[ch.charCodeAt(0) - 65]];
  const n = 2 * cyc + j;
  const seq = Array.from({ length: n }, (_, i) => sim(pat[i % cyc]));
  const sig = sim(pat[n % cyc]);
  const usados = [...new Set(pat.split("").map(sim))];
  const extra = FIGS.filter(f => !usados.includes(f)).slice(0, Math.max(1, 4 - usados.length));
  const malas = [...usados.filter(u => u !== sig), ...extra].slice(0, 3);
  const unidad = pat.split("").map(sim).join(" ");
  return { modo: "pa_figuras", estilo: "texto", enunciado: "¿Qué figura sigue en el patrón?", sub: "Encuentra el grupo que se repite", etiqueta: `${seq.join(" ")} ?`,
    visual: { tipo: "fig", items: seq }, opGrande: true,
    correcta: sig, malas,
    explicacion: `El grupo que se repite es ${unidad}. Después de ${seq.slice(-1)[0]} sigue ${sig}.`,
    pasos: [
      `Busca el grupo que se repite: ${unidad}.`,
      `En el dibujo ese grupo aparece completo ${Math.floor(n / cyc)} veces${n % cyc ? ` y después empieza otra vez: ${seq.slice(n - (n % cyc)).join(" ")}` : ""}.`,
      `Falta la figura número ${(n % cyc) + 1} del grupo: ${sig}.`,
    ], solucion: sig };
}

// ── Construcción y listas de claves ───────────────────────────────────────────
const CONSTRUCTORES = { inc: bInc, bal: bBal, com: bCom, fig: bFig, pro: bPro, pla: bPla, sec: bSec, reg: bReg, pfig: bPFig };

export function construir(key) {
  try {
    const [pref, tipo, ...p] = key.split(":");
    if ((pref !== "e" && pref !== "p") || !CONSTRUCTORES[tipo]) return null;
    const q = CONSTRUCTORES[tipo](p);
    return q ? { ...q, key } : null;
  } catch { return null; }
}

const CLAVES = {
  eq_incognita: [
    ...PAR_SUMA.map(([x, a], i) => `e:inc:s:${x}:${a}:${i}`),
    ...PAR_SUMA.slice(0, 12).map(([x, a], i) => `e:inc:t:${x}:${a}:${i + 2}`),
    ...PAR_SUMA.slice(0, 8).map(([x, a], i) => `e:inc:v:${x}:${a}:${i + 4}`),
    ...PAR_RESTA.map(([x, a], i) => `e:inc:r:${x}:${a}:${i + 1}`),
  ],
  eq_balanza: PAR_BAL.flatMap(([x, a]) => [`e:bal:d:${x}:${a}`, `e:bal:i:${x}:${a}`]),
  eq_comprobar: [
    ...PAR_COM.flatMap(([x, a], i) => [`e:com:op:s:${x}:${a}:${i}`, `e:com:cmp:s:${x}:${a}:${i + 1}`, `e:com:op:t:${x}:${a}:${i + 2}`, `e:com:cmp:t:${x}:${a}:${i + 3}`]),
    ...PAR_COM_R.flatMap(([x, a], i) => [`e:com:op:r:${x}:${a}:${i}`, `e:com:cmp:r:${x}:${a}:${i + 2}`]),
  ],
  eq_figuras: [
    ...X_DOBLE.map((x, i) => `e:fig:d:${x}:${i}`),
    ...X_TRIPLE.map((x, i) => `e:fig:t:${x}:${i + 1}`),
    ...CADENA.map(([x1, a, x2], i) => `e:fig:c:${x1}:${a}:${x2}:${i}`),
  ],
  eq_problemas: Object.entries(PAR_PRO).flatMap(([t, l]) => l.map(([x, a], i) => `e:pro:${t}:${x}:${a}:${i}`)),
  eq_plantea: Object.entries(PAR_PRO).flatMap(([t, l]) => l.map(([x, a], i) => `e:pla:${t}:${x}:${a}:${i + 1}`)),
  pa_secuencia: PAT.flatMap(([s, p]) => [2, 3, 4, 5].map(h => `p:sec:${s}:${p}:${h}`)),
  pa_regla: PAT.map(([s, p]) => `p:reg:${s}:${p}`),
  pa_figuras: PATRONES_FIG.flatMap(pat => SETS_FIG.slice(0, 4).flatMap((set, k) => Array.from({ length: pat.length }, (_, j) => `p:pfig:${pat}:${set}:${j}`).slice(0, 2 + (k % 2)))),
};

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

export const clavesDe = (modo) => CLAVES[modo] || [];
export const todasLasClaves = () => Object.values(CLAVES).flat();

// Ensayo: mezcla de todos los temas (más peso a lo que más se practicó en clases)
const REPARTO_ENSAYO = { eq_incognita: 3, eq_balanza: 1, eq_comprobar: 1, eq_figuras: 1, eq_problemas: 2, eq_plantea: 1, pa_secuencia: 3, pa_regla: 2, pa_figuras: 1 };
export function clavesEnsayo() {
  const out = [];
  Object.entries(REPARTO_ENSAYO).forEach(([m, n]) => out.push(...barajar(CLAVES[m]).slice(0, n)));
  return barajar(out);
}

export const esClaveEcuaciones = (item) => typeof item === "string" && (item.startsWith("e:") || item.startsWith("p:"));
