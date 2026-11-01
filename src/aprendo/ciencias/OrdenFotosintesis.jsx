import { useMemo, useState } from "react";
import { PASOS, MODOS } from "./plantasData.js";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444";
const card = "#1e293b", border = "#334155";
const info = MODOS.find(m => m.id === "orden");

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};
// Ilustración de cada paso (emoji) para que sea más fácil reconocerlo
const ICONO = ["💧", "💨", "☀️", "🍬", "🫧"];

const Boton = ({ children, onClick, color, style }) => (
  <button onClick={onClick} style={{ background: color, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", ...style }}>{children}</button>
);

// Se toca cada tarjeta en el orden en que ocurre el proceso (1 al 5).
export default function OrdenFotosintesis({ onVolver }) {
  const { alumId } = usePermisos();
  const [ronda, setRonda] = useState(0);
  const tarjetas = useMemo(() => barajar(PASOS.map((t, i) => ({ id: i, texto: t }))), [ronda]);
  const [puestas, setPuestas] = useState([]);      // ids ya colocados, en orden
  const [malo, setMalo] = useState(null);          // id tocado equivocadamente
  const [fallos, setFallos] = useState(0);

  const paso = puestas.length;                      // paso que se busca ahora (0..4)
  const terminado = paso === PASOS.length;

  const tocar = (t) => {
    if (terminado || puestas.includes(t.id)) return;
    const ok = t.id === paso;
    registrarRespuesta({ actividad: "ciencias.orden", item: `c:orden:p${paso + 1}`, etiqueta: `Orden de la fotosíntesis: paso ${paso + 1}`, correcta: ok, elegida: t.texto, alumId });
    if (ok) { setPuestas(p => [...p, t.id]); setMalo(null); }
    else { setFallos(f => f + 1); setMalo(t.id); setTimeout(() => setMalo(null), 900); }
  };

  const otraVez = () => { setPuestas([]); setMalo(null); setFallos(0); setRonda(r => r + 1); };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{info.emoji}</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{info.label}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Toca los pasos en el orden en que ocurre la fotosíntesis</div>
      </div>

      <div style={{ background: card, border: `2px solid ${info.color}`, borderRadius: 14, padding: "12px 16px", marginBottom: 14 }}>
        <div style={{ color: info.color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>💡 Recuerda</div>
        <div style={{ color: "white", fontSize: 14, lineHeight: 1.5 }}>La planta es una fábrica verde: primero consigue lo que necesita (agua, aire y luz), después fabrica su alimento y al final libera oxígeno.</div>
      </div>

      {!terminado && (
        <div style={{ textAlign: "center", color: "white", fontWeight: 800, fontSize: 17, marginBottom: 10 }}>
          ¿Cuál es el paso <span style={{ color: info.color, fontSize: 24 }}>{paso + 1}</span>?
        </div>
      )}

      {/* Pasos ya colocados */}
      {puestas.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          {puestas.map((id, i) => (
            <div key={id} style={{ display: "flex", gap: 10, alignItems: "center", background: verde + "22", border: `2px solid ${verde}`, borderRadius: 12, padding: "10px 12px", marginBottom: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: verde, color: "white", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 22 }}>{ICONO[id]}</span>
              <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{PASOS[id]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tarjetas por colocar */}
      {!terminado && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tarjetas.filter(t => !puestas.includes(t.id)).map(t => (
            <button key={t.id} onClick={() => tocar(t)}
              style={{ display: "flex", gap: 10, alignItems: "center", textAlign: "left", background: malo === t.id ? rojo + "33" : card, border: `2px solid ${malo === t.id ? rojo : border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", color: "white" }}>
              <span style={{ fontSize: 24 }}>{ICONO[t.id]}</span>
              <span style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{t.texto}</span>
              {malo === t.id && <span style={{ color: rojo, fontWeight: 800, fontSize: 13 }}>No es el paso {paso + 1}</span>}
            </button>
          ))}
        </div>
      )}

      {terminado && (
        <div style={{ background: card, border: `2px solid ${fallos === 0 ? verde : info.color}`, borderRadius: 16, padding: 22, textAlign: "center", marginTop: 6 }}>
          <div style={{ fontSize: 40 }}>{fallos === 0 ? "🏆" : "🎉"}</div>
          <div style={{ color: "white", fontSize: 19, fontWeight: 800, marginTop: 4 }}>{fallos === 0 ? "¡Perfecto! Orden correcto a la primera" : "¡Lo lograste!"}</div>
          <div style={{ color: "#94a3b8", fontSize: 14, margin: "6px 0 16px" }}>{fallos === 0 ? "Sin ningún error." : `Te equivocaste ${fallos} ${fallos === 1 ? "vez" : "veces"}. Inténtalo otra vez para dejarlo perfecto.`}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Boton color={info.color} onClick={otraVez}>🔄 Otra vez</Boton>
            <Boton color="#334155" onClick={onVolver}>← Volver</Boton>
          </div>
        </div>
      )}
      <div style={{ height: 24 }} />
    </div>
  );
}
