const asigController = {};
const asistencia = require("../models/Asistencia");
const registro = require("../models/Registro");
const representante = require("../models/Representante");

asigController.renderAsignatura = async (req, res) => {
  let id_registros;
  if (!req.isAuthenticated() || req.user.rol === 1) {
    res.redirect("/");
  } else {
    if(req.user.rol === 2){
      id_registros =  req.user._id 
    }else if(req.user.rol === 3 ){
      let _representante =  await representante.findOne({_id:req.user._id }).lean()
      console.log(_representante)
      id_registros =  _representante.Id_Estudiante
      console.log(id_registros)
    } 
    const registros = await registro
      .find({ Id_Estudiante: id_registros })
      .populate({ path: "Id_Estudiante", populate: { path: "Id_Grado" } })
      .populate({ path: "Id_Asignatura", populate: { path: "Id_docente" } })
      .lean();
    res.render("partials/asignaturasList", {
      estudiante: true,
      idEstudiante: id_registros,
      usuario: registros,
    });
  }
};

asigController.renderDetalle = async (req, res) => {
  if(req.user.rol === 2){
      id_registros =  req.user._id 
    }else if(req.user.rol === 3 ){
      let _representante =  await representante.findOne({_id:req.user._id }).lean()
      console.log(_representante)
      id_registros =  _representante.Id_Estudiante
      console.log(id_registros)
    } 
  const _detalle = await asistencia
    .find({ Id_Asignatura: req.params.id, Id_Estudiante:id_registros })
    .populate("Id_Asignatura")
    .lean();
  console.log(_detalle);
  res.json(_detalle);
};

module.exports = asigController;
