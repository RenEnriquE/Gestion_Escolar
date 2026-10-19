import { useState } from "react";
import Matematicas from "./matematicas/Matematicas.jsx";
import Ingles from "./ingles/Ingles.jsx";
import { usePermisos } from "./permisos.js";
import Reporte from "./Reporte.jsx";

const ASIGNATURAS = [
  { id: "matematicas", label: "Matemáticas",            emoji: "🔢", color: "#3b82f6", activo: true  },
  { id: "lenguaje",    label: "Lenguaje y Comunicación", emoji: "📖", color: "#8b5cf6", activo: false },
  { id: "ingles",      label: "Inglés",                  emoji: "🌎", color: "#10b981", activo: true  },
  { id: "historia",    label: "Historia",                emoji: "🏛️", color: "#f59e0b", activo: false },
  { id: "tecnologia",  label: "Tecnología",              emoji: "💻", color: "#ef4444", activo: false },
];

export default function Aprendo() {
  const [asignatura, setAsignatura] = useState(null);
  const { puede, esAdmin } = usePermisos();

  if (asignatura === "matematicas") return <Matematicas onVolver={() => setAsignatura(null)} />;
  if (asignatura === "ingles") return <Ingles onVolver={() => setAsignatura(null)} />;
  if (asignatura === "reporte" && esAdmin) return <Reporte onVolver={() => setAsignatura(null)} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "8px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🎓</div>
        <div style={{ color: "white", fontSize: 22, fontWeight: 800 }}>¡Aprendo!</div>
        <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>Elige una asignatura para practicar</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {ASIGNATURAS.filter(a => puede(a.id)).map(a => (
          <button key={a.id} onClick={() => a.activo && setAsignatura(a.id)}
            style={{
              background: a.activo ? "#1e293b" : "#0f172a",
              border: `2px solid ${a.activo ? a.color : "#1e293b"}`,
              borderRadius: 16, padding: "22px 16px",
              cursor: a.activo ? "pointer" : "not-allowed",
              textAlign: "center", opacity: a.activo ? 1 : 0.4,
              transition: "all 0.2s"
            }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{a.emoji}</div>
            <div style={{ color: a.activo ? "white" : "#64748b", fontSize: 14, fontWeight: 700 }}>{a.label}</div>
            {!a.activo && <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>Próximamente</div>}
          </button>
        ))}
      </div>
      {esAdmin && (
        <button onClick={() => setAsignatura("reporte")}
          style={{ display: "block", width: "100%", marginTop: 18, background: "#0f172a", border: "2px dashed #f59e0b", borderRadius: 14, padding: "14px 16px", cursor: "pointer", color: "#f59e0b", fontSize: 14, fontWeight: 700 }}>
          📊 Reporte de errores (solo administradores)
        </button>
      )}
    </div>
  );
}
