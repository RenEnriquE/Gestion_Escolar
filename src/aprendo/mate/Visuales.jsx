// Dibujos de la unidad Ecuaciones y Patrones: balanza, secuencia numérica y fila de figuras.

const colorHueco = "#fbbf24";

// Texto de un platillo: el "?" se destaca (y se reemplaza por el valor al revelar)
const Etiqueta = ({ txt, x, revelar, cx, y }) => {
  const partes = txt.split("?");
  if (partes.length === 1) return <text x={cx} y={y} textAnchor="middle" fontSize="24" fontWeight="800" fill="white">{txt}</text>;
  return (
    <text x={cx} y={y} textAnchor="middle" fontSize="24" fontWeight="800" fill="white">
      {partes[0]}
      <tspan fill={revelar ? "#4ade80" : colorHueco}>{revelar ? x : "?"}</tspan>
      {partes[1]}
    </text>
  );
};

// Balanza equilibrada: izq y der son los textos de cada platillo (con "?" = lo que falta)
export function Balanza({ izq, der, x, revelar = false }) {
  return (
    <svg viewBox="0 0 320 180" style={{ width: "100%", maxWidth: 340, display: "block", margin: "10px auto 0" }} role="img" aria-label={`Balanza equilibrada: ${izq} = ${der}`}>
      <polygon points="160,58 138,156 182,156" fill="#64748b" />
      <rect x="112" y="156" width="96" height="10" rx="5" fill="#475569" />
      <line x1="60" y1="58" x2="260" y2="58" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
      <circle cx="160" cy="58" r="8" fill="#e2e8f0" />
      {[60, 260].map(cx => (
        <g key={cx}>
          <line x1={cx} y1="58" x2={cx - 46} y2="128" stroke="#94a3b8" strokeWidth="2" />
          <line x1={cx} y1="58" x2={cx + 46} y2="128" stroke="#94a3b8" strokeWidth="2" />
          <path d={`M${cx - 54} 128 L${cx + 54} 128 Q${cx + 46} 150 ${cx} 150 Q${cx - 46} 150 ${cx - 54} 128 Z`} fill="#334155" stroke="#94a3b8" strokeWidth="2" />
          <rect x={cx - 52} y="88" width="104" height="38" rx="9" fill="#0f172a" stroke="#475569" strokeWidth="2" />
        </g>
      ))}
      <Etiqueta txt={izq} x={x} revelar={revelar} cx={60} y={115} />
      <Etiqueta txt={der} x={x} revelar={revelar} cx={260} y={115} />
    </svg>
  );
}

const chip = { minWidth: 46, padding: "8px 8px", borderRadius: 10, background: "#0f172a", border: "2px solid #334155", color: "white", fontSize: 20, fontWeight: 800, textAlign: "center" };

// Secuencia de números; hueco = posición oculta (o -1 si no hay hueco)
export function Secuencia({ terms, hueco, revelar = false }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 14 }}>
      {terms.map((n, i) => {
        const oculto = i === hueco;
        if (oculto && !revelar) return <div key={i} style={{ ...chip, border: `2px dashed ${colorHueco}`, color: colorHueco }}>?</div>;
        if (oculto && revelar) return <div key={i} style={{ ...chip, border: "2px solid #22c55e", color: "#4ade80", background: "#14532d" }}>{n}</div>;
        return <div key={i} style={chip}>{n}</div>;
      })}
    </div>
  );
}

// Fila de figuras o colores, con un "?" al final
export function FilaFiguras({ items, siguiente, revelar = false }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center", marginTop: 14, fontSize: 30 }}>
      {items.map((f, i) => <span key={i}>{f}</span>)}
      {revelar
        ? <span style={{ border: "2px solid #22c55e", borderRadius: 10, padding: "0 6px", background: "#14532d" }}>{siguiente}</span>
        : <span style={{ border: `2px dashed ${colorHueco}`, borderRadius: 10, padding: "0 12px", color: colorHueco, fontWeight: 800, fontSize: 24 }}>?</span>}
    </div>
  );
}
