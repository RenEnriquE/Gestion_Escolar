import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

// ── Paseos / eventos con listados por rubro ──────────────────────────────────
// Un evento (p. ej. "Paseo fin de año") tiene rubros (Cubierto, Adicional cubierto, Transporte, Regalo…)
// y, por cada alumno/familia, una cantidad (o Sí/No) en cada rubro. Se guarda en la tabla `configuracion`
// (clave "paseos"), así que no necesita cambios en la base de datos.

const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().trim();
const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const nuevoId = (p = "r") => p + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);

export const RUBROS_BASE = [
  { id: "cubierto", label: "Cubierto", tipo: "cant", conPago: false, suma: true },
  { id: "adic_cub", label: "Adicional cubierto o con descuento", tipo: "cant", conPago: false, suma: true },
  { id: "adic_pag", label: "Adicional por pagar", tipo: "cant", conPago: true, suma: true },
  { id: "nino", label: "Niño pequeño", tipo: "cant", conPago: false, suma: true },
  { id: "transp", label: "Transporte", tipo: "cant", conPago: false, suma: false },
  { id: "regalo", label: "Regalo", tipo: "si", conPago: false, suma: false },
];

// Planilla del paseo de fin de año 2026: [N° registro, nombre, apellido, cubierto, adic. cubierto, adic. por pagar, ¿pagado?, niño pequeño, transporte]
const PLANILLA = [
  [1, "Ignacio", "Mora", 2, 1, 0, 0, 1, 3], [2, "Derek", "Mina", 2, 1, 0, 0, 1, 3], [3, "Amir", "Zacarías", 2, 1, 0, 0, 1, 0],
  [4, "Amparo", "Marchant", 2, 0, 3, 1, 1, 0], [5, "Emiliano", "Soto", 2, 2, 0, 0, 1, 0], [6, "Benjamín", "Medina", 2, 0, 1, 1, 1, 0],
  [7, "Bruno", "Trujillo", 2, 0, 2, 1, 1, 0], [8, "Liliana", "Aguado", 2, 4, 0, 0, 0, 0], [9, "Vicente", "Loyola", 2, 1, 1, 1, 0, 0],
  [10, "Josefa", "Orellana", 2, 1, 0, 0, 0, 3], [11, "Vicente", "Muñoz", 2, 0, 1, 1, 0, 0], [12, "Maite", "Echeverria", 2, 0, 3, 1, 0, 5],
  [13, "Gahel", "Pinto", 2, 1, 0, 0, 0, 0], [14, "Mathias", "Dias", 2, 1, 0, 0, 0, 3], [15, "Mia", "Caraballo", 2, 2, 0, 0, 0, 4],
  [16, "Matías", "Vasquez", 2, 2, 0, 0, 0, 0], [17, "Simón", "Bahamondes", 2, 0, 0, 0, 0, 0], [18, "Laura", "Villegas", 2, 2, 0, 0, 0, 4],
  [19, "Agustina", "Rivera", 2, 1, 0, 0, 0, 0], [20, "Bastian", "Ferrada", 2, 1, 0, 0, 0, 0], [21, "Fredy", "Lino", 2, 1, 0, 0, 0, 3],
  [22, "Roberto", "Lillo", 2, 0, 1, 1, 0, 1], [23, "Korina", "Gallardo", 2, 2, 0, 0, 0, 4], [24, "Millan", "Vicuña", 2, 0, 1, 1, 0, 3],
  [25, "Aranza", "Molina", 2, 1, 0, 0, 0, 0], [26, "Luciana", "Cordovez", 2, 0, 1, 0, 0, 0], [27, "Matteo", "Notari", 2, 0, 1, 1, 0, 0],
  [28, "María", "Belén", 2, 1, 0, 0, 0, 3], [29, "Thiago", "Muñoz", 2, 0, 1, 0, 0, 3], [30, "Isabella", "Perez", 2, 0, 0, 0, 0, 0],
  [31, "Samara", "Tabares", 2, 0, 0, 0, 0, 2],
];

// Busca al alumno de la lista que corresponde a "nombre apellido" (tolera tildes y pequeñas diferencias de escritura)
export function casarAlumno(alumnos, nombre, apellido) {
  const N = norm(nombre), A = norm(apellido);
  const cand = alumnos.filter(a => { const p = norm(a.nombres); return p === N || p.split(" ")[0] === N; });
  if (!cand.length) return null;
  const sim = (a) => { const t = norm(a.apellidos).split(" ")[0]; return t === A ? 0 : (lev(t, A) <= 2 || t.startsWith(A) || A.startsWith(t)) ? 1 : 9; };
  const orden = [...cand].sort((x, y) => sim(x) - sim(y) || (x.externo ? 1 : 0) - (y.externo ? 1 : 0));
  if (sim(orden[0]) < 9) return { alumno: orden[0], dudoso: false };
  const propios = cand.filter(a => !a.externo);
  return propios.length === 1 ? { alumno: propios[0], dudoso: true } : null;
}

