import { useState } from "react";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta } from "../registro.js";

const COLS = ["A","B","C","D","E","F","G","H","I","J"];
const ROWS = [1,2,3,4,5,6,7,8,9,10];
const EMOJIS = ["🌟","🐱","🚀","🌈","🐸","🦋","🍎","⚽","🎈","🐶","🌺","🎵","🦄","🍦","🐠","🎯","🌙","🦁","🍕","🐢"];

const genPregunta = (usadas = new Set()) => {
  const disponibles = EMOJIS.filter((_,i) => !usadas.has(i));
  const idx = Math.floor(Math.random() * disponibles.length);
  const emoji = disponibles[idx];
  const emojiIdx = EMOJIS.indexOf(emoji);
  const col = COLS[Math.floor(Math.random() * 10)];
  const row = ROWS[Math.floor(Math.random() * 10)];
  return { emoji, emojiIdx, col, row };
};

export default function Cuadricula({ onVolver }) {
  const { alumId } = usePermisos();
  const TOTAL = 8;
  const [preguntas] = useState(() => {
    const arr = []; const usadas = new Set();
    for (let i = 0; i < TOTAL; i++) {
      const p = genPregunta(usadas); usadas.add(p.emojiIdx); arr.push(p);
    }
    return arr;
  });
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [clickAnim, setClickAnim] = useState(null);
  const [fase, setFase] = useState("juego");

  const pregunta = preguntas[actual];

  const handleClic = (col, row) => {
    if (respuestas[actual] !== undefined) return;
    const correcto = col === pregunta.col && row === pregunta.row;
    setClickAnim(`${col}${row}`);
    setTimeout(() => setClickAnim(null), 600);
    setRespuestas(prev => ({ ...prev, [actual]: { col, row, correcto } }));
    registrarRespuesta({ actividad: "matematicas.cuadricula", item: `m:cuad:${pregunta.col}${pregunta.row}`, etiqueta: `Encuentra la casilla ${pregunta.col}${pregunta.row}`, correcta: correcto, elegida: `${col}${row}`, alumId });
    if (actual < TOTAL - 1) setTimeout(() => setActual(a => a + 1), 800);
    else setTimeout(() => setFase("resultado"), 900);
  };

  const reiniciar = () => {
    setRespuestas({}); setActual(0); setFase("juego"); setClickAnim(null);
  };

  const correctas = Object.values(respuestas).filter(r => r.correcto).length;
  const azul = "#3b82f6", verde = "#22c55e", rojo = "#ef4444", amarillo = "#f59e0b";
  const card = "#1e293b", border = "#334155";
  const celdaSize = Math.min(46, Math.floor((Math.min(window.innerWidth, 700) - 80) / 11));

  if (fase === "resultado") {
    const pct = Math.round(correctas / TOTAL * 100);
    const color = pct >= 75 ? verde : pct >= 50 ? amarillo : rojo;
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center", padding: 16 }}>
        <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>{pct === 100 ? "🏆" : pct >= 75 ? "🌟" : pct >= 50 ? "💪" : "📚"}</div>
          <div style={{ color: "white", fontSize: 22, fontWeight: 800 }}>{pct === 100 ? "¡Perfecto!" : pct >= 75 ? "¡Muy bien!" : pct >= 50 ? "¡Buen intento!" : "¡Sigue practicando!"}</div>
          <div style={{ color, fontSize: 44, fontWeight: 900, margin: "8px 0" }}>{correctas}/{TOTAL}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>respuestas correctas</div>
          <div style={{ textAlign: "left", marginBottom: 20 }}>
            {preguntas.map((p, i) => {
              const r = respuestas[i];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <span style={{ color: "#94a3b8", fontSize: 13, flex: 1 }}>Estaba en <strong style={{ color: "white" }}>{p.col}{p.row}</strong></span>
                  {r?.correcto ? <span style={{ color: verde, fontWeight: 700 }}>✓ Correcto</span> : <span style={{ color: rojo, fontWeight: 700 }}>✗ Pusiste {r?.col}{r?.row}</span>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={reiniciar} style={{ background: azul, color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>🔄 Jugar de nuevo</button>
            <button onClick={onVolver} style={{ background: "#334155", color: "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>← Volver</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
        ← Volver a actividades
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ color: "white", fontSize: 17, fontWeight: 800 }}>Encuentra la casilla</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>Pregunta {actual + 1} de {TOTAL}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: respuestas[i]?.correcto ? verde : respuestas[i] ? rojo : i === actual ? azul : border }} />
          ))}
        </div>
      </div>
      <div style={{ background: card, border: `2px solid ${azul}`, borderRadius: 14, padding: "14px 18px", marginBottom: 14, textAlign: "center" }}>
        <div style={{ fontSize: 50, marginBottom: 4 }}>{pregunta.emoji}</div>
        <div style={{ color: "white", fontSize: 17, fontWeight: 600 }}>
          Haz clic en la casilla <span style={{ color: amarillo, fontSize: 22, fontWeight: 900 }}>{pregunta.col}{pregunta.row}</span>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
          <thead>
            <tr>
              <th style={{ width: celdaSize }}></th>
              {COLS.map(c => <th key={c} style={{ width: celdaSize, height: celdaSize, color: "#94a3b8", fontSize: 12, fontWeight: 700, textAlign: "center" }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row}>
                <td style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textAlign: "center", paddingRight: 4 }}>{row}</td>
                {COLS.map(col => {
                  const key = `${col}${row}`;
                  const resp = respuestas[actual];
                  const esCorrecta = col === pregunta.col && row === pregunta.row;
                  const esElegida = resp?.col === col && resp?.row === row;
                  const animando = clickAnim === key;
                  let bg = "#1e293b", borde = border, emoji = null;
                  if (resp) {
                    if (esCorrecta) { bg = verde + "33"; borde = verde; emoji = pregunta.emoji; }
                    if (esElegida && !esCorrecta) { bg = rojo + "33"; borde = rojo; }
                  }
                  return (
                    <td key={col} onClick={() => handleClic(col, row)} style={{ width: celdaSize, height: celdaSize, border: `1.5px solid ${borde}`, background: bg, borderRadius: 5, cursor: resp ? "default" : "pointer", textAlign: "center", fontSize: celdaSize * 0.44, lineHeight: 1, transition: "all 0.2s", transform: animando ? "scale(1.2)" : "scale(1)" }}>
                      {emoji}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {respuestas[actual] !== undefined && (
        <div style={{ textAlign: "center", marginTop: 10, color: respuestas[actual].correcto ? verde : rojo, fontSize: 15, fontWeight: 700 }}>
          {respuestas[actual].correcto ? "¡Correcto! 🎉" : `Era ${pregunta.col}${pregunta.row} 📍`}
        </div>
      )}
    </div>
  );
}
