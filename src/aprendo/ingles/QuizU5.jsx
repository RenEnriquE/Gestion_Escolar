import { useState } from "react";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", amarillo = "#f59e0b";
const card = "#1e293b", border = "#334155";

export const hablar = (texto) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch {}
};

export const Boton = ({ children, onClick, color = azul, disabled, style }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ background: disabled ? "#334155" : color, color: disabled ? "#64748b" : "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
    {children}
  </button>
);

export const Volver = ({ onClick, texto }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
    {texto}
  </button>
);

// Motor de preguntas de la Unit 5. Cada pregunta trae: key, act, emoji, caption, lineas[], grande, consigna,
// opciones[], correcta, etiqueta, explicacion, habla, hablaAlElegir, fijo.
// generar(): devuelve un nuevo set de preguntas (para "Practicar de nuevo").
export default function QuizU5({ generar, inicial, refuerzo = false, onSalir, onVolver, onCambiar, textoCambiar = "Cambiar tema", textoSalir = "← Volver a actividades" }) {
  const { alumId } = usePermisos();
  const [preguntas, setPreguntas] = useState(() => inicial || generar());
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [aciertos, setAciertos] = useState([]);
  const [terminado, setTerminado] = useState(false);

  const reiniciar = () => {
    setPreguntas(generar());
    setActual(0); setElegida(null); setAciertos([]); setTerminado(false);
  };

  const q = preguntas[actual];

  const responder = (op) => {
    if (elegida !== null) return;
    const ok = op === q.correcta;
    setElegida(op);
    setAciertos(a => [...a, ok]);
    registrarRespuesta({ actividad: q.act, item: q.key, etiqueta: q.etiqueta, correcta: ok, elegida: op, refuerzo, alumId });
    if (q.hablaAlElegir) hablar(q.habla);
  };

  const siguiente = () => {
    if (actual < preguntas.length - 1) { setActual(a => a + 1); setElegida(null); }
    else setTerminado(true);
  };

  if (preguntas.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0", textAlign: "center", color: "#475569" }}>
        No hay preguntas disponibles.
        <div style={{ marginTop: 14 }}><Boton onClick={onVolver} color="#334155">← Volver</Boton></div>
      </div>
    );
  }

  // ── Resultado ────────────────────────────────────────────────────────────
  if (terminado) {
    const correctas = aciertos.filter(Boolean).length;
    const total = preguntas.length;
    const ratio = correctas / total;
    const color = ratio >= 0.8 ? verde : ratio >= 0.5 ? amarillo : rojo;
    const mensaje = ratio === 1 ? "¡Perfecto! 🏆" : ratio >= 0.8 ? "¡Muy bien! 🎉" : ratio >= 0.5 ? "¡Buen intento! 💪" : "¡Sigue practicando! 📚";
    const falladas = preguntas.filter((_, i) => !aciertos[i]);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{mensaje}</div>
          <div style={{ color, fontSize: 48, fontWeight: 900, margin: "8px 0" }}>{correctas}/{total}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18 }}>respuestas correctas</div>

          {falladas.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Para repasar</div>
              {falladas.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{p.emoji || "📝"}</span>
                  <span style={{ color: "white", fontWeight: 700, flex: 1, fontSize: 14 }}>{p.etiqueta}</span>
                  <button onClick={() => hablar(p.habla)} title="Escuchar" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🔊</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {!refuerzo && <Boton onClick={reiniciar}>🔄 Practicar de nuevo</Boton>}
            {!refuerzo && onCambiar && <Boton onClick={onCambiar} color="#334155">{textoCambiar}</Boton>}
            <Boton onClick={onVolver} color="#334155">← Volver</Boton>
          </div>
        </div>
      </div>
    );
  }

  // ── Juego ────────────────────────────────────────────────────────────────
  const respondida = elegida !== null;
  const ok = aciertos[actual];
  const colorHueco = respondida ? (ok ? verde : rojo) : amarillo;

  const renderLinea = (linea, i) => {
    if (!linea.includes("___")) return <div key={i}>{linea}</div>;
    const [a, b] = linea.split("___");
    return (
      <div key={i}>
        <span>{a}</span>
        <span style={{ display: "inline-block", minWidth: 90, borderBottom: `3px solid ${colorHueco}`, color: respondida ? colorHueco : "transparent", padding: "0 6px", textAlign: "center" }}>
          {respondida ? (ok ? q.correcta : elegida) : "___"}
        </span>
        <span>{b}</span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={onSalir || onVolver} texto={textoSalir} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: "#475569", fontSize: 13 }}>Pregunta {actual + 1} de {preguntas.length}</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 260 }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: aciertos[i] === true ? verde : aciertos[i] === false ? rojo : i === actual ? azul : border }} />
          ))}
        </div>
      </div>

      <div style={{ background: card, border: `2px solid ${azul}`, borderRadius: 16, padding: "20px 18px", textAlign: "center", marginBottom: 14 }}>
        {q.emoji && <div style={{ fontSize: 60, lineHeight: 1.1, marginBottom: 6 }}>{q.emoji}</div>}
        {q.caption && <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{q.caption}</div>}
        {q.grande ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ color: "white", fontSize: 30, fontWeight: 900 }}>{q.lineas[0]}</div>
            <button onClick={() => hablar(q.habla)} title="Escuchar en inglés" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24 }}>🔊</button>
          </div>
        ) : (
          <div style={{ color: "white", fontSize: 24, fontWeight: 800, lineHeight: 1.4 }}>
            {q.lineas.map(renderLinea)}
          </div>
        )}
        <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 10 }}>{q.consigna}</div>
      </div>

      <div style={{ display: "flex", flexDirection: q.fijo ? "row" : "column", gap: 10, marginBottom: 14 }}>
        {q.opciones.map(op => {
          const esCorrecta = op === q.correcta;
          const esElegida = op === elegida;
          let bg = card, bd = border;
          if (respondida && esCorrecta) { bg = "#14532d"; bd = verde; }
          else if (respondida && esElegida) { bg = "#7f1d1d"; bd = rojo; }
          return (
            <button key={op} onClick={() => responder(op)} disabled={respondida}
              style={{ flex: q.fijo ? 1 : undefined, background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 18, fontWeight: 600, textAlign: q.fijo ? "center" : "left", cursor: respondida ? "default" : "pointer", display: "flex", justifyContent: q.fijo ? "center" : "space-between", alignItems: "center", gap: 8 }}>
              <span>{op}</span>
              {respondida && esCorrecta && <span style={{ color: verde, fontWeight: 800 }}>✓</span>}
              {respondida && esElegida && !esCorrecta && <span style={{ color: rojo, fontWeight: 800 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: ok ? verde : rojo, fontWeight: 700, marginBottom: 4 }}>
            {ok ? "¡Correcto! 🎉" : `Era: ${q.correcta}`}
          </div>
          {q.explicacion && <div style={{ color: "#475569", fontSize: 13, marginBottom: 10 }}>{q.explicacion}</div>}
          {q.habla && !q.grande && (
            <button onClick={() => hablar(q.habla)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 13, marginBottom: 10 }}>🔊 Escuchar</button>
          )}
          <div><Boton onClick={siguiente}>{actual < preguntas.length - 1 ? "Siguiente →" : "Ver resultado"}</Boton></div>
        </div>
      )}
    </div>
  );
}
