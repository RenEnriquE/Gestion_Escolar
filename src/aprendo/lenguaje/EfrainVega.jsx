import { useEffect, useState } from "react";
import { CAPITULOS, PREGUNTAS } from "./efrainData.js";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta, cargarRespuestas, analizarItems } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#8b5cf6", amarillo = "#f59e0b", naranja = "#f59e0b";
const card = "#1e293b", border = "#334155";
const TOTAL = 10;
const ACTIVIDAD = "lenguaje.efrain";
const ESPERA_OK = 1000;      // ms que se muestra un acierto antes de pasar a la siguiente
const ESPERA_ERROR = 2800;   // ms que se muestra la respuesta correcta tras un error

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

const tituloCap = (cap) => {
  const c = CAPITULOS.find(x => x.id === cap);
  return !c ? "" : cap === "0" ? "Libro" : `Cap. ${cap} · ${c.titulo}`;
};

const armar = (pool) => barajar(pool).slice(0, TOTAL).map(p => ({ ...p, opciones: barajar([p.correcta, ...p.malas]) }));

const Boton = ({ children, onClick, color = azul, disabled, style }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ background: disabled ? "#334155" : color, color: disabled ? "#64748b" : "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
    {children}
  </button>
);

const Volver = ({ onClick, texto }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0 }}>{texto}</button>
);

