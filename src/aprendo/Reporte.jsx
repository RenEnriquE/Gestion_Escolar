import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase.js";
import { usePermisos } from "./permisos.js";
import { cargarRespuestas, analizarItems } from "./registro.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", amarillo = "#f59e0b";
const card = "#1e293b", border = "#334155", muted = "#94a3b8";

const ACTIVIDADES = [
  { id: "todas", label: "Todas las actividades" },
  { id: "ingles.unit4", label: "Inglés · Unit 4: Vocabulario" },
  { id: "ingles.unit4oraciones", label: "Inglés · Unit 4: Complete the sentence" },
];

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const colorAcierto = (p) => (p >= 80 ? verde : p >= 50 ? amarillo : rojo);

const Tile = ({ valor, label, color = "white" }) => (
  <div style={{ flex: "1 1 120px", background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
    <div style={{ color, fontSize: 28, fontWeight: 900 }}>{valor}</div>
    <div style={{ color: muted, fontSize: 12 }}>{label}</div>
  </div>
);

const Titulo = ({ children }) => (
  <div style={{ color: muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "22px 0 8px" }}>{children}</div>
);

const selectStyle = { background: "#0f172a", color: "white", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, maxWidth: "100%" };

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
        const [r, a] = await Promise.all([cargarRespuestas(), supabase.from("accesos").select("email,nombre,rol,alum_id")]);
        setRows(r); setAccesos(a.data || []);
      } catch (e) { setError(e?.message || "No se pudo cargar el reporte"); }
    })();
  }, []);

  const info = useMemo(() => {
    const m = {};
    accesos.forEach(a => {
      const al = (alumnos || []).find(x => x.id === a.alum_id);
      m[a.email] = { nombre: al ? `${al.nombres || ""} ${al.apellidos || ""}`.trim() : (a.nombre || a.email), rol: a.rol };
    });
    return m;
  }, [accesos, alumnos]);
  const nombre = (email) => info[email]?.nombre || email;

  const base = useMemo(
    () => (rows || []).filter(r => (incluirAdmins || !["admin", "directivo"].includes(info[r.email]?.rol)) && (act === "todas" || r.actividad === act)),
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

  const okSel = sel.filter(r => r.correcta).length;
  const personasSel = new Set(sel.map(r => r.email)).size;
  const visibles = verTodas ? items : items.slice(0, 12);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a asignaturas</button>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>📊</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Reporte de errores</div>
        <div style={{ color: muted, fontSize: 13, marginTop: 4 }}>Qué cuesta más al curso y a cada alumno · solo administradores</div>
      </div>

      {error && <div style={{ color: rojo, textAlign: "center", padding: 16 }}>{error}. ¿Ya ejecutaste supabase_respuestas.sql?</div>}
      {!error && rows === null && <div style={{ color: muted, textAlign: "center", padding: 24 }}>Cargando...</div>}

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
            <label style={{ color: muted, fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input type="checkbox" checked={incluirAdmins} onChange={e => setIncluirAdmins(e.target.checked)} />
              Incluir pruebas de administradores y directivos
            </label>
          </div>

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
                    const conf = Object.entries(x.confusiones).sort((a, b) => b[1] - a[1])[0];
                    return (
                      <div key={x.item} style={{ padding: "10px 14px", borderBottom: `1px solid ${border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: "white", fontSize: 14 }}>
                          <span style={{ fontWeight: 600 }}>{x.etiqueta}</span>
                          <span style={{ color: rojo, fontWeight: 700, whiteSpace: "nowrap" }}>{x.errores} de {x.intentos} · {p}%</span>
                        </div>
                        <div style={{ height: 6, background: "#0f172a", borderRadius: 3, margin: "6px 0 2px" }}>
                          <div style={{ width: `${p}%`, height: "100%", background: rojo, borderRadius: 3 }} />
                        </div>
                        {conf && <div style={{ color: muted, fontSize: 12 }}>Suelen marcar: <b style={{ color: "white" }}>{conf[0]}</b> ({conf[1]})</div>}
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
