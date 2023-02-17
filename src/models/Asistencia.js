const { Schema, model } = require("mongoose");
const asignatura = require("../models/Asignatura");
const grado = require("../models/Grado");
const estudiante = require("../models/Estudiante");

const asistenciaSchema = new Schema({
  CreatedAt: { type: Date, required: true },
  Estado: { type: Boolean, required: true },
  Num_horas: { type: Number, required: true },
  Id_Asignatura: {
    type: Number,
    ref: asignatura,
    required: true,
  },
  Id_Grado: {
    type: Number, 
    ref: grado, 
    required: true},
  Id_Estudiante: {
    type: Number,
    ref: estudiante,
    required: true,
  }
});

module.exports = model("Asistencia", asistenciaSchema);