export default function EfrainVega({ onVolver }) {
  const { email, alumId } = usePermisos();
  const [fase, setFase] = useState("config"); // config | juego | resultado
  const [cap, setCap] = useState("todo");
  const [modoRefuerzo, setModoRefuerzo] = useState(false);
  const [pendientes, setPendientes] = useState(null); // null = cargando; [] = ninguna
  const [preguntas, setPreguntas] = useState([]);
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [aciertos, setAciertos] = useState([]);

  // Cargar qué preguntas de este libro necesita reforzar esta persona
  const cargarPendientes = async () => {
    try {
      const rows = await cargarRespuestas({ email });
      const validas = new Set(PREGUNTAS.map(p => p.key));
      const pend = Object.values(analizarItems(rows))
        .filter(x => x.pendiente && validas.has(x.item))
        .sort((a, b) => b.errores - a.errores);
      setPendientes(pend.map(x => x.item));
    } catch { setPendientes([]); }
  };
  useEffect(() => { cargarPendientes(); }, []);

  const empezar = (refuerzo = false) => {
    const pool = refuerzo
      ? PREGUNTAS.filter(p => (pendientes || []).includes(p.key))
      : cap === "todo" ? PREGUNTAS : PREGUNTAS.filter(p => p.cap === cap);
    setModoRefuerzo(refuerzo);
    setPreguntas(armar(pool));
    setActual(0); setElegida(null); setAciertos([]);
    setFase("juego");
  };

  const responder = (op) => {
    if (elegida !== null) return;
    const p = preguntas[actual];
    const ok = op === p.correcta;
    setElegida(op);
    setAciertos(a => [...a, ok]);
    registrarRespuesta({ actividad: ACTIVIDAD, item: p.key, etiqueta: `${tituloCap(p.cap)} · ${p.q}`, correcta: ok, elegida: op, refuerzo: modoRefuerzo, alumId });
  };

  const avanzar = () => {
    if (actual < preguntas.length - 1) { setActual(a => a + 1); setElegida(null); }
    else { setFase("resultado"); cargarPendientes(); }
  };

  // Pasa sola a la siguiente pregunta (un acierto es rápido; un error deja ver la respuesta correcta)
  useEffect(() => {
    if (fase !== "juego" || elegida === null) return;
    const ok = elegida === preguntas[actual].correcta;
    const t = setTimeout(avanzar, ok ? ESPERA_OK : ESPERA_ERROR);
    return () => clearTimeout(t);
  }, [elegida, fase, actual]);

  // ── Configuración ────────────────────────────────────────────────────────
  if (fase === "config") {
    const disponibles = cap === "todo" ? PREGUNTAS.length : PREGUNTAS.filter(p => p.cap === cap).length;
    const nPend = pendientes ? pendientes.length : 0;
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <Volver onClick={onVolver} texto="← Volver a actividades" />
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>👻</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Efraín en La Vega</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Elige una alternativa y pasarás solo a la siguiente</div>
        </div>

        {nPend > 0 && (
          <div style={{ background: card, border: `2px solid ${naranja}`, borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "white", fontWeight: 800 }}>🎯 Reforzar mis errores</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{nPend} {nPend === 1 ? "pregunta" : "preguntas"} por reforzar</div>
            </div>
            <Boton color={naranja} onClick={() => empezar(true)}>Practicar</Boton>
          </div>
        )}

        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>¿Qué parte del libro?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
          {[{ id: "todo", titulo: "Todo el libro", emoji: "📚" }, ...CAPITULOS].map(c => {
            const n = c.id === "todo" ? PREGUNTAS.length : PREGUNTAS.filter(p => p.cap === c.id).length;
            const sel = cap === c.id;
            return (
              <button key={c.id} onClick={() => setCap(c.id)}
                style={{ background: sel ? azul + "33" : card, border: `2px solid ${sel ? azul : border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{c.emoji}</span>
                <span style={{ color: "white", fontSize: 15, fontWeight: 700, flex: 1 }}>
                  {c.id !== "todo" && c.id !== "0" ? `${c.id}. ` : ""}{c.titulo}
                </span>
                <span style={{ color: "#94a3b8", fontSize: 12 }}>{n} preg.</span>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <Boton onClick={() => empezar(false)} color={verde} style={{ padding: "14px 36px", fontSize: 16 }}>▶ Empezar ({Math.min(TOTAL, disponibles)} preguntas)</Boton>
        </div>
      </div>
    );
  }

  // ── Resultado ────────────────────────────────────────────────────────────
  if (fase === "resultado") {
    const correctas = aciertos.filter(Boolean).length;
    const total = preguntas.length;
    const ratio = total ? correctas / total : 0;
    const color = ratio >= 0.8 ? verde : ratio >= 0.5 ? amarillo : rojo;
    const mensaje = ratio === 1 ? "¡Perfecto! 🏆" : ratio >= 0.8 ? "¡Muy bien! 🎉" : ratio >= 0.5 ? "¡Buen intento! 💪" : "¡Sigue practicando! 📚";
    const falladas = preguntas.filter((_, i) => !aciertos[i]);
    const nPend = pendientes ? pendientes.length : 0;
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{mensaje}</div>
          <div style={{ color, fontSize: 48, fontWeight: 900, margin: "8px 0" }}>{correctas}/{total}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18 }}>respuestas correctas</div>

          {falladas.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Para repasar</div>
              {falladas.map(p => (
                <div key={p.key} style={{ padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{p.q}</div>
                  <div style={{ color: verde, fontWeight: 700, fontSize: 14 }}>✓ {p.correcta}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {nPend > 0 && <Boton color={naranja} onClick={() => empezar(true)}>🎯 Reforzar errores ({nPend})</Boton>}
            {!modoRefuerzo && <Boton onClick={() => empezar(false)}>🔄 Otra ronda</Boton>}
            <Boton onClick={() => setFase("config")} color="#334155">Cambiar capítulo</Boton>
            <Boton onClick={onVolver} color="#334155">← Volver</Boton>
          </div>
        </div>
      </div>
    );
  }

  // ── Juego ────────────────────────────────────────────────────────────────
  const p = preguntas[actual];
  const respondida = elegida !== null;
  const acerto = respondida && elegida === p.correcta;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={() => setFase("config")} texto="← Salir de la práctica" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: "#94a3b8", fontSize: 13 }}>{modoRefuerzo ? "🎯 " : ""}Pregunta {actual + 1} de {preguntas.length}</div>
        <div style={{ display: "flex", gap: 4 }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: aciertos[i] === true ? verde : aciertos[i] === false ? rojo : i === actual ? azul : border }} />
          ))}
        </div>
      </div>

      <div style={{ background: card, border: `2px solid ${azul}`, borderRadius: 16, padding: "18px 18px", marginBottom: 14 }}>
        <div style={{ color: "#a78bfa", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{tituloCap(p.cap)}</div>
        <div style={{ color: "white", fontSize: 21, fontWeight: 800, lineHeight: 1.3 }}>{p.q}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {p.opciones.map(op => {
          const esCorrecta = op === p.correcta;
          const esElegida = op === elegida;
          let bg = card, bd = border;
          if (respondida && esCorrecta) { bg = verde + "33"; bd = verde; }
          else if (respondida && esElegida) { bg = rojo + "33"; bd = rojo; }
          return (
            <button key={op} onClick={() => responder(op)} disabled={respondida}
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 16, fontWeight: 600, textAlign: "left", cursor: respondida ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span>{op}</span>
              {respondida && esCorrecta && <span style={{ color: verde, fontWeight: 800 }}>✓</span>}
              {respondida && esElegida && !esCorrecta && <span style={{ color: rojo, fontWeight: 800 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {/* Espacio fijo para el aviso, así los botones no se mueven al responder */}
      <div style={{ minHeight: 44, textAlign: "center" }}>
        {respondida && (
          <button onClick={avanzar} style={{ background: "none", border: "none", cursor: "pointer", color: acerto ? verde : rojo, fontWeight: 700, fontSize: 15 }}>
            {acerto ? "¡Correcto! 🎉" : "Revisa la respuesta correcta · toca para seguir →"}
          </button>
        )}
      </div>
    </div>
  );
}
