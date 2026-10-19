import { useState } from "react";
import Unit4Vocabulario from "./Unit4Vocabulario.jsx";

const ACTIVIDADES = [
  {
    id: "unit4",
    label: "Unit 4: Wild Animals",
    emoji: "🦁",
    desc: "Practica el vocabulario con alternativas",
    color: "#10b981",
  },
];

export default function Ingles({ onVolver }) {
  const [actividad, setActividad] = useState(null);

  if (actividad === "unit4") return <Unit4Vocabulario onVolver={() => setActividad(null)} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a asignaturas
      </button>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>🌎</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Inglés</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Elige una actividad</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ACTIVIDADES.map(act => (
          <button key={act.id} onClick={() => setActividad(act.id)}
            style={{ background: "#1e293b", border: `2px solid ${act.color}`, borderRadius: 14, padding: "18px 20px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s" }}>
            <span style={{ fontSize: 34 }}>{act.emoji}</span>
            <div>
              <div style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{act.label}</div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{act.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
