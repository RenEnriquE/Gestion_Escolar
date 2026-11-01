// Dibujo de la planta con las 5 partes numeradas, como en la guía (1 flor, 2 fruto, 3 hoja, 4 tallo, 5 raíz).
// marca: número resaltado con "?" · revelar: muestra el nombre de cada parte.
const PUNTOS = {
  1: { x: 150, y: 80,  bx: 255, by: 38,  nombre: "Flor"  },
  2: { x: 182, y: 212, bx: 262, by: 212, nombre: "Fruto" },
  3: { x: 196, y: 164, bx: 262, by: 150, nombre: "Hoja"  },
  4: { x: 150, y: 235, bx: 38,  by: 235, nombre: "Tallo" },
  5: { x: 132, y: 300, bx: 38,  by: 318, nombre: "Raíz"  },
};

export default function PlantaSVG({ marca = null, revelar = false, ancho = 280 }) {
  const petalos = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 300 360" width={ancho} style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }} role="img" aria-label="Dibujo de una planta con sus partes numeradas">
      {/* cielo y suelo */}
      <rect x="0" y="0" width="300" height="250" rx="14" fill="#0f172a" />
      <rect x="0" y="250" width="300" height="110" rx="0" fill="#5b3a1e" />
      <rect x="0" y="250" width="300" height="8" fill="#3f2a14" />
      {/* raíces */}
      <g stroke="#d6b48a" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M150 250 C150 285 140 300 128 335" />
        <path d="M150 255 C152 290 160 305 172 338" />
        <path d="M150 262 C140 280 112 292 96 316" />
        <path d="M150 262 C162 280 188 292 206 314" />
        <path d="M148 280 C146 300 150 322 150 346" />
      </g>
      {/* tallo */}
      <rect x="144" y="105" width="12" height="150" rx="6" fill="#22c55e" />
      {/* hojas */}
      <g fill="#16a34a" stroke="#14532d" strokeWidth="2">
        <path d="M150 190 C120 140 70 160 62 190 C90 210 130 208 150 190Z" />
        <path d="M150 170 C180 125 232 140 240 170 C212 192 172 190 150 170Z" />
      </g>
      <path d="M150 190 L84 182" stroke="#14532d" strokeWidth="2" fill="none" />
      <path d="M150 170 L220 162" stroke="#14532d" strokeWidth="2" fill="none" />
      {/* fruto */}
      <path d="M150 218 C160 214 170 212 176 212" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="184" cy="214" r="13" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
      {/* flor */}
      <g transform="translate(150 80)">
        {petalos.map(a => <ellipse key={a} cx="0" cy="-24" rx="12" ry="20" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" transform={`rotate(${a})`} />)}
        <circle r="15" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      </g>

      {/* números */}
      {Object.entries(PUNTOS).map(([n, p]) => {
        const num = Number(n);
        const activo = marca === num;
        return (
          <g key={n}>
            <line x1={p.x} y1={p.y} x2={p.bx} y2={p.by} stroke={activo ? "#fbbf24" : "#cbd5e1"} strokeWidth={activo ? 3 : 1.5} />
            <circle cx={p.x} cy={p.y} r="4" fill={activo ? "#fbbf24" : "#cbd5e1"} />
            <circle cx={p.bx} cy={p.by} r="15" fill={activo ? "#fbbf24" : "#1e293b"} stroke={activo ? "#f59e0b" : "#cbd5e1"} strokeWidth="2" />
            <text x={p.bx} y={p.by + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={activo ? "#1e293b" : "white"}>{n}</text>
            {revelar && (
              <text x={p.bx} y={p.by + (p.by > 280 ? 30 : 32)} textAnchor="middle" fontSize="13" fontWeight="800" fill="#4ade80" stroke="#0f172a" strokeWidth="3" paintOrder="stroke">{p.nombre}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
