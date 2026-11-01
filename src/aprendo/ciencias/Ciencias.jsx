import { useState } from "react";
import PlantasJuego from "./PlantasJuego.jsx";
import OrdenFotosintesis from "./OrdenFotosintesis.jsx";
import Repaso from "./Repaso.jsx";
import { MODOS } from "./plantasData.js";
import { usePermisos } from "../permisos.js";

// Ciencias Naturales · app "Las Plantas" (preparación de la evaluación)
const ACTIVIDADES = [
  { id: "repaso", label: "Repasa la materia", emoji: "📚", desc: "Resumen de lo que se evaluará en la prueba", color: "#14b8a6" },
  ...MODOS.map(m => ({ id: m.id, label: m.label, emoji: m.emoji, desc: m.desc, color: m.color })),
  { id: "refuerzo", label: "Reforzar mis errores", emoji: "🎯", desc: "Practica las preguntas que más te cuestan", color: "#f59e0b" },
];

export default function Ciencias({ onVolver }) {
  const [actividad, setActividad] = useState(null);
  const { puede } = usePermisos();
  const visibles = ACTIVIDADES.filter(a => puede("ciencias." + a.id));
  const volver = () => setActividad(null);

  if (actividad === "repaso") return <Repaso onVolver={volver} />;
  if (actividad === "orden") return <OrdenFotosintesis onVolver={volver} />;
  if (actividad) return <PlantasJuego modo={actividad} onVolver={volver} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a asignaturas
      </button>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>🔬</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Ciencias Naturales</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>🌱 Las Plantas · prepara tu evaluación</div>
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
