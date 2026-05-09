import { useState, useEffect } from "react";

// ── Storage helpers (localStorage) ───────────────────────────────────────────
const S = {
  get(k) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
};

// ── Initial seed data ────────────────────────────────────────────────────────
const SEED_ALUMNOS = [
  { id: "a1",  nombre: "ACOSTA MARTÍNEZ JEICOT",       fechaNac: "2018-02-05", sexo: "M", apoderado: "Luz Denia" },
  { id: "a2",  nombre: "AGUADO SALAZAR LILIANA",        fechaNac: "2018-03-11", sexo: "F", apoderado: "Jessica Salazar" },
  { id: "a3",  nombre: "BAHAMONDES LIZANA SIMÓN",       fechaNac: "2017-06-14", sexo: "M", apoderado: "Constansa Lizana" },
  { id: "a4",  nombre: "CARABALLO QUINTERO MIA",        fechaNac: "2017-09-15", sexo: "F", apoderado: "Nislen Quintero" },
  { id: "a5",  nombre: "CARMONA BURGOS TOMÁS",          fechaNac: "2017-04-07", sexo: "M", apoderado: "Maria Jose Burgos" },
  { id: "a6",  nombre: "CORDOVEZ CORTÉZ LUCIANA",       fechaNac: "",           sexo: "F", apoderado: "Lorena Cortez" },
  { id: "a7",  nombre: "COVARRUBIAS AYALA AMANDA",      fechaNac: "2017-06-11", sexo: "F", apoderado: "Belén Rocío Ayala" },
  { id: "a8",  nombre: "DÍAZ VEGAS MATHIAS",            fechaNac: "2017-05-31", sexo: "M", apoderado: "Alixbel Carolina Vegas" },
  { id: "a9",  nombre: "ECHAVARRIA ARAYA MAITE",        fechaNac: "2017-11-09", sexo: "F", apoderado: "Maria Luisa Araya" },
  { id: "a10", nombre: "FERRADA MARQUEZ BASTIÁN",       fechaNac: "",           sexo: "M", apoderado: "Camila Marquez" },
  { id: "a11", nombre: "GALLARDO RAMOS KORINA",         fechaNac: "",           sexo: "F", apoderado: "Candy Ramos Icochea" },
  { id: "a12", nombre: "GASTON SANCHEZ JEAN PIERRE",    fechaNac: "2017-04-05", sexo: "M", apoderado: "Susana Sánchez" },
  { id: "a13", nombre: "GONZALEZ GONZALEZ DIEGO",       fechaNac: "2017-03-15", sexo: "M", apoderado: "Nilianys Gonzalez" },
  { id: "a14", nombre: "GUZMÁN LEAL ÓPAL",              fechaNac: "2017-09-26", sexo: "F", apoderado: "Scarlett Leal" },
  { id: "a15", nombre: "LILLO PARRA ROBERTO",           fechaNac: "2017-06-23", sexo: "M", apoderado: "Carolina Parra" },
  { id: "a16", nombre: "LINO AROS FREDY",               fechaNac: "2017-01-14", sexo: "M", apoderado: "Elicet Aros Rosales" },
  { id: "a17", nombre: "LOYOLA BUCAREY VICENTE",        fechaNac: "2017-09-15", sexo: "M", apoderado: "Ana Maria Bucarey" },
  { id: "a18", nombre: "MARCHANT MENDOZA AMPARO",       fechaNac: "",           sexo: "F", apoderado: "" },
  { id: "a19", nombre: "MARTÍNEZ FIGUEROA AMANDA",      fechaNac: "2017-08-24", sexo: "F", apoderado: "Alejandra Figueroa" },
  { id: "a20", nombre: "MEDINA MOLINA BENJAMIN",        fechaNac: "2017-05-29", sexo: "M", apoderado: "Claudia Molina" },
  { id: "a21", nombre: "MELENDEZ ARANGUREN ASHLEY",     fechaNac: "",           sexo: "F", apoderado: "Eukaris" },
  { id: "a22", nombre: "MINA RIVAS DEREK",              fechaNac: "2017-11-14", sexo: "M", apoderado: "Marlin" },
  { id: "a23", nombre: "MOLINA BOLAÑO ARANZA",          fechaNac: "2017-12-14", sexo: "F", apoderado: "Keyla Bolaño" },
  { id: "a24", nombre: "MONTANCHEZ RIVAS MARÍA",        fechaNac: "2017-08-17", sexo: "F", apoderado: "Emy" },
  { id: "a25", nombre: "MORA VIZCAYA IGNACIO",          fechaNac: "2017-10-03", sexo: "M", apoderado: "Estefanía Vizcaya" },
  { id: "a26", nombre: "MUÑOZ GUALA VICENTE",           fechaNac: "2017-06-28", sexo: "M", apoderado: "Andrea" },
  { id: "a27", nombre: "MUÑOZ PIMENTEL THIAGO",         fechaNac: "2017-07-16", sexo: "M", apoderado: "Maryuri Pimentel" },
  { id: "a28", nombre: "NOTARI TORRES MATTEO",          fechaNac: "2017-12-07", sexo: "M", apoderado: "Natalia Notari" },
  { id: "a29", nombre: "OLIVA VALENZUELA FACUNDO",      fechaNac: "2017-11-07", sexo: "M", apoderado: "Paulina" },
  { id: "a30", nombre: "ORELLANA CABEZAS JOSEFA",       fechaNac: "2017-07-03", sexo: "F", apoderado: "Elizabeth Cabezas" },
  { id: "a31", nombre: "OSORIO DUQUE SAMANTHA",         fechaNac: "2017-10-08", sexo: "F", apoderado: "Olisbely Duque" },
  { id: "a32", nombre: "PÉREZ GARRIDO ISABELLA",        fechaNac: "2017-06-19", sexo: "F", apoderado: "Valentina Paola Garrido" },
  { id: "a33", nombre: "PESANTEZ RAGA GEMMA",           fechaNac: "2017-02-20", sexo: "F", apoderado: "" },
  { id: "a34", nombre: "PINTO ESPINOZA GAHEL",          fechaNac: "",           sexo: "M", apoderado: "" },
  { id: "a35", nombre: "RIVERA CÁRDENAS AGUSTINA",      fechaNac: "2017-05-15", sexo: "F", apoderado: "Katherine Cárdenas" },
  { id: "a36", nombre: "ROJAS SALINAS TRINIDAD",        fechaNac: "2018-01-27", sexo: "F", apoderado: "Martina Salinas Urzua" },
  { id: "a37", nombre: "SOTO PERINI EMILIANO",          fechaNac: "2017-12-06", sexo: "M", apoderado: "Giovanna Perini" },
  { id: "a38", nombre: "TABARES RAMOS SAMARA",          fechaNac: "2017-11-27", sexo: "F", apoderado: "Rosa" },
  { id: "a39", nombre: "TERÁN FIERRO ISABELLA",         fechaNac: "2017-08-11", sexo: "F", apoderado: "Giani" },
  { id: "a40", nombre: "TRUJILLO ASTUDILLO BRUNO",      fechaNac: "",           sexo: "M", apoderado: "" },
  { id: "a41", nombre: "VÁSQUEZ RUBILAR MATÍAS",        fechaNac: "",           sexo: "M", apoderado: "Carolina Rubilar" },
  { id: "a42", nombre: "VIACAVA BARRENECHEA MATTEO",    fechaNac: "2017-08-08", sexo: "M", apoderado: "Nicole Barrenechea" },
  { id: "a43", nombre: "VICUÑA RODRIGUEZ MILLAN",       fechaNac: "",           sexo: "M", apoderado: "Yeimily Rodriguez" },
  { id: "a44", nombre: "VILLEGAS CÁRDENAS LAURA",       fechaNac: "2017-11-08", sexo: "F", apoderado: "Evelyn Cárdenas" },
  { id: "a45", nombre: "ZACARIAS GOMEZ AMIR",           fechaNac: "2017-02-28", sexo: "M", apoderado: "Any Gabriella Gómez" },
];

