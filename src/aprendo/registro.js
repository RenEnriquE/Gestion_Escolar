import { supabase } from "../supabase.js";

// Guarda una respuesta (no bloquea el juego; si falla, solo avisa por consola).
export function registrarRespuesta({ actividad, item, etiqueta, correcta, elegida, refuerzo = false, alumId = null }) {
  try {
    supabase.from("respuestas_aprendo")
      .insert({ alum_id: alumId || null, actividad, item, etiqueta, correcta, elegida: elegida ?? null, refuerzo })
      .then(({ error }) => { if (error) console.warn("No se pudo registrar la respuesta:", error.message); }, () => {});
  } catch {}
}

// Respuestas más recientes primero. Con `email` solo trae las de esa persona.
export async function cargarRespuestas({ email = null, limite = 5000 } = {}) {
  let q = supabase.from("respuestas_aprendo").select("*");
  if (email) q = q.eq("email", email);
  const { data, error } = await q.order("creado_en", { ascending: false }).limit(limite);
  if (error) throw error;
  return data || [];
}

// rows: respuestas (más recientes primero). Devuelve { [item]: { intentos, errores, dominado, pendiente, confusiones } }
// "Dominado" = las dos últimas respuestas de ese ítem fueron correctas. "Pendiente" = tuvo errores y aún no está dominado.
export function analizarItems(rows) {
  const por = {};
  rows.forEach(r => {
    const x = (por[r.item] = por[r.item] || { item: r.item, etiqueta: r.etiqueta, intentos: 0, errores: 0, hist: [], confusiones: {} });
    x.intentos++;
    if (!r.correcta) {
      x.errores++;
      if (r.elegida) x.confusiones[r.elegida] = (x.confusiones[r.elegida] || 0) + 1;
    }
    x.hist.push(!!r.correcta);
  });
  Object.values(por).forEach(x => {
    x.dominado = x.hist.length >= 2 && x.hist[0] && x.hist[1];
    x.pendiente = x.errores > 0 && !x.dominado;
  });
  return por;
}
