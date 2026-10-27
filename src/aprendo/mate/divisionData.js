// Matemáticas · Divisiones (guía de repaso de 3° Básico)
// Cada pregunta se identifica con una clave estable "d:<modo>:<parámetros>" para poder
// guardar el historial por alumno y rearmar la pregunta cuando necesita refuerzo.

export const MODOS = [
  { id: "resta", label: "Resta repetida", emoji: "🔁", color: "#f59e0b",
    desc: "Divide restando una y otra vez",
    recuerda: "La división se puede resolver con una resta repetida. Por ejemplo, 8 : 2 = 4 porque puedes restar 4 veces el 2 al 8." },
  { id: "reparto", label: "Repartir en partes iguales", emoji: "📦", color: "#10b981",
    desc: "¿Cuántos van en cada grupo? ¿Cuántos grupos salen?",
    recuerda: "Al repartir en grupos iguales, la división te dice cuántos hay en cada grupo o cuántos grupos puedes formar. Por ejemplo, 10 zanahorias en 5 canastos son 2 por canasto: 10 : 5 = 2." },
  { id: "tablas", label: "Tablas y divisiones", emoji: "✖️", color: "#3b82f6",
    desc: "Usa las tablas de multiplicar para dividir",
    recuerda: "Para dividir, pregúntate: ¿qué número multiplicado por el divisor da el dividendo? 20 : 5 = 4, porque 5 veces 4 es 20." },
  { id: "familias", label: "Multiplicar y dividir", emoji: "🧩", color: "#8b5cf6",
    desc: "Familias de operaciones y comprobación",
    recuerda: "La división es la operación inversa de la multiplicación. Con 3, 5 y 15 puedes escribir 3 • 5 = 15, 5 • 3 = 15, 15 : 5 = 3 y 15 : 3 = 5. Con la multiplicación compruebas la división." },
  { id: "problemas", label: "Problemas", emoji: "📖", color: "#ef4444",
    desc: "Lee, encuentra los datos y resuelve",
    recuerda: "Lee el problema, encuentra los datos (en rojo) y la pregunta (en azul), elige la operación y comprueba tu resultado con una multiplicación." },
];

const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// 3 números distintos, positivos y distintos de la respuesta correcta
const tresCerca = (correcta, candidatos) => {
  const out = [];
  for (const c of candidatos) {
    if (Number.isInteger(c) && c > 0 && c !== correcta && !out.includes(c)) out.push(c);
    if (out.length === 3) break;
  }
  for (let k = 1; out.length < 3; k++) { const c = correcta + k; if (!out.includes(c)) out.push(c); }
  return out.map(String);
};

const OBJETOS = [
  { e: "🍎", n: "manzanas", c: "bolsa", cs: "bolsas" },
  { e: "🍪", n: "galletas", c: "bandeja", cs: "bandejas" },
  { e: "⚽", n: "pelotas", c: "caja", cs: "cajas" },
  { e: "🥕", n: "zanahorias", c: "canasto", cs: "canastos" },
  { e: "🎈", n: "globos", c: "paquete", cs: "paquetes" },
  { e: "🍓", n: "frutillas", c: "plato", cs: "platos" },
];

const valida = ([a, op, b, r]) => (op === "•" ? a * b === r : op === ":" ? a / b === r : op === "+" ? a + b === r : false);
const txt = ([a, op, b, r]) => `${a} ${op} ${b} = ${r}`;
const tresFalsas = (cands) => {
  const out = [];
  for (const c of cands) { const t = txt(c); if (!valida(c) && !out.includes(t)) out.push(t); if (out.length === 3) break; }
  return out;
};

const PROBLEMAS = [
  (a, b) => `Matías arma cajas de sorpresas para su fiesta de cumpleaños. Si tiene ${a} sorpresas y cada caja tendrá ${b}, ¿cuántas cajas de sorpresas podrá completar?`,
  (a, b) => `La municipalidad de una comuna compró ${a} contenedores de reciclaje y entregará ${b} contenedores por sector. ¿Para cuántos sectores alcanzarán los contenedores?`,
  (a, b) => `Andrés resuelve cada día ${b} problemas matemáticos distintos. Si tiene una libreta con ${a} problemas, ¿cuántos días podrá resolver problemas sin repetirlos?`,
  (a, b) => `Iván tiene ${a} bolitas. Si las guarda en bolsas en las que caben ${b} bolitas, ¿cuántas bolsas necesita?`,
  (a, b) => `Ana tiene ${a} libros. Si guarda ${b} libros en cada una de las repisas de un mueble, ¿cuántas repisas del mueble ocupa para guardar todos sus libros?`,
  (a, b) => `Lucía guarda ${b} huevos en cada caja. Si tiene ${a} huevos, ¿cuántas cajas usará?`,
  (a, b) => `Leonardo agrupa de a ${b} manzanas para guardar en bolsas. Si debe guardar ${a} manzanas, ¿cuántas bolsas necesitará?`,
  (a, b) => `Se reparten ${a} lápices en partes iguales entre ${b} amigos. ¿Cuántos lápices recibe cada uno?`,
];

