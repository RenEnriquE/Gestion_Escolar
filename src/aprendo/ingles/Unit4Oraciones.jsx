import { useState } from "react";
import { VOCAB } from "./unit4Data.js";
import { FRASES, INICIO } from "./unit4Oraciones.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", amarillo = "#f59e0b";
const card = "#1e293b", border = "#334155";
const TOTAL = 10;

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

const hablar = (texto) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch {}
};

const buscar = (en) => VOCAB.find(v => v.en === en) || { en, es: "" };

const crearPreguntas = () =>
  barajar(FRASES).slice(0, TOTAL).map(([animal, tipo, correcta, incorrectas]) => ({
    animal: buscar(animal),
    inicio: INICIO[tipo],
    correcta,
    es: buscar(correcta).es,
    opciones: barajar([correcta, ...incorrectas]),
  }));

const Boton = ({ children, onClick, color = azul, style }) => (
  <button onClick={onClick}
    style={{ background: color, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", ...style }}>
    {children}
  </button>
);

const Volver = ({ onClick, texto }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
    {texto}
  </button>
);

export default function Unit4Oraciones({ onVolver }) {
  const [preguntas, setPreguntas] = useState(crearPreguntas);
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [aciertos, setAciertos] = useState([]);
  const [terminado, setTerminado] = useState(false);

  const reiniciar = () => {
    setPreguntas(crearPreguntas());
    setActual(0); setElegida(null); setAciertos([]); setTerminado(false);
  };

  const responder = (op) => {
    if (elegida !== null) return;
    const q = preguntas[actual];
    setElegida(op);
    setAciertos(a => [...a, op === q.correcta]);
    hablar(`${q.inicio} ${q.correcta}.`);
  };

  const siguiente = () => {
    if (actual < preguntas.length - 1) { setActual(a => a + 1); setElegida(null); }
    else setTerminado(true);
  };

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
              {falladas.map((q, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{q.animal.emoji || "📝"}</span>
                  <span style={{ color: "white", fontWeight: 700, flex: 1 }}>{q.inicio} {q.correcta}.</span>
                  <button onClick={() => hablar(`${q.inicio} ${q.correcta}.`)} title="Escuchar" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🔊</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Boton onClick={reiniciar}>🔄 Practicar de nuevo</Boton>
            <Boton onClick={onVolver} color="#334155">← Volver</Boton>
          </div>
        </div>
      </div>
    );
  }

  // ── Juego ────────────────────────────────────────────────────────────────
  const q = preguntas[actual];
  const respondida = elegida !== null;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={onVolver} texto="← Volver a actividades" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: "#94a3b8", fontSize: 13 }}>Pregunta {actual + 1} de {preguntas.length}</div>
        <div style={{ display: "flex", gap: 4 }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: aciertos[i] === true ? verde : aciertos[i] === false ? rojo : i === actual ? azul : border }} />
          ))}
        </div>
      </div>

      <div style={{ background: card, border: `2px solid ${azul}`, borderRadius: 16, padding: "20px 18px", textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 64, lineHeight: 1.1, marginBottom: 6 }}>{q.animal.emoji}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
          {q.animal.en} · {q.animal.es}
        </div>
        <div style={{ color: "white", fontSize: 28, fontWeight: 800, marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <span>{q.inicio}</span>
          <span style={{ minWidth: 110, borderBottom: `3px solid ${respondida ? (aciertos[actual] ? verde : rojo) : amarillo}`, color: respondida ? (aciertos[actual] ? verde : rojo) : "transparent", padding: "0 6px" }}>
            {respondida ? (aciertos[actual] ? q.correcta : elegida) : "___"}
          </span>
          <span>.</span>
        </div>
        <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 8 }}>Completa la oración</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {q.opciones.map(op => {
          const esCorrecta = op === q.correcta;
          const esElegida = op === elegida;
          let bg = card, bd = border;
          if (respondida && esCorrecta) { bg = verde + "33"; bd = verde; }
          else if (respondida && esElegida) { bg = rojo + "33"; bd = rojo; }
          return (
            <button key={op} onClick={() => responder(op)} disabled={respondida}
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 18, fontWeight: 600, textAlign: "left", cursor: respondida ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{op}</span>
              {respondida && esCorrecta && <span style={{ color: verde, fontWeight: 800 }}>✓</span>}
              {respondida && esElegida && !esCorrecta && <span style={{ color: rojo, fontWeight: 800 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: aciertos[actual] ? verde : rojo, fontWeight: 700, marginBottom: 4 }}>
            {aciertos[actual] ? "¡Correcto! 🎉" : `Era: ${q.inicio} ${q.correcta}.`}
          </div>
          {q.es && <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>{q.correcta} = {q.es}</div>}
          <Boton onClick={siguiente}>{actual < preguntas.length - 1 ? "Siguiente →" : "Ver resultado"}</Boton>
        </div>
      )}
    </div>
  );
}
