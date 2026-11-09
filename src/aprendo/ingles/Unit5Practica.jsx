import { crearFrases, crearLectura, crearEnsayo } from "./unit5Data.js";
import QuizU5 from "./QuizU5.jsx";

// tipo: "oraciones" (Complete the sentence) · "lectura" (Read and answer) · "ensayo" (mezcla de todo, como la prueba)
export default function Unit5Practica({ tipo, onVolver }) {
  const generar = tipo === "oraciones" ? () => crearFrases(10) : tipo === "lectura" ? () => crearLectura(10) : () => crearEnsayo();
  return <QuizU5 generar={generar} onVolver={onVolver} />;
}
