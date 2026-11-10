import { useEffect, useState } from "react";

// Detecta si se publicó una versión nueva de la app y la carga.
// - Al abrir la página, al volver a la pestaña/app (celular, tablet) y al recuperar internet: recarga sola.
// - Si la persona la está usando y sale una versión nueva: muestra un aviso para actualizar con un toque.
const INTERVALO = 10 * 60 * 1000;

const scriptActual = () => {
  const s = [...document.querySelectorAll('script[type="module"][src]')].map(x => x.getAttribute("src")).find(x => /\/assets\//.test(x || ""));
  return s || null;
};

async function hayVersionNueva() {
  const actual = scriptActual();
  if (!actual) return false; // modo desarrollo o sin empaquetar
  try {
    const r = await fetch("/index.html?v=" + Date.now(), { cache: "no-store" });
    if (!r.ok) return false;
    const html = await r.text();
    const m = html.match(/<script[^>]+type="module"[^>]+src="([^"]*\/assets\/[^"]+)"/);
    return !!m && m[1] !== actual;
  } catch { return false; }
}

// Evita recargar en bucle si por algún motivo la versión nueva aún no está disponible
const puedeRecargar = () => {
  try {
    const ult = Number(sessionStorage.getItem("ge_recarga") || 0);
    if (Date.now() - ult < 60 * 1000) return false;
    sessionStorage.setItem("ge_recarga", String(Date.now()));
  } catch {}
  return true;
};

export default function AvisoActualizacion() {
  const [nueva, setNueva] = useState(false);

  useEffect(() => {
    if (!scriptActual()) return;
    let vivo = true;
    const revisar = async (recargarSola) => {
      if (!(await hayVersionNueva()) || !vivo) return;
      if (recargarSola && puedeRecargar()) window.location.reload();
      else setNueva(true);
    };
    const alVolver = () => { if (document.visibilityState === "visible") revisar(true); };
    const alConectar = () => revisar(true);
    revisar(true);                                           // al abrir la página
    document.addEventListener("visibilitychange", alVolver); // al volver a la app
    window.addEventListener("pageshow", alVolver);
    window.addEventListener("online", alConectar);
    const t = setInterval(() => revisar(document.visibilityState !== "visible"), INTERVALO); // mientras la usan: solo avisa
    return () => {
      vivo = false;
      document.removeEventListener("visibilitychange", alVolver);
      window.removeEventListener("pageshow", alVolver);
      window.removeEventListener("online", alConectar);
      clearInterval(t);
    };
  }, []);

  if (!nueva) return null;
  return (
    <div style={{ position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 99999, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto", background: "#0f172a", color: "white", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 18px rgba(0,0,0,.3)", fontSize: 14, maxWidth: 420 }}>
        <span>Hay una versión nueva con actividades nuevas.</span>
        <button onClick={() => window.location.reload()} style={{ background: "#22c55e", color: "white", border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Actualizar</button>
      </div>
    </div>
  );
}