export function crearEventoDesdePlanilla(alumnos) {
  const datos = {}, dudosos = [], sinMatch = [];
  PLANILLA.forEach(([reg, n, a, cub, ac, ap, pg, nino, tr]) => {
    const m = casarAlumno(alumnos, n, a);
    if (!m) { sinMatch.push(`${reg}. ${n} ${a}`); return; }
    if (m.dudoso) dudosos.push(`${reg}. ${n} ${a} → ${m.alumno.nombres} ${m.alumno.apellidos}`);
    datos[m.alumno.id] = { _reg: reg, cubierto: cub, adic_cub: ac, adic_pag: ap, p_adic_pag: !!pg, nino, transp: tr };
  });
  return { evento: { id: nuevoId("ev"), nombre: "Paseo fin de año 2026", fecha: "2026-11-22", rubros: RUBROS_BASE.map(r => ({ ...r })), datos, listados: [] }, dudosos, sinMatch };
}

const nombreCorto = (a) => [a.nombres, a.apellidos].filter(Boolean).join(" ") || a.nombre || "";
const nombreLargo = (a) => [a.nombres, a.nombre2, a.apellidos, a.apellido2].filter(Boolean).join(" ") || a.nombre || "";

export default function Paseos({ alumnos, cols, data, setData, isAdmin, ui }) {
  const { PALETTE: P, Btn, Input, Modal } = ui;
  const eventos = data?.eventos || [];
  const [evId, setEvId] = useState(null);
  const ev = eventos.find(e => e.id === evId) || eventos[0] || null;
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("curso");
  const [filtros, setFiltros] = useState([]);        // ids de rubros o "ninguno" / "debe"
  const [modoF, setModoF] = useState("any");         // any = cualquiera · all = todos
  const [orden, setOrden] = useState("reg");
  const [sel, setSel] = useState(new Set());
  const [soloSel, setSoloSel] = useState(false);
  const [colsSel, setColsSel] = useState(new Set(["nombre_completo", "apod1_nombre", "apod1_cel"]));
  const [conAsiste, setConAsiste] = useState(true);
  const [conTotales, setConTotales] = useState(true);
  const [rubrosExp, setRubrosExp] = useState(null);  // null = todos los rubros
  const [panel, setPanel] = useState(null);          // null | "rubros" | "export" | "nuevo"
  const [nombreListado, setNombreListado] = useState("");
  const [bulk, setBulk] = useState({ rubro: "", valor: "1" });
  const [aviso, setAviso] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [ocultar, setOcultar] = useState(null);       // null = automático (oculta a quienes no tienen ningún rubro si ya hay datos cargados)
  const [tocados, setTocados] = useState(new Set());  // filas editadas en esta sesión: no se esconden mientras se editan

  const upd = (fn) => setData(d => ({ ...d, eventos: (d.eventos || []).map(e => e.id === ev.id ? fn(e) : e) }));
  const rubros = ev?.rubros || [];
  const val = (alId, rid) => Number(ev?.datos?.[alId]?.[rid]) || 0;
  const pago = (alId, rid) => !!ev?.datos?.[alId]?.["p_" + rid];
  const setCampo = (alId, clave, v) => { setTocados(s => new Set(s).add(alId)); setCampo0(alId, clave, v); };
  const setCampo0 = (alId, clave, v) => upd(e => ({ ...e, datos: { ...e.datos, [alId]: { ...(e.datos?.[alId] || {}), [clave]: v } } }));

  const enScope = useMemo(() => alumnos.filter(a => scope === "todos" || (scope === "externos" ? a.externo : !a.externo)), [alumnos, scope]);

  const ocultarEf = ocultar ?? Object.keys(ev?.datos || {}).length > 0;
  const tokenOk = (a, t) => {
    if (t === "ninguno") return rubros.every(r => val(a.id, r.id) === 0);
    if (t === "debe") return rubros.some(r => r.conPago && val(a.id, r.id) > 0 && !pago(a.id, r.id));
    return val(a.id, t) > 0;
  };

  const filas = useMemo(() => {
    const t = norm(q);
    const lista = enScope.filter(a => {
      if (t && !norm(`${a.nombres} ${a.nombre2} ${a.apellidos} ${a.apellido2} ${a.apod1_nombre || a.apoderado || ""} ${a.apod2_nombre || a.apoderado2 || ""}`).includes(t)) return false;
      if (soloSel && !sel.has(a.id)) return false;
      if (ocultarEf && !t && !filtros.includes("ninguno") && !tocados.has(a.id) && rubros.every(r => val(a.id, r.id) === 0)) return false;
      if (filtros.length) return modoF === "all" ? filtros.every(f => tokenOk(a, f)) : filtros.some(f => tokenOk(a, f));
      return true;
    });
    const reg = (a) => ev?.datos?.[a.id]?._reg ?? 9999;
    const cmp = (x, y) => String(x || "").localeCompare(String(y || ""), "es", { numeric: true });
    return lista.sort((a, b) => orden === "reg" ? (reg(a) - reg(b) || cmp(a.apellidos, b.apellidos)) : orden === "nombre" ? cmp(a.nombres, b.nombres) || cmp(a.apellidos, b.apellidos) : cmp(a.apellidos, b.apellidos) || cmp(a.nombres, b.nombres));
  }, [enScope, q, soloSel, sel, filtros, modoF, orden, ev, ocultarEf, tocados]);

  const totalDe = (lista, r) => lista.reduce((s, a) => s + val(a.id, r.id), 0);
  const familiasDe = (lista, r) => lista.filter(a => val(a.id, r.id) > 0).length;
  const porPagarDe = (lista, r) => lista.filter(a => val(a.id, r.id) > 0 && !pago(a.id, r.id)).reduce((s, a) => s + val(a.id, r.id), 0);
  const totalAsistentes = (lista) => rubros.filter(r => r.suma).reduce((s, r) => s + totalDe(lista, r), 0);

  const toggleFiltro = (t) => setFiltros(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t]);
  const descFiltro = () => {
    const marcados = sel.size > 0 && !soloSel ? " · solo marcados ☑" : "";
    if (!filtros.length) return "Lista completa" + marcados;
    const nom = (t) => t === "ninguno" ? "Sin ningún rubro" : t === "debe" ? "Con pago pendiente" : rubros.find(r => r.id === t)?.label || t;
    return filtros.map(nom).join(modoF === "all" ? " y " : " o ") + marcados;
  };

  // ── Exportar ──────────────────────────────────────────────────────────────
  const colsFicha = cols.filter(c => colsSel.has(c.id));
  const rubrosOut = rubros.filter(r => !rubrosExp || rubrosExp.includes(r.id));
  const baseLista = soloSel || sel.size === 0 ? filas : filas.filter(a => sel.has(a.id));
  const construirAOA = (lista, rubs = rubrosOut, opts = {}) => {
    const header = ["N°", ...colsFicha.map(c => c.label), ...rubs.flatMap(r => r.conPago ? [r.label, `${r.label} (pago)`] : [r.label]), ...(conAsiste && !opts.sinAsiste ? ["Asiste"] : [])];
    const cuerpo = lista.map((a, i) => [i + 1, ...colsFicha.map(c => c.get(a)), ...rubs.flatMap(r => {
      const v = val(a.id, r.id);
      const celda = r.tipo === "si" ? (v ? "Sí" : "") : (v || "");
      return r.conPago ? [celda, v ? (pago(a.id, r.id) ? "Pagado" : "Por pagar") : ""] : [celda];
    }), ...(conAsiste && !opts.sinAsiste ? [""] : [])]);
    const filaTot = conTotales && !opts.sinTotales ? [["", ...colsFicha.map((_, i) => i === 0 ? "TOTAL" : ""), ...rubs.flatMap(r => r.tipo === "si" ? [familiasDe(lista, r)].concat(r.conPago ? [""] : []) : (r.conPago ? [totalDe(lista, r), `${porPagarDe(lista, r)} por pagar`] : [totalDe(lista, r)])), ...(conAsiste ? [""] : [])]] : [];
    return [header, ...cuerpo, ...filaTot];
  };
  const anchos = (aoa) => aoa[0].map((h, i) => ({ wch: Math.min(Math.max(String(h).length, ...aoa.slice(1).map(r => String(r[i] ?? "").length)) + 2, 40) }));
  const hojaDe = (aoa, titulo) => {
    const ws = XLSX.utils.aoa_to_sheet(titulo ? [[titulo], [], ...aoa] : aoa);
    ws["!cols"] = anchos(aoa);
    ws["!pageSetup"] = { orientation: "landscape", fitToWidth: 1, fitToHeight: 0 };
    return ws;
  };
  const nombreArchivo = (suf) => `${(ev?.nombre || "evento").replace(/[^\p{L}\p{N}]+/gu, "_")}_${suf}.xlsx`;

  const exportarLista = () => {
    const lista = baseLista;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, hojaDe(construirAOA(lista), `${ev.nombre} · ${descFiltro()}`), "Listado");
    XLSX.writeFile(wb, nombreArchivo("listado"));
    setAviso(`Se exportaron ${lista.length} filas.`);
  };

  const exportarPorRubro = () => {
    const wb = XLSX.utils.book_new();
    const resumen = [["Rubro", "Familias", "Total", "Por pagar"], ...rubros.map(r => [r.label, familiasDe(enScope, r), totalDe(enScope, r), r.conPago ? porPagarDe(enScope, r) : ""]), [], ["Total asistentes", "", totalAsistentes(enScope), ""]];
    XLSX.utils.book_append_sheet(wb, hojaDe(resumen), "Resumen");
    const usados = new Set(["Resumen"]);
    rubros.forEach(r => {
      const lista = enScope.filter(a => val(a.id, r.id) > 0).sort((a, b) => String(a.apellidos).localeCompare(String(b.apellidos), "es"));
      let nombre = r.label.replace(/[\\/?*[\]:]/g, "").slice(0, 28) || "Rubro";
      for (let k = 2; usados.has(nombre); k++) nombre = nombre.slice(0, 26) + " " + k;
      usados.add(nombre);
      XLSX.utils.book_append_sheet(wb, hojaDe(construirAOA(lista, [r], { sinAsiste: false }), `${ev.nombre} · ${r.label}`), nombre);
    });
    XLSX.writeFile(wb, nombreArchivo("por_rubro"));
    setAviso(`Se creó 1 hoja de resumen y ${rubros.length} hojas (una por rubro).`);
  };

  const imprimir = () => {
    const aoa = construirAOA(baseLista);
    const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(ev.nombre)}</title><style>
      @page { size: landscape; margin: 12mm; } body { font-family: Arial, sans-serif; color: #111; }
      h1 { font-size: 18px; margin: 0 0 2px; } p { margin: 0 0 10px; font-size: 12px; color: #444; }
      table { border-collapse: collapse; width: 100%; font-size: 12px; } th, td { border: 1px solid #555; padding: 4px 6px; text-align: left; }
      th { background: #e5e7eb; } tr:last-child td { font-weight: bold; } td:first-child, th:first-child { text-align: center; width: 28px; }
    </style></head><body><h1>${esc(ev.nombre)}${ev.fecha ? " · " + esc(ev.fecha.split("-").reverse().join("/")) : ""}</h1><p>${esc(descFiltro())} · ${baseLista.length} filas</p>
    <table><thead><tr>${aoa[0].map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${aoa.slice(1).map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>
    <script>window.onload=function(){setTimeout(function(){window.print()},300)}</script></body></html>`;
    const w = window.open("", "_blank");
    if (!w) { setAviso("El navegador bloqueó la ventana de impresión. Permite las ventanas emergentes o usa «Exportar a Excel» y desde Excel imprime."); return; }
    w.document.write(html); w.document.close();
  };

  // ── Listados guardados ────────────────────────────────────────────────────
  const guardarListado = () => {
    const nombre = nombreListado.trim(); if (!nombre) return;
    upd(e => ({ ...e, listados: [...(e.listados || []).filter(l => l.nombre !== nombre), { id: nuevoId("l"), nombre, filtros, modo: modoF, orden, cols: [...colsSel], rubrosExp, asiste: conAsiste }] }));
    setNombreListado("");
  };
  const aplicarListado = (l) => { setFiltros(l.filtros || []); setModoF(l.modo || "any"); setOrden(l.orden || "reg"); if (l.cols) setColsSel(new Set(l.cols)); setRubrosExp(l.rubrosExp || null); setConAsiste(l.asiste !== false); setSoloSel(false); };

  // ── Acciones masivas ──────────────────────────────────────────────────────
  const aplicarMasivo = (limpiar = false) => {
    const r = rubros.find(x => x.id === bulk.rubro); if (!r) return;
    const v = limpiar ? 0 : Math.max(0, Number(bulk.valor) || 0);
    if (!window.confirm(`${limpiar ? "Dejar en 0" : `Poner ${v}`} en «${r.label}» para las ${filas.length} filas que se ven. ¿Continuar?`)) return;
    setTocados(s => new Set([...s, ...filas.map(a => a.id)]));
    upd(e => { const datos = { ...e.datos }; filas.forEach(a => { datos[a.id] = { ...(datos[a.id] || {}), [r.id]: r.tipo === "si" ? (v ? 1 : 0) : v }; }); return { ...e, datos }; });
  };

  const crearEvento = (conBase) => {
    const nombre = nuevoNombre.trim() || "Nuevo evento";
    const nuevo = { id: nuevoId("ev"), nombre, fecha: "", rubros: (conBase && ev ? ev.rubros : RUBROS_BASE).map(r => ({ ...r })), datos: {}, listados: [] };
    setData(d => ({ ...d, eventos: [...(d.eventos || []), nuevo] }));
    setEvId(nuevo.id); setNuevoNombre(""); setPanel(null);
  };
  const cargarPlanilla = () => {
    const { evento, dudosos, sinMatch } = crearEventoDesdePlanilla(alumnos);
    setData(d => ({ ...d, eventos: [...(d.eventos || []), evento] }));
    setEvId(evento.id);
    setAviso(`Se cargó la planilla: ${Object.keys(evento.datos).length} de ${PLANILLA.length} alumnos.` + (dudosos.length ? ` Revisa estos nombres: ${dudosos.join(" · ")}.` : "") + (sinMatch.length ? ` No encontrados: ${sinMatch.join(" · ")}.` : ""));
  };

  const card = { background: P.card, border: `1px solid ${P.border}`, borderRadius: 14 };
  const chip = (on, color = P.accent) => ({ background: on ? color : "transparent", color: on ? "white" : P.text, border: `1px solid ${on ? color : P.border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" });
  const selStyle = { background: P.bg, border: `1px solid ${P.border}`, borderRadius: 8, padding: "6px 8px", color: P.text, fontSize: 12 };

  // ── Sin eventos todavía ───────────────────────────────────────────────────
  if (!ev) {
    return (
      <div style={{ ...card, padding: 24 }}>
        <div style={{ color: P.text, fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Eventos y listados (paseos)</div>
        <div style={{ color: P.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
          Aquí llevas un evento (por ejemplo el paseo de fin de año) con rubros como Cubierto, Adicional cubierto, Adicional por pagar, Niño pequeño, Transporte o Regalo.
          Marcas rápido a cada familia, ves los totales y exportas a Excel o imprimes el listado que necesites.
        </div>
        {isAdmin ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn onClick={cargarPlanilla}>Cargar la planilla del paseo (31 familias)</Btn>
            <Btn variant="ghost" onClick={() => crearEvento(false)}>Crear un evento vacío</Btn>
          </div>
        ) : <div style={{ color: P.muted, fontSize: 13 }}>Todavía no hay eventos creados.</div>}
        {aviso && <div style={{ marginTop: 14, color: P.text, fontSize: 13, background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 10, padding: 10 }}>{aviso}</div>}
      </div>
    );
  }

  const estrecho = typeof window !== "undefined" && window.innerWidth < 700;
  const hayPagoPend = rubros.some(r => r.conPago);

  return (
    <div>
      {/* Evento + acciones */}
      <div style={{ ...card, padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <select value={ev.id} onChange={e => { setEvId(e.target.value); setFiltros([]); setSel(new Set()); }} style={{ ...selStyle, fontSize: 14, fontWeight: 700 }}>
              {eventos.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
            {ev.fecha && <span style={{ color: P.muted, fontSize: 12 }}>{ev.fecha.split("-").reverse().join("/")}</span>}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {isAdmin && <Btn variant="ghost" small onClick={() => setPanel(panel === "rubros" ? null : "rubros")}>⚙️ Rubros y evento</Btn>}
            {isAdmin && <Btn variant="ghost" small onClick={() => setPanel(panel === "nuevo" ? null : "nuevo")}>＋ Nuevo evento</Btn>}
            <Btn variant="ghost" small onClick={() => setPanel(panel === "export" ? null : "export")}>📤 Exportar / imprimir</Btn>
          </div>
        </div>
        {aviso && <div style={{ marginTop: 10, color: P.text, fontSize: 12.5, background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 10, padding: 8, display: "flex", justifyContent: "space-between", gap: 8 }}><span>{aviso}</span><button onClick={() => setAviso("")} style={{ background: "none", border: "none", cursor: "pointer", color: P.muted }}>✕</button></div>}
      </div>

      {/* Resumen por rubro (también sirve de filtro rápido) */}
      <div style={{ ...card, padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          <span style={{ color: P.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Toca un rubro para ver solo a quienes lo tienen</span>
          <span style={{ color: P.text, fontSize: 13, fontWeight: 700 }}>Total asistentes: {totalAsistentes(enScope)}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {rubros.map(r => (
            <button key={r.id} onClick={() => toggleFiltro(r.id)} style={chip(filtros.includes(r.id))}>
              {r.label} · {r.tipo === "si" ? familiasDe(enScope, r) : `${totalDe(enScope, r)} (${familiasDe(enScope, r)} fam.)`}
              {r.conPago && porPagarDe(enScope, r) > 0 ? ` · ${porPagarDe(enScope, r)} por pagar` : ""}
            </button>
          ))}
          {hayPagoPend && <button onClick={() => toggleFiltro("debe")} style={chip(filtros.includes("debe"), "#b45309")}>💲 Con pago pendiente</button>}
          <button onClick={() => toggleFiltro("ninguno")} style={chip(filtros.includes("ninguno"), "#64748b")}>Sin ningún rubro</button>
        </div>
        {(ev.listados || []).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10, alignItems: "center" }}>
            <span style={{ color: P.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Mis listados:</span>
            {ev.listados.map(l => (
              <span key={l.id} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <button onClick={() => aplicarListado(l)} style={chip(false, P.purple)}>📋 {l.nombre}</button>
                {isAdmin && <button title="Borrar listado" onClick={() => upd(e => ({ ...e, listados: e.listados.filter(x => x.id !== l.id) }))} style={{ background: "none", border: "none", cursor: "pointer", color: P.muted, fontSize: 11 }}>✕</button>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Panel: nuevo evento */}
      {panel === "nuevo" && isAdmin && (
        <div style={{ ...card, padding: 14, marginBottom: 12 }}>
          <div style={{ color: P.text, fontWeight: 700, marginBottom: 8 }}>Nuevo evento</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 220px" }}><Input placeholder="Nombre (ej. Paseo de curso 2027)" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} /></div>
            <Btn small onClick={() => crearEvento(true)}>Crear con los mismos rubros</Btn>
            <Btn small variant="ghost" onClick={() => crearEvento(false)}>Crear con rubros básicos</Btn>
          </div>
        </div>
      )}

      {/* Panel: rubros y datos del evento */}
      {panel === "rubros" && isAdmin && (
        <div style={{ ...card, padding: 14, marginBottom: 12 }}>
          <div style={{ color: P.text, fontWeight: 700, marginBottom: 10 }}>Evento y rubros</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ flex: "1 1 220px" }}><Input value={ev.nombre} onChange={e => upd(x => ({ ...x, nombre: e.target.value }))} /></div>
            <div style={{ flex: "0 1 160px" }}><Input type="date" value={ev.fecha || ""} onChange={e => upd(x => ({ ...x, fecha: e.target.value }))} /></div>
          </div>
          {rubros.map((r, i) => (
            <div key={r.id} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", padding: "8px 0", borderTop: `1px solid ${P.border}` }}>
              <div style={{ flex: "1 1 200px" }}><Input value={r.label} onChange={e => upd(x => ({ ...x, rubros: x.rubros.map(z => z.id === r.id ? { ...z, label: e.target.value } : z) }))} /></div>
              <select value={r.tipo} onChange={e => upd(x => ({ ...x, rubros: x.rubros.map(z => z.id === r.id ? { ...z, tipo: e.target.value } : z) }))} style={selStyle}>
                <option value="cant">Cantidad</option><option value="si">Sí / No</option>
              </select>
              <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={!!r.conPago} onChange={e => upd(x => ({ ...x, rubros: x.rubros.map(z => z.id === r.id ? { ...z, conPago: e.target.checked } : z) }))} />Con pago</label>
              <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={!!r.suma} onChange={e => upd(x => ({ ...x, rubros: x.rubros.map(z => z.id === r.id ? { ...z, suma: e.target.checked } : z) }))} />Suma a asistentes</label>
              <button disabled={i === 0} onClick={() => upd(x => { const a = [...x.rubros]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return { ...x, rubros: a }; })} style={{ ...selStyle, cursor: "pointer" }}>↑</button>
              <button disabled={i === rubros.length - 1} onClick={() => upd(x => { const a = [...x.rubros]; [a[i + 1], a[i]] = [a[i], a[i + 1]]; return { ...x, rubros: a }; })} style={{ ...selStyle, cursor: "pointer" }}>↓</button>
              <button onClick={() => { if (window.confirm(`¿Quitar el rubro «${r.label}»? Se pierden sus datos en este evento.`)) upd(x => ({ ...x, rubros: x.rubros.filter(z => z.id !== r.id) })); }} style={{ ...selStyle, cursor: "pointer", color: P.red }}>🗑</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            <Btn small onClick={() => upd(x => ({ ...x, rubros: [...x.rubros, { id: nuevoId("r"), label: "Nuevo rubro", tipo: "cant", conPago: false, suma: false }] }))}>＋ Agregar rubro</Btn>
            <Btn small variant="ghost" onClick={() => { if (window.confirm(`¿Borrar el evento «${ev.nombre}» con todos sus datos? No se puede deshacer.`)) { setData(d => ({ ...d, eventos: d.eventos.filter(e => e.id !== ev.id) })); setEvId(null); setPanel(null); } }}><span style={{ color: P.red }}>Borrar evento</span></Btn>
          </div>
        </div>
      )}

      {/* Panel: exportar */}
      {panel === "export" && (
        <div style={{ ...card, padding: 14, marginBottom: 12 }}>
          <div style={{ color: P.text, fontWeight: 700, marginBottom: 4 }}>Exportar o imprimir</div>
          <div style={{ color: P.muted, fontSize: 12, marginBottom: 10 }}>Sale lo que ves ahora ({descFiltro()}): {baseLista.length} filas{sel.size > 0 && !soloSel ? ` (solo los ${sel.size} marcados con ☑)` : ""}.</div>
          <div style={{ color: P.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Datos del alumno a incluir</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 10 }}>
            {cols.map(c => <label key={c.id} style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={colsSel.has(c.id)} onChange={() => setColsSel(s => { const n = new Set(s); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; })} />{c.label}</label>)}
          </div>
          <div style={{ color: P.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Rubros a incluir</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 10 }}>
            {rubros.map(r => <label key={r.id} style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={!rubrosExp || rubrosExp.includes(r.id)} onChange={() => setRubrosExp(cur => { const base = cur || rubros.map(x => x.id); const n = base.includes(r.id) ? base.filter(x => x !== r.id) : [...base, r.id]; return n.length === rubros.length ? null : n; })} />{r.label}</label>)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={conAsiste} onChange={e => setConAsiste(e.target.checked)} />Columna «Asiste» vacía (para marcar en papel)</label>
            <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={conTotales} onChange={e => setConTotales(e.target.checked)} />Fila de totales</label>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn small onClick={exportarLista}>📥 Excel: esta lista</Btn>
            <Btn small variant="ghost" onClick={exportarPorRubro}>📥 Excel: una hoja por rubro</Btn>
            <Btn small variant="ghost" onClick={imprimir}>🖨️ Imprimir</Btn>
          </div>
          {isAdmin && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14, alignItems: "center", borderTop: `1px solid ${P.border}`, paddingTop: 12 }}>
              <span style={{ color: P.muted, fontSize: 12 }}>Guardar esta configuración (filtros, orden y columnas) como listado:</span>
              <div style={{ flex: "1 1 160px", maxWidth: 240 }}><Input placeholder="Ej. Lista de transporte" value={nombreListado} onChange={e => setNombreListado(e.target.value)} /></div>
              <Btn small variant="ghost" onClick={guardarListado}>Guardar listado</Btn>
            </div>
          )}
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
        <div style={{ flex: "1 1 180px", maxWidth: 260 }}><Input placeholder="Buscar alumno o apoderado…" value={q} onChange={e => setQ(e.target.value)} style={{ fontSize: 12 }} /></div>
        <select value={scope} onChange={e => setScope(e.target.value)} style={selStyle}>
          <option value="curso">Del curso</option><option value="externos">Otros cursos / hermanos</option><option value="todos">Todos</option>
        </select>
        <select value={orden} onChange={e => setOrden(e.target.value)} style={selStyle}>
          <option value="reg">Orden: N° de planilla</option><option value="apellido">Orden: apellido</option><option value="nombre">Orden: nombre</option>
        </select>
        {filtros.length > 1 && (
          <select value={modoF} onChange={e => setModoF(e.target.value)} style={selStyle}>
            <option value="any">Cumple cualquiera de los filtros</option><option value="all">Cumple todos los filtros</option>
          </select>
        )}
        {filtros.length > 0 && <Btn small variant="ghost" onClick={() => setFiltros([])}>Quitar filtros</Btn>}
        <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={ocultarEf} onChange={e => setOcultar(e.target.checked)} />Ocultar a quienes no tienen ningún rubro</label>
        <label style={{ fontSize: 12, color: P.text, display: "flex", gap: 4, alignItems: "center" }}><input type="checkbox" checked={soloSel} onChange={e => setSoloSel(e.target.checked)} />Solo marcados ☑ ({sel.size})</label>
        <Btn small variant="ghost" onClick={() => setSel(new Set(filas.map(a => a.id)))}>Marcar los {filas.length} visibles</Btn>
        {sel.size > 0 && <Btn small variant="ghost" onClick={() => { setSel(new Set()); setSoloSel(false); }}>Desmarcar todo</Btn>}
      </div>

      {/* Acciones masivas */}
      {isAdmin && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
          <span style={{ color: P.muted, fontSize: 12 }}>Aplicar a todas las filas visibles:</span>
          <select value={bulk.rubro} onChange={e => setBulk(b => ({ ...b, rubro: e.target.value }))} style={selStyle}>
            <option value="">— rubro —</option>{rubros.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <input type="number" min="0" value={bulk.valor} onChange={e => setBulk(b => ({ ...b, valor: e.target.value }))} style={{ ...selStyle, width: 60 }} />
          <Btn small variant="ghost" onClick={() => aplicarMasivo(false)}>Poner valor</Btn>
          <Btn small variant="ghost" onClick={() => aplicarMasivo(true)}>Dejar en 0</Btn>
        </div>
      )}

      {/* Tabla */}
      <div style={{ ...card, overflow: "hidden" }}>
        <div style={{ overflow: "auto", maxHeight: "68vh" }}>
          <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", top: 0, left: 0, zIndex: 3, background: P.bg, padding: "8px 10px", textAlign: "left", borderBottom: `1px solid ${P.border}`, minWidth: estrecho ? 140 : 200, color: P.muted, fontSize: 11, textTransform: "uppercase" }}>{estrecho ? "☑ Alumno" : "☑ · N° · Alumno"}</th>
                {rubros.map(r => <th key={r.id} style={{ position: "sticky", top: 0, zIndex: 2, background: P.bg, padding: "8px 8px", borderBottom: `1px solid ${P.border}`, color: P.muted, fontSize: 11, textTransform: "uppercase", minWidth: 92, textAlign: "center" }}>{r.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {filas.map(a => (
                <tr key={a.id} style={{ background: sel.has(a.id) ? P.accent + "14" : "transparent" }}>
                  <td style={{ position: "sticky", left: 0, zIndex: 1, background: sel.has(a.id) ? "#e8eef6" : P.card, padding: "6px 10px", borderBottom: `1px solid ${P.border}`, whiteSpace: "nowrap" }}>
                    <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" checked={sel.has(a.id)} onChange={() => setSel(s => { const n = new Set(s); n.has(a.id) ? n.delete(a.id) : n.add(a.id); return n; })} />
                      {!estrecho && <span style={{ color: P.muted, fontSize: 11, minWidth: 18 }}>{ev.datos?.[a.id]?._reg ?? ""}</span>}
                      <span style={{ color: P.text, fontWeight: 600, fontSize: estrecho ? 12 : 13, whiteSpace: estrecho ? "normal" : "nowrap", lineHeight: 1.2 }}>{nombreCorto(a)}</span>
                      {a.externo && <span style={{ color: P.orange, fontSize: 10, border: `1px solid ${P.orange}`, borderRadius: 4, padding: "0 4px" }}>otro curso</span>}
                    </label>
                  </td>
                  {rubros.map(r => {
                    const v = val(a.id, r.id);
                    const pg = pago(a.id, r.id);
                    return (
                      <td key={r.id} style={{ padding: "4px 6px", borderBottom: `1px solid ${P.border}`, textAlign: "center", background: v > 0 ? (r.conPago ? (pg ? "#dbeafe" : "#fef3c7") : "#ecfdf5") : "transparent" }}>
                        {r.tipo === "si" ? (
                          isAdmin
                            ? <button onClick={() => setCampo(a.id, r.id, v ? 0 : 1)} style={{ width: 34, height: 30, borderRadius: 8, border: `1px solid ${v ? "#15803d" : P.border}`, background: v ? "#15803d" : "transparent", color: v ? "white" : P.muted, cursor: "pointer", fontWeight: 800 }}>{v ? "✓" : ""}</button>
                            : (v ? "✓" : "")
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            {isAdmin
                              ? <input type="number" inputMode="numeric" min="0" value={v === 0 ? "" : v} placeholder="–" onChange={e => setCampo(a.id, r.id, Math.max(0, Math.floor(Number(e.target.value) || 0)))} style={{ width: 46, textAlign: "center", border: `1px solid ${P.border}`, borderRadius: 6, padding: "5px 2px", fontSize: 14, fontWeight: 700, background: "white", color: P.text }} />
                              : <b>{v || ""}</b>}
                            {r.conPago && v > 0 && (
                              <button disabled={!isAdmin} title={pg ? "Pagado" : "Por pagar"} onClick={() => setCampo(a.id, "p_" + r.id, !pg)} style={{ border: "none", borderRadius: 6, padding: "4px 6px", fontSize: 11, fontWeight: 800, cursor: isAdmin ? "pointer" : "default", background: pg ? "#1d4ed8" : "#b45309", color: "white" }}>{pg ? "Pagó" : "Debe"}</button>
                            )}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {filas.length === 0 && <tr><td colSpan={rubros.length + 1} style={{ padding: 24, textAlign: "center", color: P.muted }}>No hay alumnos con esos filtros.</td></tr>}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ position: "sticky", left: 0, bottom: 0, zIndex: 2, background: P.bg, padding: "8px 10px", fontWeight: 800, color: P.text, borderTop: `2px solid ${P.border}` }}>Totales ({filas.length} filas)</td>
                {rubros.map(r => (
                  <td key={r.id} style={{ position: "sticky", bottom: 0, background: P.bg, padding: "8px 6px", textAlign: "center", fontWeight: 800, color: P.text, borderTop: `2px solid ${P.border}` }}>
                    {r.tipo === "si" ? familiasDe(filas, r) : totalDe(filas, r)}
                    {r.conPago && porPagarDe(filas, r) > 0 && <div style={{ color: "#b45309", fontSize: 10, fontWeight: 700 }}>{porPagarDe(filas, r)} por pagar</div>}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {!isAdmin && <div style={{ color: P.muted, fontSize: 12, marginTop: 8 }}>Solo los administradores pueden modificar los datos; tú puedes ver, filtrar, exportar e imprimir.</div>}
    </div>
  );
}
