const {Schema, model, default: mongoose} =require('mongoose');
const grado = require('../models/Grado')
const asignatura = require('../models/Asignatura')

const registroSchema = new Schema({
    _id:{type: Number, required: true},
	Asistidas: {type: Number, required: true},
	Id_Asignatura: {
	  type: Number,
	  ref: asignatura,
	  required: true,
	},
	Id_Estudiante: {
	  type: Number,
	  ref: 'Estudiante',
	  required: true,
	}
  });

  var registro = mongoose.model("Registro", registroSchema);


  module.exports = model("Registro", registroSchema);
