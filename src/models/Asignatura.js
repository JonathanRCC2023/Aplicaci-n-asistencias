const { Schema, model } = require("mongoose");
const docente = require("../models/Docente");

const asignaturaSchema = new Schema({
  _id: { type: Number, required: true },
  Nombre: { type: String, required: true },
  Periodo: { type: String, required: true },
  Optativa: { type: Boolean, required: true },
  Id_docente: {type: Number,ref:docente,required: true},
  HorasPlanificadas: { type: Number, required: true },
  HorasDictadas: { type: Number, required: true }
});

module.exports = model("Asignatura", asignaturaSchema);
