import { useEffect, useState } from "react";
import { clavesValidas5, crearDeClaves } from "./unit5Data.js";
import QuizU5, { Boton } from "./QuizU5.jsx";
import { usePermisos } from "../permisos.js";
import { cargarRespuestas, analizarItems } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444", naranja = "#f59e0b";
const card = "#1e293b", border = "#334155";

const GRUPOS = [
  { id: "t:", emoji: "🚌", label: "Vocabulario",         una: "palabra",  varias: "palabras" },
  { id: "s:", emoji: "✏️", label: "Complete the sentence", una: "oración",  varias: "oraciones" },
  { id: "f:", emoji: "📸", label: "Mira y responde",      una: "pregunta", varias: "preguntas" },
  { id: "r:", emoji: "📖", label: "Read and answer",      una: "pregunta", varias: "preguntas" },
];

// Refuerzo de Unit 5: arma la práctica solo con lo que esta persona ha fallado y aún no domina.
export default function Unit5Refuerzo({ onVolver }) {
  const { email } = usePermisos();
  const [modo, setModo] = useState(null);
  const [estado, setEstado] = useState("cargando");
  const [datos, setDatos] = useState(null);

  const cargar = async () => {
    setEstado("cargando");
    try {
      const rows = await cargarRespuestas({ email });
      const validos = Object.values(analizarItems(rows)).filter(x => clavesValidas5.has(x.item));
      const pend = validos.filter(x => x.pendiente).sort((a, b) => b.errores - a.errores);
      setDatos({
        pend,
        dificiles: pend.slice(0, 5),
        superados: validos.filter(x => x.errores > 0 && x.dominado).length,
        sinDatos: validos.length === 0,
      });
      setEstado("listo");
    } catch { setEstado("error"); }
  };
  useEffect(() => { cargar(); }, []);

  const salir = () => { setModo(null); cargar(); };
  if (modo) {
    const claves = datos.pend.filter(x => modo === "todo" || x.item.startsWith(modo)).slice(0, 10).map(x => x.item);
    return <QuizU5 inicial={crearDeClaves(claves, 10)} generar={() => crearDeClaves(claves, 10)} refuerzo onSalir={salir} onVolver={salir} />;
  }

  const total = datos ? datos.pend.length : 0;
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>🎯</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Unit 5: Reforzar mis errores</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Practica solo lo que más te cuesta</div>
      </div>

      {estado === "cargando" && <div style={{ color: "#475569", textAlign: "center", padding: 24 }}>Buscando tus errores...</div>}
      {estado === "error" && <div style={{ color: rojo, textAlign: "center", padding: 24 }}>No se pudieron cargar tus respuestas. Intenta de nuevo más tarde.</div>}

      {estado === "listo" && datos && (
        <>
          {datos.sinDatos && (
            <div style={{ background: card, border: `2px solid ${border}`, borderRadius: 14, padding: 20, textAlign: "center", color: "#94a3b8", marginBottom: 16 }}>
              Aún no hay respuestas tuyas guardadas. Haz primero las actividades de Unit 5 y aquí aparecerá lo que necesitas reforzar.
            </div>
          )}
          {!datos.sinDatos && total === 0 && (
            <div style={{ background: card, border: `2px solid ${verde}`, borderRadius: 14, padding: 20, textAlign: "center", color: "white", marginBottom: 16 }}>
              <div style={{ fontSize: 34 }}>🏆</div>
              <div style={{ fontWeight: 800, marginTop: 4 }}>¡No tienes errores pendientes!</div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Sigue practicando las otras actividades.</div>
            </div>
          )}

          {datos.dificiles.length > 0 && (
            <div style={{ background: card, border: `2px solid ${naranja}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Lo que más te cuesta</div>
              {datos.dificiles.map(x => (
                <div key={x.item} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "6px 0", borderBottom: `1px solid ${border}`, color: "white", fontSize: 14 }}>
                  <span>{x.etiqueta}</span>
                  <span style={{ color: rojo, fontWeight: 700, whiteSpace: "nowrap" }}>{x.errores} {x.errores === 1 ? "error" : "errores"}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {GRUPOS.map(g => {
              const n = datos.pend.filter(x => x.item.startsWith(g.id)).length;
              return (
                <div key={g.id} style={{ background: card, border: `2px solid ${border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ color: "white", fontWeight: 700 }}>{g.emoji} {g.label}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13 }}>{n} {n === 1 ? g.una : g.varias} por reforzar</div>
                  </div>
                  <Boton color={naranja} disabled={n === 0} onClick={() => setModo(g.id)} style={{ padding: "12px 22px" }}>Practicar</Boton>
                </div>
              );
            })}
          </div>

          {datos.superados > 0 && (
            <div style={{ color: verde, textAlign: "center", fontSize: 13, fontWeight: 600 }}>
              ✅ Ya superaste {datos.superados} {datos.superados === 1 ? "cosa" : "cosas"} que antes fallabas
            </div>
          )}
          <div style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginTop: 10 }}>
            Una pregunta se considera superada cuando la aciertas 2 veces seguidas.
          </div>
        </>
      )}
    </div>
  );
}