// ── Constructores de preguntas ─────────────────────────────────────────────
const resta = (b, q) => {
  const a = b * q;
  const pasos = rango(0, q - 1).map(i => `${a - i * b} − ${b} = ${a - (i + 1) * b}`);
  return {
    key: `d:resta:${b}:${q}`, modo: "resta", etiqueta: `Resta repetida · ${a} : ${b}`,
    enunciado: `¿Cuántas veces puedes restar ${b} de ${a} hasta llegar a 0?`, sub: `${a} : ${b} = ?`,
    visual: { tipo: "resta", a, b },
    correcta: String(q), malas: tresCerca(q, [q - 1, q + 1, q + 2, q - 2, b, a - b]),
    explicacion: `${pasos.join(" · ")}. Restaste el ${b} ${q} veces, entonces ${a} : ${b} = ${q}.`,
    solucion: `${a} : ${b} = ${q}`,
  };
};

const reparto = (tipo, g, q) => {
  const a = g * q;
  const o = OBJETOS[(g + q) % OBJETOS.length];
  const porGrupo = tipo === "g"; // true: se pide cuántos van en cada grupo · false: se pide cuántos grupos
  const resp = porGrupo ? q : g;
  const div = porGrupo ? g : q;
  return {
    key: `d:reparto:${tipo}:${g}:${q}`, modo: "reparto", etiqueta: `Reparto · ${a} : ${div}`,
    enunciado: porGrupo
      ? `Hay ${a} ${o.n} para repartir en partes iguales en ${g} ${o.cs}. ¿Cuántas ${o.n} van en cada ${o.c}?`
      : `Hay ${a} ${o.n}. Si en cada ${o.c} caben ${q}, ¿cuántas ${o.cs} se necesitan?`,
    sub: `${a} : ${div} = ?`,
    visual: { tipo: "reparto", a, g, q, e: o.e, porGrupo },
    correcta: String(resp), malas: tresCerca(resp, [resp - 1, resp + 1, resp + 2, resp - 2, a - div, div]),
    explicacion: `${a} : ${div} = ${resp}, porque ${div} • ${resp} = ${a}.`,
    solucion: `${a} : ${div} = ${resp}`,
  };
};

const tablas = (t, b, q) => {
  const a = b * q;
  if (t === "d") {
    return {
      key: `d:tablas:d:${b}:${q}`, modo: "tablas", etiqueta: `Tablas · ${a} : ${b}`,
      enunciado: `${a} : ${b} = ?`, sub: `Piensa: ¿qué número multiplicado por ${b} da ${a}?`, visual: null,
      correcta: String(q), malas: tresCerca(q, [q + 1, q - 1, q + 2, q - 2, b]),
      explicacion: `${b} • ${q} = ${a}, entonces ${a} : ${b} = ${q}.`, solucion: `${a} : ${b} = ${q}`,
    };
  }
  const correcta = `${b} • ${q}`;
  const cands = [[b, q + 1], [b, q - 1], [b + 1, q], [b - 1, q], [q, q], [b, b], [b + 1, q + 1]];
  const malas = [];
  for (const [x, y] of cands) {
    const s = `${x} • ${y}`;
    if (x > 0 && y > 0 && x * y !== a && !malas.includes(s) && s !== correcta) malas.push(s);
    if (malas.length === 3) break;
  }
  return {
    key: `d:tablas:m:${b}:${q}`, modo: "tablas", etiqueta: `Tablas · multiplicación que resuelve ${a} : ${b}`,
    enunciado: `${a} : ${b} = ?`, sub: "¿Qué multiplicación te ayuda a resolverla?", visual: null,
    correcta, malas,
    explicacion: `${b} • ${q} = ${a}, por eso ${a} : ${b} = ${q}.`, solucion: `${b} • ${q} = ${a}  →  ${a} : ${b} = ${q}`,
  };
};

