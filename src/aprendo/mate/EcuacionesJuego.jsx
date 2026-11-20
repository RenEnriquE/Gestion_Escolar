import { useEffect, useRef, useState } from "react";
import { MODOS, construir, clavesDe, clavesEnsayo, esClaveEcuaciones } from "./ecuacionesData.js";
import { Balanza, Secuencia, FilaFiguras } from "./Visuales.jsx";
import { usePermisos } from "../permisos.js";
import { registrarRespuesta, cargarRespuestas, analizarItems } from "../registro.js";

const verde = "#22c55e", rojo = "#ef4444", naranja = "#f59e0b", azulTexto = "#60a5fa";
const card = "#1e293b", border = "#334155";
const ESPERA_OK = 1500;      // ms que se muestra un acierto antes de pasar a la siguiente

const REFUERZO = { id: "ep_refuerzo", label: "Reforzar mis errores", emoji: "🎯", color: naranja,
  desc: "Practica las preguntas de Ecuaciones y Patrones que más te cuestan",
  recuerda: "Aquí aparecen solo las preguntas que fallaste antes. Cuando las aciertes dos veces seguidas, se consideran dominadas." };

const barajar = (arr) => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

const armar = (claves, total) => claves.map(construir).filter(Boolean).slice(0, total)
  .map(q => ({ ...q, opciones: barajar([q.correcta, ...q.malas]) }));

const Boton = ({ children, onClick, color, disabled, style }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ background: disabled ? "#334155" : color, color: disabled ? "#64748b" : "white", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
    {children}
  </button>
);

const Volver = ({ onClick, texto }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14, marginBottom: 14, padding: 0 }}>{texto}</button>
);

// Problema: datos (números) en rojo y pregunta en azul, como pide la guía
const Problema = ({ texto }) => {
  const i = texto.lastIndexOf("¿");
  const datos = i >= 0 ? texto.slice(0, i) : texto;
  const pregunta = i >= 0 ? texto.slice(i) : "";
  return (
    <>
      {datos.split(/(\d+)/).map((t, k) => /^\d+$/.test(t) ? <b key={k} style={{ color: "#f87171" }}>{t}</b> : <span key={k}>{t}</span>)}
      {pregunta && <span style={{ color: azulTexto }}>{pregunta}</span>}
    </>
  );
};

