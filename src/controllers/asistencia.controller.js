const mongoose = require("mongoose");
const estudiante = require("../models/Estudiante");
const asignatura = require("../models/Asignatura");
const asistencia = require("../models/Asistencia");
const registro = require("../models/Registro");
const asistenciaController = {};
const _ = require("lodash");
var moment = require("moment");

//Registro Asistencia
//Formulario
asistenciaController.formAsistencia = async (req, res) => {
  if (!req.isAuthenticated() || req.user.rol != 1) {
    res.redirect("/");
  } else {
    const grado = req.params.id;
    const materia = await asignatura.find({ Id_docente: req.user._id }).lean();
    const student = await estudiante.find({ Id_Grado: grado }).lean();
    const fecha = moment().format("YYYY-MM-DD");
    res.render("docente/asistenciaForm", {
      docente: true,
      student,
      fecha,
      grado,
      materia: materia[0]._id,
    });
  }
};
//Registro
asistenciaController.registrarAsistencia = async (req, res) => {
  const objeto = req.body;
  const constantes = {
    horas: parseInt(objeto.horas),
    fecha: moment(objeto.fecha,'YYYY-MM-DD').format(),
    grado: objeto.grado,
    asignatura: parseInt(objeto.asignatura),
  };
  delete objeto.horas;
  delete objeto.fecha;
  delete objeto.grado;
  delete objeto.asignatura;
  delete objeto.id;
  for (const [key, value] of Object.entries(objeto)) {
    asistencia.create({
      CreatedAt: constantes.fecha,
      Estado: value,
      Num_horas: constantes.horas,
      Id_Asignatura: constantes.asignatura,
      Id_Grado: constantes.grado,
      Id_Estudiante: key,
    });
    if (value == 1) {
      const _registro = await registro
        .findOne({
          Id_Asignatura: constantes.asignatura,
          Id_Estudiante: key,
        })
        .lean();
      const _updateAsist = parseInt(_registro.Asistidas) + constantes.horas;
      await registro.updateOne(
        { Id_Asignatura: constantes.asignatura, Id_Estudiante: key },
        { Asistidas: _updateAsist }
      );
    }
  }
  const _updtAsig = await asignatura
    .findOne({ _id: constantes.asignatura })
    .lean();
  await asignatura.updateOne(
    { _id: constantes.asignatura },
    { HorasDictadas: parseInt(_updtAsig.HorasDictadas) + constantes.horas }
  );
  res.redirect("/asistencias/" + constantes.grado);
};

//Editar Asistencia
//Formulario
asistenciaController.formEditAsistencia = async (req, res) => {
  if (!req.isAuthenticated() || req.user.rol != 1) {
    res.redirect("/");
  } else {
    const grado = req.params.id;
    const materia = await asignatura
      .findOne({ Id_docente: req.user._id })
      .lean();
    const _asistencia = await asistencia
      .find({ Id_Asignatura: materia._id, Id_Grado: grado })
      .select("CreatedAt")
      .lean();
    const _asistenciaClean = _asistencia.filter(function(item, index) {
        return index === _asistencia.findIndex(function(obj) {
            return JSON.stringify(item.CreatedAt) === JSON.stringify(obj.CreatedAt);
        })
    })
    for (const [key, value] of Object.entries(_asistenciaClean)) {
      _asistenciaClean[key].CreatedAt = moment(value.CreatedAt).format('DD/MM/YYYY')
    }
    res.render("docente/asistenciaList", {
      docente: true,
      grado,
      materia: materia._id,
      _asistenciaClean
    });
  }
};

//Listar asistencias
asistenciaController.renderAsistencia = async (req, res) => {
  let grado = req.body.grado;
  let materia = req.body.materia;
  let fecha = req.body.fecha;
  console.log(fecha)
  fecha = moment(fecha,'DD/MM/YYYY').format()
  console.log(fecha)
  const registros = await asistencia
    .find({ Id_Asignatura: materia, Id_Grado: grado, CreatedAt: fecha })
    .populate("Id_Estudiante")
    .lean();
  res.json(registros);
};

//Envio de datos update
asistenciaController.updateAsistencia = async (req, res) => {
  const objeto = req.body;
  const constantes = {
    horas: parseInt(objeto.horas),
    fecha: moment(objeto.fecha).format(),
    grado: objeto.grado,
    asignatura: objeto.materia,
    registro: objeto.idRegistro,
  };
  delete objeto.horas;
  delete objeto.fecha;
  delete objeto.grado;
  delete objeto.materia;
  delete objeto.idRegistro;
  delete objeto.enviar;
  for (const [key, value] of Object.entries(objeto)) {
    const filter = {
      CreatedAt: constantes.fecha,
      Id_Asignatura: constantes.asignatura,
      Id_Grado: constantes.grado,
      Id_Estudiante: key,
    };
    const _asis = await asistencia.findOne(filter);
    if (_asis.Estado === false && value == 1) {
      await asistencia.findOneAndUpdate(filter, { Estado: true });
    } else if (_asis.Estado === true && value == 0) {
      await asistencia.findOneAndUpdate(filter, { Estado: false });
    }
    const _registro = await registro.findOne({
      Id_Asignatura: constantes.asignatura,
      Id_Estudiante: key,
    });
    let _updateAsist;
    if (value == 1) {
      _updateAsist = parseInt(_registro.Asistidas) + parseInt(constantes.horas);
    } else if (value == 0) {
      _updateAsist = parseInt(_registro.Asistidas) - parseInt(constantes.horas);
    }
    await registro.findOneAndUpdate(
      { Id_Asignatura: constantes.asignatura, Id_Estudiante: key },
      { Asistidas: _updateAsist }
    );
  }
  res.json(constantes);
};

module.exports = asistenciaController;
