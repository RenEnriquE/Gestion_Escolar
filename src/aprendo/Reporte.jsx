import { PREGUNTAS as PREG_EFRAIN } from "./lenguaje/efrainData.js";
import { VOCAB } from "./ingles/unit4Data.js";
import { INICIO } from "./ingles/unit4Oraciones.js";
import { construir as construirDivision } from "./mate/divisionData.js";
import { construir as construirPlantas } from "./ciencias/plantasData.js";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase.js";
import { usePermisos } from "./permisos.js";
import { cargarRespuestas, analizarItems } from "./registro.js";

// Respuesta correcta de un ítem registrado, según su clave (para repasar en voz alta con los alumnos)
const respuestaCorrecta = (item) => {
  if (item.startsWith("l:efrain:")) return PREG_EFRAIN.find(p => p.key === item)?.correcta || null;
  if (item.startsWith("v:")) { const v = VOCAB.find(x => x.en === item.slice(2)); return v ? `${v.en} = ${v.es}` : null; }
  if (item.startsWith("o:")) { const [animal, tipo, resp] = item.slice(2).split("|"); return INICIO[tipo] ? `${animal}: ${INICIO[tipo]} ${resp}.` : null; }
  if (item.startsWith("d:")) return construirDivision(item)?.solucion || null;
  if (item.startsWith("c:")) return construirPlantas(item)?.solucion || null;
  if (item.startsWith("m:")) { const p = item.split(":"); return p[2] || null; }
  return null;
};


const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", amarillo = "#f59e0b";
const card = "#1e293b", border = "#334155", muted = "#94a3b8";

const ACTIVIDADES = [
  { id: "todas", label: "Todas las actividades" },
  { id: "ingles.unit4", label: "Inglés · Unit 4: Vocabulario" },
  { id: "ingles.unit4oraciones", label: "Inglés · Unit 4: Complete the sentence" },
  { id: "lenguaje.efrain", label: "Lenguaje · Efraín en La Vega" },
  { id: "matematicas.cuadricula", label: "Hab. Matemáticas · Encuentra la casilla" },
  { id: "matematicas.localizar", label: "Hab. Matemáticas · Localiza los objetos" },
  { id: "matematicas.mapa", label: "Hab. Matemáticas · Mapa del Reino" },
  { id: "mate.resta", label: "Matemáticas · Resta repetida" },
  { id: "mate.reparto", label: "Matemáticas · Repartir en partes iguales" },
  { id: "mate.tablas", label: "Matemáticas · Tablas y divisiones" },
  { id: "mate.familias", label: "Matemáticas · Multiplicar y dividir" },
  { id: "mate.problemas", label: "Matemáticas · Problemas" },
  { id: "ciencias.partes", label: "Ciencias · Plantas: Partes de la planta" },
  { id: "ciencias.funciones", label: "Ciencias · Plantas: ¿Qué función cumple cada parte?" },
  { id: "ciencias.necesidades", label: "Ciencias · Plantas: Lo que necesitan" },
  { id: "ciencias.fotosintesis", label: "Ciencias · Plantas: Fotosíntesis" },
  { id: "ciencias.orden", label: "Ciencias · Plantas: Ordena la fotosíntesis" },
  { id: "ciencias.ensayo", label: "Ciencias · Plantas: Ensayo de la prueba" },
];

