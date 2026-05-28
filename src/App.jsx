// TEST-CHANGE-123
import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "./supabase.js";
import * as XLSX from "xlsx";

// ── Date format helpers ──────────────────────────────────────────────────────
// Internal: YYYY-MM-DD, Display/input: DD-MM-YYYY
const toDisplay = (iso) => {
  if (!iso) return "";
  const [y,m,d] = iso.split("-");
  if (!y||!m||!d) return iso;
  return `${d}-${m}-${y}`;
};
const toISO = (display) => {
  if (!display) return "";
  const parts = display.replace(/\//g,"-").split("-");
  if (parts.length !== 3) return display;
  if (parts[0].length === 4) return display; // already ISO
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};
const DateInput = ({ value, onChange, placeholder="DD-MM-AAAA" }) => (
  <Input
    value={toDisplay(value)}
    onChange={e => onChange(toISO(e.target.value))}
    placeholder={placeholder}
    maxLength={10}
  />
);

// ── localStorage fallback (session only) ─────────────────────────────────────
const S = {
  get(k) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
};

// ── Supabase DB helpers ───────────────────────────────────────────────────────
const DB = {
  async getAll(table) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      return data || [];
    } catch { return null; }
  },
  async upsert(table, rows) {
    try {
      const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
      if (error) throw error;
      return true;
    } catch { return false; }
  },
  async upsertPK(table, rows, pk) {
    try {
      const { error } = await supabase.from(table).upsert(rows, { onConflict: pk });
      if (error) throw error;
      return true;
    } catch { return false; }
  },
  async deleteRow(table, match) {
    try {
      let q = supabase.from(table).delete();
      for (const [k, v] of Object.entries(match)) q = q.eq(k, v);
      const { error } = await q;
      if (error) throw error;
      return true;
    } catch { return false; }
  },
  async getConfig(key) {
    try {
      const { data } = await supabase.from('configuracion').select('valor').eq('clave', key).single();
      return data?.valor ?? null;
    } catch { return null; }
  },
  async setConfig(key, value) {
    try {
      await supabase.from('configuracion').upsert({ clave: key, valor: value }, { onConflict: 'clave' });
    } catch {}
  },
};

// ── Initial seed data ────────────────────────────────────────────────────────
// helper: build alumno record
const al = (id, nombres, apellidos, fechaNac, sexo, apoderado, apoderado2="", telefono="", email="", observaciones="", socioAprendilandia=false) => ({
  id, nombres, apellidos, nombre: (apellidos + " " + nombres).toUpperCase(),
  fechaNac, sexo, apoderado, apoderado2, telefono, email, observaciones, socioAprendilandia,
});

const SEED_ALUMNOS = [
  al("a1",  "JEICOT",       "ACOSTA MARTÍNEZ",     "2018-02-05", "M", "Luz Denia"),
  al("a2",  "LILIANA",      "AGUADO SALAZAR",       "2018-03-11", "F", "Jessica Salazar"),
  al("a3",  "SIMÓN",        "BAHAMONDES LIZANA",    "2017-06-14", "M", "Constansa Lizana"),
  al("a4",  "MIA",          "CARABALLO QUINTERO",   "2017-09-15", "F", "Nislen Quintero"),
  al("a5",  "TOMÁS",        "CARMONA BURGOS",       "2017-04-07", "M", "Maria Jose Burgos"),
  al("a6",  "LUCIANA",      "CORDOVEZ CORTÉZ",      "",           "F", "Lorena Cortez"),
  al("a7",  "AMANDA",       "COVARRUBIAS AYALA",    "2017-06-11", "F", "Belén Rocío Ayala"),
  al("a8",  "MATHIAS",      "DÍAZ VEGAS",           "2017-05-31", "M", "Alixbel Carolina Vegas"),
  al("a9",  "MAITE",        "ECHAVARRIA ARAYA",     "2017-11-09", "F", "Maria Luisa Araya"),
  al("a10", "BASTIÁN",      "FERRADA MARQUEZ",      "",           "M", "Camila Marquez"),
  al("a11", "KORINA",       "GALLARDO RAMOS",       "",           "F", "Candy Ramos Icochea"),
  al("a12", "JEAN PIERRE",  "GASTON SANCHEZ",       "2017-04-05", "M", "Susana Sánchez"),
  al("a13", "DIEGO",        "GONZALEZ GONZALEZ",    "2017-03-15", "M", "Nilianys Gonzalez"),
  al("a14", "ÓPAL",         "GUZMÁN LEAL",          "2017-09-26", "F", "Scarlett Leal"),
  al("a15", "ROBERTO",      "LILLO PARRA",          "2017-06-23", "M", "Carolina Parra Jorquera"),
  al("a16", "FREDY",        "LINO AROS",            "2017-01-14", "M", "Elicet Aros Rosales"),
  al("a17", "VICENTE",      "LOYOLA BUCAREY",       "2017-09-15", "M", "Ana Maria Bucarey"),
  al("a18", "AMPARO",       "MARCHANT MENDOZA",     "",           "F", ""),
  al("a19", "AMANDA",       "MARTÍNEZ FIGUEROA",    "2017-08-24", "F", "Alejandra Figueroa"),
  al("a20", "BENJAMIN",     "MEDINA MOLINA",        "2017-05-29", "M", "Claudia Molina"),
  al("a21", "ASHLEY",       "MELENDEZ ARANGUREN",   "",           "F", "Eukaris"),
  al("a22", "DEREK",        "MINA RIVAS",           "2017-11-14", "M", "Marlin"),
  al("a23", "ARANZA",       "MOLINA BOLAÑO",        "2017-12-14", "F", "Keyla Bolaño"),
  al("a24", "MARÍA",        "MONTANCHEZ RIVAS",     "2017-08-17", "F", "Emy"),
  al("a25", "IGNACIO",      "MORA VIZCAYA",         "2017-10-03", "M", "Estefanía Vizcaya"),
  al("a26", "VICENTE",      "MUÑOZ GUALA",          "2017-06-28", "M", "Andrea"),
  al("a27", "THIAGO",       "MUÑOZ PIMENTEL",       "2017-07-16", "M", "Maryuri Pimentel"),
  al("a28", "MATTEO",       "NOTARI TORRES",        "2017-12-07", "M", "Natalia Notari"),
  al("a29", "FACUNDO",      "OLIVA VALENZUELA",     "2017-11-07", "M", "Paulina"),
  al("a30", "JOSEFA",       "ORELLANA CABEZAS",     "2017-07-03", "F", "Elizabeth Cabezas"),
  al("a31", "SAMANTHA",     "OSORIO DUQUE",         "2017-10-08", "F", "Olisbely Duque"),
  al("a32", "ISABELLA",     "PÉREZ GARRIDO",        "2017-06-19", "F", "Valentina Paola Garrido"),
  al("a33", "GEMMA",        "PESANTEZ RAGA",        "2017-02-20", "F", ""),
  al("a34", "GAHEL",        "PINTO ESPINOZA",       "",           "M", ""),
  al("a35", "AGUSTINA",     "RIVERA CÁRDENAS",      "2017-05-15", "F", "Katherine Cárdenas"),
  al("a36", "TRINIDAD",     "ROJAS SALINAS",        "2018-01-27", "F", "Martina Salinas Urzua"),
  al("a37", "EMILIANO",     "SOTO PERINI",          "2017-12-06", "M", "Giovanna Perini"),
  al("a38", "SAMARA",       "TABARES RAMOS",        "2017-11-27", "F", "Rosa"),
  al("a39", "ISABELLA",     "TERÁN FIERRO",         "2017-08-11", "F", "Giani"),
  al("a40", "BRUNO",        "TRUJILLO ASTUDILLO",   "",           "M", ""),
  al("a41", "MATÍAS",       "VÁSQUEZ RUBILAR",      "",           "M", "Carolina Rubilar"),
  al("a42", "MATTEO",       "VIACAVA BARRENECHEA",  "2017-08-08", "M", "Nicole Barrenechea"),
  al("a43", "MILLAN",       "VICUÑA RODRIGUEZ",     "",           "M", "Yeimily Rodriguez"),
  al("a44", "LAURA",        "VILLEGAS CÁRDENAS",    "2017-11-08", "F", "Evelyn Cárdenas"),
  al("a45", "AMIR",         "ZACARIAS GOMEZ",       "2017-02-28", "M", "Any Gabriella Gómez"),
];

const SEED_TIPOS = [{"id":"69feb9c34b383d80660995ac","nombre":"Salida","color":"#3b82f6"},{"id":"69feb9c34b383d80660995ad","nombre":"Campeonato","color":"#8b5cf6"},{"id":"69feb9c34b383d80660995b0","nombre":"Campaña","color":"#f59e0b"},{"id":"69feb9c34b383d80660995b2","nombre":"Encuesta","color":"#10b981"},{"id":"69feb9e04b97644adcc4bade","nombre":"Actividad CEPA","color":"#ef4444"},{"id":"69feb9c34b383d80660995b3","nombre":"Otro","color":"#6b7280"}];

