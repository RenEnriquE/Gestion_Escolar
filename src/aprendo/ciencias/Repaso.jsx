import PlantaSVG from "./PlantaSVG.jsx";

const card = "#1e293b", border = "#334155";

const PARTES = [
  { n: 5, nombre: "Raíz",  emoji: "🌱", color: "#a16207", txt: "Sujeta la planta al suelo y absorbe del suelo el agua y las sales minerales que necesita para vivir. Crece bajo la tierra." },
  { n: 4, nombre: "Tallo", emoji: "🌿", color: "#22c55e", txt: "Sostiene la planta y mantiene erguidas las hojas, las flores y los frutos. Además transporta el agua y los nutrientes por toda la planta." },
  { n: 3, nombre: "Hoja",  emoji: "🍃", color: "#f59e0b", txt: "Elabora su propio alimento gracias a la luz del sol, el agua y el aire (CO₂). También realiza el intercambio de gases con el entorno." },
  { n: 1, nombre: "Flor",  emoji: "🌸", color: "#ef4444", txt: "Sirve para la reproducción de la planta. De ella pueden formarse los frutos y las semillas." },
  { n: 2, nombre: "Fruto", emoji: "🍅", color: "#dc2626", txt: "Contiene y protege las semillas, que darán origen a nuevas plantas." },
];

const Caja = ({ titulo, color, children }) => (
  <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
    <div style={{ color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{titulo}</div>
    <div style={{ color: "white", fontSize: 15, lineHeight: 1.55 }}>{children}</div>
  </div>
);

// Hoja de estudio: resume la materia que se evaluará (sin preguntas).
export default function Repaso({ onVolver }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>📚</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>Repasa la materia</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Las plantas: sus partes y funciones</div>
      </div>

      <Caja titulo="🎯 Objetivo" color="#10b981">
        Observar y describir las necesidades de las plantas y su relación con la raíz, el tallo y las hojas, reconociendo además las funciones de la flor y el fruto.
      </Caja>

      <Caja titulo="🌍 ¿Por qué son importantes las plantas?" color="#0ea5e9">
        Las plantas son seres vivos muy importantes: nos entregan <b>alimento</b>, <b>oxígeno</b> para respirar y algunas incluso se usan como <b>medicina</b>. Para vivir y crecer necesitan <b>agua, luz y aire</b>.
      </Caja>

      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 12, marginBottom: 14 }}>
        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, textAlign: "center" }}>Partes de la planta</div>
        <PlantaSVG revelar ancho={260} />
      </div>

      {PARTES.map(p => (
        <div key={p.nombre} style={{ background: card, borderLeft: `6px solid ${p.color}`, border: `1px solid ${border}`, borderLeftWidth: 6, borderLeftColor: p.color, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
          <div style={{ color: p.color, fontSize: 18, fontWeight: 900 }}>{p.emoji} {p.nombre} <span style={{ color: "#64748b", fontSize: 12, fontWeight: 700 }}>(n.° {p.n} en el dibujo)</span></div>
          <div style={{ color: "white", fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>{p.txt}</div>
        </div>
      ))}

      <Caja titulo="☀️ La fotosíntesis: la fábrica verde" color="#f59e0b">
        Las plantas son seres vivos <b>autótrofos</b>: pueden fabricar su propio alimento mediante la <b>fotosíntesis</b>.
        <div style={{ marginTop: 8 }}>
          <b style={{ color: "#4ade80" }}>Entra:</b> luz solar, agua (H₂O) y dióxido de carbono (CO₂).<br />
          <b style={{ color: "#fbbf24" }}>Sale:</b> glucosa (su alimento) y oxígeno (lo libera al aire).
        </div>
        <div style={{ marginTop: 8 }}>El dióxido de carbono entra a la hoja por unos poros diminutos llamados <b>estomas</b>.</div>
      </Caja>

      <Caja titulo="🔢 Los pasos de la fotosíntesis" color="#10b981">
        1. La planta absorbe agua y sales minerales por las raíces.<br />
        2. Toma dióxido de carbono del aire.<br />
        3. La luz del sol le da energía.<br />
        4. Fabrica su alimento (azúcares).<br />
        5. Libera oxígeno al aire.
      </Caja>

      <div style={{ textAlign: "center", margin: "18px 0 26px" }}>
        <button onClick={onVolver} style={{ background: "#22c55e", color: "white", border: "none", borderRadius: 12, padding: "14px 30px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>¡Listo! A practicar →</button>
      </div>
    </div>
  );
}
