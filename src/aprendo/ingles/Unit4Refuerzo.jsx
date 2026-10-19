import { useEffect, useState } from "react";
import { VOCAB } from "./unit4Data.js";
import { FRASES } from "./unit4Oraciones.js";
import Unit4Vocabulario from "./Unit4Vocabulario.jsx";
import Unit4Oraciones from "./Unit4Oraciones.jsx";
import { usePermisos } from "../permisos.js";
import { cargarRespuestas, analizarItems } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444", azul = "#3b82f6", naranja = "#f59e0b";
const card = "#1e293b", border = "#334155";

const VALIDAS_V = new Set(VOCAB.map(v => "v:" + v.en));
const VALIDAS_O = new Set(FRASES.map(([a, t, c]) => `o:${a}|${t}|${c}`));

const Boton = ({ children, onClick, color = azul, disabled, style }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ background: disabled ? "#334155" : color, color: disabled ? "#64748b" : "white", border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
    {children}
  </button>
);

// Refuerzo: arma la práctica solo con lo que esta persona ha fallado y aún no domina.
export default function Unit4Refuerzo({ onVolver }) {
  const { email } = usePermisos();
  const [modo, setModo] = useState(null);       // null | "vocab" | "oraciones"
  const [estado, setEstado] = useState("cargando"); // cargando | listo | error
  const [datos, setDatos] = useState(null);

  const cargar = async () => {
    setEstado("cargando");
    try {
      const rows = await cargarRespuestas({ email });
      const analisis = Object.values(analizarItems(rows));
      const validos = analisis.filter(x => VALIDAS_V.has(x.item) || VALIDAS_O.has(x.item));
      const pend = validos.filter(x => x.pendiente).sort((a, b) => b.errores - a.errores);
      setDatos({
        vocab: pend.filter(x => x.item.startsWith("v:")),
        oraciones: pend.filter(x => x.item.startsWith("o:")),
        dificiles: pend.slice(0, 5),
        superados: validos.filter(x => x.errores > 0 && x.dominado).length,
        sinDatos: rows.length === 0,
      });
      setEstado("listo");
    } catch { setEstado("error"); }
  };
  useEffect(() => { cargar(); }, []);

  const salir = () => { setModo(null); cargar(); };
  if (modo === "vocab") return <Unit4Vocabulario refuerzoKeys={datos.vocab.slice(0, 10).map(x => x.item)} onVolver={salir} />;
  if (modo === "oraciones") return <Unit4Oraciones refuerzoKeys={datos.oraciones.slice(0, 10).map(x => x.item)} onVolver={salir} />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>🎯</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Reforzar mis errores</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Practica solo lo que más te cuesta</div>
      </div>

      {estado === "cargando" && <div style={{ color: "#94a3b8", textAlign: "center", padding: 24 }}>Buscando tus errores...</div>}
      {estado === "error" && <div style={{ color: rojo, textAlign: "center", padding: 24 }}>No se pudieron cargar tus respuestas. Intenta de nuevo más tarde.</div>}

      {estado === "listo" && datos && (
        <>
          {datos.sinDatos && (
            <div style={{ background: card, border: `2px solid ${border}`, borderRadius: 14, padding: 20, textAlign: "center", color: "#94a3b8", marginBottom: 16 }}>
              Aún no hay respuestas tuyas guardadas. Haz primero las actividades de Unit 4 y aquí aparecerá lo que necesitas reforzar.
            </div>
          )}
          {!datos.sinDatos && datos.vocab.length + datos.oraciones.length === 0 && (
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
                  <span style={{ color: rojo, fontWeight: 700 }}>{x.errores} {x.errores === 1 ? "error" : "errores"}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <div style={{ background: card, border: `2px solid ${border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ color: "white", fontWeight: 700 }}>🦁 Vocabulario</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{datos.vocab.length} {datos.vocab.length === 1 ? "palabra" : "palabras"} por reforzar</div>
              </div>
              <Boton color={naranja} disabled={datos.vocab.length === 0} onClick={() => setModo("vocab")}>Practicar</Boton>
            </div>
            <div style={{ background: card, border: `2px solid ${border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ color: "white", fontWeight: 700 }}>🦉 Complete the sentence</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{datos.oraciones.length} {datos.oraciones.length === 1 ? "oración" : "oraciones"} por reforzar</div>
              </div>
              <Boton color={naranja} disabled={datos.oraciones.length === 0} onClick={() => setModo("oraciones")}>Practicar</Boton>
            </div>
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