// ── Subactividad color by rank ───────────────────────────────────────────────
const subColor = (rank) => rank === 0 ? PALETTE.green : rank === 1 ? PALETTE.accent : PALETTE.red;

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
const Dashboard = ({ alumnos, actividades, encuestas, participacion, tipos, onNavigate }) => {
  const actsContablesIds = new Set(actividades.filter(a => ["Activa","Finalizada"].includes(a.estado)).map(a => a.id));
  const totalPart = Object.entries(participacion).reduce((s, [actId, alums]) => actsContablesIds.has(actId) ? s + Object.values(alums).filter(Boolean).length : s, 0);
  const recentAct = [...actividades].filter(a => ["Activa","Finalizada"].includes(a.estado)).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 4);
  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Alumnos", value: alumnos.length, icon: "users", color: PALETTE.accent, page: "alumnos" },
          { label: "Actividades", value: actividades.length, icon: "activity", color: PALETTE.purple, page: "actividades" },
          { label: "Encuestas", value: encuestas.length, icon: "survey", color: PALETTE.green, page: "encuestas" },
          { label: "Participaciones", value: totalPart, icon: "participation", color: PALETTE.orange, page: "participacion" },
        ].map(c => (
          <div key={c.label} onClick={() => c.page && onNavigate(c.page)}
            style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 20, cursor: c.page ? "pointer" : "default" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ background: c.color + "22", borderRadius: 8, padding: 8 }}><Icon name={c.icon} size={18} color={c.color} /></div>
              <span style={{ color: PALETTE.muted, fontSize: 12 }}>{c.label}{c.page ? " →" : ""}</span>
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
  const [sortMode, setSortMode] = useState("apellido");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAlumno, setViewAlumno] = useState(null);
  const [editAlumno, setEditAlumno] = useState(null);
  const [form, setForm] = useState({ nombre: "", fechaNac: "", sexo: "M", apoderado: "" });

  const filtered = alumnos
    .filter(a => {
      if (!a.nombre.toLowerCase().includes(search.toLowerCase())) return false;
      if (!filterTipo) return true;
      const actsOfType = actividades.filter(act => act.tipos.includes(filterTipo));
      return actsOfType.some(act => participacion[act.id]?.[a.id]);
    })
    .sort((a, b) => {
      if (sortMode === "nombre") {
        const na = (a.nombres || a.nombre || "").split(" ")[0];
        const nb = (b.nombres || b.nombre || "").split(" ")[0];
        return na.localeCompare(nb, "es");
      }
      // por apellido
      const aa = a.apellidos || a.nombre || "";
      const ab = b.apellidos || b.nombre || "";
      return aa.localeCompare(ab, "es");
    });

  const actsForTipo = (tipoId) => actividades.filter(a => a.tipos.includes(tipoId) && ["Activa","Finalizada"].includes(a.estado));
  const tiposConActividades = tipos.filter(t => actsForTipo(t.id).length > 0);
  const emptyForm = { nombres: "", apellidos: "", fechaNac: "", sexo: "M", apoderado: "", apoderado2: "", telefono: "", email: "", observaciones: "", socioAprendilandia: false };
  const openNew = () => { setForm(emptyForm); setEditAlumno(null); setModalOpen(true); };
  const openEdit = (al) => {
    // If nombres/apellidos missing (old localStorage data), split from nombre
    let nombres = al.nombres || "";
    let apellidos = al.apellidos || "";
    if (!nombres && al.nombre) {
      const parts = al.nombre.trim().split(" ");
      nombres = parts.slice(-1)[0];
      apellidos = parts.slice(0, -1).join(" ");
    }
    setForm({ nombres, apellidos, fechaNac: al.fechaNac || "", sexo: al.sexo || "M", apoderado: al.apoderado || "", apoderado2: al.apoderado2 || "", telefono: al.telefono || "", email: al.email || "", observaciones: al.observaciones || "", socioAprendilandia: al.socioAprendilandia || false });
    setEditAlumno(al); setModalOpen(true);
  };
  const save = () => {
    if (!form.nombres.trim() || !form.apellidos.trim()) return;
    const nombreCompleto = (form.apellidos.trim() + " " + form.nombres.trim()).toUpperCase();
    const data = { ...form, nombre: nombreCompleto, nombres: form.nombres.trim().toUpperCase(), apellidos: form.apellidos.trim().toUpperCase() };
    if (editAlumno) setAlumnos(prev => prev.map(a => a.id === editAlumno.id ? { ...a, ...data } : a));
    else setAlumnos(prev => [...prev, { ...data, id: "a" + Date.now() }]);
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
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {isAdmin && <Btn onClick={openNew}><Icon name="plus" size={15} />Nuevo Alumno</Btn>}
        <Btn variant={sortMode === "apellido" ? "primary" : "ghost"} small onClick={() => setSortMode("apellido")}>Por apellido</Btn>
        <Btn variant={sortMode === "nombre" ? "primary" : "ghost"} small onClick={() => setSortMode("nombre")}>Por nombre</Btn>
      </div>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: PALETTE.muted, fontSize: 12, fontWeight: 700 }}>Nombre</th>
                {tiposConActividades.map(t => <th key={t.id} style={{ textAlign: "center", padding: "12px 10px", color: t.color, fontSize: 11, fontWeight: 700 }}>{t.nombre}</th>)}
                <th style={{ textAlign: "center", padding: "12px 10px", color: PALETTE.muted, fontSize: 12 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(al => (
                <tr key={al.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600 }}>
                    <span onClick={() => setViewAlumno(al)} style={{ color: PALETTE.accent, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      {al.nombres && al.apellidos ? al.nombres + " " + al.apellidos : al.nombre}
                    </span>
                  </td>
                  {tiposConActividades.map(t => {
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
      {viewAlumno && (() => {
        const actsContables = actividades.filter(a => ["Activa", "Finalizada"].includes(a.estado));
        const totalActs = actsContables.length;
        const partCount = actsContables.filter(act => participacion[act.id]?.[viewAlumno.id]).length;
        // Group activities by tipo
        const actsByTipo = tipos.map(t => ({
          ...t,
          acts: actividades.filter(act => act.tipos.includes(t.id))
        })).filter(t => t.acts.length > 0);
        // Activities with no tipo
        const sinTipo = actividades.filter(act => act.tipos.length === 0);

        return (
        <Modal title="Ficha del Alumno" onClose={() => setViewAlumno(null)} wide>
          {/* Nombre */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ color: PALETTE.text, fontWeight: 800, fontSize: 20 }}>
              {viewAlumno.apellidos && viewAlumno.nombres
                ? viewAlumno.apellidos + " " + viewAlumno.nombres
                : viewAlumno.nombre}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Badge text={viewAlumno.sexo === "M" ? "Masculino" : "Femenino"} color={viewAlumno.sexo === "M" ? PALETTE.accent : PALETTE.purple} />
            {viewAlumno.socioAprendilandia && <span style={{ marginLeft: 8 }}><Badge text="Socio Aprendilandia" color={PALETTE.green} /></span>}
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px", marginBottom: 20, fontSize: 13 }}>
            <div><span style={{ color: PALETTE.muted }}>Nacimiento: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>{viewAlumno.fechaNac || "—"}</span></div>
            <div><span style={{ color: PALETTE.muted }}>Curso: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>3ro C</span></div>
            <div><span style={{ color: PALETTE.muted }}>Apoderado: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>{viewAlumno.apoderado || "—"}</span></div>
            <div><span style={{ color: PALETTE.muted }}>Teléfono: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>{viewAlumno.telefono || "—"}</span></div>
            {viewAlumno.apoderado2 && <div style={{ gridColumn: "1/-1" }}><span style={{ color: PALETTE.muted }}>2do apoderado: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>{viewAlumno.apoderado2}</span></div>}
            {viewAlumno.email && <div style={{ gridColumn: "1/-1" }}><span style={{ color: PALETTE.muted }}>Email: </span><span style={{ color: PALETTE.text, fontWeight: 600 }}>{viewAlumno.email}</span></div>}
            {viewAlumno.observaciones && <div style={{ gridColumn: "1/-1" }}><span style={{ color: PALETTE.muted }}>Obs: </span><span style={{ color: PALETTE.text }}>{viewAlumno.observaciones}</span></div>}
          </div>

          {/* Stats bar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Participación", value: `${partCount}/${totalActs}`, color: PALETTE.accent },
              { label: "% Asistencia", value: totalActs > 0 ? Math.round(partCount/totalActs*100) + "%" : "0%", color: PALETTE.green },
              { label: "Encuestas resp.", value: Object.values(viewAlumno.id ? {} : {}).length + "—", color: PALETTE.purple },
            ].map(s => (
              <div key={s.label} style={{ background: PALETTE.bg, borderRadius: 12, padding: "14px 12px", textAlign: "center", border: `1px solid ${PALETTE.border}` }}>
                <div style={{ color: s.color, fontWeight: 800, fontSize: 22 }}>{s.value}</div>
                <div style={{ color: PALETTE.muted, fontSize: 11, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Activities by tipo */}
          <div style={{ color: PALETTE.text, fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Actividades</div>
          {actsByTipo.map(t => (
            <div key={t.id} style={{ marginBottom: 20 }}>
              <div style={{ color: t.color, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                {t.nombre} ({t.acts.length})
              </div>
              {t.acts.map(act => {
                const partio = participacion[act.id]?.[viewAlumno.id];
                return (
                  <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, marginBottom: 4, background: partio ? PALETTE.green + "11" : PALETTE.red + "0a" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: partio ? PALETTE.green + "33" : PALETTE.red + "22", border: `2px solid ${partio ? PALETTE.green : PALETTE.red}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={partio ? "check" : "x"} size={11} color={partio ? PALETTE.green : PALETTE.red} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: PALETTE.text, fontSize: 13 }}>{act.nombre}</span>
                    </div>
                    <span style={{ color: PALETTE.muted, fontSize: 11 }}>{act.fecha}</span>
                  </div>
                );
              })}
            </div>
          ))}
          {sinTipo.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: PALETTE.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Sin tipo ({sinTipo.length})</div>
              {sinTipo.map(act => {
                const partio = participacion[act.id]?.[viewAlumno.id];
                return (
                  <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, marginBottom: 4, background: partio ? PALETTE.green + "11" : PALETTE.red + "0a" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: partio ? PALETTE.green + "33" : PALETTE.red + "22", border: `2px solid ${partio ? PALETTE.green : PALETTE.red}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={partio ? "check" : "x"} size={11} color={partio ? PALETTE.green : PALETTE.red} />
                    </div>
                    <span style={{ color: PALETTE.text, fontSize: 13, flex: 1 }}>{act.nombre}</span>
                    <span style={{ color: PALETTE.muted, fontSize: 11 }}>{act.fecha}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Modal>
        );
      })()}
      {modalOpen && (
        <Modal title={editAlumno ? "Editar Alumno" : "Nuevo Alumno"} onClose={() => setModalOpen(false)} wide>
          {/* Nombres y Apellidos */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Nombre(s) *"><Input value={form.nombres} onChange={e => setForm(f => ({ ...f, nombres: e.target.value.toUpperCase() }))} placeholder="JEAN PIERRE" /></Field>
            <Field label="Apellidos *"><Input value={form.apellidos} onChange={e => setForm(f => ({ ...f, apellidos: e.target.value.toUpperCase() }))} placeholder="GARCÍA LÓPEZ" /></Field>
          </div>
          {/* Fecha y Sexo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Fecha de nacimiento">
              <Input type="date" value={form.fechaNac} onChange={e => setForm(f => ({ ...f, fechaNac: e.target.value }))} />
            </Field>
            <Field label="Sexo">
              <Select value={form.sexo} onChange={e => setForm(f => ({ ...f, sexo: e.target.value }))}>
                <option value="M">Masculino</option><option value="F">Femenino</option>
              </Select>
            </Field>
          </div>
          {/* Curso (fijo) */}
          <Field label="Curso">
            <div style={{ background: PALETTE.bg, border: `1px solid ${PALETTE.border}`, borderRadius: 8, padding: "10px 12px", color: PALETTE.muted, fontSize: 14 }}>3ro C — L. Miguel Rafael Prado</div>
          </Field>
          {/* Apoderados */}
          <Field label="Apoderado principal"><Input value={form.apoderado} onChange={e => setForm(f => ({ ...f, apoderado: e.target.value }))} placeholder="Nombre del apoderado" /></Field>
          <Field label="Segundo apoderado"><Input value={form.apoderado2} onChange={e => setForm(f => ({ ...f, apoderado2: e.target.value }))} placeholder="Opcional" /></Field>
          {/* Teléfono y Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Teléfono"><Input value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} placeholder="+56 9 1234 5678" /></Field>
            <Field label="Email apoderado"><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="correo@email.com" /></Field>
          </div>
          {/* Socio Aprendilandia toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <button onClick={() => setForm(f => ({ ...f, socioAprendilandia: !f.socioAprendilandia }))} style={{
              width: 44, height: 24, borderRadius: 12, background: form.socioAprendilandia ? PALETTE.accent : PALETTE.border,
              border: "none", cursor: "pointer", position: "relative", flexShrink: 0
            }}>
              <span style={{ position: "absolute", top: 3, left: form.socioAprendilandia ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left 0.2s" }} />
            </button>
            <span style={{ color: PALETTE.text, fontSize: 14 }}>Socio Aprendilandia</span>
          </div>
          {/* Observaciones */}
          <Field label="Observaciones">
            <textarea value={form.observaciones} onChange={e => setForm(f => ({ ...f, observaciones: e.target.value }))}
              placeholder="Notas adicionales..."
              style={{ width: "100%", background: PALETTE.bg, border: `1px solid ${PALETTE.border}`, borderRadius: 8, padding: "10px 12px", color: PALETTE.text, fontSize: 14, outline: "none", boxSizing: "border-box", minHeight: 80, resize: "vertical", fontFamily: "inherit" }} />
          </Field>
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
  const [form, setForm] = useState({ nombre: "", fecha: "", tipos: [], recurrencia: "Anual", estado: "Activa", subactividades: [] });
  const [newSub, setNewSub] = useState("");
  const addSub = () => { if (!newSub.trim()) return; setForm(f => ({ ...f, subactividades: [...(f.subactividades||[]), newSub.trim()] })); setNewSub(""); };

  const openNew = () => { setForm({ nombre: "", fecha: "", tipos: [], recurrencia: "Anual", estado: "Activa", subactividades: [] }); setEditAct(null); setModalOpen(true); };
  const openEdit = (a) => { setForm({ nombre: a.nombre, fecha: a.fecha, tipos: a.tipos, recurrencia: a.recurrencia, estado: a.estado, subactividades: a.subactividades || [] }); setEditAct(a); setModalOpen(true); };
  const del = (id) => { if (window.confirm("¿Eliminar actividad?")) setActividades(prev => prev.filter(a => a.id !== id)); };
  const toggleTipo = (tid) => setForm(f => ({ ...f, tipos: f.tipos.includes(tid) ? f.tipos.filter(x => x !== tid) : [...f.tipos, tid] }));
  const save = () => {
    if (!form.nombre.trim()) return;
    if (editAct) setActividades(prev => prev.map(a => a.id === editAct.id ? { ...a, ...form } : a));
    else setActividades(prev => [...prev, { ...form, subactividades: form.subactividades || [], id: "act" + Date.now() }]);
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
                {["Nombre", "Fecha", "Tipo(s)", "Recurrencia", "Estado", ""].map(h => (
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
                  <td style={{ padding: "14px" }}><Badge text={act.recurrencia} color={act.recurrencia === "Anual" ? PALETTE.accent : PALETTE.purple} /></td>
                  <td style={{ padding: "14px" }}><Badge text={act.estado} color={act.estado === "Activa" ? PALETTE.green : act.estado === "Finalizada" ? PALETTE.accent : act.estado === "Suspendida" ? PALETTE.red : PALETTE.muted} /></td>
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
            <Field label="Recurrencia"><Select value={form.recurrencia} onChange={e => setForm(f => ({ ...f, recurrencia: e.target.value }))}><option>Anual</option><option>Mensual</option></Select></Field>
            <Field label="Estado"><Select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}><option>Activa</option><option>No activada</option><option>Finalizada</option><option>Suspendida</option></Select></Field>
          </div>
          {/* Subactividades */}
          <Field label="Subactividades (opcional — para registrar cómo participó cada alumno)">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {(form.subactividades || []).map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: subColor(i) + "22", border: `1px solid ${subColor(i)}55`, borderRadius: 20, padding: "4px 12px" }}>
                  <span style={{ color: subColor(i), fontSize: 13, fontWeight: 700 }}>{s}</span>
                  <button onClick={() => setForm(f => ({ ...f, subactividades: f.subactividades.filter((_,j) => j !== i) }))} style={{ background: "none", border: "none", cursor: "pointer", color: subColor(i), fontSize: 16, lineHeight: 1, opacity: 0.7 }}>&#x2715;</button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Input value={newSub} onChange={e => setNewSub(e.target.value)} placeholder="Ej: Jugando, Stand, Barra..." onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSub(); }}} />
              <Btn variant="ghost" small onClick={addSub}>+ Agregar</Btn>
            </div>
            <div style={{ color: PALETTE.muted, fontSize: 11, marginTop: 4 }}>Escribe y presiona Enter o clic en + Agregar</div>
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

// ── Participación ─────────────────────────────────────────────────────────────
const Participacion = ({ alumnos, actividades, participacion, setParticipacion, tipos, encuestas, isAdmin }) => {
  const [filterTipo, setFilterTipo] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterAct, setFilterAct] = useState("");
  const [sortAp, setSortAp] = useState(false);
  const [sortActId, setSortActId] = useState(null);

  // Helper: participó si está en participacion O si respondió la encuesta vinculada
  const partioEn = (act, alumId) => {
    const p = participacion[act.id]?.[alumId];
    if (act.subactividades?.length > 0) {
      return !!(p?.subs?.length > 0);
    }
    if (p === true || p === 1) return true;
    if (!act._encuestaId) return false;
    const enc = (encuestas || []).find(e => e.id === act._encuestaId);
    return !!(enc?.respuestas?.[alumId]);
  };

  const actsFiltradas = actividades
    .filter(a => !filterTipo || a.tipos.includes(filterTipo))
    .filter(a => !filterEstado || a.estado === filterEstado);
  const actsVisibles = actsFiltradas
    .filter(a => !filterAct || a.id === filterAct)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const alumnosOrdenados = [...alumnos].sort((a, b) => {
    if (sortActId) {
      const actSort = actsVisibles.find(x => x.id === sortActId);
      const pa = actSort ? (partioEn(actSort, a.id) ? 1 : 0) : 0;
      const pb = actSort ? (partioEn(actSort, b.id) ? 1 : 0) : 0;
      if (pb !== pa) return pb - pa;
    }
    if (sortAp) return (a.apoderado || "").localeCompare(b.apoderado || "");
    return a.nombre.localeCompare(b.nombre);
  });

  const handleSortAct = (actId) => {
    setSortActId(prev => prev === actId ? null : actId);
    setSortAp(false);
  };

  const [subMenu, setSubMenu] = useState(null); // {actId, alumId, x, y}

  const toggle = (actId, alumId, act) => {
    if (!isAdmin) return;
    if (act?.subactividades?.length > 0) {
      // Show submenu
      setSubMenu(prev => prev?.actId === actId && prev?.alumId === alumId ? null : { actId, alumId });
    } else {
      setParticipacion(prev => ({ ...prev, [actId]: { ...prev[actId], [alumId]: !prev[actId]?.[alumId] } }));
    }
  };

  const toggleSub = (actId, alumId, sub) => {
    setParticipacion(prev => {
      const cur = prev[actId]?.[alumId];
      const arr = cur?.subs ? [...cur.subs] : [];
      const next = arr.includes(sub) ? arr.filter(s => s !== sub) : [...arr, sub];
      return { ...prev, [actId]: { ...prev[actId], [alumId]: { subs: next } } };
    });
  };

  const hasSub = (actId, alumId, sub) => {
    return participacion[actId]?.[alumId]?.subs?.includes(sub) || false;
  };

  const estadoColor = { "Activa": PALETTE.green, "Finalizada": PALETTE.accent, "Suspendida": PALETTE.red, "No activada": PALETTE.muted };

  const exportarPDF = () => {
    const fecha = new Date().toLocaleDateString("es-CL");
    const nActs = actsVisibles.length;

    // Portrait A4: 210mm wide, fit all 45 rows in one page
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth(); // 210mm

    const margin = 8;
    const nameColW = 40;
    const available = pageW - margin * 2 - nameColW;
    const actColW = nActs > 0 ? Math.max(7, Math.min(20, available / nActs)) : 20;
    // Shrink font to fit 45 rows + header in ~270mm page height
    const fs = nActs > 10 ? 5 : 5.5;

    // Title
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("GestionEscolar - Participacion", margin, 12);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    const filtros = [];
    if (filterTipo) filtros.push("Tipo: " + (tipos.find(t => t.id === filterTipo)?.nombre || ""));
    if (filterEstado) filtros.push("Estado: " + filterEstado);
    doc.text((filtros.length ? filtros.join("  |  ") : "Todas las actividades") + "  -  " + fecha, margin, 18);
    doc.setTextColor(0);

    // Activity names wrap across multiple lines in header
    const head = [["Alumno", ...actsVisibles.map(a => a.nombre)]];

    // Only first name + first surname for brevity
    const body = alumnosOrdenados.map(al => {
      const displayName = al.nombres && al.apellidos
        ? al.nombres.split(" ")[0] + " " + al.apellidos.split(" ")[0]
        : al.nombre;
      return [displayName, ...actsVisibles.map(act => partioEn(act, al.id) ? "SI" : "-")];
    });

    // Summary row
    const summary = ["TOTAL", ...actsVisibles.map(act => {
      const n = alumnosOrdenados.filter(al => partioEn(act, al.id)).length;
      const p = alumnosOrdenados.length > 0 ? (n/alumnosOrdenados.length*100).toFixed(1) : "0.0";
      return `${n}/${alumnosOrdenados.length} (${p}%)`;
    })];
    body.push(summary);

    // Build columnStyles dynamically
    const colStyles = { 0: { halign: "left", cellWidth: nameColW } };
    for (let i = 1; i <= nActs; i++) colStyles[i] = { cellWidth: actColW, halign: "center" };

    autoTable(doc, {
      head,
      body,
      startY: 22,
      margin: { left: margin, right: margin },
      styles: { fontSize: fs, cellPadding: 0.8, halign: "center", overflow: "linebreak" },
      headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: "bold", fontSize: fs, cellPadding: 1.2, minCellHeight: 18 },
      columnStyles: colStyles,
      tableWidth: pageW - margin * 2,
      didParseCell: (data) => {
        if (data.section === "body" && data.row.index === body.length - 1) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fillColor = [230, 236, 245];
        }
        if (data.section === "body" && data.column.index > 0 && data.cell.text[0] === "SI") {
          data.cell.styles.textColor = [22, 163, 74];
          data.cell.styles.fontStyle = "bold";
        }
        if (data.section === "body" && data.column.index > 0 && data.cell.text[0] === "-") {
          data.cell.styles.textColor = [180, 180, 180];
        }
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    doc.save(`participacion_${fecha.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Participación</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Select value={filterTipo} onChange={e => { setFilterTipo(e.target.value); setFilterAct(""); }} style={{ flex: "1 1 150px" }}>
          <option value="">Todos los tipos</option>
          {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </Select>
        <Select value={filterEstado} onChange={e => { setFilterEstado(e.target.value); setFilterAct(""); }} style={{ flex: "1 1 150px" }}>
          <option value="">Todos los estados</option>
          <option value="Activa">Activa</option>
          <option value="Finalizada">Finalizada</option>
          <option value="Suspendida">Suspendida</option>
          <option value="No activada">No activada</option>
        </Select>
        <Select value={filterAct} onChange={e => setFilterAct(e.target.value)} style={{ flex: "1 1 200px" }}>
          <option value="">Todas las actividades</option>
          {actsFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </Select>
        <Btn variant={sortAp ? "primary" : "ghost"} onClick={() => { setSortAp(s => !s); setSortActId(null); }} small>
          {sortAp ? "Por apoderado ✓" : "Ordenar por apoderado"}
        </Btn>
        <Btn variant="ghost" onClick={exportarPDF} small style={{ marginLeft: "auto" }}>
          Exportar PDF
        </Btn>
      </div>
      {/* Resumen de filtros / orden activo */}
      {(filterTipo || filterEstado || sortActId) && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: PALETTE.muted, fontSize: 12 }}>{actsVisibles.length} actividad(es) visible(s)</span>
          {filterTipo && <Badge text={tipos.find(t => t.id === filterTipo)?.nombre || ""} color={tipos.find(t => t.id === filterTipo)?.color || PALETTE.muted} />}
          {filterEstado && <Badge text={filterEstado} color={estadoColor[filterEstado] || PALETTE.muted} />}
          {sortActId && <Badge text={"↕ " + (actsVisibles.find(a => a.id === sortActId)?.nombre || "")} color={PALETTE.accent} />}
        </div>
      )}
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: PALETTE.muted, fontSize: 12, position: "sticky", left: 0, background: PALETTE.card }}>Alumno</th>
                {actsVisibles.map(a => {
                  const isActSort = sortActId === a.id;
                  const partCount = alumnos.filter(al => partioEn(a, al.id)).length;
                  return (
                    <th key={a.id} style={{ textAlign: "center", padding: "12px 10px", color: isActSort ? PALETTE.accent : PALETTE.muted, fontSize: 11 }}>
                      <div onClick={() => handleSortAct(a.id)} title="Clic para ordenar por participación"
                        style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: 80 }}>
                          <span style={{ fontWeight: isActSort ? 700 : 400 }}>{isActSort ? "↕ " : ""}{a.nombre}</span>
                        </div>
                        <span style={{ fontSize: 10, color: isActSort ? PALETTE.accent : PALETTE.muted }}>
                          {partCount}/{alumnos.length}
                        </span>
                        <span style={{ fontSize: 10, color: pctColor(Math.round(partCount/alumnos.length*100)), fontWeight: 600 }}>
                          {alumnos.length > 0 ? (partCount/alumnos.length*100).toFixed(1) + "%" : ""}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {alumnosOrdenados.map(al => (
                <tr key={al.id} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                  <td style={{ padding: "12px 16px", color: PALETTE.text, fontSize: 13, fontWeight: 600, position: "sticky", left: 0, background: PALETTE.card, whiteSpace: "nowrap" }}>{al.nombres && al.apellidos ? al.nombres + " " + al.apellidos : al.nombre}</td>
                  {actsVisibles.map(act => {
                    const partio = partioEn(act, al.id);
                    const esEncuesta = !!act._encuestaId;
                    const isActSort = sortActId === act.id;
                    const hasSubs = act.subactividades?.length > 0;
                    const curSubs = participacion[act.id]?.[al.id]?.subs || [];
                    const isSubMenuOpen = subMenu?.actId === act.id && subMenu?.alumId === al.id;
                    return (
                      <td key={act.id} style={{ textAlign: "center", padding: "8px 6px", background: isActSort ? PALETTE.accent + "08" : "transparent", position: "relative" }}>
                        {hasSubs ? (
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <button onClick={() => isAdmin && toggle(act.id, al.id, act)}
                              style={{ background: curSubs.length > 0 ? PALETTE.green + "22" : PALETTE.red + "22", border: `2px solid ${curSubs.length > 0 ? PALETTE.green : PALETTE.red}`, borderRadius: 8, padding: "2px 6px", cursor: isAdmin ? "pointer" : "default", minWidth: 32, minHeight: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                              {curSubs.length > 0
                                ? curSubs.map((s,i) => {
                                    const rank = act.subactividades.indexOf(s);
                                    return <span key={s} style={{ fontSize: 9, fontWeight: 700, color: subColor(rank) }}>{s.substring(0,3).toUpperCase()}</span>;
                                  })
                                : <Icon name="x" size={12} color={PALETTE.red} />
                              }
                            </button>
                            {isSubMenuOpen && (
                              <div style={{ position: "absolute", top: "110%", left: "50%", transform: "translateX(-50%)", background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 10, padding: 10, zIndex: 500, minWidth: 140, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                                <div style={{ color: PALETTE.muted, fontSize: 10, marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>{act.nombre.substring(0,20)}</div>
                                {act.subactividades.map((s, i) => (
                                  <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer" }}>
                                    <input type="checkbox" checked={hasSub(act.id, al.id, s)} onChange={() => toggleSub(act.id, al.id, s)} />
                                    <span style={{ color: subColor(i), fontSize: 12, fontWeight: 600 }}>{s}</span>
                                  </label>
                                ))}
                                <button onClick={() => setSubMenu(null)} style={{ marginTop: 6, width: "100%", background: PALETTE.border, border: "none", borderRadius: 6, color: PALETTE.text, fontSize: 11, padding: "4px 0", cursor: "pointer" }}>Cerrar</button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <button onClick={() => !esEncuesta && toggle(act.id, al.id, act)} style={{ background: partio ? PALETTE.green + "22" : PALETTE.red + "22", border: `2px solid ${partio ? PALETTE.green : PALETTE.red}`, borderRadius: "50%", width: 32, height: 32, cursor: (isAdmin && !esEncuesta) ? "pointer" : "default", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name={partio ? "check" : "x"} size={14} color={partio ? PALETTE.green : PALETTE.red} />
                          </button>
                        )}
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
const TIPO_ENCUESTA_ID = "69feb9c34b383d80660995b2";

const Encuestas = ({ alumnos, encuestas, setEncuestas, actividades, setActividades, isAdmin }) => {
  const [expandId, setExpandId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEnc, setEditEnc] = useState(null);
  const [form, setForm] = useState({ nombre: "", fecha: "", descripcion: "", estado: "Abierta", opciones: [{ id: "o1", texto: "" }, { id: "o2", texto: "" }] });

  const openNew = () => { setForm({ nombre: "", fecha: "", descripcion: "", estado: "Abierta", opciones: [{ id: "op1", texto: "" }, { id: "op2", texto: "" }] }); setEditEnc(null); setModalOpen(true); };
  const openEdit = (e) => { setForm({ nombre: e.nombre, fecha: e.fecha || "", descripcion: e.descripcion, estado: e.estado, opciones: [...e.opciones] }); setEditEnc(e); setModalOpen(true); };
  const del = (id) => {
    if (window.confirm("¿Eliminar encuesta?")) {
      setEncuestas(prev => prev.filter(e => e.id !== id));
      setActividades(prev => prev.filter(a => a._encuestaId !== id));
    }
  };

  const vincularComoActividad = (enc) => {
    // Check if already linked
    const yaExiste = actividades.some(a => a._encuestaId === enc.id);
    if (yaExiste) {
      // Update existing
      const estadoAct = enc.estado === "Abierta" ? "Activa" : enc.estado === "Cerrada" ? "Finalizada" : "No activada";
      setActividades(prev => prev.map(a => a._encuestaId === enc.id
        ? { ...a, nombre: enc.nombre, fecha: enc.fecha || a.fecha, estado: estadoAct, descripcion: enc.descripcion }
        : a
      ));
      alert("Actividad actualizada correctamente.");
    } else {
      const estadoAct = enc.estado === "Abierta" ? "Activa" : enc.estado === "Cerrada" ? "Finalizada" : "No activada";
      setActividades(prev => [...prev, {
        id: "act" + Date.now(),
        nombre: enc.nombre,
        fecha: enc.fecha || "",
        tipos: [TIPO_ENCUESTA_ID],
        recurrencia: "Mensual",
        estado: estadoAct,
        descripcion: enc.descripcion || "",
        _encuestaId: enc.id,
      }]);
      alert("Actividad creada y vinculada correctamente.");
    }
  };
  const save = () => {
    if (!form.nombre.trim()) return;
    const ops = form.opciones.filter(o => o.texto.trim());
    // Map encuesta estado -> actividad estado
    const estadoAct = form.estado === "Abierta" ? "Activa" : form.estado === "Cerrada" ? "Finalizada" : "No activada";
    if (editEnc) {
      setEncuestas(prev => prev.map(e => e.id === editEnc.id ? { ...e, ...form, opciones: ops } : e));
      // Update linked activity if exists
      setActividades(prev => prev.map(a => a._encuestaId === editEnc.id
        ? { ...a, nombre: form.nombre, fecha: form.fecha || a.fecha, estado: estadoAct, descripcion: form.descripcion }
        : a
      ));
    } else {
      const newId = "enc" + Date.now();
      const actId = "act" + Date.now();
      setEncuestas(prev => [...prev, { ...form, id: newId, opciones: ops, respuestas: {} }]);
      // Auto-create linked activity
      setActividades(prev => [...prev, {
        id: actId,
        nombre: form.nombre,
        fecha: form.fecha || "",
        tipos: [TIPO_ENCUESTA_ID],
        recurrencia: "Mensual",
        estado: estadoAct,
        descripcion: form.descripcion || "",
        _encuestaId: newId,
      }]);
    }
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
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                      <Badge text={enc.estado} color={enc.estado === "Abierta" ? PALETTE.green : PALETTE.muted} />
                      {enc.fecha && <span style={{ color: PALETTE.muted, fontSize: 12 }}>{enc.fecha}</span>}
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
                      {[...alumnos].sort((a,b) => { const na = a.nombres || a.nombre.split(" ").slice(-1)[0] || ""; const nb = b.nombres || b.nombre.split(" ").slice(-1)[0] || ""; return na.localeCompare(nb,"es"); }).map(al => (
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Fecha"><Input type="date" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} /></Field>
            <Field label="Estado"><Select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}><option>Abierta</option><option>Cerrada</option></Select></Field>
          </div>
          <Field label="Descripción / Pregunta"><Input value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} /></Field>
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
const ESTADOS_CONTABLES = ["Activa", "Finalizada"];

const RankingTable = ({ lista, totalActs, label, color, bottom }) => (
  <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
    <div style={{ padding: "14px 20px", borderBottom: `1px solid ${PALETTE.border}`, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 16 }}>{bottom ? "📉" : "📈"}</span>
      <span style={{ color: PALETTE.text, fontWeight: 700, fontSize: 14 }}>{label}</span>
    </div>
    {lista.map((al, i) => (
      <div key={al.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", borderBottom: i < lista.length - 1 ? `1px solid ${PALETTE.border}` : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: PALETTE.muted, fontWeight: 800, fontSize: 15, width: 24 }}>#{i + 1}</span>
          <span style={{ color: PALETTE.text, fontSize: 13 }}>{al.nombres && al.apellidos ? al.nombres + " " + al.apellidos : al.nombre}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: color || pctColor(al.pct), fontWeight: 700, fontSize: 13 }}>{al.done}/{totalActs}</span>
          <span style={{ color: color || pctColor(al.pct), fontSize: 12 }}>({al.pct}%)</span>
          <div style={{ background: PALETTE.border, borderRadius: 4, height: 6, width: 70 }}>
            <div style={{ background: color || pctColor(al.pct), width: al.pct + "%", height: "100%", borderRadius: 4 }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Estadisticas = ({ alumnos, actividades, participacion, tipos }) => {
  const [tipoDetalle, setTipoDetalle] = useState(null); // null = general, tipoId = por tipo
  const [topN, setTopN] = useState(5);

  const actsContables = actividades.filter(a => ESTADOS_CONTABLES.includes(a.estado));

  // General ranking
  const rankingGeneral = alumnos.map(al => {
    const done = actsContables.filter(act => participacion[act.id]?.[al.id]).length;
    return { ...al, done, pct: pct(done, actsContables.length) };
  }).sort((a, b) => b.done - a.done);

  // By tipo — with detail per activity
  const byTipo = tipos.map(t => {
    const acts = actsContables.filter(a => a.tipos.includes(t.id)).sort((a, b) => a.fecha.localeCompare(b.fecha));
    const totalPart = acts.reduce((s, act) => s + alumnos.filter(al => participacion[act.id]?.[al.id]).length, 0);
    const actsDetalle = acts.map(act => {
      const n = alumnos.filter(al => participacion[act.id]?.[al.id]).length;
      return { ...act, n, pct: pct(n, alumnos.length) };
    });
    return { ...t, acts: acts.length, pct: pct(totalPart, acts.length * alumnos.length), actsDetalle };
  });

  // Ranking by selected tipo
  const tipoActual = tipos.find(t => t.id === tipoDetalle);
  const actsDelTipo = tipoActual ? actsContables.filter(a => a.tipos.includes(tipoDetalle)) : actsContables;
  const totalActsTipo = actsDelTipo.length;
  const rankingTipo = alumnos.map(al => {
    const done = actsDelTipo.filter(act => participacion[act.id]?.[al.id]).length;
    return { ...al, done, pct: pct(done, totalActsTipo) };
  }).sort((a, b) => b.done - a.done);

  const topLista = rankingTipo.slice(0, topN);
  const bottomLista = [...rankingTipo].reverse().slice(0, topN);
  const totalActsActual = totalActsTipo;

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Estadísticas</h1>

      {/* Participación global por tipo + detalle por actividad */}
      <h3 style={{ color: PALETTE.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Participación por tipo de actividad</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        {byTipo.filter(t => t.acts > 0).map(t => (
          <div key={t.id} style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Tipo header */}
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${PALETTE.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
                  <span style={{ color: PALETTE.text, fontWeight: 700, fontSize: 14 }}>{t.nombre}</span>
                  <span style={{ color: PALETTE.muted, fontSize: 11 }}>({t.acts} actividad{t.acts !== 1 ? "es" : ""})</span>
                </div>
                <span style={{ color: pctColor(t.pct), fontWeight: 800, fontSize: 14 }}>{t.pct}%</span>
              </div>
              <div style={{ background: PALETTE.border, borderRadius: 6, height: 8 }}>
                <div style={{ background: t.color, width: t.pct + "%", height: "100%", borderRadius: 6, transition: "width 0.6s" }} />
              </div>
            </div>
            {/* Detalle por actividad */}
            {t.actsDetalle.map((act, i) => (
              <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 20px", borderBottom: i < t.actsDetalle.length - 1 ? `1px solid ${PALETTE.border}` : "none", background: i % 2 === 0 ? "transparent" : PALETTE.bg + "66" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: PALETTE.text, fontSize: 13 }}>{act.nombre}</div>
                  <div style={{ color: PALETTE.muted, fontSize: 11, marginTop: 1 }}>{act.fecha}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{ background: PALETTE.border, borderRadius: 4, height: 5, width: 80 }}>
                    <div style={{ background: pctColor(act.pct), width: act.pct + "%", height: "100%", borderRadius: 4 }} />
                  </div>
                  <span style={{ color: pctColor(act.pct), fontWeight: 700, fontSize: 12, minWidth: 36, textAlign: "right" }}>{act.n}/{alumnos.length}</span>
                  <span style={{ color: pctColor(act.pct), fontSize: 11, minWidth: 38, textAlign: "right" }}>({act.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Filtros ranking */}
      <h3 style={{ color: PALETTE.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Ranking de participación de alumnos</h3>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Select value={tipoDetalle || ""} onChange={e => setTipoDetalle(e.target.value || null)} style={{ flex: "1 1 180px" }}>
          <option value="">General (todas las actividades)</option>
          {tipos.filter(t => actsContables.some(a => a.tipos.includes(t.id))).map(t => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </Select>
        <Select value={topN} onChange={e => setTopN(Number(e.target.value))} style={{ flex: "0 0 120px" }}>
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={alumnos.length}>Todos</option>
        </Select>
      </div>

      {/* Indicador filtro activo */}
      {tipoActual && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Badge text={tipoActual.nombre} color={tipoActual.color} />
          <span style={{ color: PALETTE.muted, fontSize: 12 }}>{totalActsTipo} actividad(es) contabilizada(s)</span>
        </div>
      )}

      {/* Más participativos */}
      <RankingTable lista={topLista} totalActs={totalActsActual} label={`Más participativos${tipoActual ? " — " + tipoActual.nombre : ""}`} bottom={false} />

      {/* Menos participativos */}
      <RankingTable lista={bottomLista} totalActs={totalActsActual} label={`Menos participativos${tipoActual ? " — " + tipoActual.nombre : ""}`} color={PALETTE.red} bottom={true} />
    </div>
  );
};

// ── Login ────────────────────────────────────────────────────────────────────
const USERS_BASE = [
  { usuario: "RenEnriquE", clave: "rene26",      nombre: "René Lillo",       rol: "admin",  color: "#3b82f6" },
  { usuario: "carolina",   clave: "carol2026",   nombre: "Carolina Parra",   rol: "admin",  color: "#8b5cf6" },
  { usuario: "Tercero",    clave: "gestion26",   nombre: "Apoderados 3ro C", rol: "viewer", color: "#10b981" },
];
// Merge base users with any saved username/password overrides
const getUsers = () => {
  const saved = S.get("ge_claves") || {};
  return USERS_BASE.map(u => ({
    ...u,
    usuario: saved[u.usuario + "_alias"] || u.usuario,
    clave: saved[u.usuario] || u.clave,
    _baseUsuario: u.usuario, // keep original key for lookups
  }));
};

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",          icon: "dashboard"     },
  { id: "alumnos",      label: "Alumnos",            icon: "users"         },
  { id: "actividades",  label: "Actividades",        icon: "activity"      },
  { id: "participacion",label: "Participación",      icon: "participation" },
  { id: "encuestas",    label: "Encuestas",          icon: "survey"        },
  { id: "estadisticas", label: "Estadísticas",       icon: "stats"         },
  { id: "tipos",        label: "Tipos de Actividad", icon: "tag"           },
  { id: "ficha",        label: "Fichas",             icon: "users"         },
  { id: "usuarios",     label: "Usuarios",           icon: "shield"        },
];

const SEED_VISIBILITY = {
  dashboard: true, alumnos: true, actividades: true,
  participacion: true, encuestas: true, estadisticas: true,
  tipos: false, usuarios: false,
};

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const intentar = () => {
    const u = getUsers().find(u => u.usuario === usuario.trim() && u.clave === clave);
    if (u) { setError(""); onLogin(u); }
    else setError("Usuario o clave incorrectos");
  };

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 20, padding: 40, width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ background: PALETTE.accent, borderRadius: 12, padding: 10 }}><Icon name="dashboard" size={22} color="white" /></div>
          <div>
            <div style={{ color: PALETTE.text, fontWeight: 800, fontSize: 20 }}>GestiónEscolar</div>
            <div style={{ color: PALETTE.muted, fontSize: 12 }}>3ro Básico C · L. M. R. Prado</div>
          </div>
        </div>
        <Field label="Usuario"><Input value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="tu usuario" autoCapitalize="none" autoCorrect="off" autoComplete="username" onKeyDown={e => e.key === "Enter" && intentar()} /></Field>
        <Field label="Contraseña"><Input type="password" value={clave} onChange={e => setClave(e.target.value)} placeholder="••••••••" autoCapitalize="none" autoCorrect="off" autoComplete="current-password" onKeyDown={e => e.key === "Enter" && intentar()} /></Field>
        {error && <div style={{ color: PALETTE.red, fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <Btn onClick={intentar} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Ingresar</Btn>
      </div>
    </div>
  );
};

// ── Usuarios ──────────────────────────────────────────────────────────────────
const Usuarios = ({ visibility, setVisibility }) => {
  const [users, setUsers] = useState(getUsers());
  const [editingUser, setEditingUser] = useState(null);
  const [claveForm, setClaveForm] = useState({ nueva: "", confirmar: "" });
  const [claveError, setClaveError] = useState("");
  const [claveOk, setClaveOk] = useState("");

  const openEditClave = (u) => { setEditingUser(u); setClaveForm({ usuario: u.usuario, nueva: "", confirmar: "" }); setClaveError(""); setClaveOk(""); };

  const guardarClave = () => {
    if (!claveForm.usuario.trim()) { setClaveError("El usuario no puede estar vacío"); return; }
    if (claveForm.nueva && claveForm.nueva.length < 6) { setClaveError("La clave debe tener al menos 6 caracteres"); return; }
    if (claveForm.nueva !== claveForm.confirmar) { setClaveError("Las claves no coinciden"); return; }
    const saved = S.get("ge_claves") || {};
    // Save new username if changed
    if (claveForm.usuario.trim() !== editingUser.usuario) {
      saved[editingUser.usuario + "_alias"] = claveForm.usuario.trim();
    }
    // Save new password if provided
    if (claveForm.nueva) {
      saved[editingUser.usuario] = claveForm.nueva;
    }
    S.set("ge_claves", saved);
    DB.setConfig('claves', saved);
    setUsers(getUsers());
    setClaveOk("¡Guardado!");
    setClaveError("");
    setTimeout(() => { setEditingUser(null); setClaveOk(""); }, 1500);
  };

  return (
    <div>
      <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Usuarios</h1>

      {/* Modal cambio de clave */}
      {editingUser && (
        <Modal title={`Editar cuenta — ${editingUser.nombre}`} onClose={() => setEditingUser(null)}>
          <Field label="Nombre de usuario">
            <Input value={claveForm.usuario} onChange={e => setClaveForm(f => ({ ...f, usuario: e.target.value }))} placeholder="usuario" />
          </Field>
          <div style={{ borderTop: `1px solid ${PALETTE.border}`, margin: "16px 0 16px", paddingTop: 4 }}>
            <div style={{ color: PALETTE.muted, fontSize: 11, marginBottom: 12 }}>CAMBIAR CONTRASEÑA (dejar en blanco para no cambiar)</div>
          </div>
          <Field label="Nueva contraseña">
            <Input type="password" value={claveForm.nueva} onChange={e => setClaveForm(f => ({ ...f, nueva: e.target.value }))} placeholder="Mínimo 6 caracteres" />
          </Field>
          <Field label="Confirmar contraseña">
            <Input type="password" value={claveForm.confirmar} onChange={e => setClaveForm(f => ({ ...f, confirmar: e.target.value }))} placeholder="Repite la contraseña" onKeyDown={e => e.key === "Enter" && guardarClave()} />
          </Field>
          {claveError && <div style={{ color: PALETTE.red, fontSize: 13, marginBottom: 12 }}>{claveError}</div>}
          {claveOk && <div style={{ color: PALETTE.green, fontSize: 13, marginBottom: 12 }}>{claveOk}</div>}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setEditingUser(null)}>Cancelar</Btn>
            <Btn onClick={guardarClave}>Guardar</Btn>
          </div>
        </Modal>
      )}

      {/* Cuentas */}
      <h3 style={{ color: PALETTE.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Cuentas</h3>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 28 }}>
        {users.map((u, i) => (
          <div key={u.usuario} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < users.length - 1 ? `1px solid ${PALETTE.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: u.color + "33", border: `2px solid ${u.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: u.color, fontWeight: 800, fontSize: 16 }}>{u.usuario[0].toUpperCase()}</span>
              </div>
              <div>
                <div style={{ color: PALETTE.text, fontWeight: 700 }}>{u.nombre}</div>
                <div style={{ color: PALETTE.muted, fontSize: 12 }}>@{u.usuario}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge text={u.rol === "admin" ? "Administrador" : "Solo vista"} color={u.rol === "admin" ? PALETTE.accent : PALETTE.green} />
              <button onClick={() => openEditClave(u)} title="Cambiar clave" style={{ background: PALETTE.accent + "22", border: `1px solid ${PALETTE.accent}44`, borderRadius: 8, cursor: "pointer", color: PALETTE.accent, padding: "5px 10px", fontSize: 11, fontWeight: 600 }}>
                🔑 Clave
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visibilidad para apoderados */}
      <h3 style={{ color: PALETTE.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Secciones visibles para Apoderados</h3>
      <p style={{ color: PALETTE.muted, fontSize: 12, marginBottom: 16 }}>Controla qué secciones del menú pueden ver los apoderados al iniciar sesión.</p>
      <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
        {NAV_ITEMS.filter(n => n.id !== "usuarios").map((item, i) => {
          const visible = visibility[item.id] ?? true;
          return (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: i < NAV_ITEMS.length - 2 ? `1px solid ${PALETTE.border}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name={item.icon} size={16} color={PALETTE.muted} />
                <span style={{ color: PALETTE.text, fontSize: 14 }}>{item.label}</span>
              </div>
              <button onClick={() => setVisibility(v => ({ ...v, [item.id]: !visible }))} style={{
                width: 44, height: 24, borderRadius: 12, background: visible ? PALETTE.accent : PALETTE.border,
                border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s"
              }}>
                <span style={{
                  position: "absolute", top: 3, left: visible ? 23 : 3, width: 18, height: 18,
                  borderRadius: "50%", background: "white", transition: "left 0.2s"
                }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
// ── Fichas de Alumnos ─────────────────────────────────────────────────────────
const Fichas = ({ alumnos, setAlumnos, isAdmin }) => {
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  // Columnas exportables
  const ALL_COLS = [
    { id: "id",           label: "ID Alumno",           get: a => a.id },
    { id: "rut",          label: "RUT Alumno",           get: a => a.rut||"" },
    { id: "nombre_completo", label: "Nombre Completo",  get: a => [a.nombres,a.nombre2,a.apellidos,a.apellido2].filter(Boolean).join(" ") },
    { id: "apellidos",    label: "Apellido Paterno",     get: a => a.apellidos||"" },
    { id: "apellido2",    label: "Apellido Materno",     get: a => a.apellido2||"" },
    { id: "nombres",      label: "Primer Nombre",        get: a => a.nombres||"" },
    { id: "nombre2",      label: "Segundo Nombre",       get: a => a.nombre2||"" },
    { id: "fechaNac",     label: "Fecha Nacimiento",     get: a => toDisplay(a.fechaNac)||"" },
    { id: "sexo",         label: "Sexo",                 get: a => a.sexo==="M"?"Masculino":"Femenino" },
    { id: "apod1_nombre", label: "Apod.1 Nombre",        get: a => a.apod1_nombre||a.apoderado||"" },
    { id: "apod1_rut",    label: "Apod.1 RUT",           get: a => a.apod1_rut||"" },
    { id: "apod1_cel",    label: "Apod.1 Teléfono",      get: a => a.apod1_cel||a.telefono||"" },
    { id: "apod1_email",  label: "Apod.1 Email",         get: a => a.apod1_email||a.email||"" },
    { id: "apod1_fnac",   label: "Apod.1 F.Nacimiento",  get: a => toDisplay(a.apod1_fnac)||"" },
    { id: "apod2_nombre", label: "Apod.2 Nombre",        get: a => a.apod2_nombre||a.apoderado2||"" },
    { id: "apod2_rut",    label: "Apod.2 RUT",           get: a => a.apod2_rut||"" },
    { id: "apod2_cel",    label: "Apod.2 Teléfono",      get: a => a.apod2_cel||"" },
    { id: "apod2_email",  label: "Apod.2 Email",         get: a => a.apod2_email||"" },
    { id: "apod2_fnac",   label: "Apod.2 F.Nacimiento",  get: a => toDisplay(a.apod2_fnac)||"" },
  ];
  const [selCols, setSelCols] = useState(new Set(["rut","nombre_completo","apod1_rut","apod1_nombre","apod1_cel","apod2_nombre","apod2_rut","apod2_cel"]));
  const [showColPicker, setShowColPicker] = useState(false);
  const [sort1, setSort1] = useState("nombres");
  const [sort2, setSort2] = useState("apellidos");
  const [sort3, setSort3] = useState("");

  const toggleCol = (id) => setSelCols(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const getVal = (al, colId) => { if (!colId) return ""; const col = ALL_COLS.find(c => c.id === colId); return col ? col.get(al) : ""; };

  const alumnosOrdenados = [...alumnos]
    .filter(a => {
      const q = search.toLowerCase();
      if (!q) return true;
      return (a.apellidos||"").toLowerCase().includes(q)
          || (a.apellido2||"").toLowerCase().includes(q)
          || (a.nombres||"").toLowerCase().includes(q)
          || (a.nombre2||"").toLowerCase().includes(q)
          || (a.nombre||"").toLowerCase().includes(q)
          || (a.apod1_nombre||a.apoderado||"").toLowerCase().includes(q)
          || (a.apod2_nombre||a.apoderado2||"").toLowerCase().includes(q);
    })
    .sort((a,b) => {
      const v1 = getVal(a,sort1).localeCompare(getVal(b,sort1),"es"); if (v1 !== 0) return v1;
      const v2 = getVal(a,sort2).localeCompare(getVal(b,sort2),"es"); if (v2 !== 0) return v2;
      if (!sort3) return 0;
      return getVal(a,sort3).localeCompare(getVal(b,sort3),"es");
    });

  const openEdit = (al) => {
    setForm({
      nombre: al.nombres||"", nombre2: al.nombre2||"",
      apellidos: al.apellidos||"", apellido2: al.apellido2||"",
      rut: al.rut||"", fechaNac: al.fechaNac||"", sexo: al.sexo||"M",
      apod1_nombre: al.apod1_nombre||al.apoderado||"",
      apod1_rut: al.apod1_rut||"", apod1_cel: al.apod1_cel||al.telefono||"",
      apod1_email: al.apod1_email||al.email||"", apod1_fnac: al.apod1_fnac||"",
      apod2_nombre: al.apod2_nombre||al.apoderado2||"",
      apod2_rut: al.apod2_rut||"", apod2_cel: al.apod2_cel||"",
      apod2_email: al.apod2_email||"", apod2_fnac: al.apod2_fnac||"",
    });
    setEditMode(true);
  };

  const save = () => {
    const nombreFull = [form.apellidos,form.apellido2,form.nombre,form.nombre2].filter(Boolean).join(" ").toUpperCase();
    setAlumnos(prev => prev.map(a => a.id === selected.id ? {
      ...a, nombres: form.nombre.toUpperCase(), nombre2: form.nombre2.toUpperCase(),
      apellidos: form.apellidos.toUpperCase(), apellido2: form.apellido2.toUpperCase(),
      nombre: nombreFull, rut: form.rut, fechaNac: form.fechaNac, sexo: form.sexo,
      apoderado: form.apod1_nombre, apoderado2: form.apod2_nombre,
      telefono: form.apod1_cel, email: form.apod1_email,
      apod1_nombre: form.apod1_nombre, apod1_rut: form.apod1_rut,
      apod1_cel: form.apod1_cel, apod1_email: form.apod1_email, apod1_fnac: form.apod1_fnac,
      apod2_nombre: form.apod2_nombre, apod2_rut: form.apod2_rut,
      apod2_cel: form.apod2_cel, apod2_email: form.apod2_email, apod2_fnac: form.apod2_fnac,
    } : a));
    setSelected(prev => ({ ...prev, ...form, nombre: nombreFull,
      nombres: form.nombre.toUpperCase(), apellidos: form.apellidos.toUpperCase() }));
    setEditMode(false);
  };

  // Export to CSV (works everywhere without extra libs)
  const exportExcel = () => {
    const cols = ALL_COLS.filter(c => selCols.has(c.id));
    const header = cols.map(c => c.label);
    const rows = alumnosOrdenados.map(al => cols.map(c => c.get(al)));
    const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
    ws["!cols"] = header.map((h, i) => ({
      wch: Math.min(Math.max(h.length, ...rows.map(r => String(r[i]||"").length)) + 2, 40)
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fichas");
    XLSX.writeFile(wb, "fichas_alumnos.xlsx");
  };

  const InfoRow = ({ label, value }) => value ? (
    <div style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${PALETTE.border}22` }}>
      <span style={{ color: PALETTE.muted, fontSize: 12, minWidth: 150 }}>{label}</span>
      <span style={{ color: PALETTE.text, fontSize: 13 }}>{value}</span>
    </div>
  ) : null;

  const SecTitle = ({ t }) => (
    <div style={{ color: PALETTE.accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginTop: 18, marginBottom: 8 }}>{t}</div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 800, margin: 0 }}>Fichas</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Btn variant="ghost" small onClick={() => setShowColPicker(s => !s)}>
              <Icon name="tag" size={13} /> Columnas ({selCols.size})
            </Btn>
            {showColPicker && (
              <div style={{ position: "absolute", right: 0, top: "110%", background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: 16, zIndex: 100, minWidth: 260, maxHeight: 400, overflowY: "auto" }}>
                <div style={{ color: PALETTE.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Seleccionar columnas</div>
                {ALL_COLS.map(c => (
                  <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}>
                    <input type="checkbox" checked={selCols.has(c.id)} onChange={() => toggleCol(c.id)} />
                    <span style={{ color: PALETTE.text, fontSize: 13 }}>{c.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <Btn variant="ghost" small onClick={exportExcel}>
            <Icon name="stats" size={13} /> Exportar Excel
          </Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "230px 1fr" : "1fr", gap: 16 }}>
        {/* Lista */}
        <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${PALETTE.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
            <Input placeholder="Buscar alumno..." value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: 12 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: PALETTE.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Ordenar por</span>
              {[[sort1,setSort1,"1°"],[sort2,setSort2,"2°"],[sort3,setSort3,"3°"]].map(([val,setter,lbl]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ color: PALETTE.muted, fontSize: 10, minWidth: 16 }}>{lbl}</span>
                  <select value={val} onChange={e => setter(e.target.value)} style={{ flex: 1, background: PALETTE.bg, border: `1px solid ${PALETTE.border}`, borderRadius: 6, padding: "3px 6px", color: PALETTE.text, fontSize: 11, outline: "none" }}>
                    {lbl !== "1°" && <option value="">— ninguno —</option>}
                    {ALL_COLS.filter(c => c.id !== "id").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {alumnosOrdenados.map(al => (
              <div key={al.id} onClick={() => { setSelected(al); setEditMode(false); }}
                style={{ padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid ${PALETTE.border}`, background: selected?.id === al.id ? PALETTE.accent + "22" : "transparent" }}>
                <div style={{ color: selected?.id === al.id ? PALETTE.accent : PALETTE.text, fontSize: 13, fontWeight: 600 }}>
                  {[al.nombres, al.nombre2, al.apellidos, al.apellido2].filter(Boolean).join(" ") || al.nombre}
                </div>
                <div style={{ color: PALETTE.muted, fontSize: 11 }}>{al.rut || "Sin RUT"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle */}
        {selected && !editMode && (
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 24, overflowY: "auto", maxHeight: "75vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ color: PALETTE.text, fontWeight: 800, fontSize: 18 }}>
                  {[selected.nombres, selected.nombre2, selected.apellidos, selected.apellido2].filter(Boolean).join(" ")}
                </div>
                <div style={{ color: PALETTE.muted, fontSize: 13 }}>{selected.rut || "Sin RUT"} · {selected.id}</div>
              </div>
              {isAdmin && <Btn small onClick={() => openEdit(selected)}><Icon name="edit" size={13} />Editar</Btn>}
            </div>

            {/* Todos los campos — clic para incluir/excluir de exportación */}
            <div style={{ background: PALETTE.bg, borderRadius: 10, overflow: "hidden", border: `1px solid ${PALETTE.border}`, marginBottom: 8 }}>
              <div style={{ padding: "8px 14px", borderBottom: `1px solid ${PALETTE.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: PALETTE.muted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Datos del alumno</span>
                <span style={{ color: PALETTE.accent, fontSize: 10 }}>Clic en campo = incluir/excluir de exportación</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {ALL_COLS.map((c, i) => {
                  const v = c.get(selected);
                  const isSel = selCols.has(c.id);
                  return (
                    <div key={c.id} onClick={() => toggleCol(c.id)} style={{ padding: "8px 14px", borderBottom: `1px solid ${PALETTE.border}22`, borderRight: i % 2 === 0 ? `1px solid ${PALETTE.border}22` : "none", background: isSel ? PALETTE.accent + "18" : "transparent", cursor: "pointer" }}>
                      <div style={{ color: isSel ? PALETTE.accent : PALETTE.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>
                        {isSel ? "✓ " : ""}{c.label}
                      </div>
                      <div style={{ color: v ? PALETTE.text : PALETTE.border, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v || "—"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <SecTitle t="Datos completos" />
            <InfoRow label="Primer nombre" value={selected.nombres} />
            <InfoRow label="Segundo nombre" value={selected.nombre2} />
            <InfoRow label="Apellido paterno" value={selected.apellidos} />
            <InfoRow label="Apellido materno" value={selected.apellido2} />
            <InfoRow label="RUT" value={selected.rut} />
            <InfoRow label="Fecha de nacimiento" value={toDisplay(selected.fechaNac)} />
            <InfoRow label="Sexo" value={selected.sexo === "M" ? "Masculino" : "Femenino"} />
            <SecTitle t="Apoderado principal" />
            <InfoRow label="Nombre" value={selected.apod1_nombre || selected.apoderado} />
            <InfoRow label="RUT" value={selected.apod1_rut} />
            <InfoRow label="Teléfono" value={selected.apod1_cel || selected.telefono} />
            {(selected.apod2_nombre || selected.apoderado2) && <>
              <SecTitle t="Segundo apoderado" />
              <InfoRow label="Nombre" value={selected.apod2_nombre || selected.apoderado2} />
              <InfoRow label="RUT" value={selected.apod2_rut} />
              <InfoRow label="Teléfono" value={selected.apod2_cel} />
            </>}
          </div>
        )}

        {/* Edición */}
        {selected && editMode && (
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: 24, overflowY: "auto", maxHeight: "75vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ color: PALETTE.text, fontWeight: 700, fontSize: 16 }}>Editar ficha</span>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="ghost" small onClick={() => setEditMode(false)}>Cancelar</Btn>
                <Btn small onClick={save}>Guardar</Btn>
              </div>
            </div>
            <SecTitle t="Datos del alumno" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
              <Field label="Apellido paterno"><Input value={form.apellidos} onChange={e => setForm(f=>({...f,apellidos:e.target.value}))} /></Field>
              <Field label="Apellido materno"><Input value={form.apellido2} onChange={e => setForm(f=>({...f,apellido2:e.target.value}))} /></Field>
              <Field label="Primer nombre"><Input value={form.nombre} onChange={e => setForm(f=>({...f,nombre:e.target.value}))} /></Field>
              <Field label="Segundo nombre"><Input value={form.nombre2} onChange={e => setForm(f=>({...f,nombre2:e.target.value}))} /></Field>
              <Field label="RUT"><Input value={form.rut} onChange={e => setForm(f=>({...f,rut:e.target.value}))} placeholder="12345678-9" /></Field>
              <Field label="Fecha nacimiento (DD-MM-AAAA)"><DateInput value={form.fechaNac} onChange={v => setForm(f=>({...f,fechaNac:v}))} /></Field>
              <Field label="Sexo"><Select value={form.sexo} onChange={e => setForm(f=>({...f,sexo:e.target.value}))}><option value="M">Masculino</option><option value="F">Femenino</option></Select></Field>
            </div>
            <SecTitle t="Apoderado principal" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
              <Field label="Nombre"><Input value={form.apod1_nombre} onChange={e => setForm(f=>({...f,apod1_nombre:e.target.value}))} /></Field>
              <Field label="RUT"><Input value={form.apod1_rut} onChange={e => setForm(f=>({...f,apod1_rut:e.target.value}))} placeholder="12345678-9" /></Field>
              <Field label="Teléfono"><Input value={form.apod1_cel} onChange={e => setForm(f=>({...f,apod1_cel:e.target.value}))} /></Field>
              <Field label="Email"><Input type="email" value={form.apod1_email} onChange={e => setForm(f=>({...f,apod1_email:e.target.value}))} /></Field>
              <Field label="Fecha nacimiento (DD-MM-AAAA)"><DateInput value={form.apod1_fnac} onChange={v => setForm(f=>({...f,apod1_fnac:v}))} /></Field>
            </div>
            <SecTitle t="Segundo apoderado" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field label="Nombre"><Input value={form.apod2_nombre} onChange={e => setForm(f=>({...f,apod2_nombre:e.target.value}))} /></Field>
              <Field label="RUT"><Input value={form.apod2_rut} onChange={e => setForm(f=>({...f,apod2_rut:e.target.value}))} placeholder="12345678-9" /></Field>
              <Field label="Teléfono"><Input value={form.apod2_cel} onChange={e => setForm(f=>({...f,apod2_cel:e.target.value}))} /></Field>
              <Field label="Email"><Input type="email" value={form.apod2_email} onChange={e => setForm(f=>({...f,apod2_email:e.target.value}))} /></Field>
              <Field label="Fecha nacimiento (DD-MM-AAAA)"><DateInput value={form.apod2_fnac} onChange={v => setForm(f=>({...f,apod2_fnac:v}))} /></Field>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ── Map DB rows to app format ────────────────────────────────────────────────
const dbToAlumno = r => ({
  id: r.id,
  nombres: r.nombres || "", nombre2: r.nombre2 || "",
  apellidos: r.apellidos || "", apellido2: r.apellido2 || "",
  nombre: r.nombre || ((r.apellidos || "") + " " + (r.nombres || "")).toUpperCase().trim(),
  rut: r.rut || "",
  fechaNac: r.fecha_nac || "", sexo: r.sexo || "M",
  apoderado: r.apoderado || "", apoderado2: r.apoderado2 || "",
  telefono: r.telefono || "", email: r.email || "",
  observaciones: r.observaciones || "", socioAprendilandia: r.socio_aprendilandia || false,
  apod1_nombre: r.apod1_nombre || "", apod1_rut: r.apod1_rut || "",
  apod1_cel: r.apod1_cel || "", apod1_email: r.apod1_email || "", apod1_fnac: r.apod1_fnac || "",
  apod2_nombre: r.apod2_nombre || "", apod2_rut: r.apod2_rut || "",
  apod2_cel: r.apod2_cel || "", apod2_email: r.apod2_email || "", apod2_fnac: r.apod2_fnac || "",
});
const alumnoToDB = a => ({
  id: a.id, nombres: a.nombres, nombre2: a.nombre2 || "",
  apellidos: a.apellidos, apellido2: a.apellido2 || "",
  nombre: a.nombre, rut: a.rut || "",
  fecha_nac: a.fechaNac, sexo: a.sexo,
  apoderado: a.apoderado, apoderado2: a.apoderado2,
  telefono: a.telefono, email: a.email,
  observaciones: a.observaciones, socio_aprendilandia: a.socioAprendilandia,
  apod1_nombre: a.apod1_nombre || "", apod1_rut: a.apod1_rut || "",
  apod1_cel: a.apod1_cel || "", apod1_email: a.apod1_email || "", apod1_fnac: a.apod1_fnac || "",
  apod2_nombre: a.apod2_nombre || "", apod2_rut: a.apod2_rut || "",
  apod2_cel: a.apod2_cel || "", apod2_email: a.apod2_email || "", apod2_fnac: a.apod2_fnac || "",
});
const dbToAct = r => ({ id: r.id, nombre: r.nombre, fecha: r.fecha || "", tipos: r.tipos || [], recurrencia: r.recurrencia || "Anual", estado: r.estado || "No activada", descripcion: r.descripcion || "", _encuestaId: r.encuesta_id || null, subactividades: r.subactividades || [] });
const actToDB = a => ({ id: a.id, nombre: a.nombre, fecha: a.fecha, tipos: a.tipos, recurrencia: a.recurrencia, estado: a.estado, descripcion: a.descripcion || "", encuesta_id: a._encuestaId || null, subactividades: a.subactividades || [] });
const dbToEnc = r => ({ id: r.id, nombre: r.nombre, fecha: r.fecha || "", descripcion: r.descripcion || "", estado: r.estado, actividadId: r.actividad_id || null, opciones: r.opciones || [], respuestas: r.respuestas || {}, _encuestaId: r.encuesta_id });
const encToDB = e => ({ id: e.id, nombre: e.nombre, fecha: e.fecha || "", descripcion: e.descripcion || "", estado: e.estado, actividad_id: e.actividadId || null, opciones: e.opciones, respuestas: e.respuestas });

export default function App() {
  const [user, setUser] = useState(() => S.get("ge_session") || null);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(SEED_VISIBILITY);

  const [alumnos, setAlumnos] = useState(SEED_ALUMNOS);
  const [actividades, setActividades] = useState(SEED_ACTIVIDADES);
  const [tipos, setTipos] = useState(SEED_TIPOS);
  const [encuestas, setEncuestas] = useState(SEED_ENCUESTAS);
  const [participacion, setParticipacion] = useState(SEED_PARTICIPACION);

  const initialized = useRef(false);

  // ── Load all data from Supabase on mount ──────────────────────────────────
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      setLoading(true);
      try {
        const [dbAlumnos, dbTipos, dbActividades, dbEnc, dbPart, dbVis, dbClaves] = await Promise.all([
          DB.getAll('alumnos'), DB.getAll('tipos'), DB.getAll('actividades'),
          DB.getAll('encuestas'), DB.getAll('participacion'),
          DB.getConfig('visibility'), DB.getConfig('claves'),
        ]);

        if (dbAlumnos?.length) setAlumnos(dbAlumnos.map(dbToAlumno));
        else await DB.upsert('alumnos', SEED_ALUMNOS.map(alumnoToDB));

        if (dbTipos?.length) setTipos(dbTipos);
        else await DB.upsert('tipos', SEED_TIPOS);

        if (dbActividades?.length) setActividades(dbActividades.map(dbToAct));
        else await DB.upsert('actividades', SEED_ACTIVIDADES.map(actToDB));

        if (dbEnc?.length) setEncuestas(dbEnc.map(dbToEnc));
        else await DB.upsert('encuestas', SEED_ENCUESTAS.map(encToDB));

        if (dbPart?.length) {
          const partObj = {};
          dbPart.forEach(r => {
            if (!partObj[r.act_id]) partObj[r.act_id] = {};
            if (r.subs && Array.isArray(r.subs) && r.subs.length > 0) {
              partObj[r.act_id][r.alum_id] = { subs: r.subs };
            } else {
              partObj[r.act_id][r.alum_id] = r.participo;
            }
          });
          setParticipacion(partObj);
        } else {
          const rows = [];
          Object.entries(SEED_PARTICIPACION).forEach(([actId, alums]) =>
            Object.entries(alums).forEach(([alumId, v]) => rows.push({ act_id: actId, alum_id: alumId, participo: v }))
          );
          await DB.upsertPK('participacion', rows, 'act_id,alum_id');
        }

        if (dbVis) setVisibility(dbVis);
        if (dbClaves) S.set("ge_claves", dbClaves);
      } catch (e) { console.error("Load error", e); }
      setLoading(false);
    })();
  }, []);

  // ── Auto-save to Supabase ─────────────────────────────────────────────────
  const saveTimeout = useRef({});
  const debounceSave = (key, fn, delay = 1200) => {
    clearTimeout(saveTimeout.current[key]);
    saveTimeout.current[key] = setTimeout(fn, delay);
  };

  useEffect(() => { if (!loading) debounceSave('alumnos', () => DB.upsert('alumnos', alumnos.map(alumnoToDB))); }, [alumnos, loading]);
  useEffect(() => { if (!loading) debounceSave('tipos', () => DB.upsert('tipos', tipos)); }, [tipos, loading]);
  useEffect(() => { if (!loading) debounceSave('actividades', () => DB.upsert('actividades', actividades.map(actToDB))); }, [actividades, loading]);
  useEffect(() => { if (!loading) debounceSave('encuestas', () => DB.upsert('encuestas', encuestas.map(encToDB))); }, [encuestas, loading]);
  useEffect(() => { if (!loading) debounceSave('visibility', () => DB.setConfig('visibility', visibility)); }, [visibility, loading]);

  // Participacion saves individually per change (more granular)
  const prevPart = useRef(null);
  useEffect(() => {
    if (loading) return;
    const prev = prevPart.current;
    prevPart.current = participacion;
    if (!prev) return;
    const rows = [];
    Object.entries(participacion).forEach(([actId, alums]) =>
      Object.entries(alums).forEach(([alumId, v]) => {
        if (!prev[actId] || JSON.stringify(prev[actId][alumId]) !== JSON.stringify(v)) {
          if (v?.subs) {
            rows.push({ act_id: actId, alum_id: alumId, participo: v.subs.length > 0, subs: v.subs });
          } else {
            rows.push({ act_id: actId, alum_id: alumId, participo: !!v, subs: [] });
          }
        }
      })
    );
    if (rows.length) DB.upsertPK('participacion', rows, 'act_id,alum_id');
  }, [participacion, loading]);

  const handleLogin = (u) => { S.set("ge_session", u); setUser(u); setPage("dashboard"); };
  const handleLogout = () => { S.set("ge_session", null); setUser(null); setPage("dashboard"); };

  if (!user) return <Login onLogin={handleLogin} />;
  if (loading) return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: `4px solid ${PALETTE.border}`, borderTop: `4px solid ${PALETTE.accent}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: PALETTE.muted, fontSize: 14 }}>Cargando datos...</span>
    </div>
  );

  if (!user) return <Login onLogin={handleLogin} />;

  const isAdmin = user.rol === "admin";

  // Nav visible según rol
  const nav = NAV_ITEMS.filter(item => {
    if (isAdmin) return true; // admins ven todo
    if (item.id === "usuarios" || item.id === "tipos") return false; // siempre oculto para viewers
    return visibility[item.id] !== false;
  });

  // Si la página actual ya no es visible, ir al dashboard
  const validPage = nav.find(n => n.id === page) ? page : "dashboard";

  const goTo = (id) => { setPage(id); setSidebarOpen(false); };
  const props = { alumnos, actividades, tipos, encuestas, participacion, setAlumnos, setActividades, setTipos, setEncuestas, setParticipacion, isAdmin };

  const renderPage = () => {
    switch (validPage) {
      case "dashboard":     return <Dashboard {...props} onNavigate={goTo} />;
      case "alumnos":       return <Alumnos {...props} />;
      case "actividades":   return <Actividades {...props} />;
      case "participacion": return <Participacion {...props} encuestas={encuestas} />;
      case "encuestas":     return <Encuestas {...props} actividades={actividades} setActividades={setActividades} />;
      case "estadisticas":  return <Estadisticas {...props} />;
      case "tipos":         return <TiposActividad {...props} />;
      case "ficha":         return <Fichas alumnos={alumnos} setAlumnos={setAlumnos} isAdmin={isAdmin} />;
      case "usuarios":      return <Usuarios visibility={visibility} setVisibility={setVisibility} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: PALETTE.text }}>
      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, background: PALETTE.card, borderBottom: `1px solid ${PALETTE.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSidebarOpen(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.text, padding: 4 }}>
            <Icon name="menu" size={22} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: PALETTE.accent, borderRadius: 10, padding: 6 }}><Icon name="dashboard" size={16} color="white" /></div>
            <span style={{ fontWeight: 800, fontSize: 17 }}>GestiónEscolar</span>
          </div>
        </div>
        {/* User info + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: PALETTE.text, fontSize: 12, fontWeight: 700 }}>{user.nombre}</div>
            <div style={{ color: isAdmin ? PALETTE.accent : PALETTE.green, fontSize: 10 }}>{isAdmin ? "Administrador" : "Solo vista"}</div>
          </div>
          <button onClick={handleLogout} title="Cerrar sesión" style={{ background: PALETTE.red + "22", border: `1px solid ${PALETTE.red}44`, borderRadius: 8, cursor: "pointer", color: PALETTE.red, padding: "6px 10px", fontSize: 12, fontWeight: 600 }}>
            Salir
          </button>
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
                <button key={item.id} onClick={() => goTo(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 20px", background: validPage === item.id ? PALETTE.accent : "transparent", border: "none", cursor: "pointer", color: validPage === item.id ? "white" : PALETTE.muted, fontSize: 14, fontWeight: validPage === item.id ? 700 : 500, textAlign: "left" }}>
                  <Icon name={item.icon} size={18} color={validPage === item.id ? "white" : PALETTE.muted} />
                  {item.label}
                </button>
              ))}
            </nav>
            {/* Logout en sidebar */}
            <div style={{ padding: "12px 20px", borderTop: `1px solid ${PALETTE.border}` }}>
              <div style={{ color: PALETTE.muted, fontSize: 12, marginBottom: 4 }}>Sesión: <strong style={{ color: PALETTE.text }}>{user.nombre}</strong></div>
              <button onClick={handleLogout} style={{ background: PALETTE.red + "22", border: `1px solid ${PALETTE.red}44`, borderRadius: 8, cursor: "pointer", color: PALETTE.red, padding: "6px 14px", fontSize: 12, fontWeight: 600, width: "100%" }}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: validPage === "ficha" ? 1400 : 900, margin: "0 auto", padding: "24px 16px" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
