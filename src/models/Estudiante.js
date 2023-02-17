const {Schema, model, default: mongoose} =require('mongoose');
const grado = require('../models/Grado')
const asignatura = require('../models/Asignatura')

 const estudianteSchema = new Schema({
    _id:	{ type: Number, required: true},
	Nombre:	{type: String, required: true},
	Apellido:{type: String, required: true},
	Usuario:{type: String, required: true},
	Contraseña:{type: String, required: true},
	Id_Grado:{ type: Number,ref: grado ,required: true},
 	rol: {  type: Number, required: true },
	registro:[{type: Number, ref: 'Registro'}]
 });

 

 var estudiante = mongoose.model('Estudiante', estudianteSchema);

 module.exports = model("Estudiante", estudianteSchema);




 