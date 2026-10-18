import { useState } from "react";
import Cuadricula from "./Cuadricula.jsx";
import LocalizarObjetos from "./LocalizarObjetos.jsx";
import Mapa from "./Mapa.jsx";

const ACTIVIDADES = [
  {
    id: "cuadricula",
    label: "Encuentra la casilla",
    emoji: "🗺️",
    desc: "Haz clic en la casilla según sus coordenadas",
    color: "#3b82f6",
  },
  {
    id: "localizar",
    label: "Localiza los objetos",
    emoji: "🔍",
    desc: "Mira la cuadrícula e indica dónde está cada objeto",
    color: "#8b5cf6",
  },
  {
    id: "mapa",
    label: "Mapa del Reino",
    emoji: "🏰",
    desc: "Usa el mapa para encontrar las coordenadas de cada lugar",
    color: "#f59e0b",
  },
];

export default function Matematicas({ onVolver }) {
  const [actividad, setActividad] = useState(null);

  if (actividad === "cuadricula") return <Cuadricula onVolver={() => setActividad(null)} />;
  if (actividad === "localizar")  return <LocalizarObjetos onVolver={() => setActividad(null)} />;
  if (actividad === "mapa")       return <Mapa onVolver={() => setActividad(null)} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a asignaturas
      </button>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>🔢</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Matemáticas</div>
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
