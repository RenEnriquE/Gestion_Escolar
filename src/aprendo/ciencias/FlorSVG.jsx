// Dibujo de una flor con sus 3 partes rotuladas A, B y C (como en la presentación de clases):
// A = pétalo · B = estambre · C = pistilo.
// marca: letra resaltada con "?" · revelar: muestra el nombre de cada parte.
export const PARTES_FLOR = [
  { l: "A", id: "petalo",   nombre: "Pétalo",   art: "el pétalo",   corta: "tiene colores y llama a los insectos" },
  { l: "B", id: "estambre", nombre: "Estambre", art: "el estambre", corta: "tiene el polen (un polvito amarillo)" },
  { l: "C", id: "pistilo",  nombre: "Pistilo",  art: "el pistilo",  corta: "es donde nace la semilla" },
];

const PUNTOS = {
  A: { x: 88,  y: 150, bx: 36,  by: 52,  nombre: "Pétalo" },
  B: { x: 182, y: 132, bx: 264, by: 52,  nombre: "Estambre" },
  C: { x: 150, y: 168, bx: 264, by: 218, nombre: "Pistilo" },
};

export default function FlorSVG({ marca = null, revelar = false, ancho = 260 }) {
  return (
    <svg viewBox="0 0 300 300" width={ancho} style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }} role="img" aria-label="Dibujo de una flor con sus partes rotuladas A, B y C">
      <rect x="0" y="0" width="300" height="300" rx="14" fill="#0f172a" />
      {/* tallo */}
      <rect x="143" y="225" width="14" height="75" rx="6" fill="#22c55e" />
      {/* pétalos de atrás */}
      <ellipse cx="120" cy="112" rx="20" ry="46" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" transform="rotate(-18 120 112)" />
      <ellipse cx="180" cy="112" rx="20" ry="46" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" transform="rotate(18 180 112)" />
      {/* pétalos laterales */}
      <ellipse cx="92" cy="166" rx="52" ry="22" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" transform="rotate(-28 92 166)" />
      <ellipse cx="208" cy="166" rx="52" ry="22" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" transform="rotate(28 208 166)" />
      {/* receptáculo */}
      <ellipse cx="150" cy="226" rx="30" ry="14" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
      {/* estambres */}
      <g stroke="#a16207" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M130 218 C124 190 122 160 124 138" />
        <path d="M170 218 C176 190 178 160 176 138" />
      </g>
      <g fill="#facc15" stroke="#a16207" strokeWidth="2">
        <ellipse cx="124" cy="134" rx="9" ry="12" />
        <ellipse cx="176" cy="134" rx="9" ry="12" />
      </g>
      <g fill="#fde047"><circle cx="112" cy="120" r="2.5" /><circle cx="188" cy="120" r="2.5" /><circle cx="124" cy="116" r="2.5" /><circle cx="176" cy="116" r="2.5" /></g>
      {/* pistilo */}
      <rect x="146" y="116" width="8" height="100" rx="4" fill="#bef264" stroke="#4d7c0f" strokeWidth="1.5" />
      <circle cx="150" cy="112" r="11" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" />
      <ellipse cx="150" cy="214" rx="17" ry="13" fill="#bef264" stroke="#4d7c0f" strokeWidth="2" />
      <circle cx="145" cy="214" r="3" fill="#65a30d" /><circle cx="155" cy="214" r="3" fill="#65a30d" />

      {Object.entries(PUNTOS).map(([l, p]) => {
        const activo = marca === l;
        return (
          <g key={l}>
            <line x1={p.x} y1={p.y} x2={p.bx} y2={p.by} stroke={activo ? "#fbbf24" : "#cbd5e1"} strokeWidth={activo ? 3 : 1.5} />
            <circle cx={p.x} cy={p.y} r="4" fill={activo ? "#fbbf24" : "#cbd5e1"} />
            <circle cx={p.bx} cy={p.by} r="15" fill={activo ? "#fbbf24" : "#1e293b"} stroke={activo ? "#f59e0b" : "#cbd5e1"} strokeWidth="2" />
            <text x={p.bx} y={p.by + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={activo ? "#1e293b" : "white"}>{l}</text>
            {revelar && (
              <text x={p.bx} y={p.by + 32} textAnchor="middle" fontSize="13" fontWeight="800" fill="#4ade80" stroke="#0f172a" strokeWidth="3" paintOrder="stroke">{p.nombre}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
