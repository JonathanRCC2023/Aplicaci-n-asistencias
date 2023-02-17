const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const estudiante = require("../models/Estudiante");

const representanteSchema = new Schema({
  _id: { type: Number, required: true},
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Usuario: { type: String, required: true },
  Contraseña: { type: String, required: true },
  Id_Estudiante: {
    type: Number,
    ref: estudiante,
    required: true,
  },
  rol:{ type: Number, required: true }
});

representanteSchema.methods.encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await rbcrypt.hash(password, salt);
};

representanteSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("Representante", representanteSchema);
