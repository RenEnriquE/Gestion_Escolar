import { createContext, useContext } from "react";

// Catálogo de contenidos de ¡Aprendo! que se pueden habilitar/deshabilitar por grupo.
// Al agregar una asignatura o actividad nueva, súmala aquí (el id debe coincidir con el usado en su archivo).
export const CATALOGO = [
  {
    id: "matematicas", label: "Matemáticas", emoji: "🔢",
    actividades: [
      { id: "matematicas.cuadricula", label: "Encuentra la casilla" },
      { id: "matematicas.localizar",  label: "Localiza los objetos" },
      { id: "matematicas.mapa",       label: "Mapa del Reino" },
    ],
  },
  {
    id: "ingles", label: "Inglés", emoji: "🌎",
    actividades: [
      { id: "ingles.unit4",          label: "Unit 4: Vocabulario" },
      { id: "ingles.unit4oraciones", label: "Unit 4: Complete the sentence" },
      { id: "ingles.refuerzo",       label: "Reforzar mis errores" },
    ],
  },
];

// Regla: si un contenido no tiene grupos marcados → lo ve todo el mundo.
// Si tiene grupos marcados → solo los usuarios de esos grupos (los administradores siempre lo ven).
export function crearPuede(rol, gruposUsuario, cfg) {
  const permisos = cfg?.permisos || {};
  const mios = gruposUsuario || [];
  return (id) => {
    if (rol === "admin") return true;
    const reglas = permisos[id];
    if (!reglas || reglas.length === 0) return true;
    return reglas.some(g => mios.includes(g));
  };
}

// puede: función de permisos · email/alumId: cuenta actual · esAdmin · alumnos: lista (para el reporte)
export const PermisosContext = createContext({ puede: () => true, email: null, alumId: null, esAdmin: false, alumnos: [] });
export const usePermisos = () => useContext(PermisosContext);
