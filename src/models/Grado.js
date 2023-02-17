const { Schema, model } = require("mongoose");
const asignatura = require('../models/Asignatura')

const gradoSchema = new Schema({
  _id: {  type: Number, required: true },
  Nombre: { type: String, required: true },
  Num_estudiantes: { type: Number, required: true },
  Periodo: { type: String, required: true },
  photo: { type: String, required: true },
  Id_Asignatura:[{
    type: Number,
    ref: asignatura,
    required: true
  }]
});

module.exports = model("Grado", gradoSchema);
