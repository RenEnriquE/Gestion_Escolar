import { useState } from "react";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta } from "../registro.js";

// Cuadrícula fija 5x5 con objetos en posiciones fijas
// Se generan sets aleatorios de objetos y posiciones cada partida
const COLS = ["A","B","C","D","E"];
const ROWS = [5,4,3,2,1]; // mostrar de arriba hacia abajo
const OBJETOS = [
  {emoji:"🌳",nombre:"árbol"},   {emoji:"🕐",nombre:"reloj"},
  {emoji:"🍦",nombre:"helado"},   {emoji:"👕",nombre:"polera"},
  {emoji:"🥕",nombre:"zanahoria"},{emoji:"🐭",nombre:"ratón"},
  {emoji:"🌸",nombre:"flor"},     {emoji:"🧃",nombre:"jugo"},
  {emoji:"⚽",nombre:"pelota"},   {emoji:"🎒",nombre:"mochila"},
  {emoji:"✏️",nombre:"lápiz"},    {emoji:"🐸",nombre:"rana"},
];

const generarTablero = () => {
  // Elegir 6 objetos al azar
  const shuffled = [...OBJETOS].sort(() => Math.random()-0.5).slice(0,6);
  // Asignar posiciones únicas al azar en la cuadrícula 5x5
  const posiciones = [];
  for (let c of COLS) for (let r of [1,2,3,4,5]) posiciones.push({col:c,row:r});
  const shuffledPos = posiciones.sort(() => Math.random()-0.5);
  return shuffled.map((obj,i) => ({ ...obj, col: shuffledPos[i].col, row: shuffledPos[i].row }));
};

export default function LocalizarObjetos({ onVolver }) {
  const { alumId } = usePermisos();
  const [objetos] = useState(generarTablero);
  const [respuestas, setRespuestas] = useState({});
  const [revisado, setRevisado] = useState(false);

  const setResp = (idx, campo, val) => {
    setRespuestas(prev => ({ ...prev, [idx]: { ...prev[idx], [campo]: val } }));
  };

  const revisar = () => {
    if (revisado) return;
    objetos.forEach((o, i) => {
      const r = respuestas[i];
      registrarRespuesta({ actividad: "matematicas.localizar", item: `m:loc:${o.col}${o.row}:${o.nombre}`, etiqueta: `Localiza ${o.emoji} ${o.nombre}`, correcta: r?.col === o.col && r?.row === String(o.row), elegida: r?.col && r?.row ? `${r.col}${r.row}` : null, alumId });
    });
    setRevisado(true);
  };
  const reiniciar = () => { setRespuestas({}); setRevisado(false); };

  const correctas = revisado ? objetos.filter((o,i) =>
    respuestas[i]?.col === o.col && respuestas[i]?.row === String(o.row)
  ).length : 0;

  const verde = "#22c55e", rojo = "#ef4444", amarillo = "#f59e0b";
  const azul = "#3b82f6", card = "#1e293b", border = "#334155";
  const celdaSize = Math.min(64, Math.floor((Math.min(window.innerWidth,400)-60)/5));

  // Construir mapa de la cuadrícula
  const mapa = {};
  objetos.forEach(o => { mapa[`${o.col}${o.row}`] = o.emoji; });

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a actividades
      </button>
      <div style={{ color: "white", fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Localiza los objetos</div>
      <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>Mira la cuadrícula e indica las coordenadas de cada objeto</div>

      {/* Cuadrícula con objetos */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ width: 28 }}></th>
              {COLS.map(c => <th key={c} style={{ width: celdaSize, color: "#94a3b8", fontSize: 13, fontWeight: 700, textAlign: "center", paddingBottom: 4 }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row}>
                <td style={{ color: "#94a3b8", fontSize: 13, fontWeight: 700, textAlign: "right", paddingRight: 6 }}>{row}</td>
                {COLS.map(col => {
                  const emoji = mapa[`${col}${row}`];
                  return (
                    <td key={col} style={{ width: celdaSize, height: celdaSize, border: `1.5px solid ${border}`, background: card, textAlign: "center", fontSize: celdaSize * 0.52, borderRadius: 4 }}>
                      {emoji || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preguntas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {objetos.map((obj, i) => {
          const resp = respuestas[i] || {};
          const correcto = revisado && resp.col === obj.col && resp.row === String(obj.row);
          const incorrecto = revisado && (resp.col !== obj.col || resp.row !== String(obj.row));
          return (
            <div key={i} style={{ background: card, border: `1.5px solid ${revisado ? (correcto ? verde : rojo) : border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 28 }}>{obj.emoji}</span>
              <span style={{ color: "white", fontSize: 14, flex: 1, minWidth: 80 }}>¿Dónde está el {obj.nombre}?</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* Selector columna */}
                <select value={resp.col||""} onChange={e => setResp(i,"col",e.target.value)} disabled={revisado}
                  style={{ background: "#0f172a", color: "white", border: `1.5px solid ${border}`, borderRadius: 8, padding: "6px 10px", fontSize: 16, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                  <option value="">Col</option>
                  {COLS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {/* Selector fila */}
                <select value={resp.row||""} onChange={e => setResp(i,"row",e.target.value)} disabled={revisado}
                  style={{ background: "#0f172a", color: "white", border: `1.5px solid ${border}`, borderRadius: 8, padding: "6px 10px", fontSize: 16, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                  <option value="">Fila</option>
                  {[1,2,3,4,5].map(r => <option key={r} value={String(r)}>{r}</option>)}
                </select>
                {revisado && (
                  <span style={{ color: correcto ? verde : rojo, fontWeight: 700, fontSize: 15 }}>
                    {correcto ? "✓" : `✗ Era ${obj.col}${obj.row}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resultado */}
      {revisado && (
        <div style={{ background: card, border: `2px solid ${correctas === objetos.length ? verde : correctas >= 4 ? amarillo : rojo}`, borderRadius: 14, padding: 16, textAlign: "center", marginBottom: 16 }}>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>
            {correctas === objetos.length ? "🏆 ¡Perfecto!" : correctas >= 4 ? "🌟 ¡Muy bien!" : "💪 ¡Sigue practicando!"}
          </div>
          <div style={{ color: correctas === objetos.length ? verde : amarillo, fontSize: 32, fontWeight: 900 }}>{correctas}/{objetos.length}</div>
        </div>
      )}

      {/* Botones */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {!revisado ? (
          <button onClick={revisar}
            disabled={Object.keys(respuestas).length < objetos.length || objetos.some((_,i) => !respuestas[i]?.col || !respuestas[i]?.row)}
            style={{ background: azul, color: "white", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: Object.keys(respuestas).length < objetos.length ? 0.5 : 1 }}>
            ✅ Revisar respuestas
          </button>
        ) : (
          <button onClick={reiniciar} style={{ background: azul, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>🔄 Nuevo tablero</button>
        )}
        <button onClick={onVolver} style={{ background: "#334155", color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>← Volver</button>
      </div>
    </div>
  );
}
