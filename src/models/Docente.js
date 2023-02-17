const { Schema, model } = require("mongoose");

const docenteSchema = new Schema({
  _id: {  type: Number, required: true },
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Usuario: { type: String, required: true },
  Contraseña: { type: String, required: true },
  photo: { type: String, required: true },
  rol: {  type: Number, required: true }
});

docenteSchema.methods.encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await rbcrypt.hash(password, salt);
};

docenteSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = model("Docente", docenteSchema);
