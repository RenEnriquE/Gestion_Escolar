import { useState } from "react";
import DivisionJuego from "./DivisionJuego.jsx";
import EcuacionesJuego from "./EcuacionesJuego.jsx";
import EcuacionesRepaso from "./EcuacionesRepaso.jsx";
import { MODOS } from "./divisionData.js";
import { MODOS as MODOS_EP, GRUPOS as GRUPOS_EP } from "./ecuacionesData.js";
import { usePermisos } from "../permisos.js";

// Matemáticas se organiza por unidades. Cada actividad usa el id "mate.<id>" para los permisos.
const DIVISIONES = [
  ...MODOS.map(m => ({ id: m.id, label: m.label, emoji: m.emoji, desc: m.desc, color: m.color })),
  { id: "refuerzo", label: "Reforzar mis errores", emoji: "🎯", desc: "Practica las divisiones que más te cuestan", color: "#f59e0b" },
];

const EP = [
  { id: "eq_repaso", grupo: "ecuaciones", label: "Repasa la materia", emoji: "📚", desc: "Qué es una ecuación, cómo se resuelve y se comprueba", color: "#14b8a6", repaso: "eq" },
  ...MODOS_EP.filter(m => m.grupo === "ecuaciones").map(m => ({ id: m.id, grupo: m.grupo, label: m.label, emoji: m.emoji, desc: m.desc, color: m.color })),
  { id: "pa_repaso", grupo: "patrones", label: "Repasa la materia", emoji: "📚", desc: "Qué es un patrón y cómo encontrar su regla", color: "#14b8a6", repaso: "pa" },
  ...MODOS_EP.filter(m => m.grupo === "patrones").map(m => ({ id: m.id, grupo: m.grupo, label: m.label, emoji: m.emoji, desc: m.desc, color: m.color })),
  ...MODOS_EP.filter(m => m.grupo === "prueba").map(m => ({ id: m.id, grupo: m.grupo, label: m.label, emoji: m.emoji, desc: m.desc, color: m.color })),
  { id: "ep_refuerzo", grupo: "prueba", label: "Reforzar mis errores", emoji: "🎯", desc: "Practica las preguntas que más te cuestan", color: "#f59e0b" },
];

const UNIDADES = [
  { id: "ecuaciones", label: "Ecuaciones y Patrones", emoji: "🟰", color: "#a855f7", desc: "Próxima prueba · lunes 23 de noviembre", actividades: EP, secciones: GRUPOS_EP },
  { id: "divisiones", label: "Divisiones", emoji: "➗", color: "#0ea5e9", desc: "Resta repetida, tablas, repartos y problemas", actividades: DIVISIONES, secciones: null },
];

const Tarjeta = ({ act, onClick }) => (
  <button onClick={onClick}
    style={{ background: "#1e293b", border: `2px solid ${act.color}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", width: "100%" }}>
    <span style={{ fontSize: 32 }}>{act.emoji}</span>
    <div>
      <div style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{act.label}</div>
      <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{act.desc}</div>
    </div>
  </button>
);

const Atras = ({ onClick, texto }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>{texto}</button>
);

export default function Mate({ onVolver }) {
  const [unidad, setUnidad] = useState(null);
  const [actividad, setActividad] = useState(null);
  const { puede } = usePermisos();
  const visiblesDe = (u) => u.actividades.filter(a => puede("mate." + a.id));
  const unidadesVisibles = UNIDADES.filter(u => visiblesDe(u).length > 0);
  // Si solo hay una unidad disponible, se entra directo a ella
  const uActiva = UNIDADES.find(u => u.id === unidad) || (unidadesVisibles.length === 1 ? unidadesVisibles[0] : null);
  const volverAct = () => setActividad(null);

  if (uActiva && actividad) {
    const act = uActiva.actividades.find(a => a.id === actividad);
    if (uActiva.id === "divisiones") return <DivisionJuego modo={actividad} onVolver={volverAct} />;
    if (act?.repaso) return <EcuacionesRepaso tema={act.repaso} onVolver={volverAct} />;
    return <EcuacionesJuego key={actividad} modo={actividad} onVolver={volverAct} />;
  }

  // ── Actividades de una unidad ──────────────────────────────────────────────
  if (uActiva) {
    const visibles = visiblesDe(uActiva);
    const solaUnidad = unidadesVisibles.length === 1;
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <Atras onClick={solaUnidad ? onVolver : () => setUnidad(null)} texto={solaUnidad ? "← Volver a asignaturas" : "← Volver a unidades"} />
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 38, marginBottom: 6 }}>{uActiva.emoji}</div>
          <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>{uActiva.label}</div>
          <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{uActiva.id === "ecuaciones" ? "Prepara tu prueba del lunes 23 de noviembre" : "Elige una actividad"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {uActiva.secciones
            ? uActiva.secciones.map(sec => {
                const items = visibles.filter(a => a.grupo === sec.id);
                if (items.length === 0) return null;
                return (
                  <div key={sec.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ color: "#0f172a", fontSize: 14, fontWeight: 800, margin: "10px 2px 0" }}>{sec.label}</div>
                    {items.map(act => <Tarjeta key={act.id} act={act} onClick={() => setActividad(act.id)} />)}
                  </div>
                );
              })
            : visibles.map(act => <Tarjeta key={act.id} act={act} onClick={() => setActividad(act.id)} />)}
        </div>
      </div>
    );
  }

  // ── Elegir unidad ──────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Atras onClick={onVolver} texto="← Volver a asignaturas" />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>➗</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Matemáticas</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Elige una unidad</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {unidadesVisibles.length === 0 && <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: 20 }}>Aún no hay actividades habilitadas para ti en esta asignatura.</div>}
        {unidadesVisibles.map(u => <Tarjeta key={u.id} act={u} onClick={() => setUnidad(u.id)} />)}
      </div>
    </div>
  );
}
