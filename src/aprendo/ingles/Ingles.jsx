import { useState } from "react";
import Unit4Vocabulario from "./Unit4Vocabulario.jsx";
import Unit4Oraciones from "./Unit4Oraciones.jsx";
import { usePermisos } from "../permisos.js";

const ACTIVIDADES = [
  {
    id: "unit4",
    label: "Unit 4: Vocabulario",
    emoji: "🦁",
    desc: "Practica las palabras con alternativas",
    color: "#10b981",
  },
  {
    id: "unit4oraciones",
    label: "Unit 4: Complete the sentence",
    emoji: "🦉",
    desc: "It is… It has… It can… Completa la oración",
    color: "#3b82f6",
  },
];

export default function Ingles({ onVolver }) {
  const [actividad, setActividad] = useState(null);
  const { puede } = usePermisos();
  const visibles = ACTIVIDADES.filter(a => puede("ingles." + a.id));

  if (actividad === "unit4") return <Unit4Vocabulario onVolver={() => setActividad(null)} />;
  if (actividad === "unit4oraciones") return <Unit4Oraciones onVolver={() => setActividad(null)} />;

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
        {visibles.length === 0 && <div style={{ color: "#94a3b8", fontSize: 14, textAlign: "center", padding: 20 }}>Aún no hay actividades habilitadas para ti en esta asignatura.</div>}
        {visibles.map(act => (
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
