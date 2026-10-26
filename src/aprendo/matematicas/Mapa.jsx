import { useState } from "react";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta } from "../registro.js";

// Mapa ficticio del "Reino de Arcoiria" - cuadrícula 5x5
// Cada cuadrante tiene un lugar fijo con nombre e emoji
const MAPA = [
  // [col A-E, fila 5-1, nombre, emoji]
  {col:"A",row:5,nombre:"Volcán Fuego",     emoji:"🌋", desc:""},
  {col:"B",row:5,nombre:"Ciudad Nube",      emoji:"🏙️", desc:""},
  {col:"C",row:5,nombre:"Lago Celeste",     emoji:"🏞️", desc:""},
  {col:"D",row:5,nombre:"Bosque Dorado",    emoji:"🌲", desc:""},
  {col:"E",row:5,nombre:"Castillo Norte",   emoji:"🏰", desc:""},

  {col:"A",row:4,nombre:"Aldea Pescadora",  emoji:"🎣", desc:""},
  {col:"B",row:4,nombre:"Monte Nevado",     emoji:"⛰️", desc:""},
  {col:"C",row:4,nombre:"Plaza Central",    emoji:"🏟️", desc:""},
  {col:"D",row:4,nombre:"Desierto Rojo",    emoji:"🏜️", desc:""},
  {col:"E",row:4,nombre:"Faro del Este",    emoji:"🗼", desc:""},

  {col:"A",row:3,nombre:"Puerto Mar",       emoji:"⚓", desc:""},
  {col:"B",row:3,nombre:"Caverna Oscura",   emoji:"🦇", desc:""},
  {col:"C",row:3,nombre:"Jardín Flores",    emoji:"🌺", desc:""},
  {col:"D",row:3,nombre:"Río Cristal",      emoji:"🌊", desc:""},
  {col:"E",row:3,nombre:"Ruinas Antiguas",  emoji:"🏚️", desc:""},

  {col:"A",row:2,nombre:"Granja Feliz",     emoji:"🐄", desc:""},
  {col:"B",row:2,nombre:"Mercado Sur",      emoji:"🏪", desc:""},
  {col:"C",row:2,nombre:"Campo Fútbol",     emoji:"⚽", desc:""},
  {col:"D",row:2,nombre:"Cueva Cristal",    emoji:"💎", desc:""},
  {col:"E",row:2,nombre:"Fábrica Golosinas",emoji:"🍬", desc:""},

  {col:"A",row:1,nombre:"Playa Coral",      emoji:"🐠", desc:""},
  {col:"B",row:1,nombre:"Valle Verde",      emoji:"🌿", desc:""},
  {col:"C",row:1,nombre:"Isla Tesoro",      emoji:"🗺️", desc:""},
  {col:"D",row:1,nombre:"Pueblo Mágico",    emoji:"✨", desc:""},
  {col:"E",row:1,nombre:"Torre Vigilante",  emoji:"🔭", desc:""},
];

const COLS = ["A","B","C","D","E"];
const ROWS_DISPLAY = [5,4,3,2,1];

const generarPreguntas = () => {
  return [...MAPA].sort(() => Math.random()-0.5).slice(0, 6);
};

