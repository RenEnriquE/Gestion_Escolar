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
// Supabase entrega como máximo 1000 filas por consulta, así que se pide por páginas.
export async function cargarRespuestas({ email = null, limite = 20000 } = {}) {
  const PAG = 1000, out = [];
  for (let desde = 0; desde < limite; desde += PAG) {
    let q = supabase.from("respuestas_aprendo").select("*");
    if (email) q = q.eq("email", email);
    const { data, error } = await q.order("creado_en", { ascending: false }).range(desde, desde + PAG - 1);
    if (error) throw error;
    out.push(...(data || []));
    if (!data || data.length < PAG) break;
  }
  return out;
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
