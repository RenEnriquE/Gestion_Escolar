import { Balanza, Secuencia, FilaFiguras } from "./Visuales.jsx";

const card = "#1e293b", border = "#334155";

const Caja = ({ titulo, color, children }) => (
  <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
    <div style={{ color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{titulo}</div>
    <div style={{ color: "white", fontSize: 15, lineHeight: 1.55 }}>{children}</div>
  </div>
);

// Ejemplo resuelto paso a paso, como en el cuaderno
const Ejemplo = ({ titulo, lineas, color = "#a855f7" }) => (
  <div style={{ background: "#0f172a", border: `1px solid ${border}`, borderLeft: `5px solid ${color}`, borderRadius: 10, padding: "10px 12px", margin: "8px 0" }}>
    <div style={{ color, fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{titulo}</div>
    {lineas.map((l, i) => <div key={i} style={{ color: "#e2e8f0", fontSize: 14.5, lineHeight: 1.55 }}>{l}</div>)}
  </div>
);

const Seccion = ({ children }) => (
  <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 900, margin: "22px 2px 10px" }}>{children}</div>
);

function RepasoEcuaciones() {
  return (
    <>
      <Caja titulo="🎯 Objetivos de la unidad" color="#a855f7">
        Conocer qué son las ecuaciones, resolverlas usando sumas y restas, comprobar el resultado y resolver problemas con ecuaciones.
      </Caja>

      <Caja titulo="🟰 ¿Qué es una ecuación?" color="#0ea5e9">
        Una <b>ecuación</b> es una <b>igualdad</b> con un <b>número desconocido</b>, llamado <b>incógnita</b>.<br />
        La incógnita se puede representar con un dibujo (△ ★ □ ♡ 😊) o con una letra o un “?”.
        <Ejemplo titulo="Ejemplo" color="#0ea5e9" lineas={["20 + △ = 34", "El △ es el número que falta: la incógnita."]} />
      </Caja>

      <Caja titulo="🔄 ¿Cómo se resuelve? Operación inversa" color="#10b981">
        La <b>suma</b> se resuelve con una <b>resta</b> y la <b>resta</b> se resuelve con una <b>suma</b>.
        <div style={{ marginTop: 8 }}>
          <b>Pasos:</b><br />
          1. Mira qué operación hay con la incógnita.<br />
          2. Pasa los números al otro lado y usa la operación inversa.<br />
          3. Calcula en tu hoja.<br />
          4. <b>Comprueba</b> reemplazando el resultado en la ecuación.
        </div>
        <Ejemplo titulo="Suma → se resuelve restando" color="#10b981" lineas={["16 + △ = 22", "△ = 22 − 16 = 6", "Comprobación: 16 + 6 = 22 ✓"]} />
        <Ejemplo titulo="Resta → se resuelve sumando" color="#10b981" lineas={["□ − 18 = 35", "□ = 35 + 18 = 53", "Comprobación: 53 − 18 = 35 ✓"]} />
        <Ejemplo titulo="Más ejemplos del cuaderno" color="#10b981" lineas={["29 + △ = 32 → 32 − 29 = 3 → comprobación: 29 + 3 = 32", "♡ + 58 = 99 → 99 − 58 = 41 → comprobación: 41 + 58 = 99", "□ − 54 = 11 → 11 + 54 = 65 → comprobación: 65 − 54 = 11"]} />
      </Caja>

      <Caja titulo="⚖️ La balanza y la igualdad" color="#f59e0b">
        El signo <b>=</b> significa que los dos lados valen lo mismo, como en una balanza equilibrada. Si 20 = ? + 6, lo que falta es 20 − 6 = 14.
        <Balanza izq="20" der="? + 6" x={14} revelar />
        <Ejemplo titulo="Más ejemplos" color="#f59e0b" lineas={["24 + ? = 30 → 30 − 24 = 6", "13 + ? = 26 → 26 − 13 = 13", "Da lo mismo en qué lado esté la incógnita: 25 = 8 + ? → 25 − 8 = 17"]} />
      </Caja>

      <Caja titulo="🐻 Dibujos que esconden números" color="#ef4444">
        Los dibujos <b>iguales</b> valen lo <b>mismo</b>.<br />
        ♡ + ♡ = 4 → cada ♡ vale 2 (porque 2 + 2 = 4).<br />
        ♡ + ♡ + ♡ = 9 → cada ♡ vale 3 (porque 3 + 3 + 3 = 9).
        <Ejemplo titulo="Con dos ecuaciones" color="#ef4444" lineas={["🐰 + 5 = 9 → 🐰 = 9 − 5 = 4", "🐰 + 🐻 = 8 → 4 + 🐻 = 8 → 🐻 = 8 − 4 = 4", "Primero resuelve la ecuación que tiene un solo dibujo."]} />
      </Caja>

      <Caja titulo="💭 Problemas: “pensé en un número”" color="#ec4899">
        <b>Pasos:</b> lee el problema · busca los <span style={{ color: "#f87171", fontWeight: 800 }}>datos</span> (números) y la <span style={{ color: "#60a5fa", fontWeight: 800 }}>pregunta</span> · escribe la ecuación con □ · resuélvela con la operación inversa · comprueba.
        <Ejemplo titulo="“Le sumé” → □ + número" color="#ec4899" lineas={["A un número le sumé 11 y obtuve 25. ¿Cuál es el número?", "□ + 11 = 25 → 25 − 11 = 14", "Comprobación: 14 + 11 = 25 ✓"]} />
        <Ejemplo titulo="“Le resté” → □ − número" color="#ec4899" lineas={["Pensé en un número y le resté 15. Obtuve 30. ¿Cuál es el número?", "□ − 15 = 30 → 30 + 15 = 45", "Comprobación: 45 − 15 = 30 ✓"]} />
        <Ejemplo titulo="“Obtuve… después de sumarle”" color="#ec4899" lineas={["Obtuve 80 después de pensar en un número y sumarle 15.", "80 = □ + 15 → 80 − 15 = 65", "Comprobación: 65 + 15 = 80 ✓"]} />
      </Caja>

      <Caja titulo="⭐ Trucos para la prueba" color="#14b8a6">
        • Siempre <b>comprueba</b>: cambia el símbolo por tu resultado y mira si la igualdad se cumple.<br />
        • Si la ecuación <b>suma</b>, resuelves <b>restando</b>; si <b>resta</b>, resuelves <b>sumando</b>.<br />
        • Escribe los cálculos en columnas y con cuidado (cuando falte, ¡recuerda reagrupar!).<br />
        • En los problemas, subraya los datos y la pregunta.
      </Caja>
    </>
  );
}

function RepasoPatrones() {
  return (
    <>
      <Caja titulo="🎯 Objetivo" color="#3b82f6">
        Identificar y escribir la regla de formación de un patrón, y completar patrones de figuras, colores y números.
      </Caja>

      <Caja titulo="🔁 ¿Qué es un patrón?" color="#8b5cf6">
        Un <b>patrón</b> es una <b>secuencia</b> de elementos (figuras, colores, sonidos o números) que siguen una <b>regla determinada</b>.<br />
        Esta regla nos permite saber qué elemento continúa.
        <FilaFiguras items={["🔴", "🟦", "🔴", "🟦", "🔴"]} siguiente="🟦" revelar />
        <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginTop: 6 }}>Se repite 🔴 🟦 → sigue 🟦</div>
      </Caja>

      <Caja titulo="🔴 Patrones de figuras y colores" color="#14b8a6">
        Busca el <b>grupo que se repite</b>: ese grupo es el patrón.
        <Ejemplo titulo="Ejemplos" color="#14b8a6" lineas={["❤️ 😊 😊 ❤️ 😊 😊 → se repite ❤️ 😊 😊 · sigue ❤️", "🔺 🔺 🟦 🔺 🔺 🟦 → se repite 🔺 🔺 🟦 · sigue 🔺"]} />
      </Caja>

      <Caja titulo="🔢 Patrones numéricos: la regla" color="#3b82f6">
        En un patrón numérico siempre se <b>suma</b> o se <b>resta</b> el <b>mismo número</b>.<br />
        • Si los números <b>suben</b>, la regla es <b>sumar</b>.<br />
        • Si los números <b>bajan</b>, la regla es <b>restar</b>.
        <div style={{ marginTop: 8 }}><b>¿Cómo encuentro la regla?</b> Mira cuánto cambia entre dos números seguidos (el mayor menos el menor) y comprueba que pase lo mismo con los otros.</div>
        <Secuencia terms={[5, 7, 9, 11, 13, 15]} hueco={-1} />
        <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginTop: 6 }}>7 − 5 = 2 · 9 − 7 = 2 → la regla es <b style={{ color: "white" }}>sumar 2</b></div>
      </Caja>

      <Caja titulo="📒 Ejemplos del cuaderno" color="#f59e0b">
        <Ejemplo titulo="Sumar" color="#f59e0b" lineas={["4, 7, 10, 13, 16 → sumar 3", "150, 155, 160, 165 → sumar 5", "230, 250, 270, 290, 310 → sumar 20", "10, 60, 110, 160 → sumar 50"]} />
        <Ejemplo titulo="Restar" color="#f59e0b" lineas={["18, 15, 12, 9, 6, 3 → restar 3", "42, 36, 30, 24, 18 → restar 6", "35, 28, 21, 14, 7 → restar 7", "630, 620, 610, 600 → restar 10", "900, 850, 800, 750 → restar 50"]} />
        <Ejemplo titulo="Con las tablas de multiplicar" color="#f59e0b" lineas={["5, 10, 15, 20, 25 → sumar 5 (tabla del 5)", "12, 16, 20, 24, 28 → sumar 4 (tabla del 4)", "48, 44, 40, 36, 32 → restar 4", "60, 50, 40, 30, 20 → restar 10 (tabla del 10)"]} />
        <Ejemplo titulo="Con dibujos" color="#f59e0b" lineas={["Autos 25, 30, 35, 40, 45, 50 → sumar 5", "Camisas 97, 94, 91, 88, 85, 82, 79 → restar 3"]} />
      </Caja>

      <Caja titulo="⭐ Trucos para la prueba" color="#ec4899">
        • Para completar una secuencia, primero descubre la regla y luego aplícala.<br />
        • Si falta un número del medio, usa el anterior: anterior + regla (o − regla).<br />
        • Comprueba que la regla funcione en todos los números.<br />
        • Con números grandes (230, 250, 270…) fíjate solo en lo que cambia: ¡de 20 en 20!
      </Caja>
    </>
  );
}

// Hoja de estudio de la unidad (sin preguntas). tema: "eq" (Ecuaciones) o "pa" (Patrones)
export default function EcuacionesRepaso({ tema, onVolver }) {
  const esEq = tema === "eq";
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <button onClick={onVolver} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a actividades</button>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>📚</div>
        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>Repasa: {esEq ? "Ecuaciones" : "Patrones"}</div>
        <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{esEq ? "Qué es una ecuación, cómo se resuelve y cómo se comprueba" : "Qué es un patrón y cómo encontrar su regla"}</div>
      </div>
      {esEq ? <RepasoEcuaciones /> : <RepasoPatrones />}
      <div style={{ textAlign: "center", margin: "18px 0 26px" }}>
        <button onClick={onVolver} style={{ background: "#22c55e", color: "white", border: "none", borderRadius: 12, padding: "14px 30px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>¡Listo! A practicar →</button>
      </div>
    </div>
  );
}
