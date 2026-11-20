import { createContext, useContext } from "react";

// Catálogo de contenidos de ¡Aprendo! que se pueden habilitar/deshabilitar por grupo.
// Al agregar una asignatura o actividad nueva, súmala aquí (el id debe coincidir con el usado en su archivo).
export const CATALOGO = [
  {
    id: "mate", label: "Matemáticas", emoji: "➗",
    actividades: [
      { id: "mate.eq_repaso",     label: "Ecuaciones y Patrones · Ecuaciones: Repasa la materia" },
      { id: "mate.eq_incognita",  label: "Ecuaciones y Patrones · Ecuaciones: Encuentra la incógnita" },
      { id: "mate.eq_balanza",    label: "Ecuaciones y Patrones · Ecuaciones: La balanza" },
      { id: "mate.eq_comprobar",  label: "Ecuaciones y Patrones · Ecuaciones: Operación inversa y comprobación" },
      { id: "mate.eq_figuras",    label: "Ecuaciones y Patrones · Ecuaciones: Figuras con valores" },
      { id: "mate.eq_problemas",  label: "Ecuaciones y Patrones · Ecuaciones: Problemas ¿qué número es?" },
      { id: "mate.eq_plantea",    label: "Ecuaciones y Patrones · Ecuaciones: Plantea la ecuación" },
      { id: "mate.pa_repaso",     label: "Ecuaciones y Patrones · Patrones: Repasa la materia" },
      { id: "mate.pa_secuencia",  label: "Ecuaciones y Patrones · Patrones: Completa la secuencia" },
      { id: "mate.pa_regla",      label: "Ecuaciones y Patrones · Patrones: ¿Cuál es la regla?" },
      { id: "mate.pa_figuras",    label: "Ecuaciones y Patrones · Patrones: Figuras y colores" },
      { id: "mate.ep_ensayo",     label: "Ecuaciones y Patrones · Ensayo de la prueba" },
      { id: "mate.ep_refuerzo",   label: "Ecuaciones y Patrones · Reforzar mis errores" },
      { id: "mate.resta",     label: "Divisiones · Resta repetida" },
      { id: "mate.reparto",   label: "Divisiones · Repartir en partes iguales" },
      { id: "mate.tablas",    label: "Divisiones · Tablas y divisiones" },
      { id: "mate.familias",  label: "Divisiones · Multiplicar y dividir" },
      { id: "mate.problemas", label: "Divisiones · Problemas" },
      { id: "mate.refuerzo",  label: "Divisiones · Reforzar mis errores" },
    ],
  },
  {
    id: "matematicas", label: "Habilidades Matemáticas", emoji: "🧩",
    actividades: [
      { id: "matematicas.cuadricula", label: "Encuentra la casilla" },
      { id: "matematicas.localizar",  label: "Localiza los objetos" },
      { id: "matematicas.mapa",       label: "Mapa del Reino" },
    ],
  },
  {
    id: "lenguaje", label: "Lenguaje y Comunicación", emoji: "📖",
    actividades: [
      { id: "lenguaje.efrain", label: "Efraín en La Vega" },
    ],
  },
  {
    id: "ciencias", label: "Ciencias Naturales", emoji: "🔬",
    actividades: [
      { id: "ciencias.repaso",       label: "Plantas: Repasa la materia" },
      { id: "ciencias.partes",       label: "Plantas: Partes de la planta" },
      { id: "ciencias.funciones",    label: "Plantas: ¿Qué función cumple cada parte?" },
      { id: "ciencias.necesidades",  label: "Plantas: Lo que necesitan las plantas" },
      { id: "ciencias.fotosintesis", label: "Plantas: La fábrica verde (fotosíntesis)" },
      { id: "ciencias.orden",        label: "Plantas: Ordena la fotosíntesis" },
      { id: "ciencias.flor",         label: "Plantas: La flor y sus partes" },
      { id: "ciencias.polinizacion", label: "Plantas: Polinización" },
      { id: "ciencias.ordenpolin",   label: "Plantas: Ordena la polinización" },
      { id: "ciencias.dispersion",   label: "Plantas: Dispersión de las semillas" },
      { id: "ciencias.germinacion",  label: "Plantas: Germinación" },
      { id: "ciencias.ciclo",        label: "Plantas: Ciclo de vida de una planta" },
      { id: "ciencias.ordenciclo",   label: "Plantas: Ordena el ciclo de vida" },
      { id: "ciencias.ordenviaje",   label: "Plantas: De la flor a una planta nueva" },
      { id: "ciencias.tipos",        label: "Plantas: Tipos de plantas" },
      { id: "ciencias.usos",         label: "Plantas: Usos de las plantas" },
      { id: "ciencias.nativas",      label: "Plantas: Plantas nativas de Chile" },
      { id: "ciencias.ensayo",       label: "Plantas: Ensayo de la prueba" },
      { id: "ciencias.refuerzo",     label: "Plantas: Reforzar mis errores" },
    ],
  },
  {
    id: "ingles", label: "Inglés", emoji: "🌎",
    actividades: [
      { id: "ingles.unit5ensayo",    label: "Unit 5: Ensayo de la prueba" },
      { id: "ingles.unit5",          label: "Unit 5: Vocabulario" },
      { id: "ingles.unit5fotos",     label: "Unit 5: Mira y responde" },
      { id: "ingles.unit5oraciones", label: "Unit 5: Complete the sentence" },
      { id: "ingles.unit5lectura",   label: "Unit 5: Read and answer" },
      { id: "ingles.unit5refuerzo",  label: "Unit 5: Reforzar mis errores" },
      { id: "ingles.unit4",          label: "Unit 4: Vocabulario" },
      { id: "ingles.unit4oraciones", label: "Unit 4: Complete the sentence" },
      { id: "ingles.refuerzo",       label: "Unit 4: Reforzar mis errores" },
    ],
  },
];

// Regla: si un contenido no tiene grupos marcados → lo ve todo el mundo.
// Si tiene grupos marcados → solo los usuarios de esos grupos.
// Administradores: siempre ven todo. Directivos: ven todo, salvo que tengan grupos asignados (entonces ven lo mismo que ese grupo).
export function crearPuede(rol, gruposUsuario, cfg) {
  const permisos = cfg?.permisos || {};
  const mios = gruposUsuario || [];
  return (id) => {
    if (rol === "admin" || (rol === "directivo" && mios.length === 0)) return true;
    const reglas = permisos[id];
    if (!reglas || reglas.length === 0) return true;
    return reglas.some(g => mios.includes(g));
  };
}

// puede: función de permisos · email/alumId: cuenta actual · esAdmin · alumnos: lista (para el reporte)
export const PermisosContext = createContext({ puede: () => true, email: null, alumId: null, esAdmin: false, alumnos: [] });
export const usePermisos = () => useContext(PermisosContext);