const SEED_TIPOS = [{"id":"69feb9c34b383d80660995ac","nombre":"Salida","color":"#3b82f6"},{"id":"69feb9c34b383d80660995ad","nombre":"Campeonato","color":"#8b5cf6"},{"id":"69feb9c34b383d80660995b0","nombre":"Campaña","color":"#f59e0b"},{"id":"69feb9c34b383d80660995b2","nombre":"Encuesta","color":"#10b981"},{"id":"69feb9e04b97644adcc4bade","nombre":"Actividad CEPA","color":"#ef4444"},{"id":"69feb9c34b383d80660995b3","nombre":"Otro","color":"#6b7280"}];

const SEED_ACTIVIDADES = [{"id":"69ed99ece5542bd797ed84cf","nombre":"Paseo de fin de año","fecha":"2026-12-27","tipos":["69feb9c34b383d80660995ac"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed99bebcf1f1f1037355ed","nombre":"Stand Bingo CEPA","fecha":"2026-11-27","tipos":["69feb9e04b97644adcc4bade"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed98cb5cf2f7a47a648a3b","nombre":"Cicletada","fecha":"2026-10-24","tipos":["69feb9c34b383d80660995ad"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed99d89f79fcb1c80fae5e","nombre":"Rifa Anual","fecha":"2026-10-15","tipos":[],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed98c0444a67a98fc944ed","nombre":"Corrida Familiar","fecha":"2026-10-10","tipos":["69feb9c34b383d80660995ad"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed9bbeaf932c58d58fa7c9","nombre":"Canasta familiar Septiembre","fecha":"2026-09-30","tipos":["69feb9c34b383d80660995b0"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed9c23332519e7ee473e29","nombre":"Once Reunion Julio","fecha":"2026-07-29","tipos":["69feb9c34b383d80660995b3"],"costo":"Gratuita","recurrencia":"Mensual","estado":"No activada","descripcion":""},{"id":"69ed9b9821204e06ef30f573","nombre":"Canasta Solidaria Junio","fecha":"2026-06-30","tipos":["69feb9c34b383d80660995b0"],"costo":"Gratuita","recurrencia":"Mensual","estado":"No activada","descripcion":""},{"id":"69ed9cd1b8972072dce03c0b","nombre":"Pago foto CEPA","fecha":"2026-05-31","tipos":["69feb9e04b97644adcc4bade"],"costo":"Gratuita","recurrencia":"Anual","estado":"Activa","descripcion":""},{"id":"69d065cd05f1350df287494c","nombre":"Copa Kids 2026","fecha":"2026-05-30","tipos":["69feb9c34b383d80660995ad"],"costo":"Gratuita","recurrencia":"Anual","estado":"Activa","descripcion":"Campeonato intercursos de fútbol"},{"id":"69ed99a8384066965cad7cba","nombre":"Stand Copa Kids","fecha":"2026-05-30","tipos":["69feb9c34b383d80660995b0"],"costo":"Gratuita","recurrencia":"Anual","estado":"No activada","descripcion":""},{"id":"69ed98ebe87e9c3d8b8ab4a1","nombre":"Once Reunion Mayo","fecha":"2026-05-27","tipos":["69feb9c34b383d80660995b3"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Suspendida","descripcion":""},{"id":"69fe2a10af255fff752dba55","nombre":"Compra de materiales pequeños","fecha":"2026-05-04","tipos":["69feb9c34b383d80660995b2"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Finalizada","descripcion":"Esta de acuerdo?"},{"id":"69fe29e40c60c3f77fa142e7","nombre":"Despedida de fin de año","fecha":"2026-05-04","tipos":["69feb9c34b383d80660995b2"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Finalizada","descripcion":"Despedida de fin de año 2026"},{"id":"69ed9801e1ce55f1bbe587a9","nombre":"Útiles de aseo","fecha":"2026-04-30","tipos":["69feb9c34b383d80660995b3"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Activa","descripcion":""},{"id":"69ee3812dc2c465bfb6d4a2b","nombre":"Materiales Disco de Netwon","fecha":"2026-04-07","tipos":["69feb9c34b383d80660995b2"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Finalizada","descripcion":"Necesita materiales para realizar Disco de Newton"},{"id":"69ee1e3ad3f822f7ea4e2013","nombre":"Elección huevitos pascua resurrección","fecha":"2026-04-02","tipos":["69feb9c34b383d80660995b2"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Finalizada","descripcion":"Elección de huevitos de chocolate"},{"id":"69ed990ab59d67a65cc6782c","nombre":"Organización onces","fecha":"2026-04-01","tipos":[],"costo":"Gratuita","recurrencia":"Mensual","estado":"No activada","descripcion":""},{"id":"69ed9c81a3f6626d4f0bbbd8","nombre":"Calentar almuerzos marzo","fecha":"2026-03-31","tipos":["69feb9c34b383d80660995b3"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Activa","descripcion":""},{"id":"69ed9b83f7675b28d1330f65","nombre":"Canasta solidaria Marzo","fecha":"2026-03-31","tipos":["69feb9c34b383d80660995b0"],"costo":"Gratuita","recurrencia":"Mensual","estado":"Activa","descripcion":""},{"id":"69ee41a1db5e4dbdb2116a01","nombre":"CEPA 2026","fecha":"2026-03-01","tipos":["69feb9e04b97644adcc4bade"],"costo":"Gratuita","recurrencia":"Anual","estado":"Activa","descripcion":"Socios CEPA 2026"}];

const SEED_ENCUESTAS = [{"id":"69fe2a11f92d97f51365bcec","nombre":"Compra de materiales pequeños","descripcion":"Esta de acuerdo?","estado":"Cerrada","actividadId":"69fe2a10af255fff752dba55","opciones":[{"id":"o1_69fe2a","texto":"Estoy de acuerdo"},{"id":"o2_69fe2a","texto":"No estoy de acuerdo"}],"respuestas":{"a14":"o2_69fe2a","a36":"o2_69fe2a","a19":"o2_69fe2a","a41":"o2_69fe2a","a12":"o2_69fe2a","a30":"o1_69fe2a","a25":"o1_69fe2a","a22":"o1_69fe2a","a24":"o1_69fe2a","a28":"o1_69fe2a","a3":"o1_69fe2a","a33":"o1_69fe2a","a2":"o1_69fe2a","a42":"o1_69fe2a","a43":"o1_69fe2a","a5":"o1_69fe2a","a4":"o1_69fe2a","a8":"o1_69fe2a","a27":"o1_69fe2a","a40":"o1_69fe2a","a37":"o1_69fe2a","a17":"o1_69fe2a","a26":"o1_69fe2a","a45":"o1_69fe2a","a6":"o1_69fe2a","a11":"o1_69fe2a","a7":"o1_69fe2a","a21":"o2_69fe2a","a10":"o1_69fe2a","a23":"o1_69fe2a","a16":"o1_69fe2a","a20":"o1_69fe2a","a13":"o1_69fe2a","a15":"o1_69fe2a"}},{"id":"69fe29e452ab5ac95aa25be6","nombre":"Despedida de fin de año","descripcion":"Despedida de fin de año 2026","estado":"Cerrada","actividadId":"69fe29e40c60c3f77fa142e7","opciones":[{"id":"o1_69fe29","texto":"Parque de entretenciones (Mampato)"},{"id":"o2_69fe29","texto":"Parcela"}],"respuestas":{"a22":"o2_69fe29","a37":"o2_69fe29","a45":"o1_69fe29","a30":"o2_69fe29","a5":"o2_69fe29","a25":"o2_69fe29","a28":"o2_69fe29","a24":"o2_69fe29","a3":"o2_69fe29","a2":"o2_69fe29","a33":"o2_69fe29","a42":"o2_69fe29","a43":"o2_69fe29","a8":"o2_69fe29","a40":"o2_69fe29","a34":"o2_69fe29","a17":"o2_69fe29","a27":"o2_69fe29","a14":"o2_69fe29","a36":"o2_69fe29","a12":"o2_69fe29","a10":"o2_69fe29","a44":"o2_69fe29","a26":"o2_69fe29","a6":"o2_69fe29","a19":"o2_69fe29","a11":"o2_69fe29","a4":"o2_69fe29","a21":"o2_69fe29","a23":"o2_69fe29","a20":"o2_69fe29","a16":"o2_69fe29","a1":"o2_69fe29","a13":"o2_69fe29","a15":"o2_69fe29","a9":"o2_69fe29"}},{"id":"69ee3812aa78c7007e69f645","nombre":"Materiales Disco de Netwon","descripcion":"Necesita materiales para realizar Disco de Newton","estado":"Cerrada","actividadId":"69ee3812dc2c465bfb6d4a2b","opciones":[{"id":"o1_69ee38","texto":"Si, necesito brochetas y lana"},{"id":"o2_69ee38","texto":"No, no necesito materiales"}],"respuestas":{"a37":"o2_69ee38","a19":"o2_69ee38","a41":"o2_69ee38","a36":"o2_69ee38","a13":"o2_69ee38","a33":"o2_69ee38","a32":"o2_69ee38","a39":"o2_69ee38","a26":"o2_69ee38","a3":"o2_69ee38","a5":"o2_69ee38","a14":"o2_69ee38","a44":"o2_69ee38","a45":"o1_69ee38","a9":"o1_69ee38","a24":"o1_69ee38","a7":"o1_69ee38","a27":"o1_69ee38","a28":"o1_69ee38","a8":"o1_69ee38","a30":"o1_69ee38","a22":"o1_69ee38","a34":"o1_69ee38","a16":"o1_69ee38","a20":"o1_69ee38","a23":"o1_69ee38","a42":"o1_69ee38","a1":"o1_69ee38","a11":"o1_69ee38","a38":"o1_69ee38","a29":"o1_69ee38","a4":"o1_69ee38","a6":"o1_69ee38","a25":"o1_69ee38","a2":"o1_69ee38","a15":"o1_69ee38"}},{"id":"69ee1e3bf3a559d84b848ae0","nombre":"Elección huevitos pascua resurrección","descripcion":"Elección de huevitos de chocolate","estado":"Cerrada","actividadId":"69ee1e3ad3f822f7ea4e2013","opciones":[{"id":"o1_69ee1e","texto":"Loly Choc $55.000 aprox"},{"id":"o2_69ee1e","texto":"Ambrosoli $85.000 aprox"}],"respuestas":{"a11":"o2_69ee1e","a6":"o2_69ee1e","a40":"o2_69ee1e","a20":"o2_69ee1e","a21":"o2_69ee1e","a19":"o2_69ee1e","a7":"o2_69ee1e","a17":"o2_69ee1e","a18":"o1_69ee1e","a23":"o1_69ee1e","a33":"o1_69ee1e","a2":"o1_69ee1e","a42":"o1_69ee1e","a38":"o1_69ee1e","a9":"o1_69ee1e","a30":"o1_69ee1e","a37":"o1_69ee1e","a45":"o1_69ee1e","a12":"o1_69ee1e","a10":"o1_69ee1e","a39":"o1_69ee1e","a13":"o1_69ee1e","a5":"o1_69ee1e","a24":"o1_69ee1e","a43":"o1_69ee1e","a36":"o2_69ee1e","a41":"o2_69ee1e","a3":"o2_69ee1e","a28":"o2_69ee1e","a44":"o2_69ee1e","a8":"o2_69ee1e","a14":"o2_69ee1e","a34":"o2_69ee1e","a16":"o2_69ee1e","a31":"o2_69ee1e","a25":"o2_69ee1e","a15":"o2_69ee1e","a4":"o2_69ee1e","a27":"o2_69ee1e"}}];

const SEED_PARTICIPACION = {"69ed9cd1b8972072dce03c0b":{"a17":true,"a36":true,"a5":true,"a27":true,"a3":true,"a38":true,"a15":true,"a28":true,"a41":true,"a8":true,"a42":true,"a4":true,"a44":true,"a24":true,"a9":true,"a2":true,"a43":true,"a11":true,"a30":true,"a1":true,"a12":true,"a25":true,"a29":true,"a34":true,"a33":true,"a39":true,"a16":true,"a37":true,"a22":true,"a40":true,"a20":true,"a10":true,"a23":true,"a18":true,"a45":true,"a35":true,"a19":true,"a7":true},"69d065cd05f1350df287494c":{"a18":true,"a7":true,"a19":true,"a16":true,"a42":true,"a29":true,"a27":true,"a9":true,"a37":true,"a39":true,"a24":true,"a20":true,"a11":true,"a45":true,"a8":true,"a2":true,"a30":true,"a43":true,"a17":true,"a15":true},"69fe2a10af255fff752dba55":{"a14":true,"a36":true,"a19":true,"a41":true,"a12":true,"a30":true,"a25":true,"a22":true,"a24":true,"a28":true,"a3":true,"a33":true,"a2":true,"a42":true,"a43":true,"a5":true,"a4":true,"a8":true,"a27":true,"a40":true,"a37":true,"a17":true,"a26":true,"a45":true,"a6":true,"a11":true,"a7":true,"a21":true,"a10":true,"a23":true,"a16":true,"a20":true,"a13":true,"a15":true},"69fe29e40c60c3f77fa142e7":{"a22":true,"a37":true,"a45":true,"a30":true,"a5":true,"a25":true,"a28":true,"a24":true,"a3":true,"a2":true,"a33":true,"a42":true,"a43":true,"a8":true,"a40":true,"a34":true,"a17":true,"a27":true,"a14":true,"a36":true,"a12":true,"a10":true,"a44":true,"a26":true,"a6":true,"a19":true,"a11":true,"a4":true,"a21":true,"a23":true,"a20":true,"a16":true,"a1":true,"a13":true,"a15":true,"a9":true},"69ee41a1db5e4dbdb2116a01":{"a7":true,"a44":true,"a38":true,"a5":true,"a8":true,"a4":true,"a25":true,"a18":true,"a34":true,"a27":true,"a40":true,"a22":true,"a42":true,"a29":true,"a3":true,"a9":true,"a39":true,"a20":true,"a11":true,"a45":true,"a24":true,"a37":true,"a16":true,"a12":true,"a41":true,"a1":true,"a30":true,"a2":true,"a43":true,"a10":true,"a17":true,"a15":true},"69ee3812dc2c465bfb6d4a2b":{"a37":true,"a19":true,"a41":true,"a36":true,"a13":true,"a33":true,"a32":true,"a39":true,"a26":true,"a3":true,"a5":true,"a14":true,"a44":true,"a45":true,"a9":true,"a24":true,"a7":true,"a27":true,"a28":true,"a8":true,"a30":true,"a22":true,"a34":true,"a16":true,"a20":true,"a23":true,"a42":true,"a1":true,"a11":true,"a38":true,"a29":true,"a4":true,"a6":true,"a25":true,"a2":true,"a15":true},"69ee1e3ad3f822f7ea4e2013":{"a11":true,"a6":true,"a18":true,"a23":true,"a33":true,"a2":true,"a42":true,"a38":true,"a9":true,"a30":true,"a37":true,"a45":true,"a12":true,"a10":true,"a39":true,"a13":true,"a5":true,"a24":true,"a43":true,"a36":true,"a41":true,"a19":true,"a3":true,"a17":true,"a7":true,"a28":true,"a44":true,"a8":true,"a20":true,"a14":true,"a40":true,"a34":true,"a21":true,"a16":true,"a31":true,"a25":true,"a15":true,"a4":true,"a27":true},"69ee0d86cb68e0ac8889f958":{"a31":true,"a15":true,"a14":true,"a16":true,"a37":true,"a40":true,"a20":true,"a10":true,"a23":true,"a18":true,"a45":true,"a7":true,"a35":true},"69ee0bf833a94a04e25e478a":{"a36":true,"a27":true,"a3":true,"a38":true,"a41":true,"a4":true,"a42":true,"a14":true,"a15":true,"a2":true,"a6":true,"a24":true,"a8":true,"a30":true,"a1":true,"a34":true,"a25":true,"a33":true,"a16":true,"a37":true,"a13":true,"a20":true,"a40":true,"a21":true,"a35":true},"69ed9c81a3f6626d4f0bbbd8":{"a12":true,"a43":true,"a31":true},"69ed990ab59d67a65cc6782c":{"a43":true,"a17":true,"a10":true,"a15":true,"a30":true,"a2":true}};
const PALETTE = {
  bg: "#0f172a", card: "#1e293b", border: "#334155",
  text: "#f1f5f9", muted: "#94a3b8", accent: "#3b82f6",
  green: "#22c55e", red: "#ef4444", orange: "#f59e0b", purple: "#8b5cf6",
};

const pct = (n, d) => d === 0 ? 0 : Math.round((n / d) * 100);
const pctColor = (p) => p === 100 ? PALETTE.green : p >= 50 ? PALETTE.orange : p > 0 ? "#f97316" : PALETTE.muted;

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    survey: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
    stats: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    chevron: <><polyline points="6 9 12 15 18 9"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    participation: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ── UI Components ─────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div style={{ background: PALETTE.card, borderRadius: 16, border: `1px solid ${PALETTE.border}`, width: "100%", maxWidth: wide ? 700 : 480, maxHeight: "90vh", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${PALETTE.border}` }}>
        <h2 style={{ margin: 0, color: PALETTE.text, fontSize: 18, fontWeight: 700 }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted, padding: 4 }}><Icon name="close" size={20} /></button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", color: PALETTE.muted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input {...props} style={{ width: "100%", background: PALETTE.bg, border: `1px solid ${PALETTE.border}`, borderRadius: 8, padding: "10px 12px", color: PALETTE.text, fontSize: 14, outline: "none", boxSizing: "border-box", ...props.style }} />
);

const Select = ({ children, ...props }) => (
  <select {...props} style={{ width: "100%", background: PALETTE.bg, border: `1px solid ${PALETTE.border}`, borderRadius: 8, padding: "10px 12px", color: PALETTE.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
    {children}
  </select>
);

const Btn = ({ children, onClick, variant = "primary", small, style: s }) => {
  const bg = variant === "primary" ? PALETTE.accent : "transparent";
  const border = variant === "ghost" ? `1px solid ${PALETTE.border}` : "none";
  return (
    <button onClick={onClick} style={{ background: bg, border, borderRadius: 8, color: PALETTE.text, padding: small ? "6px 12px" : "10px 20px", fontSize: small ? 12 : 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, ...s }}>
      {children}
    </button>
  );
};

const Badge = ({ text, color }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{text}</span>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = ({ alumnos, actividades, encuestas, participacion, tipos }) => {
  const totalPart = Object.values(participacion).reduce((s, v) => s + Object.values(v).filter(Boolean).length, 0);
  const recentAct = [...actividades].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 4);
  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Alumnos", value: alumnos.length, icon: "users", color: PALETTE.accent },
          { label: "Actividades", value: actividades.length, icon: "activity", color: PALETTE.purple },
          { label: "Encuestas", value: encuestas.length, icon: "survey", color: PALETTE.green },
          { label: "Participaciones", value: totalPart, icon: "participation", color: PALETTE.orange },
        ].map(c => (
          <div key={c.label} style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ background: c.color + "22", borderRadius: 8, padding: 8 }}><Icon name={c.icon} size={18} color={c.color} /></div>
              <span style={{ color: PALETTE.muted, fontSize: 12 }}>{c.label}</span>
            </div>
            <div style={{ color: PALETTE.text, fontSize: 28, fontWeight: 800 }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 20 }}>
        <h3 style={{ color: PALETTE.text, margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Actividades recientes</h3>
        {recentAct.map(act => {
          const tiposAct = tipos.filter(t => act.tipos.includes(t.id));
          return (
            <div key={act.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${PALETTE.border}` }}>
              <div>
                <div style={{ color: PALETTE.text, fontSize: 14, fontWeight: 600 }}>{act.nombre}</div>
                <div style={{ color: PALETTE.muted, fontSize: 12, marginTop: 2 }}>{act.fecha}</div>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {tiposAct.map(t => <Badge key={t.id} text={t.nombre} color={t.color} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Alumnos ───────────────────────────────────────────────────────────────────
const Alumnos = ({ alumnos, setAlumnos, actividades, participacion, tipos, isAdmin }) => {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAlumno, setViewAlumno] = useState(null);
  const [editAlumno, setEditAlumno] = useState(null);
  const [form, setForm] = useState({ nombre: "", fechaNac: "", sexo: "M", apoderado: "" });

  const filtered = alumnos.filter(a => {
    if (!a.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    if (!filterTipo) return true;
    const actsOfType = actividades.filter(act => act.tipos.includes(filterTipo));
    return actsOfType.some(act => participacion[act.id]?.[a.id]);
  });

  const actsForTipo = (tipoId) => actividades.filter(a => a.tipos.includes(tipoId));
  const openNew = () => { setForm({ nombre: "", fechaNac: "", sexo: "M", apoderado: "" }); setEditAlumno(null); setModalOpen(true); };
  const openEdit = (al) => { setForm({ nombre: al.nombre, fechaNac: al.fechaNac, sexo: al.sexo, apoderado: al.apoderado }); setEditAlumno(al); setModalOpen(true); };
  const save = () => {
    if (!form.nombre.trim()) return;
    if (editAlumno) setAlumnos(prev => prev.map(a => a.id === editAlumno.id ? { ...a, ...form } : a));
    else setAlumnos(prev => [...prev, { ...form, id: "a" + Date.now() }]);
    setModalOpen(false);
  };
  const del = (id) => { if (window.confirm("¿Eliminar alumno?")) setAlumnos(prev => prev.filter(a => a.id !== id)); };

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Alumnos</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: PALETTE.muted }}><Icon name="search" size={15} /></span>
          <Input placeholder="Buscar alumno..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
        <Select value={filterTipo} onChange={e => setFilterTipo(e.target.value)} style={{ flex: "0 0 160px" }}>
          <option value="">Todos los tipos</option>
          {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </Select>
      </div>
      {isAdmin && <Btn onClick={openNew} style={{ marginBottom: 16 }}><Icon name="plus" size={15} />Nuevo Alumno</Btn>}
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: PALETTE.muted, fontSize: 12, fontWeight: 700 }}>Nombre</th>
                {tipos.slice(0, 4).map(t => <th key={t.id} style={{ textAlign: "center", padding: "12px 10px", color: t.color, fontSize: 11, fontWeight: 700 }}>{t.nombre}</th>)}
                <th style={{ textAlign: "center", padding: "12px 10px", color: PALETTE.muted, fontSize: 12 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(al => (
                <tr key={al.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                  <td style={{ padding: "14px 16px", color: PALETTE.text, fontSize: 13, fontWeight: 600 }}>{al.nombre}</td>
                  {tipos.slice(0, 4).map(t => {
                    const acts = actsForTipo(t.id);
                    const done = acts.filter(a => participacion[a.id]?.[al.id]).length;
                    const total = acts.length;
                    const p = pct(done, total);
                    return (
                      <td key={t.id} style={{ textAlign: "center", padding: "14px 10px" }}>
                        <span style={{ color: pctColor(p), fontWeight: 700, fontSize: 13 }}>{done}/{total}</span>
                        <span style={{ color: pctColor(p), fontSize: 11, marginLeft: 4 }}>({p}%)</span>
                      </td>
                    );
                  })}
                  <td style={{ textAlign: "center", padding: "14px 10px" }}>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <button onClick={() => setViewAlumno(al)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="eye" size={16} /></button>
                      {isAdmin && <button onClick={() => openEdit(al)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="edit" size={16} /></button>}
                      {isAdmin && <button onClick={() => del(al.id)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.red }}><Icon name="trash" size={16} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {viewAlumno && (
        <Modal title={viewAlumno.nombre} onClose={() => setViewAlumno(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div><div style={{ color: PALETTE.muted, fontSize: 11, marginBottom: 4 }}>FECHA NAC.</div><div style={{ color: PALETTE.text }}>{viewAlumno.fechaNac}</div></div>
            <div><div style={{ color: PALETTE.muted, fontSize: 11, marginBottom: 4 }}>SEXO</div><div style={{ color: PALETTE.text }}>{viewAlumno.sexo === "M" ? "Masculino" : "Femenino"}</div></div>
            <div style={{ gridColumn: "1/-1" }}><div style={{ color: PALETTE.muted, fontSize: 11, marginBottom: 4 }}>APODERADO</div><div style={{ color: PALETTE.text }}>{viewAlumno.apoderado}</div></div>
          </div>
          <h4 style={{ color: PALETTE.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Participación</h4>
          {actividades.map(act => {
            const partio = participacion[act.id]?.[viewAlumno.id];
            return (
              <div key={act.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${PALETTE.border}` }}>
                <div>
                  <div style={{ color: PALETTE.text, fontSize: 13 }}>{act.nombre}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>{tipos.filter(t => act.tipos.includes(t.id)).map(t => <Badge key={t.id} text={t.nombre} color={t.color} />)}</div>
                </div>
                <Icon name={partio ? "check" : "x"} size={20} color={partio ? PALETTE.green : PALETTE.red} />
              </div>
            );
          })}
        </Modal>
      )}
      {modalOpen && (
        <Modal title={editAlumno ? "Editar Alumno" : "Nuevo Alumno"} onClose={() => setModalOpen(false)}>
          <Field label="Nombre completo"><Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value.toUpperCase() }))} placeholder="APELLIDO NOMBRE" /></Field>
          <Field label="Fecha de nacimiento"><Input type="date" value={form.fechaNac} onChange={e => setForm(f => ({ ...f, fechaNac: e.target.value }))} /></Field>
          <Field label="Sexo"><Select value={form.sexo} onChange={e => setForm(f => ({ ...f, sexo: e.target.value }))}><option value="M">Masculino</option><option value="F">Femenino</option></Select></Field>
          <Field label="Apoderado"><Input value={form.apoderado} onChange={e => setForm(f => ({ ...f, apoderado: e.target.value }))} /></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Actividades ───────────────────────────────────────────────────────────────
const Actividades = ({ actividades, setActividades, tipos, isAdmin }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editAct, setEditAct] = useState(null);
  const [form, setForm] = useState({ nombre: "", fecha: "", tipos: [], costo: "Gratuita", recurrencia: "Anual", estado: "Activa" });

  const openNew = () => { setForm({ nombre: "", fecha: "", tipos: [], costo: "Gratuita", recurrencia: "Anual", estado: "Activa" }); setEditAct(null); setModalOpen(true); };
  const openEdit = (a) => { setForm({ nombre: a.nombre, fecha: a.fecha, tipos: a.tipos, costo: a.costo, recurrencia: a.recurrencia, estado: a.estado }); setEditAct(a); setModalOpen(true); };
  const del = (id) => { if (window.confirm("¿Eliminar actividad?")) setActividades(prev => prev.filter(a => a.id !== id)); };
  const toggleTipo = (tid) => setForm(f => ({ ...f, tipos: f.tipos.includes(tid) ? f.tipos.filter(x => x !== tid) : [...f.tipos, tid] }));
  const save = () => {
    if (!form.nombre.trim()) return;
    if (editAct) setActividades(prev => prev.map(a => a.id === editAct.id ? { ...a, ...form } : a));
    else setActividades(prev => [...prev, { ...form, id: "act" + Date.now() }]);
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Actividades</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: PALETTE.muted, fontSize: 13 }}>{actividades.length} actividades</span>
          {isAdmin && <Btn onClick={openNew}><Icon name="plus" size={15} />Nueva</Btn>}
        </div>
      </div>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                {["Nombre", "Fecha", "Tipo(s)", "Costo", "Recurrencia", "Estado", ""].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 14px", color: PALETTE.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...actividades].sort((a, b) => b.fecha.localeCompare(a.fecha)).map(act => (
                <tr key={act.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                  <td style={{ padding: "14px", color: PALETTE.text, fontWeight: 600, fontSize: 13 }}>{act.nombre}</td>
                  <td style={{ padding: "14px", color: PALETTE.muted, fontSize: 13, whiteSpace: "nowrap" }}>{act.fecha}</td>
                  <td style={{ padding: "14px" }}><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{tipos.filter(t => act.tipos.includes(t.id)).map(t => <Badge key={t.id} text={t.nombre} color={t.color} />)}</div></td>
                  <td style={{ padding: "14px", color: PALETTE.muted, fontSize: 13 }}>{act.costo}</td>
                  <td style={{ padding: "14px" }}><Badge text={act.recurrencia} color={act.recurrencia === "Anual" ? PALETTE.accent : PALETTE.purple} /></td>
                  <td style={{ padding: "14px" }}><Badge text={act.estado} color={act.estado === "Activa" ? PALETTE.green : PALETTE.muted} /></td>
                  <td style={{ padding: "14px" }}>
                    {isAdmin && <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(act)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="edit" size={15} /></button>
                      <button onClick={() => del(act.id)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.red }}><Icon name="trash" size={15} /></button>
                    </div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <Modal title={editAct ? "Editar Actividad" : "Nueva Actividad"} onClose={() => setModalOpen(false)} wide>
          <Field label="Nombre"><Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></Field>
          <Field label="Fecha"><Input type="date" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} /></Field>
          <Field label="Tipos (puede seleccionar varios)">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tipos.map(t => (
                <button key={t.id} onClick={() => toggleTipo(t.id)} style={{ background: form.tipos.includes(t.id) ? t.color + "33" : "transparent", border: `2px solid ${form.tipos.includes(t.id) ? t.color : PALETTE.border}`, borderRadius: 8, padding: "6px 14px", color: form.tipos.includes(t.id) ? t.color : PALETTE.muted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{t.nombre}</button>
              ))}
            </div>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Costo"><Select value={form.costo} onChange={e => setForm(f => ({ ...f, costo: e.target.value }))}><option>Gratuita</option><option>Con costo</option></Select></Field>
            <Field label="Recurrencia"><Select value={form.recurrencia} onChange={e => setForm(f => ({ ...f, recurrencia: e.target.value }))}><option>Anual</option><option>Mensual</option></Select></Field>
            <Field label="Estado"><Select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}><option>Activa</option><option>No activada</option><option>Finalizada</option></Select></Field>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Participación ─────────────────────────────────────────────────────────────
const Participacion = ({ alumnos, actividades, participacion, setParticipacion, tipos, isAdmin }) => {
  const [filterTipo, setFilterTipo] = useState("");
  const [filterAct, setFilterAct] = useState("");
  const [sortAp, setSortAp] = useState(false);

  const actsFiltradas = actividades.filter(a => !filterTipo || a.tipos.includes(filterTipo));
  const actsVisibles = actsFiltradas.filter(a => !filterAct || a.id === filterAct);
  const alumnosOrdenados = [...alumnos].sort((a, b) => sortAp ? a.apoderado.localeCompare(b.apoderado) : a.nombre.localeCompare(b.nombre));

  const toggle = (actId, alumId) => {
    if (!isAdmin) return;
    setParticipacion(prev => ({ ...prev, [actId]: { ...prev[actId], [alumId]: !prev[actId]?.[alumId] } }));
  };

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Participación</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Select value={filterTipo} onChange={e => { setFilterTipo(e.target.value); setFilterAct(""); }} style={{ flex: "1 1 160px" }}>
          <option value="">Todos los tipos</option>
          {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </Select>
        <Select value={filterAct} onChange={e => setFilterAct(e.target.value)} style={{ flex: "1 1 200px" }}>
          <option value="">Todas las actividades</option>
          {actsFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </Select>
        <Btn variant={sortAp ? "primary" : "ghost"} onClick={() => setSortAp(s => !s)} small>
          {sortAp ? "Por apoderado ✓" : "Ordenar por apoderado"}
        </Btn>
      </div>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: PALETTE.muted, fontSize: 12, position: "sticky", left: 0, background: PALETTE.card }}>Alumno</th>
                {actsVisibles.map(a => (
                  <th key={a.id} style={{ textAlign: "center", padding: "12px 10px", color: PALETTE.muted, fontSize: 11 }}>
                    <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: 80 }}>{a.nombre}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumnosOrdenados.map(al => (
                <tr key={al.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                  <td style={{ padding: "12px 16px", color: PALETTE.text, fontSize: 13, fontWeight: 600, position: "sticky", left: 0, background: PALETTE.card, whiteSpace: "nowrap" }}>{al.nombre}</td>
                  {actsVisibles.map(act => {
                    const partio = participacion[act.id]?.[al.id];
                    return (
                      <td key={act.id} style={{ textAlign: "center", padding: "12px 10px" }}>
                        <button onClick={() => toggle(act.id, al.id)} style={{ background: partio ? PALETTE.green + "22" : PALETTE.red + "22", border: `2px solid ${partio ? PALETTE.green : PALETTE.red}`, borderRadius: "50%", width: 32, height: 32, cursor: isAdmin ? "pointer" : "default", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={partio ? "check" : "x"} size={14} color={partio ? PALETTE.green : PALETTE.red} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Encuestas ─────────────────────────────────────────────────────────────────
const Encuestas = ({ alumnos, encuestas, setEncuestas, isAdmin }) => {
  const [expandId, setExpandId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEnc, setEditEnc] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", estado: "Abierta", opciones: [{ id: "o1", texto: "" }, { id: "o2", texto: "" }] });

  const openNew = () => { setForm({ nombre: "", descripcion: "", estado: "Abierta", opciones: [{ id: "op1", texto: "" }, { id: "op2", texto: "" }] }); setEditEnc(null); setModalOpen(true); };
  const openEdit = (e) => { setForm({ nombre: e.nombre, descripcion: e.descripcion, estado: e.estado, opciones: [...e.opciones] }); setEditEnc(e); setModalOpen(true); };
  const del = (id) => { if (window.confirm("¿Eliminar encuesta?")) setEncuestas(prev => prev.filter(e => e.id !== id)); };
  const save = () => {
    if (!form.nombre.trim()) return;
    const ops = form.opciones.filter(o => o.texto.trim());
    if (editEnc) setEncuestas(prev => prev.map(e => e.id === editEnc.id ? { ...e, ...form, opciones: ops } : e));
    else setEncuestas(prev => [...prev, { ...form, id: "enc" + Date.now(), opciones: ops, respuestas: {} }]);
    setModalOpen(false);
  };

  // Sin duplicados: alumnoId es clave única, cambiar respuesta sobreescribe
  const registrarRespuesta = (encId, alumId, opId) => {
    if (!isAdmin) return;
    setEncuestas(prev => prev.map(e => {
      if (e.id !== encId) return e;
      const respuestas = { ...e.respuestas };
      if (respuestas[alumId] === opId) delete respuestas[alumId];
      else respuestas[alumId] = opId;
      return { ...e, respuestas };
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Encuestas</h1>
        {isAdmin && <Btn onClick={openNew}><Icon name="plus" size={15} />Nueva Encuesta</Btn>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {encuestas.map(enc => {
          const totalResp = Object.keys(enc.respuestas || {}).length;
          const isExpanded = expandId === enc.id;
          return (
            <div key={enc.id} style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, cursor: "pointer" }} onClick={() => setExpandId(isExpanded ? null : enc.id)}>
                  <Icon name="chevron" size={16} color={PALETTE.muted} />
                  <div>
                    <div style={{ color: PALETTE.text, fontWeight: 700, fontSize: 15 }}>{enc.nombre}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                      <Badge text={enc.estado} color={enc.estado === "Abierta" ? PALETTE.green : PALETTE.muted} />
                      <span style={{ color: PALETTE.muted, fontSize: 12 }}>{enc.descripcion}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: PALETTE.muted, fontSize: 13 }}>{totalResp}/{alumnos.length} resp.</span>
                  {isAdmin && <>
                    <button onClick={() => openEdit(enc)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="edit" size={15} /></button>
                    <button onClick={() => del(enc.id)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.red }}><Icon name="trash" size={15} /></button>
                  </>}
                </div>
              </div>
              {isExpanded && (
                <div style={{ borderTop: `1px solid ${PALETTE.border}`, padding: 20 }}>
                  <div style={{ background: PALETTE.bg, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                    <div style={{ color: PALETTE.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Resultados</div>
                    <div style={{ color: PALETTE.text, fontWeight: 700, marginBottom: 12 }}>{enc.descripcion}</div>
                    {enc.opciones.map((op, i) => {
                      const votos = Object.values(enc.respuestas || {}).filter(r => r === op.id).length;
                      const p = pct(votos, totalResp);
                      const col = [PALETTE.accent, PALETTE.red, PALETTE.green, PALETTE.purple][i % 4];
                      return (
                        <div key={op.id} style={{ marginBottom: 12 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <Badge text={op.texto} color={col} />
                            <span style={{ color: PALETTE.muted, fontSize: 13 }}>{votos} votos · {p}%</span>
                          </div>
                          <div style={{ background: PALETTE.border, borderRadius: 4, height: 6 }}>
                            <div style={{ background: col, width: p + "%", height: "100%", borderRadius: 4, transition: "width 0.5s" }} />
                          </div>
                        </div>
                      );
                    })}
                    <div style={{ color: PALETTE.muted, fontSize: 12, marginTop: 8 }}>Total respondido: {totalResp} / {alumnos.length}</div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                        <th style={{ textAlign: "left", padding: "8px 0", color: PALETTE.muted, fontSize: 11 }}>Alumno</th>
                        {enc.opciones.map((op, i) => <th key={op.id} style={{ textAlign: "center", padding: "8px 10px", color: [PALETTE.accent, PALETTE.red, PALETTE.green, PALETTE.purple][i % 4], fontSize: 11 }}>{op.texto}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {alumnos.map(al => (
                        <tr key={al.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                          <td style={{ padding: "10px 0", color: PALETTE.text, fontSize: 13, fontWeight: 600 }}>{al.nombre}</td>
                          {enc.opciones.map((op, i) => {
                            const col = [PALETTE.accent, PALETTE.red, PALETTE.green, PALETTE.purple][i % 4];
                            const selected = enc.respuestas?.[al.id] === op.id;
                            return (
                              <td key={op.id} style={{ textAlign: "center", padding: 10 }}>
                                <button onClick={() => registrarRespuesta(enc.id, al.id, op.id)} style={{ width: 28, height: 28, borderRadius: "50%", background: selected ? col + "33" : "transparent", border: `2px solid ${selected ? col : PALETTE.border}`, cursor: isAdmin ? "pointer" : "default", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                  {selected && <Icon name="check" size={13} color={col} />}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <Modal title={editEnc ? "Editar Encuesta" : "Nueva Encuesta"} onClose={() => setModalOpen(false)}>
          <Field label="Nombre"><Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></Field>
          <Field label="Descripción / Pregunta"><Input value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} /></Field>
          <Field label="Estado"><Select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}><option>Abierta</option><option>Cerrada</option></Select></Field>
          <Field label="Opciones de respuesta">
            {form.opciones.map((op, i) => (
              <div key={op.id} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <Input value={op.texto} onChange={e => setForm(f => ({ ...f, opciones: f.opciones.map(o => o.id === op.id ? { ...o, texto: e.target.value } : o) }))} placeholder={`Opción ${i + 1}`} />
                {form.opciones.length > 2 && <button onClick={() => setForm(f => ({ ...f, opciones: f.opciones.filter(o => o.id !== op.id) }))} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.red }}><Icon name="trash" size={15} /></button>}
              </div>
            ))}
            <Btn variant="ghost" small onClick={() => setForm(f => ({ ...f, opciones: [...f.opciones, { id: "op" + Date.now(), texto: "" }] }))}><Icon name="plus" size={13} />Agregar opción</Btn>
          </Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Tipos de Actividad ────────────────────────────────────────────────────────
const TiposActividad = ({ tipos, setTipos, isAdmin }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTipo, setEditTipo] = useState(null);
  const [form, setForm] = useState({ nombre: "", color: "#3b82f6" });
  const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#ec4899", "#06b6d4", "#6b7280"];

  const save = () => {
    if (!form.nombre.trim()) return;
    if (editTipo) setTipos(prev => prev.map(t => t.id === editTipo.id ? { ...t, ...form } : t));
    else setTipos(prev => [...prev, { ...form, id: "t" + Date.now() }]);
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Tipos de Actividad</h1>
        {isAdmin && <Btn onClick={() => { setForm({ nombre: "", color: "#3b82f6" }); setEditTipo(null); setModalOpen(true); }}><Icon name="plus" size={15} />Nuevo Tipo</Btn>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {tipos.map(t => (
          <div key={t.id} style={{ background: PALETTE.card, border: `2px solid ${t.color}44`, borderRadius: 14, padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: t.color }} />
              <span style={{ color: PALETTE.text, fontWeight: 600 }}>{t.nombre}</span>
            </div>
            {isAdmin && <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setForm({ nombre: t.nombre, color: t.color }); setEditTipo(t); setModalOpen(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="edit" size={14} /></button>
              <button onClick={() => { if (window.confirm("¿Eliminar tipo?")) setTipos(prev => prev.filter(x => x.id !== t.id)); }} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.red }}><Icon name="trash" size={14} /></button>
            </div>}
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal title={editTipo ? "Editar Tipo" : "Nuevo Tipo"} onClose={() => setModalOpen(false)}>
          <Field label="Nombre"><Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></Field>
          <Field label="Color">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {COLORS.map(c => <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: form.color === c ? "3px solid white" : "none", cursor: "pointer" }} />)}
            </div>
            <Input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} style={{ height: 40 }} />
          </Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Estadísticas ──────────────────────────────────────────────────────────────
const Estadisticas = ({ alumnos, actividades, participacion, tipos }) => {
  const totalActs = actividades.length;
  const byTipo = tipos.map(t => {
    const acts = actividades.filter(a => a.tipos.includes(t.id));
    const totalPart = acts.reduce((s, act) => s + alumnos.filter(al => participacion[act.id]?.[al.id]).length, 0);
    return { ...t, acts: acts.length, pct: pct(totalPart, acts.length * alumnos.length) };
  });
  const topAlumnos = alumnos.map(al => {
    const done = actividades.filter(act => participacion[act.id]?.[al.id]).length;
    return { ...al, done, pct: pct(done, totalActs) };
  }).sort((a, b) => b.done - a.done).slice(0, 5);

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Estadísticas</h1>
      <h3 style={{ color: PALETTE.muted, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Participación por tipo</h3>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 20, marginBottom: 24 }}>
        {byTipo.map(t => (
          <div key={t.id} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
                <span style={{ color: PALETTE.text, fontSize: 13 }}>{t.nombre}</span>
                <span style={{ color: PALETTE.muted, fontSize: 11 }}>({t.acts} acts)</span>
              </div>
              <span style={{ color: pctColor(t.pct), fontWeight: 700, fontSize: 13 }}>{t.pct}%</span>
            </div>
            <div style={{ background: PALETTE.border, borderRadius: 6, height: 8 }}>
              <div style={{ background: t.color, width: t.pct + "%", height: "100%", borderRadius: 6, transition: "width 0.6s" }} />
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ color: PALETTE.muted, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Top 5 alumnos más participativos</h3>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        {topAlumnos.map((al, i) => (
          <div key={al.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: i < 4 ? `1px solid ${PALETTE.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: PALETTE.muted, fontWeight: 800, fontSize: 16, width: 24 }}>#{i + 1}</span>
              <span style={{ color: PALETTE.text, fontSize: 13 }}>{al.nombre}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: pctColor(al.pct), fontWeight: 700 }}>{al.done}/{totalActs}</span>
              <div style={{ background: PALETTE.border, borderRadius: 4, height: 6, width: 80 }}>
                <div style={{ background: pctColor(al.pct), width: al.pct + "%", height: "100%", borderRadius: 4 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Usuarios ──────────────────────────────────────────────────────────────────
const Usuarios = () => {
  const users = [
    { nombre: "René Enrique Lillo Vallés", alias: "RenEnriquE", rol: "Administrador", color: PALETTE.accent },
    { nombre: "Carolina Parra Jorquera", alias: "carolina", rol: "Administrador", color: PALETTE.purple },
  ];
  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Usuarios</h1>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        {users.map((u, i) => (
          <div key={u.alias} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i === 0 ? `1px solid ${PALETTE.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: u.color + "33", border: `2px solid ${u.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: u.color, fontWeight: 800, fontSize: 16 }}>{u.alias[0].toUpperCase()}</span>
              </div>
              <div>
                <div style={{ color: PALETTE.text, fontWeight: 700 }}>{u.nombre}</div>
                <div style={{ color: PALETTE.muted, fontSize: 12 }}>@{u.alias}</div>
              </div>
            </div>
            <Badge text={u.rol} color={u.color} />
          </div>
        ))}
        <div style={{ padding: "12px 20px", background: PALETTE.bg + "88" }}>
          <span style={{ color: PALETTE.muted, fontSize: 12 }}>El resto de los usuarios tienen acceso de solo lectura.</span>
        </div>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin] = useState(true);

  const [alumnos, setAlumnos] = useState(() => S.get("ge_alumnos") || SEED_ALUMNOS);
  const [actividades, setActividades] = useState(() => S.get("ge_actividades") || SEED_ACTIVIDADES);
  const [tipos, setTipos] = useState(() => S.get("ge_tipos") || SEED_TIPOS);
  const [encuestas, setEncuestas] = useState(() => S.get("ge_encuestas") || SEED_ENCUESTAS);
  const [participacion, setParticipacion] = useState(() => S.get("ge_participacion") || SEED_PARTICIPACION);

  // Auto-save
  useEffect(() => { S.set("ge_alumnos", alumnos); }, [alumnos]);
  useEffect(() => { S.set("ge_actividades", actividades); }, [actividades]);
  useEffect(() => { S.set("ge_tipos", tipos); }, [tipos]);
  useEffect(() => { S.set("ge_encuestas", encuestas); }, [encuestas]);
  useEffect(() => { S.set("ge_participacion", participacion); }, [participacion]);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "alumnos", label: "Alumnos", icon: "users" },
    { id: "actividades", label: "Actividades", icon: "activity" },
    { id: "participacion", label: "Participación", icon: "participation" },
    { id: "encuestas", label: "Encuestas", icon: "survey" },
    { id: "estadisticas", label: "Estadísticas", icon: "stats" },
    { id: "tipos", label: "Tipos de Actividad", icon: "tag" },
    { id: "usuarios", label: "Usuarios", icon: "shield" },
  ];

  const goTo = (id) => { setPage(id); setSidebarOpen(false); };
  const props = { alumnos, actividades, tipos, encuestas, participacion, setAlumnos, setActividades, setTipos, setEncuestas, setParticipacion, isAdmin };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard {...props} />;
      case "alumnos": return <Alumnos {...props} />;
      case "actividades": return <Actividades {...props} />;
      case "participacion": return <Participacion {...props} />;
      case "encuestas": return <Encuestas {...props} />;
      case "estadisticas": return <Estadisticas {...props} />;
      case "tipos": return <TiposActividad {...props} />;
      case "usuarios": return <Usuarios {...props} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: PALETTE.text }}>
      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, background: PALETTE.card, borderBottom: `1px solid ${PALETTE.border}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, zIndex: 100 }}>
        <button onClick={() => setSidebarOpen(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.text, padding: 4 }}>
          <Icon name="menu" size={22} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: PALETTE.accent, borderRadius: 10, padding: 6 }}><Icon name="dashboard" size={16} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: 17 }}>GestiónEscolar</span>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 260, background: PALETTE.card, borderRight: `1px solid ${PALETTE.border}`, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${PALETTE.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: PALETTE.accent, borderRadius: 10, padding: 8 }}><Icon name="dashboard" size={18} color="white" /></div>
                <span style={{ fontWeight: 800, fontSize: 17 }}>GestiónEscolar</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted }}><Icon name="close" size={20} /></button>
            </div>
            <nav style={{ padding: "12px 0" }}>
              {nav.map(item => (
                <button key={item.id} onClick={() => goTo(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 20px", background: page === item.id ? PALETTE.accent : "transparent", border: "none", cursor: "pointer", color: page === item.id ? "white" : PALETTE.muted, fontSize: 14, fontWeight: page === item.id ? 700 : 500, textAlign: "left" }}>
                  <Icon name={item.icon} size={18} color={page === item.id ? "white" : PALETTE.muted} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
