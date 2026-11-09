import { useState } from "react";
import { VOCAB5, CATEGORIAS5, crearVocab } from "./unit5Data.js";
import QuizU5, { Boton, Volver } from "./QuizU5.jsx";

const verde = "#22c55e", azul = "#3b82f6";
const card = "#1e293b", border = "#334155";
const TOTAL = 10;

const DIRECCIONES = [
  { id: "en-es",    label: "Inglés → Español", desc: "Veo la palabra en inglés" },
  { id: "es-en",    label: "Español → Inglés", desc: "Veo la palabra en español" },
  { id: "mezclado", label: "Mezclado",         desc: "Un poco de cada una" },
];

export default function Unit5Vocabulario({ onVolver }) {
  const [fase, setFase] = useState("config");
  const [cat, setCat] = useState("todo");
  const [dir, setDir] = useState("en-es");
  const [version, setVersion] = useState(0);

  if (fase === "juego") {
    return (
      <QuizU5 key={version} generar={() => crearVocab(cat, dir, TOTAL)}
        onSalir={() => setFase("config")} onVolver={onVolver} onCambiar={() => setFase("config")}
        textoSalir="← Salir de la práctica" />
    );
  }

  const disponibles = cat === "todo" ? VOCAB5.length : VOCAB5.filter(v => v.cat === cat).length;
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={onVolver} texto="← Volver a actividades" />
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>🚌</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Unit 5: Transport</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Elige qué quieres practicar</div>
      </div>

      <div style={{ color: "#475569", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Tema</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {CATEGORIAS5.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{ background: cat === c.id ? azul : card, color: "white", border: `2px solid ${cat === c.id ? azul : border}`, borderRadius: 20, padding: "8px 14px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div style={{ color: "#475569", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Tipo de pregunta</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {DIRECCIONES.map(d => (
          <button key={d.id} onClick={() => setDir(d.id)}
            style={{ background: dir === d.id ? "#1e3a8a" : card, border: `2px solid ${dir === d.id ? azul : border}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
            <div style={{ color: "white", fontSize: 15, fontWeight: 700 }}>{d.label}</div>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>{d.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Boton onClick={() => { setVersion(v => v + 1); setFase("juego"); }} color={verde} style={{ padding: "14px 36px", fontSize: 16 }}>▶ Empezar ({Math.min(TOTAL, disponibles)} preguntas)</Boton>
      </div>
    </div>
  );
}
