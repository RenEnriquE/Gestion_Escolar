// Lee la frase en voz alta y, al terminar (con una pausa mínima para alcanzar a leer la respuesta), llama a alTerminar.
// Devuelve una función para cancelar (se usa al saltar o al salir de la pantalla).
export function avanzarSolo(texto, correcta, alTerminar) {
  let hecho = false, hablaOk = false, minOk = false;
  const timers = [];
  const intentar = () => { if (!hecho && hablaOk && minOk) { hecho = true; limpiar(); alTerminar(); } };
  const limpiar = () => { timers.forEach(clearTimeout); timers.length = 0; };
  const sintesis = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  const terminaHabla = () => timers.push(setTimeout(() => { hablaOk = true; intentar(); }, 600));

  if (texto && sintesis) {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "en-US"; u.rate = 0.85;
      u.onend = terminaHabla; u.onerror = terminaHabla;
      window.speechSynthesis.speak(u);
    } catch { hablaOk = true; }
  } else hablaOk = true;

  timers.push(setTimeout(() => { minOk = true; intentar(); }, correcta ? 1500 : 3500)); // tiempo mínimo para ver la respuesta
  timers.push(setTimeout(() => { if (!hecho) { hecho = true; limpiar(); alTerminar(); } }, 9000)); // tope por si la voz no responde
  intentar();

  return () => {
    hecho = true; limpiar();
    try { if (sintesis) window.speechSynthesis.cancel(); } catch {}
  };
}