const familias = (t, x, y) => {
  const z = x * y;
  if (t === "f") {
    const validas = [[x, "•", y, z], [y, "•", x, z], [z, ":", x, y], [z, ":", y, x]].map(txt);
    const unicas = [...new Set(validas)];
    const correcta = unicas[(x + y) % unicas.length];
    const malas = tresFalsas([[x, ":", z, y], [y, ":", z, x], [x, "•", z, y], [y, "•", z, x], [x, ":", y, z], [z, "•", x, y], [x, "+", y, z], [x, "•", y, z + x], [z, ":", x, x]]);
    return {
      key: `d:familias:f:${x}:${y}`, modo: "familias", etiqueta: `Familia · ${x}, ${y} y ${z}`,
      enunciado: `Con los números ${x}, ${y} y ${z}, ¿qué operación es correcta?`, sub: null, visual: null,
      correcta, malas,
      explicacion: `Con ${x}, ${y} y ${z}: ${unicas.join(" · ")}.`, solucion: unicas.join(" · "),
    };
  }
  const correcta = txt([x, "•", y, z]);
  const malas = tresFalsas([[z, "•", y, x], [x, "•", z, y], [y, "•", z, x], [x, "+", y, z], [x, "•", x, z], [y, "•", y, z], [x, "•", y, z + x], [x, "•", y, z - y]]);
  return {
    key: `d:familias:c:${x}:${y}`, modo: "familias", etiqueta: `Comprobar · ${z} : ${y} = ${x}`,
    enunciado: `${z} : ${y} = ${x}`, sub: "¿Qué multiplicación comprueba el resultado?", visual: null,
    correcta, malas,
    explicacion: `${x} • ${y} = ${z}, así que ${z} : ${y} = ${x} está bien.`, solucion: `${correcta}  →  ${z} : ${y} = ${x}`,
  };
};

const problemas = (t, b, q) => {
  const a = b * q;
  return {
    key: `d:problemas:${t}:${b}:${q}`, modo: "problemas", etiqueta: `Problema · ${a} : ${b}`,
    enunciado: PROBLEMAS[t](a, b), sub: null, visual: { tipo: "problema" },
    correcta: String(q), malas: tresCerca(q, [a - b, a + b, q + 1, q - 1, a * b > 200 ? q + 2 : a * b, q + 2]),
    explicacion: `${a} : ${b} = ${q}. Comprobación: ${q} • ${b} = ${a}.`, solucion: `${a} : ${b} = ${q}`,
  };
};

// ── API ──────────────────────────────────────────────────────────────────
export function construir(key) {
  const p = String(key).split(":");
  if (p[0] !== "d") return null;
  const n = (i) => parseInt(p[i], 10);
  try {
    if (p[1] === "resta" && n(2) > 0 && n(3) > 0) return resta(n(2), n(3));
    if (p[1] === "reparto" && (p[2] === "g" || p[2] === "k")) return reparto(p[2], n(3), n(4));
    if (p[1] === "tablas" && (p[2] === "d" || p[2] === "m")) return tablas(p[2], n(3), n(4));
    if (p[1] === "familias" && (p[2] === "f" || p[2] === "c")) return familias(p[2], n(3), n(4));
    if (p[1] === "problemas" && PROBLEMAS[n(2)]) return problemas(n(2), n(3), n(4));
  } catch {}
  return null;
}

const cache = {};
export function clavesDe(modo) {
  if (cache[modo]) return cache[modo];
  const k = [];
  if (modo === "resta") rango(2, 8).forEach(b => rango(2, 8).forEach(q => { if (b * q <= 40) k.push(`d:resta:${b}:${q}`); }));
  if (modo === "reparto") ["g", "k"].forEach(t => rango(2, 6).forEach(g => rango(2, 8).forEach(q => k.push(`d:reparto:${t}:${g}:${q}`))));
  if (modo === "tablas") ["d", "m"].forEach(t => rango(2, 9).forEach(b => rango(2, 10).forEach(q => k.push(`d:tablas:${t}:${b}:${q}`))));
  if (modo === "familias") ["f", "c"].forEach(t => rango(2, 10).forEach(x => rango(x, 10).forEach(y => k.push(`d:familias:${t}:${x}:${y}`))));
  if (modo === "problemas") PROBLEMAS.forEach((_, t) => rango(2, 9).forEach(b => rango(2, 10).forEach(q => k.push(`d:problemas:${t}:${b}:${q}`))));
  return (cache[modo] = k);
}

export const esClaveDivision = (item) => typeof item === "string" && item.startsWith("d:");
