import PlantaSVG from "./PlantaSVG.jsx";
import FlorSVG from "./FlorSVG.jsx";

const card = "#1e293b", border = "#334155";

const PARTES = [
  { n: 5, nombre: "Raíz",  emoji: "🌱", color: "#a16207", txt: "Sujeta la planta al suelo y absorbe del suelo el agua y las sales minerales que necesita para vivir, gracias a sus pelos absorbentes. Generalmente crece hacia abajo, bajo la tierra." },
  { n: 4, nombre: "Tallo", emoji: "🌿", color: "#22c55e", txt: "Sostiene la planta y mantiene erguidas las hojas, las flores y los frutos. Además transporta el agua y las sales minerales desde el suelo hacia las hojas, y lleva la savia elaborada (que se fabrica en las hojas) a todas las partes de la planta. Generalmente crece hacia arriba, al contrario de la raíz." },
  { n: 3, nombre: "Hoja",  emoji: "🍃", color: "#f59e0b", txt: "Elabora su propio alimento gracias a la luz del sol, el agua y el aire (CO₂). Nace en el tallo o en las ramas y generalmente es verde. Tiene dos caras (haz y envés) y unos poros muy pequeños llamados estomas." },
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
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>📚</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Repasa la materia</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Todo lo que se evalúa: polinización, dispersión, partes, ciclo de vida, germinación, usos y plantas nativas</div>
      </div>

      <Caja titulo="🎯 Objetivo" color="#10b981">
        Observar y describir las necesidades de las plantas y su relación con la raíz, el tallo y las hojas, reconociendo además las funciones de la flor y el fruto. También, explicar cómo nace una planta nueva (polinización, dispersión y germinación), el ciclo de vida de una planta, sus usos y las plantas nativas de Chile.
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


      <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 900, margin: "22px 2px 10px" }}>🐝 Cómo nace una planta nueva</div>

      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 12, marginBottom: 14 }}>
        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, textAlign: "center" }}>Partes de la flor</div>
        <FlorSVG revelar ancho={240} />
      </div>

      <Caja titulo="🌼 La flor" color="#f472b6">
        La flor tiene tres partes:<br />
        <b>Pétalos:</b> tienen colores y llaman a los insectos.<br />
        <b>Estambre:</b> es la parte masculina y tiene el <b>polen</b>, un polvito amarillo.<br />
        <b>Pistilo:</b> es la parte femenina; ahí nace la <b>semilla</b>.
      </Caja>

      <Caja titulo="🐝 Polinización" color="#eab308">
        <b>Polinizar es llevar el polen de una flor a otra flor.</b> Lo transportan las abejas, las mariposas, los colibríes (aves) y el viento.
        <div style={{ marginTop: 8 }}>
          1. La abeja llega a la flor.<br />
          2. El polen se pega a su cuerpo.<br />
          3. La abeja va a otra flor.<br />
          4. El polen llega al pistilo y nace una semilla.
        </div>
        <div style={{ marginTop: 8 }}>Después, la flor se convierte en <b>fruto</b> y las semillas quedan dentro. Sin abejas ni insectos habría menos frutos y semillas.</div>
      </Caja>

      <Caja titulo="🌬️ Dispersión" color="#06b6d4">
        <b>Dispersar es llevar las semillas lejos de la planta madre</b>, para tener espacio, luz y agua.
        <div style={{ marginTop: 8 }}>
          <b>El viento</b> las lleva volando: semillas livianas, con pelitos o alas (diente de león).<br />
          <b>El agua</b> las lleva flotando (coco).<br />
          <b>Los animales</b> se las comen (mora) o se les pegan al pelo (abrojo).
        </div>
      </Caja>

      <Caja titulo="🌰 Germinación" color="#84cc16">
        <b>Germinar es cuando una semilla empieza a crecer.</b> Necesita <b>agua, aire y calor</b> (temperatura adecuada).
        <div style={{ marginTop: 8 }}>Primero sale la <b>raíz</b>; después sale el <b>tallo con hojas</b>. Así nace una plántula o planta joven.</div>
        <div style={{ marginTop: 8 }}>Experimento del poroto: algodón en el vaso, el poroto encima, un poquito de agua y en un lugar tibio.</div>
      </Caja>

      <Caja titulo="🔄 Ciclo de vida de una planta" color="#22c55e">
        1. <b>Semilla</b><br />
        2. <b>Germinación</b> (la planta nace)<br />
        3. <b>Plántula</b> (planta joven)<br />
        4. <b>Crecimiento</b> (planta adulta)<br />
        5. <b>Floración</b> (reproducción)<br />
        6. <b>Fruto</b> (guarda las semillas)
        <div style={{ marginTop: 8 }}>
          <b>Fruto:</b> protege a las semillas mientras se forman. <b>Semilla:</b> dentro de ella está la nueva planta. <b>Flor:</b> ahí están el polen y el óvulo.
        </div>
      </Caja>

      <Caja titulo="➡️ De la flor a una planta nueva" color="#0d9488">
        Flor → Polinización → Semilla y fruto → Dispersión → Germinación → Planta nueva. ¡Y todo empieza otra vez!
      </Caja>

      <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 900, margin: "22px 2px 10px" }}>🇨🇱 Tipos, usos y plantas de Chile</div>

      <Caja titulo="🌲 Tipos de plantas según sus semillas" color="#14b8a6">
        <b>S · Sin semilla:</b> musgo y helecho (no tienen flores, frutos ni semillas).<br />
        <b>D · Con semillas desnudas:</b> pino y araucaria (tienen semillas, pero no flor ni fruto).<br />
        <b>F · Con flor y fruto:</b> naranjo, manzano y tomate.
      </Caja>

      <Caja titulo="🧺 Usos de las plantas" color="#f97316">
        <b>Alimenticio:</b> nos sirven de alimento (lechuga, zanahoria, manzana).<br />
        <b>Medicinal:</b> se usan como remedio (manzanilla, boldo, matico).<br />
        <b>Ornamental:</b> adornan jardines y casas (rosa, clavel, tulipán).<br />
        <b>Industrial:</b> se transforman en productos (madera y papel del pino, telas de algodón).
      </Caja>

      <Caja titulo="🇨🇱 Plantas nativas de Chile" color="#dc2626">
        <b>Nativa:</b> crece de forma natural en un lugar, sin que la hayan traído las personas.<br />
        Nativas de Chile: araucaria, copihue (la flor nacional), boldo, quillay, canelo, palma chilena y maqui.<br />
        <b>Introducidas</b> (traídas de otros lugares): pino, eucalipto, naranjo y manzano.
      </Caja>

      <div style={{ textAlign: "center", margin: "18px 0 26px" }}>
        <button onClick={onVolver} style={{ background: "#22c55e", color: "white", border: "none", borderRadius: 12, padding: "14px 30px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>¡Listo! A practicar →</button>
      </div>
    </div>
  );
}
