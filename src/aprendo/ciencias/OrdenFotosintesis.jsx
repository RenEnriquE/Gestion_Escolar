import OrdenSecuencia from "./OrdenSecuencia.jsx";

// Se mantiene por compatibilidad: ahora la actividad es genérica (ver OrdenSecuencia.jsx).
export default function OrdenFotosintesis({ onVolver }) {
  return <OrdenSecuencia modo="orden" onVolver={onVolver} />;
}