export default function Mapa({ onVolver }) {
  const { alumId } = usePermisos();
  const [preguntas] = useState(generarPreguntas);
  const [respuestas, setRespuestas] = useState({});
  const [revisado, setRevisado] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(true);

  const setResp = (idx, campo, val) => {
    setRespuestas(prev => ({ ...prev, [idx]: { ...prev[idx], [campo]: val } }));
  };

  const revisar = () => {
    if (revisado) return;
    preguntas.forEach((p, i) => {
      const r = respuestas[i];
      registrarRespuesta({ actividad: "matematicas.mapa", item: `m:mapa:${p.col}${p.row}:${p.nombre}`, etiqueta: `Mapa: ¿dónde está ${p.nombre}?`, correcta: r?.col === p.col && r?.row === String(p.row), elegida: r?.col && r?.row ? `${r.col}${r.row}` : null, alumId });
    });
    setRevisado(true);
  };
  const reiniciar = () => { setRespuestas({}); setRevisado(false); setMostrarMapa(true); };

  const todasRespondidas = preguntas.every((_, i) => respuestas[i]?.col && respuestas[i]?.row);
  const correctas = revisado ? preguntas.filter((p,i) =>
    respuestas[i]?.col === p.col && respuestas[i]?.row === String(p.row)
  ).length : 0;

  const verde = "#22c55e", rojo = "#ef4444", amarillo = "#f59e0b";
  const azul = "#3b82f6", card = "#1e293b", border = "#334155";
  const celdaSize = Math.min(56, Math.floor((Math.min(window.innerWidth,400)-60)/5));

  // Build mapa lookup
  const mapaObj = {};
  MAPA.forEach(m => { mapaObj[`${m.col}${m.row}`] = m; });

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a actividades
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div>
          <div style={{ color: "white", fontSize: 17, fontWeight: 800 }}>Mapa del Reino de Arcoiria</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>Usa el mapa para encontrar las coordenadas de cada lugar</div>
        </div>
        <button onClick={() => setMostrarMapa(m=>!m)}
          style={{ background: azul+"33", border: `1px solid ${azul}`, borderRadius: 8, color: azul, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          {mostrarMapa ? "Ocultar mapa" : "Ver mapa"}
        </button>
      </div>

      {/* Mapa */}
      {mostrarMapa && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <div>
            {/* Leyenda superior */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <div style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700, textAlign: "center", marginBottom: 2 }}>🗺️ Reino de Arcoiria</div>
            </div>
            <table style={{ borderCollapse: "collapse", border: `2px solid ${amarillo}`, borderRadius: 8, overflow: "hidden" }}>
              <thead>
                <tr>
                  <th style={{ width: 28 }}></th>
                  {COLS.map(c => <th key={c} style={{ width: celdaSize, color: amarillo, fontSize: 13, fontWeight: 700, textAlign: "center", padding: "4px 0", background: "#0f172a" }}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {ROWS_DISPLAY.map(row => (
                  <tr key={row}>
                    <td style={{ color: amarillo, fontSize: 12, fontWeight: 700, textAlign: "right", paddingRight: 5, background: "#0f172a" }}>{row}</td>
                    {COLS.map(col => {
                      const lugar = mapaObj[`${col}${row}`];
                      // Highlight if this is one of the preguntas
                      const esPregunta = preguntas.some(p => p.col === col && p.row === row);
                      return (
                        <td key={col} style={{
                          width: celdaSize, height: celdaSize,
                          border: `1px solid ${esPregunta ? amarillo : border}`,
                          background: esPregunta ? amarillo+"18" : card,
                          textAlign: "center", padding: 2, verticalAlign: "middle"
                        }}>
                          <div style={{ fontSize: celdaSize * 0.38 }}>{lugar?.emoji}</div>
                          <div style={{ color: esPregunta ? amarillo : "#64748b", fontSize: Math.max(7, celdaSize*0.14), lineHeight: 1.1, overflow: "hidden" }}>
                            {lugar?.nombre.split(" ").slice(0,2).join(" ")}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ color: "#475569", fontSize: 11, textAlign: "center", marginTop: 4 }}>
              Las casillas amarillas son los lugares que debes encontrar
            </div>
          </div>
        </div>
      )}

      {/* Preguntas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {preguntas.map((p, i) => {
          const resp = respuestas[i] || {};
          const correcto = revisado && resp.col === p.col && resp.row === String(p.row);
          const incorrecto = revisado && (resp.col !== p.col || resp.row !== String(p.row));
          return (
            <div key={i} style={{ background: card, border: `1.5px solid ${revisado ? (correcto ? verde : rojo) : border}`, borderRadius: 12, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 24 }}>{p.emoji}</span>
              <span style={{ color: "white", fontSize: 13, flex: 1, minWidth: 100 }}>{p.nombre}</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <select value={resp.col||""} onChange={e => setResp(i,"col",e.target.value)} disabled={revisado}
                  style={{ background: "#0f172a", color: "white", border: `1.5px solid ${border}`, borderRadius: 8, padding: "6px 10px", fontSize: 15, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                  <option value="">Col</option>
                  {COLS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={resp.row||""} onChange={e => setResp(i,"row",e.target.value)} disabled={revisado}
                  style={{ background: "#0f172a", color: "white", border: `1.5px solid ${border}`, borderRadius: 8, padding: "6px 10px", fontSize: 15, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                  <option value="">Fila</option>
                  {[1,2,3,4,5].map(r => <option key={r} value={String(r)}>{r}</option>)}
                </select>
                {revisado && (
                  <span style={{ color: correcto ? verde : rojo, fontWeight: 700, fontSize: 14 }}>
                    {correcto ? "✓" : `✗ ${p.col}${p.row}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resultado */}
      {revisado && (
        <div style={{ background: card, border: `2px solid ${correctas === preguntas.length ? verde : correctas >= 4 ? amarillo : rojo}`, borderRadius: 14, padding: 14, textAlign: "center", marginBottom: 14 }}>
          <div style={{ color: "white", fontSize: 18, fontWeight: 800 }}>
            {correctas === preguntas.length ? "🏆 ¡Perfecto!" : correctas >= 4 ? "🌟 ¡Muy bien!" : "💪 ¡Sigue practicando!"}
          </div>
          <div style={{ color: correctas === preguntas.length ? verde : amarillo, fontSize: 30, fontWeight: 900 }}>{correctas}/{preguntas.length}</div>
        </div>
      )}

      {/* Botones */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {!revisado ? (
          <button onClick={revisar} disabled={!todasRespondidas}
            style={{ background: azul, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: todasRespondidas ? "pointer" : "not-allowed", opacity: todasRespondidas ? 1 : 0.5 }}>
            ✅ Revisar respuestas
          </button>
        ) : (
          <button onClick={reiniciar} style={{ background: azul, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>🔄 Nuevo intento</button>
        )}
        <button onClick={onVolver} style={{ background: "#334155", color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>← Volver</button>
      </div>
    </div>
  );
}