const ASIGNATURAS = [
  { id: "total", label: "Total" },
  { id: "ingles", label: "Inglés" },
  { id: "lenguaje", label: "Lenguaje" },
  { id: "mate", label: "Matemáticas" },
  { id: "matematicas", label: "Hab. Matemáticas" },
  { id: "ciencias", label: "Ciencias" },
];
const dia = (f) => { try { return new Date(f).toLocaleDateString("sv-SE"); } catch { return ""; } };
const fechaCorta = (f) => { try { return new Date(f).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit" }); } catch { return ""; } };

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const colorAcierto = (p) => (p >= 80 ? verde : p >= 50 ? amarillo : rojo);

const Tile = ({ valor, label, color = "white" }) => (
  <div style={{ flex: "1 1 120px", background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
    <div style={{ color, fontSize: 28, fontWeight: 900 }}>{valor}</div>
    <div style={{ color: muted, fontSize: 12 }}>{label}</div>
  </div>
);

const Titulo = ({ children }) => (
  <div style={{ color: "#475569", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "22px 0 8px" }}>{children}</div>
);

const selectStyle = { background: "#0f172a", color: "white", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, maxWidth: "100%" };


// ── Control de actividad ─────────────────────────────────────────────────────
// Una "sesión" = bloque de respuestas seguidas en una misma actividad; se corta tras 30 min sin responder.
const GAP_SESION = 30 * 60 * 1000;
const NOMBRE_ASIG = { ingles: "Inglés", lenguaje: "Lenguaje", mate: "Matemáticas", matematicas: "Hab. Matemáticas", ciencias: "Ciencias Naturales" };
const ASIGS = ["ingles", "lenguaje", "mate", "matematicas", "ciencias"];
const DIAS_SEM = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const asigDe = (actividad) => (actividad || "").split(".")[0];
const fechaHora = (f) => { try { return new Date(f).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }); } catch { return ""; } };
const fechaDia = (iso) => { try { return new Date(iso + "T12:00:00").toLocaleDateString("es-CL", { weekday: "short", day: "2-digit", month: "2-digit" }); } catch { return iso; } };

// rs: respuestas de UNA persona (cualquier orden). Devuelve datos por actividad y por asignatura.
function resumenPersona(rs) {
  const act = {}, asig = {};
  ASIGS.forEach(a => { asig[a] = { ses: 0, resp: 0, ok: 0, ultima: null, dias: {}, sem: [0,0,0,0,0,0,0] }; });
  const orden = [...rs].sort((a, b) => new Date(a.creado_en) - new Date(b.creado_en));
  const prev = {};
  orden.forEach(r => {
    const a = (act[r.actividad] = act[r.actividad] || { ses: 0, resp: 0, ok: 0, ultima: null });
    const t = new Date(r.creado_en).getTime();
    if (prev[r.actividad] === undefined || t - prev[r.actividad] > GAP_SESION) a.ses++;
    prev[r.actividad] = t;
    a.resp++; if (r.correcta) a.ok++; a.ultima = r.creado_en;
    const g = asig[asigDe(r.actividad)];
    if (g) {
      g.resp++; if (r.correcta) g.ok++; g.ultima = r.creado_en;
      const d = dia(r.creado_en); g.dias[d] = (g.dias[d] || 0) + 1;
      g.sem[new Date(r.creado_en).getDay()]++;
    }
  });
  Object.keys(act).forEach(k => { const g = asig[asigDe(k)]; if (g) g.ses += act[k].ses; });
  const dias = new Set(rs.map(r => dia(r.creado_en)));
  return { act, asig, ok: rs.filter(r => r.correcta).length, nDias: dias.size, ses: Object.values(act).reduce((n, x) => n + x.ses, 0), ultima: orden.length ? orden[orden.length - 1].creado_en : null, total: rs.length };
}

export default function Reporte({ onVolver }) {
  const { alumnos } = usePermisos();
  const [rows, setRows] = useState(null);
  const [accesos, setAccesos] = useState([]);
  const [error, setError] = useState("");
  const [act, setAct] = useState("todas");
  const [quien, setQuien] = useState("todos");
  const [incluirAdmins, setIncluirAdmins] = useState(false);
  const [verTodas, setVerTodas] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [r, a] = await Promise.all([cargarRespuestas(), supabase.from("accesos").select("*")]);
        setRows(r); setAccesos(a.data || []);
      } catch (e) { setError(e?.message || "No se pudo cargar el reporte"); }
    })();
  }, []);

  const info = useMemo(() => {
    const m = {};
    accesos.forEach(a => {
      const al = (alumnos || []).find(x => x.id === a.alum_id);
      m[a.email] = { nombre: al ? `${al.nombres || ""} ${al.apellidos || ""}`.trim() : (a.alumno_externo || a.nombre || a.email), rol: a.rol, estado: a.estado, esPrueba: a.rol === "admin" || (a.rol === "directivo" && !a.alum_id && !a.alumno_externo) };
    });
    return m;
  }, [accesos, alumnos]);
  const nombre = (email) => info[email]?.nombre || email;

  const base = useMemo(
    () => (rows || []).filter(r => (incluirAdmins || !info[r.email]?.esPrueba) && (act === "todas" || r.actividad === act)),
    [rows, info, incluirAdmins, act]
  );
  const sel = useMemo(() => (quien === "todos" ? base : base.filter(r => r.email === quien)), [base, quien]);

  const items = useMemo(() => Object.values(analizarItems(sel)).filter(x => x.errores > 0)
    .sort((a, b) => b.errores - a.errores || pct(b.errores, b.intentos) - pct(a.errores, a.intentos)), [sel]);

  const alumnosTabla = useMemo(() => {
    const por = {};
    base.forEach(r => { (por[r.email] = por[r.email] || []).push(r); });
    return Object.entries(por).map(([email, rs]) => {
      const ok = rs.filter(r => r.correcta).length;
      const pend = Object.values(analizarItems(rs)).filter(x => x.pendiente).length;
      return { email, nombre: nombre(email), total: rs.length, ok, p: pct(ok, rs.length), pend };
    }).sort((a, b) => a.p - b.p);
  }, [base, info]);

  // Ranking de uso: cuenta respuestas (no tiempo) de todas las actividades, sin el filtro de actividad
  const [rankAsig, setRankAsig] = useState("total");
  const ranking = useMemo(() => {
    const por = {};
    (rows || []).filter(r => incluirAdmins || !info[r.email]?.esPrueba).forEach(r => {
      const x = (por[r.email] = por[r.email] || { email: r.email, total: 0, ingles: 0, lenguaje: 0, mate: 0, matematicas: 0, ciencias: 0, dias: new Set(), ultima: r.creado_en });
      const a = (r.actividad || "").split(".")[0];
      x.total++; if (x[a] !== undefined) x[a]++;
      x.dias.add(dia(r.creado_en));
      if (r.creado_en > x.ultima) x.ultima = r.creado_en;
    });
    return Object.values(por).map(x => ({ ...x, nombre: nombre(x.email), nDias: x.dias.size }))
      .filter(x => x[rankAsig] > 0).sort((a, b) => b[rankAsig] - a[rankAsig] || b.nDias - a.nDias);
  }, [rows, info, incluirAdmins, rankAsig]);
  const maxRank = ranking[0]?.[rankAsig] || 1;


  // Control de actividad por persona (sin el filtro de actividad). Incluye a quienes tienen acceso y aún no registran nada.
  const [ordenCtl, setOrdenCtl] = useState("ultima");
  const control = useMemo(() => {
    const por = {};
    (rows || []).filter(r => incluirAdmins || !info[r.email]?.esPrueba).forEach(r => { (por[r.email] = por[r.email] || []).push(r); });
    Object.entries(info).forEach(([email, i]) => {
      if (i.estado === "aprobado" && !i.esPrueba && i.rol !== "admin" && !por[email]) por[email] = [];
    });
    const lista = Object.entries(por).map(([email, rs]) => ({ email, nombre: nombre(email), ...resumenPersona(rs) }));
    const f = {
      ultima: (a, b) => (b.ultima ? new Date(b.ultima).getTime() : -1) - (a.ultima ? new Date(a.ultima).getTime() : -1),
      sesiones: (a, b) => b.ses - a.ses || b.nDias - a.nDias,
      nombre: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
      sinActividad: (a, b) => (a.ses - b.ses) || a.nombre.localeCompare(b.nombre, "es"),
    }[ordenCtl];
    return lista.sort(f);
  }, [rows, info, incluirAdmins, ordenCtl]);
  // Tasa de aciertos del curso por asignatura (suma de todas las respuestas de los alumnos listados)
  const tasaCurso = useMemo(() => {
    const t = { total: { resp: 0, ok: 0 } };
    ASIGS.forEach(a => { t[a] = { resp: 0, ok: 0 }; });
    control.forEach(x => {
      t.total.resp += x.total; t.total.ok += x.ok;
      ASIGS.forEach(a => { t[a].resp += x.asig[a].resp; t[a].ok += x.asig[a].ok; });
    });
    return t;
  }, [control]);
  const tablaAciertos = useMemo(() => control.filter(x => x.total > 0).slice().sort((a, b) => pct(a.ok, a.total) - pct(b.ok, b.total) || a.nombre.localeCompare(b.nombre, "es")), [control]);
  const detalle = useMemo(() => (quien === "todos" ? null : control.find(x => x.email === quien) || null), [control, quien]);

  const okSel = sel.filter(r => r.correcta).length;
  const personasSel = new Set(sel.map(r => r.email)).size;
  const visibles = verTodas ? items : items.slice(0, 12);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a asignaturas</button>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>📊</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Reporte de errores</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Qué cuesta más al curso y a cada alumno · solo administradores</div>
      </div>

      {error && <div style={{ color: rojo, textAlign: "center", padding: 16 }}>{error}. ¿Ya ejecutaste supabase_respuestas.sql?</div>}
      {!error && rows === null && <div style={{ color: "#475569", textAlign: "center", padding: 24 }}>Cargando...</div>}

      {rows !== null && !error && (
        <>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
            <select value={act} onChange={e => setAct(e.target.value)} style={selectStyle}>
              {ACTIVIDADES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
            <select value={quien} onChange={e => setQuien(e.target.value)} style={selectStyle}>
              <option value="todos">Todo el curso</option>
              {alumnosTabla.map(a => <option key={a.email} value={a.email}>{a.nombre}</option>)}
            </select>
            <label style={{ color: "#475569", fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input type="checkbox" checked={incluirAdmins} onChange={e => setIncluirAdmins(e.target.checked)} />
              Incluir pruebas de administradores y directivos (sin alumno asociado)
            </label>
          </div>

          <Titulo>🏆 Ranking de uso · quién practica más</Titulo>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {ASIGNATURAS.map(a => (
              <button key={a.id} onClick={() => setRankAsig(a.id)}
                style={{ background: rankAsig === a.id ? azul : "#0f172a", color: "white", border: `1px solid ${rankAsig === a.id ? azul : border}`, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {a.label}
              </button>
            ))}
          </div>
          {ranking.length === 0 ? (
            <div style={{ color: "#475569", fontSize: 13, padding: 12 }}>Aún no hay actividad registrada en esta asignatura.</div>
          ) : (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
              {ranking.map((x, i) => (
                <div key={x.email} style={{ padding: "9px 14px", borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 14 }}>
                    <span style={{ width: 28, textAlign: "center", fontWeight: 800, color: i < 3 ? amarillo : muted }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</span>
                    <span style={{ fontWeight: 600, flex: 1, minWidth: 0 }}>{x.nombre}</span>
                    <span style={{ fontWeight: 800, color: azul, whiteSpace: "nowrap" }}>{x[rankAsig]} resp.</span>
                  </div>
                  <div style={{ height: 5, background: "#0f172a", borderRadius: 3, margin: "6px 0 3px 38px" }}>
                    <div style={{ width: `${pct(x[rankAsig], maxRank)}%`, height: "100%", background: azul, borderRadius: 3 }} />
                  </div>
                  <div style={{ color: muted, fontSize: 11, marginLeft: 38 }}>
                    {rankAsig === "total"
                      ? `Inglés ${x.ingles} · Lenguaje ${x.lenguaje} · Matemáticas ${x.mate} · Hab. Mat. ${x.matematicas} · Ciencias ${x.ciencias} · `
                      : ""}
                    {x.nDias} {x.nDias === 1 ? "día" : "días"} con actividad · última vez {fechaCorta(x.ultima)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ color: "#64748b", fontSize: 11, margin: "6px 2px 0" }}>Cuenta respuestas registradas (todas las actividades, sin el filtro de arriba). Matemáticas y Habilidades Matemáticas se registran desde esta versión.</div>

          <Titulo>🎯 Tasa de aciertos · por alumno y por asignatura</Titulo>
          <div style={{ color: "#64748b", fontSize: 11, margin: "0 2px 8px" }}>
            Aciertos ÷ respuestas registradas (cada intento cuenta). Entre paréntesis, el número de respuestas. Ordenado de menor a mayor tasa total, para ver primero a quien más apoyo necesita.
          </div>
          {tablaAciertos.length === 0 ? (
            <div style={{ color: "#475569", fontSize: 13, padding: 12 }}>Aún no hay respuestas registradas.</div>
          ) : (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, color: "white", minWidth: 560 }}>
                <thead>
                  <tr style={{ color: muted, textAlign: "center" }}>
                    <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 700 }}>Alumno</th>
                    <th style={{ padding: "8px 6px", fontWeight: 700 }}>Total</th>
                    {ASIGS.map(a => <th key={a} style={{ padding: "8px 6px", fontWeight: 700 }}>{NOMBRE_ASIG[a].replace("Naturales", "").trim()}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "#0f172a", fontWeight: 800 }}>
                    <td style={{ padding: "8px 12px" }}>Todo el curso</td>
                    {["total", ...ASIGS].map(k => {
                      const c = tasaCurso[k];
                      return <td key={k} style={{ textAlign: "center", padding: "8px 6px", color: c.resp ? colorAcierto(pct(c.ok, c.resp)) : muted }}>{c.resp ? `${pct(c.ok, c.resp)}%` : "—"}<div style={{ color: muted, fontSize: 10, fontWeight: 500 }}>({c.resp})</div></td>;
                    })}
                  </tr>
                  {tablaAciertos.map(x => (
                    <tr key={x.email} onClick={() => setQuien(x.email)} style={{ borderTop: `1px solid ${border}`, cursor: "pointer" }}>
                      <td style={{ padding: "7px 12px", fontWeight: 600 }}>{x.nombre}</td>
                      <td style={{ textAlign: "center", padding: "7px 6px", fontWeight: 800, color: colorAcierto(pct(x.ok, x.total)) }}>{pct(x.ok, x.total)}%<div style={{ color: muted, fontSize: 10, fontWeight: 500 }}>({x.total})</div></td>
                      {ASIGS.map(a => {
                        const g = x.asig[a];
                        return <td key={a} style={{ textAlign: "center", padding: "7px 6px", color: g.resp ? colorAcierto(pct(g.ok, g.resp)) : "#475569", fontWeight: 700 }}>{g.resp ? `${pct(g.ok, g.resp)}%` : "—"}{g.resp > 0 && <div style={{ color: muted, fontSize: 10, fontWeight: 500 }}>({g.resp})</div>}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Titulo>📅 Control de actividad · cuántas veces y cuándo</Titulo>
          <div style={{ color: "#64748b", fontSize: 11, margin: "0 2px 8px" }}>
            Una <b>sesión</b> es un bloque de respuestas seguidas en una actividad (se corta tras 30 min sin responder). Se deduce de las respuestas registradas: si alguien abre una actividad y no responde nada, no queda registro. Elige un alumno para ver su detalle.
          </div>
          {quien === "todos" ? (
            <>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8, alignItems: "center" }}>
                <span style={{ color: "#475569", fontSize: 12 }}>Ordenar por:</span>
                {[["ultima", "Última actividad"], ["sesiones", "Más sesiones"], ["sinActividad", "Menos sesiones"], ["nombre", "Nombre"]].map(([k, l]) => (
                  <button key={k} onClick={() => setOrdenCtl(k)} style={{ background: ordenCtl === k ? azul : "#0f172a", color: "white", border: `1px solid ${ordenCtl === k ? azul : border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{l}</button>
                ))}
              </div>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                {control.length === 0 && <div style={{ color: muted, padding: 14, fontSize: 13 }}>Aún no hay actividad registrada.</div>}
                {control.map(x => (
                  <button key={x.email} onClick={() => setQuien(x.email)}
                    style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", borderBottom: `1px solid ${border}`, padding: "10px 14px", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                      <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{x.nombre}</span>
                      <span style={{ color: x.ses ? azul : amarillo, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {x.ses ? `${x.ses} ${x.ses === 1 ? "sesión" : "sesiones"} · ${x.nDias} ${x.nDias === 1 ? "día" : "días"}` : "Sin actividad registrada"}
                        {x.total > 0 && <span style={{ color: colorAcierto(pct(x.ok, x.total)) }}> · {pct(x.ok, x.total)}% aciertos</span>}
                      </span>
                    </div>
                    {x.ses > 0 && (
                      <div style={{ color: muted, fontSize: 11, marginTop: 3, display: "flex", flexWrap: "wrap", gap: "2px 12px" }}>
                        <span>Última: <b style={{ color: "#cbd5e1" }}>{fechaHora(x.ultima)}</b></span>
                        {ASIGS.filter(a => x.asig[a].ses > 0).map(a => (
                          <span key={a}>{NOMBRE_ASIG[a]}: <b style={{ color: "#cbd5e1" }}>{x.asig[a].ses} ses.</b> · {fechaCorta(x.asig[a].ultima)} · <span style={{ color: colorAcierto(pct(x.asig[a].ok, x.asig[a].resp)) }}>{pct(x.asig[a].ok, x.asig[a].resp)}%</span></span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : detalle ? (
            <>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Tile valor={detalle.ses} label={detalle.ses === 1 ? "sesión" : "sesiones"} color={azul} />
                <Tile valor={detalle.nDias} label={detalle.nDias === 1 ? "día con actividad" : "días con actividad"} />
                <Tile valor={detalle.ultima ? fechaHora(detalle.ultima) : "—"} label="última actividad" />
                <Tile valor={detalle.total ? `${pct(detalle.ok, detalle.total)}%` : "—"} label={`tasa de aciertos (${detalle.ok}/${detalle.total})`} color={detalle.total ? colorAcierto(pct(detalle.ok, detalle.total)) : "white"} />
              </div>
              <div style={{ color: "#0f172a", fontWeight: 700, margin: "14px 0 6px", fontSize: 14 }}>{detalle.nombre} · por actividad</div>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                {ACTIVIDADES.filter(a => a.id !== "todas").map(a => {
                  const d = detalle.act[a.id];
                  return (
                    <div key={a.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 14px", borderBottom: `1px solid ${border}`, opacity: d ? 1 : 0.5 }}>
                      <span style={{ color: "white", fontSize: 13, flex: 1, minWidth: 0 }}>{a.label}</span>
                      <span style={{ color: muted, fontSize: 12, textAlign: "right", whiteSpace: "nowrap" }}>
                        {d ? <><b style={{ color: azul }}>{d.ses} {d.ses === 1 ? "vez" : "veces"}</b> · {d.resp} resp. · <span style={{ color: colorAcierto(pct(d.ok, d.resp)) }}>{pct(d.ok, d.resp)}%</span> · {fechaHora(d.ultima)}</> : "Sin actividad"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ color: "#0f172a", fontWeight: 700, margin: "14px 0 6px", fontSize: 14 }}>Días de mayor actividad por asignatura</div>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                {ASIGS.map(a => {
                  const g = detalle.asig[a];
                  if (!g.resp) return (
                    <div key={a} style={{ padding: "10px 14px", borderBottom: `1px solid ${border}`, opacity: 0.5, color: muted, fontSize: 13 }}>{NOMBRE_ASIG[a]} · sin actividad</div>
                  );
                  const top = Object.entries(g.dias).sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? 1 : -1)).slice(0, 3);
                  const maxSem = Math.max(...g.sem);
                  const mejor = g.sem.indexOf(maxSem);
                  return (
                    <div key={a} style={{ padding: "10px 14px", borderBottom: `1px solid ${border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: "white", fontSize: 14 }}>
                        <span style={{ fontWeight: 700 }}>{NOMBRE_ASIG[a]}</span>
                        <span style={{ color: muted, fontSize: 12 }}>{g.ses} {g.ses === 1 ? "sesión" : "sesiones"} · {g.resp} resp. · <b style={{ color: colorAcierto(pct(g.ok, g.resp)) }}>{pct(g.ok, g.resp)}% aciertos</b> · {Object.keys(g.dias).length} {Object.keys(g.dias).length === 1 ? "día" : "días"}</span>
                      </div>
                      <div style={{ color: muted, fontSize: 12, marginTop: 4 }}>
                        Más activo: {top.map(([d, n], i) => <span key={d}>{i > 0 ? " · " : ""}<b style={{ color: "#cbd5e1" }}>{fechaDia(d)}</b> ({n})</span>)}
                      </div>
                      <div style={{ color: muted, fontSize: 12, marginTop: 2 }}>Suele practicar los <b style={{ color: "#cbd5e1" }}>{/s$/.test(DIAS_SEM[mejor]) ? DIAS_SEM[mejor] : DIAS_SEM[mejor] + "s"}</b></div>
                      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 36, marginTop: 6 }}>
                        {[1, 2, 3, 4, 5, 6, 0].map(i => (
                          <div key={i} title={`${DIAS_SEM[i]}: ${g.sem[i]} resp.`} style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ height: Math.max(2, Math.round((g.sem[i] / (maxSem || 1)) * 24)), background: i === mejor ? azul : "#475569", borderRadius: 2 }} />
                            <div style={{ color: muted, fontSize: 9, marginTop: 1 }}>{DIAS_SEM[i].slice(0, 1).toUpperCase()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <button onClick={() => setQuien("todos")} style={{ background: "none", border: "none", color: azul, cursor: "pointer", fontWeight: 600 }}>← Volver a todo el curso</button>
              </div>
            </>
          ) : (
            <div style={{ color: "#475569", fontSize: 13, padding: 12 }}>Sin actividad registrada para esta persona.</div>
          )}


          {base.length === 0 ? (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 24, textAlign: "center", color: muted }}>
              Aún no hay respuestas registradas. Los datos se guardan desde que se publicó esta versión, cada vez que un alumno responde una actividad.
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Tile valor={sel.length} label="respuestas" />
                <Tile valor={`${pct(okSel, sel.length)}%`} label="de aciertos" color={colorAcierto(pct(okSel, sel.length))} />
                <Tile valor={personasSel} label={personasSel === 1 ? "persona" : "personas"} />
              </div>

              <Titulo>Lo que más cuesta {quien === "todos" ? "al curso" : `a ${nombre(quien)}`}</Titulo>
              {items.length === 0 ? (
                <div style={{ color: verde, padding: 12 }}>Sin errores registrados en esta selección 🎉</div>
              ) : (
                <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                  {visibles.map(x => {
                    const p = pct(x.errores, x.intentos);
                    const confs = Object.entries(x.confusiones).sort((a, b) => b[1] - a[1]).slice(0, 3);
                    const correcta = respuestaCorrecta(x.item);
                    return (
                      <div key={x.item} style={{ padding: "10px 14px", borderBottom: `1px solid ${border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: "white", fontSize: 14 }}>
                          <span style={{ fontWeight: 600 }}>{x.etiqueta}</span>
                          <span style={{ color: rojo, fontWeight: 700, whiteSpace: "nowrap" }}>{x.errores} de {x.intentos} · {p}%</span>
                        </div>
                        <div style={{ height: 6, background: "#0f172a", borderRadius: 3, margin: "6px 0 2px" }}>
                          <div style={{ width: `${p}%`, height: "100%", background: rojo, borderRadius: 3 }} />
                        </div>
                        {correcta && <div style={{ color: verde, fontSize: 13, fontWeight: 700, marginTop: 4 }}>✓ Respuesta correcta: {correcta}</div>}
                        {confs.length > 0 && <div style={{ color: muted, fontSize: 12, marginTop: 2 }}>Suelen marcar: {confs.map(([t, n], i) => <span key={t}>{i > 0 ? " · " : ""}<b style={{ color: "#fca5a5" }}>{t}</b> ({n})</span>)}</div>}
                      </div>
                    );
                  })}
                  {items.length > 12 && (
                    <button onClick={() => setVerTodas(v => !v)} style={{ width: "100%", background: "none", border: "none", color: azul, padding: 10, cursor: "pointer", fontWeight: 600 }}>
                      {verTodas ? "Ver menos" : `Ver las ${items.length} con errores`}
                    </button>
                  )}
                </div>
              )}

              <Titulo>Por alumno</Titulo>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                {alumnosTabla.map(a => (
                  <button key={a.email} onClick={() => setQuien(a.email)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, background: quien === a.email ? "#0f172a" : "transparent", border: "none", borderBottom: `1px solid ${border}`, padding: "10px 14px", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{a.nombre}</span>
                    <span style={{ display: "flex", gap: 14, fontSize: 13, whiteSpace: "nowrap" }}>
                      <span style={{ color: muted }}>{a.total} resp.</span>
                      <span style={{ color: colorAcierto(a.p), fontWeight: 700 }}>{a.p}%</span>
                      <span style={{ color: a.pend ? amarillo : verde }}>{a.pend} por reforzar</span>
                    </span>
                  </button>
                ))}
              </div>
              {quien !== "todos" && (
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <button onClick={() => setQuien("todos")} style={{ background: "none", border: "none", color: azul, cursor: "pointer", fontWeight: 600 }}>← Volver a todo el curso</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
