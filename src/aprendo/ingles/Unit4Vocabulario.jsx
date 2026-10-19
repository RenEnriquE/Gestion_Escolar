import { useState } from "react";
import { VOCAB, CATEGORIAS } from "./unit4Data.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", amarillo = "#f59e0b";
const card = "#1e293b", border = "#334155", fondo = "#0f172a";
const TOTAL = 10;

const DIRECCIONES = [
  { id: "en-es",    label: "Inglés → Español", desc: "Veo la palabra en inglés" },
  { id: "es-en",    label: "Español → Inglés", desc: "Veo la palabra en español" },
  { id: "mezclado", label: "Mezclado",         desc: "Un poco de cada una" },
];

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

// Lee la palabra en inglés en voz alta (si el navegador lo permite)
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

const crearPreguntas = (cat, direccion) => {
  const pool = cat === "todo" ? VOCAB : VOCAB.filter(v => v.cat === cat);
  return barajar(pool).slice(0, TOTAL).map(item => {
    const dir = direccion === "mezclado" ? (Math.random() < 0.5 ? "en-es" : "es-en") : direccion;
    const campo = dir === "en-es" ? "es" : "en";
    // Alternativas incorrectas: palabras de la misma categoría, sin repetir texto
    const vistos = new Set([item[campo].toLowerCase()]);
    const distractores = [];
    barajar(VOCAB.filter(v => v.cat === item.cat && v.en !== item.en)).forEach(v => {
      const k = v[campo].toLowerCase();
      if (!vistos.has(k) && distractores.length < 3) { vistos.add(k); distractores.push(v[campo]); }
    });
    return { item, dir, correcta: item[campo], opciones: barajar([item[campo], ...distractores]) };
  });
};

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

export default function Unit4Vocabulario({ onVolver }) {
  const [fase, setFase] = useState("config"); // config | juego | resultado
  const [cat, setCat] = useState("todo");
  const [dir, setDir] = useState("en-es");
  const [preguntas, setPreguntas] = useState([]);
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [aciertos, setAciertos] = useState([]);

  const empezar = () => {
    setPreguntas(crearPreguntas(cat, dir));
    setActual(0); setElegida(null); setAciertos([]);
    setFase("juego");
  };

  const responder = (op) => {
    if (elegida !== null) return;
    setElegida(op);
    setAciertos(a => [...a, op === preguntas[actual].correcta]);
  };

  const siguiente = () => {
    if (actual < preguntas.length - 1) { setActual(a => a + 1); setElegida(null); }
    else setFase("resultado");
  };

  // ── Configuración ────────────────────────────────────────────────────────
  if (fase === "config") {
    const disponibles = cat === "todo" ? VOCAB.length : VOCAB.filter(v => v.cat === cat).length;
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <Volver onClick={onVolver} texto="← Volver a actividades" />
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🦁</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Unit 4: Wild Animals</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Elige qué quieres practicar</div>
        </div>

        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Tema</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {CATEGORIAS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              style={{ background: cat === c.id ? azul : card, color: "white", border: `2px solid ${cat === c.id ? azul : border}`, borderRadius: 20, padding: "8px 14px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Tipo de pregunta</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {DIRECCIONES.map(d => (
            <button key={d.id} onClick={() => setDir(d.id)}
              style={{ background: dir === d.id ? azul + "33" : card, border: `2px solid ${dir === d.id ? azul : border}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ color: "white", fontSize: 15, fontWeight: 700 }}>{d.label}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{d.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Boton onClick={empezar} color={verde} style={{ padding: "14px 36px", fontSize: 16 }}>▶ Empezar ({Math.min(TOTAL, disponibles)} preguntas)</Boton>
        </div>
      </div>
    );
  }

  // ── Resultado ────────────────────────────────────────────────────────────
  if (fase === "resultado") {
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
                  <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{p.item.emoji || "📝"}</span>
                  <span style={{ color: "white", fontWeight: 700, flex: 1 }}>{p.item.en}</span>
                  <span style={{ color: "#94a3b8" }}>= {p.item.es}</span>
                  <button onClick={() => hablar(p.item.en)} title="Escuchar" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🔊</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Boton onClick={empezar}>🔄 Practicar de nuevo</Boton>
            <Boton onClick={() => setFase("config")} color="#334155">Cambiar tema</Boton>
            <Boton onClick={onVolver} color="#334155">← Volver</Boton>
          </div>
        </div>
      </div>
    );
  }

  // ── Juego ────────────────────────────────────────────────────────────────
  const p = preguntas[actual];
  const palabra = p.dir === "en-es" ? p.item.en : p.item.es;
  const consigna = p.dir === "en-es" ? "¿Qué significa en español?" : "¿Cómo se dice en inglés?";
  const respondida = elegida !== null;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={() => setFase("config")} texto="← Salir de la práctica" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: "#94a3b8", fontSize: 13 }}>Pregunta {actual + 1} de {preguntas.length}</div>
        <div style={{ display: "flex", gap: 4 }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: aciertos[i] === true ? verde : aciertos[i] === false ? rojo : i === actual ? azul : border }} />
          ))}
        </div>
      </div>

      <div style={{ background: card, border: `2px solid ${azul}`, borderRadius: 16, padding: "20px 18px", textAlign: "center", marginBottom: 14 }}>
        {p.item.emoji && <div style={{ fontSize: 64, lineHeight: 1.1, marginBottom: 6 }}>{p.item.emoji}</div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ color: "white", fontSize: 30, fontWeight: 900 }}>{palabra}</div>
          <button onClick={() => hablar(p.item.en)} title="Escuchar en inglés" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24 }}>🔊</button>
        </div>
        <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 6 }}>{consigna}</div>
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
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 17, fontWeight: 600, textAlign: "left", cursor: respondida ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{op}</span>
              {respondida && esCorrecta && <span style={{ color: verde, fontWeight: 800 }}>✓</span>}
              {respondida && esElegida && !esCorrecta && <span style={{ color: rojo, fontWeight: 800 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: aciertos[actual] ? verde : rojo, fontWeight: 700, marginBottom: 10 }}>
            {aciertos[actual] ? "¡Correcto! 🎉" : `Era: ${p.correcta}`}
          </div>
          <Boton onClick={siguiente}>{actual < preguntas.length - 1 ? "Siguiente →" : "Ver resultado"}</Boton>
        </div>
      )}
    </div>
  );
}