export default function EcuacionesJuego({ modo, onVolver }) {
  const { email, alumId } = usePermisos();
  const info = modo === "ep_refuerzo" ? REFUERZO : MODOS.find(m => m.id === modo);
  const color = info.color;
  const esEnsayo = modo === "ep_ensayo";
  const TOTAL = esEnsayo ? 15 : 10;
  const [fase, setFase] = useState("config"); // config | juego | resultado
  const [modoRefuerzo, setModoRefuerzo] = useState(false);
  const [pendientes, setPendientes] = useState(null); // null = cargando
  const [preguntas, setPreguntas] = useState([]);
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [aciertos, setAciertos] = useState([]);

  const cargarPendientes = async () => {
    try {
      const rows = await cargarRespuestas({ email });
      const todos = modo === "ep_refuerzo" || esEnsayo;
      const pend = Object.values(analizarItems(rows))
        .filter(x => x.pendiente && esClaveEcuaciones(x.item))
        .filter(x => { const q = construir(x.item); return q && (todos || q.modo === modo); })
        .sort((a, b) => b.errores - a.errores);
      setPendientes(pend.map(x => x.item));
    } catch { setPendientes([]); }
  };
  useEffect(() => { cargarPendientes(); }, []);

  const empezar = (refuerzo = false) => {
    const esRef = refuerzo || modo === "ep_refuerzo";
    let claves;
    if (esRef) claves = barajar(pendientes || []);
    else if (esEnsayo) claves = clavesEnsayo();
    else claves = barajar(clavesDe(modo));
    const qs = armar(claves, TOTAL);
    if (qs.length === 0) return;
    setModoRefuerzo(esRef);
    setPreguntas(qs);
    setActual(0); setElegida(null); setAciertos([]);
    setFase("juego");
  };

  const responder = (op) => {
    if (elegida !== null) return;
    const q = preguntas[actual];
    const ok = op === q.correcta;
    setElegida(op);
    setAciertos(a => [...a, ok]);
    // En "Reforzar" cada pregunta se anota en su propio tema; en el resto, en la actividad que se está jugando
    const act = modo === "ep_refuerzo" || modoRefuerzo ? q.modo : modo;
    registrarRespuesta({ actividad: `mate.${act}`, item: q.key, etiqueta: q.etiqueta, correcta: ok, elegida: op, refuerzo: modoRefuerzo, alumId });
  };

  const avanzar = () => {
    if (actual < preguntas.length - 1) { setActual(a => a + 1); setElegida(null); }
    else { setFase("resultado"); cargarPendientes(); }
  };

  // Si acierta pasa solo a la siguiente; si se equivoca se queda en la pantalla para leer la resolución paso a paso
  const refPasos = useRef(null);
  useEffect(() => {
    if (fase !== "juego" || elegida === null) return;
    const ok = elegida === preguntas[actual].correcta;
    if (!ok) {
      const t = setTimeout(() => refPasos.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" }), 150);
      return () => clearTimeout(t);
    }
    const t = setTimeout(avanzar, ESPERA_OK);
    return () => clearTimeout(t);
  }, [elegida, fase, actual]);

  const nPend = pendientes ? pendientes.length : 0;

  // ── Configuración ────────────────────────────────────────────────────────
  if (fase === "config") {
    const esRef = modo === "ep_refuerzo";
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <Volver onClick={onVolver} texto="← Volver a actividades" />
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>{info.emoji}</div>
          <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800 }}>{info.label}</div>
          <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Calcula en tu hoja, elige la alternativa y pasarás solo a la siguiente</div>
        </div>

        <div style={{ background: card, border: `2px solid ${color}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
          <div style={{ color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>💡 Recuerda</div>
          <div style={{ color: "white", fontSize: 15, lineHeight: 1.5 }}>{info.recuerda}</div>
        </div>

        <div style={{ background: card, border: `1px dashed ${border}`, borderRadius: 14, padding: "10px 14px", marginBottom: 18, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>
          ✍️ Ten a mano tu cuaderno u hoja y lápiz: haz los cálculos ahí (¡y comprueba!) y después elige el resultado correcto en la pantalla.
        </div>

        {!esRef && nPend > 0 && (
          <div style={{ background: card, border: `2px solid ${naranja}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "white", fontWeight: 800 }}>🎯 Reforzar mis errores</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{nPend} {nPend === 1 ? "pregunta" : "preguntas"} por reforzar</div>
            </div>
            <Boton color={naranja} onClick={() => empezar(true)}>Practicar</Boton>
          </div>
        )}

        {esRef && pendientes !== null && nPend === 0 && (
          <div style={{ background: card, border: `2px solid ${verde}`, borderRadius: 14, padding: 20, textAlign: "center", color: "white", marginBottom: 18 }}>
            <div style={{ fontSize: 34 }}>🎉</div>
            <div style={{ fontWeight: 800, marginTop: 4 }}>¡No tienes preguntas por reforzar!</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Practica las otras actividades y aquí aparecerán las que te cuesten más.</div>
          </div>
        )}

        <div style={{ position: "sticky", bottom: 0, margin: "0 -4px", padding: "14px 4px 12px", background: "linear-gradient(to top, rgba(244,246,249,1) 70%, rgba(244,246,249,0))", textAlign: "center", zIndex: 5 }}>
          <Boton color={verde} disabled={esRef && nPend === 0} onClick={() => empezar(false)}
            style={{ padding: "16px 40px", fontSize: 18, width: "100%", maxWidth: 420, boxShadow: nPend || !esRef ? "0 4px 18px rgba(34,197,94,.45)" : "none" }}>
            {esRef ? `▶ Reforzar (${Math.min(TOTAL, nPend)} preguntas)` : `▶ Empezar (${TOTAL} preguntas)`}
          </Boton>
        </div>
      </div>
    );
  }

  // ── Resultado ────────────────────────────────────────────────────────────
  if (fase === "resultado") {
    const correctas = aciertos.filter(Boolean).length;
    const total = preguntas.length;
    const ratio = total ? correctas / total : 0;
    const c = ratio >= 0.8 ? verde : ratio >= 0.5 ? naranja : rojo;
    const mensaje = ratio === 1 ? "¡Perfecto! 🏆" : ratio >= 0.8 ? "¡Muy bien! 🎉" : ratio >= 0.5 ? "¡Buen intento! 💪" : "¡Sigue practicando! 📚";
    const falladas = preguntas.filter((_, i) => !aciertos[i]);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
        <div style={{ background: card, border: `2px solid ${c}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{mensaje}</div>
          <div style={{ color: c, fontSize: 48, fontWeight: 900, margin: "8px 0" }}>{correctas}/{total}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18 }}>respuestas correctas</div>

          {falladas.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Para repasar</div>
              {falladas.map(q => (
                <div key={q.key} style={{ padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                  <div style={{ color: "#94a3b8", fontSize: 13, whiteSpace: "pre-line" }}>{q.etiqueta}</div>
                  <div style={{ color: verde, fontWeight: 700, fontSize: 14 }}>✓ {q.solucion}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {nPend > 0 && <Boton color={naranja} onClick={() => empezar(true)}>🎯 Reforzar errores ({nPend})</Boton>}
            {!modoRefuerzo && <Boton color={color} onClick={() => empezar(false)}>🔄 Otra ronda</Boton>}
            <Boton color="#334155" onClick={() => setFase("config")}>Inicio</Boton>
            <Boton color="#334155" onClick={onVolver}>← Volver</Boton>
          </div>
        </div>
      </div>
    );
  }

  // ── Juego ────────────────────────────────────────────────────────────────
  const q = preguntas[actual];
  const respondida = elegida !== null;
  const acerto = respondida && elegida === q.correcta;
  const m = MODOS.find(x => x.id === q.modo) || info;
  const v = q.visual;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4px 0" }}>
      <Volver onClick={() => setFase("config")} texto="← Salir de la práctica" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8 }}>
        <div style={{ color: "#475569", fontSize: 13 }}>{modoRefuerzo ? "🎯 " : ""}Pregunta {actual + 1} de {preguntas.length}</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {preguntas.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: aciertos[i] === true ? verde : aciertos[i] === false ? rojo : i === actual ? color : border }} />
          ))}
        </div>
      </div>

      <div style={{ background: card, border: `2px solid ${m.color}`, borderRadius: 16, padding: "18px 18px", marginBottom: 14 }}>
        <div style={{ color: m.color, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{m.emoji} {m.label}</div>
        {q.estilo === "problema" ? (
          <div style={{ color: "white", fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}><Problema texto={q.enunciado} /></div>
        ) : q.estilo === "ecuacion" ? (
          <div style={{ color: "white", fontSize: 28, fontWeight: 800, lineHeight: 1.5, textAlign: "center", whiteSpace: "pre-line" }}>{q.enunciado}</div>
        ) : (
          <div style={{ color: "white", fontSize: 19, fontWeight: 800, lineHeight: 1.4, textAlign: "center" }}>{q.enunciado}</div>
        )}
        {q.sub && <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 8, textAlign: q.estilo === "problema" ? "left" : "center" }}>{q.sub}</div>}
        {v?.tipo === "balanza" && <Balanza izq={v.izq} der={v.der} x={v.x} revelar={respondida} />}
        {v?.tipo === "seq" && <Secuencia terms={v.terms} hueco={v.hueco} revelar={respondida} />}
        {v?.tipo === "fig" && <FilaFiguras items={v.items} siguiente={q.correcta} revelar={respondida} />}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {q.opciones.map(op => {
          const esCorrecta = op === q.correcta;
          const esElegida = op === elegida;
          let bg = card, bd = border;
          if (respondida && esCorrecta) { bg = "#14532d"; bd = verde; }
          else if (respondida && esElegida) { bg = "#7f1d1d"; bd = rojo; }
          return (
            <button key={op} onClick={() => responder(op)} disabled={respondida}
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: q.opGrande ? "8px 16px" : "14px 16px", color: "white", fontSize: q.opGrande ? 30 : 18, fontWeight: 700, textAlign: "left", cursor: respondida ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span>{op}</span>
              {respondida && esCorrecta && <span style={{ color: verde, fontWeight: 800, fontSize: 18 }}>✓</span>}
              {respondida && esElegida && !esCorrecta && <span style={{ color: rojo, fontWeight: 800, fontSize: 18 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {/* Acierto: aviso breve y pasa solo. Error: resolución paso a paso y botón para seguir */}
      {respondida && acerto && (
        <div style={{ textAlign: "center", minHeight: 110 }}>
          <div style={{ color: verde, fontWeight: 700, fontSize: 15 }}>¡Correcto! 🎉</div>
          <div style={{ color: "#475569", fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>{q.explicacion}</div>
        </div>
      )}
      {respondida && !acerto && (
        <div ref={refPasos} style={{ background: card, border: `2px solid ${naranja}`, borderRadius: 14, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ color: rojo, fontWeight: 800, fontSize: 15 }}>Todavía no 🙂 · la respuesta correcta es <span style={{ color: verde }}>{q.correcta}</span></div>
          <div style={{ color: naranja, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, margin: "12px 0 8px" }}>📝 Así se resuelve, paso a paso</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(q.pasos || [q.explicacion]).map((paso, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 24px", height: 24, borderRadius: "50%", background: naranja, color: "#1e293b", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>{i + 1}</div>
                <div style={{ color: "white", fontSize: 14.5, lineHeight: 1.5 }}>{paso}</div>
              </div>
            ))}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12.5, marginTop: 12, lineHeight: 1.4 }}>Repítelo tú en tu hoja y compruébalo antes de seguir.</div>
          <Boton color={verde} onClick={avanzar} style={{ width: "100%", marginTop: 12, padding: "14px 20px", fontSize: 16 }}>
            {actual < preguntas.length - 1 ? "Entendido, siguiente →" : "Entendido, ver resultado →"}
          </Boton>
        </div>
      )}
    </div>
  );
}
