import { useState } from "react";
import Unit4Vocabulario from "./Unit4Vocabulario.jsx";
import Unit4Oraciones from "./Unit4Oraciones.jsx";
import Unit4Refuerzo from "./Unit4Refuerzo.jsx";
import Unit5Vocabulario from "./Unit5Vocabulario.jsx";
import Unit5Practica from "./Unit5Practica.jsx";
import Unit5Refuerzo from "./Unit5Refuerzo.jsx";
import { usePermisos } from "../permisos.js";

const UNIDADES = [
  { id: "5", titulo: "Unit 5 · Transport", emoji: "🚌" },
  { id: "4", titulo: "Unit 4 · Wild Animals", emoji: "🦁" },
];

const ACTIVIDADES = [
  { id: "unit5ensayo", unidad: "5", label: "Unit 5: Ensayo de la prueba", emoji: "📝", desc: "Preguntas mezcladas, como en la prueba", color: "#ef4444" },
  { id: "unit5", unidad: "5", label: "Unit 5: Vocabulario", emoji: "🚌", desc: "Medios de transporte, números, partes y más", color: "#0ea5e9" },
  { id: "unit5fotos", unidad: "5", label: "Unit 5: Mira y responde", emoji: "📸", desc: "Fotos de transportes: What is it? Is it…?", color: "#14b8a6" },
  { id: "unit5oraciones", unidad: "5", label: "Unit 5: Complete the sentence", emoji: "✏️", desc: "Is it…? Does it have…? Can it…? Completa", color: "#8b5cf6" },
  { id: "unit5lectura", unidad: "5", label: "Unit 5: Read and answer", emoji: "📖", desc: "Londres, Ámsterdam, Venecia, el faro y adivinanzas", color: "#ec4899" },
  { id: "unit5refuerzo", unidad: "5", label: "Unit 5: Reforzar mis errores", emoji: "🎯", desc: "Practica solo lo que más te cuesta", color: "#f59e0b" },
  {
    id: "unit4",
    unidad: "4",
    label: "Unit 4: Vocabulario",
    emoji: "🦁",
    desc: "Practica las palabras con alternativas",
    color: "#10b981",
  },
  {
    id: "unit4oraciones",
    unidad: "4",
    label: "Unit 4: Complete the sentence",
    emoji: "🦉",
    desc: "It is… It has… It can… Completa la oración",
    color: "#3b82f6",
  },
  {
    id: "refuerzo",
    unidad: "4",
    label: "Unit 4: Reforzar mis errores",
    emoji: "🎯",
    desc: "Practica solo lo que más te cuesta",
    color: "#f59e0b",
  },
];

export default function Ingles({ onVolver }) {
  const [actividad, setActividad] = useState(null);
  const { puede } = usePermisos();
  const visibles = ACTIVIDADES.filter(a => puede("ingles." + a.id));

  if (actividad === "unit4") return <Unit4Vocabulario onVolver={() => setActividad(null)} />;
  if (actividad === "unit4oraciones") return <Unit4Oraciones onVolver={() => setActividad(null)} />;
  if (actividad === "refuerzo") return <Unit4Refuerzo onVolver={() => setActividad(null)} />;
  if (actividad === "unit5") return <Unit5Vocabulario onVolver={() => setActividad(null)} />;
  if (actividad === "unit5oraciones") return <Unit5Practica tipo="oraciones" onVolver={() => setActividad(null)} />;
  if (actividad === "unit5fotos") return <Unit5Practica tipo="fotos" onVolver={() => setActividad(null)} />;
  if (actividad === "unit5lectura") return <Unit5Practica tipo="lectura" onVolver={() => setActividad(null)} />;
  if (actividad === "unit5ensayo") return <Unit5Practica tipo="ensayo" onVolver={() => setActividad(null)} />;
  if (actividad === "unit5refuerzo") return <Unit5Refuerzo onVolver={() => setActividad(null)} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a asignaturas
      </button>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>🌎</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Inglés</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Elige una actividad</div>
      </div>
      {visibles.length === 0 && <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: 20 }}>Aún no hay actividades habilitadas para ti en esta asignatura.</div>}
      {UNIDADES.map(u => {
        const lista = visibles.filter(a => a.unidad === u.id);
        if (lista.length === 0) return null;
        return (
          <div key={u.id} style={{ marginBottom: 22 }}>
            <div style={{ color: "#0f172a", fontSize: 15, fontWeight: 800, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <span>{u.emoji}</span><span>{u.titulo}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {lista.map(act => (
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
      })}
    </div>
  );
}
