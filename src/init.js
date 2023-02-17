//var bCrypt = require('bcrypt-nodejs');
var docente = require("./models/Docente");
var estudiante = require("./models/Estudiante");
var representante = require("./models/Representante");
var asignatura = require("./models/Asignatura");
var registro = require("./models/Registro");
var grado = require("./models/Grado");
var init = function () {
  //Creaciòn de docentes
  docente.create({
    _id: 1,
    Nombre: "Marlon",
    Apellido: "Maldonado",
    Usuario: "Marmal",
    Contraseña: "MM123",
    photo: "images/avatar-01.jpg",
    rol: 1,
  });

  docente.create({
    _id: 2,
    Nombre: "Lucia",
    Apellido: "Figueroa",
    Usuario: "LuciaF",
    Contraseña: "LuciaF",
    photo: "images/avatar-02.jpg",
    rol: 1,
  });

  docente.create({
    _id: 3,
    Nombre: "Johnny",
    Apellido: "Sanchez",
    Usuario: "JohnnyS",
    Contraseña: "JohnnyS",
    photo: "images/author.jpg",
    rol: 1,
  });

  docente.create({
    _id: 4,
    Nombre: "Fanny",
    Apellido: "Zuñiga",
    Usuario: "FannyZ",
    Contraseña: "FannyZ",
    photo: "images/avatar-03.jpg",
    rol: 1,
  });
//Asignaturas definidos
  asignatura.create({
    _id: 1,
    Nombre: "Matemática",
    Periodo: "2021 - 2022",
    Optativa: 0,
    Id_docente: 1,
    HorasPlanificadas: 140,
    HorasDictadas: 0,
  });

  asignatura.create({
    _id: 2,
    Nombre: "Informatica",
    Periodo: "2021 - 2022",
    Optativa: 1,
    Id_docente: 2,
    HorasPlanificadas: 200,
    HorasDictadas: 0,
  });

  asignatura.create({
    _id: 3,
    Nombre: "Lengua",
    Periodo: "2021 - 2022",
    Optativa: 1,
    Id_docente: 3,
    HorasPlanificadas: 220,
    HorasDictadas: 0,
  });

  asignatura.create({
    _id: 4,
    Nombre: "Sociales",
    Periodo: "2021 - 2022",
    Optativa: 1,
    Id_docente: 4,
    HorasPlanificadas: 120,
    HorasDictadas: 0,
  });
//Seccion de Grados o Cursos
  grado.create({
    _id: 3,
    Nombre: "Cuarto - A",
    Num_estudiantes: 15,
    Periodo: "2021 - 2022",
    photo: "images/blog_4.jpg",
    Id_Asignatura: [1, 3],
  });

  grado.create({
    _id: 5,
    Nombre: "Quinto - B",
    Num_estudiantes: 19,
    Periodo: "2021 - 2022",
    photo: "images/blog_6.jpg",
    Id_Asignatura: [2, 4],
  });
// Estudiantes de Pertenecientes al Cuarto Grado "id=3"
  estudiante.create({
    _id: 1,
    Nombre: "Andrea Nayeli",
    Apellido: "Abad Ruilova",
    Usuario: "Ana",
    Contraseña: "an123",
    Id_Grado: 3,
    rol: 2,
    registro: [1, 2],
  });

  
  estudiante.create({
    _id: 2,
    Nombre: "Jenny Rocio",
    Apellido: "Armijos Pereira",
    Usuario: "JennyR",
    Contraseña: "JnR",
    Id_Grado: 3,
    rol: 2,
    registro: [3, 4],
  });

  estudiante.create({
    _id: 6,
    Nombre: "Mirian Andrea",
    Apellido: "Astimbay Fajardo",
    Usuario: "Miran",
    Contraseña: "Miran",
    Id_Grado: 3,
    rol: 2,
    registro: [5, 6],
  });
// Estudiantes de Pertenecientes al Quinto Grado "id=5"
  estudiante.create({
    _id: 3,
    Nombre: "Jakeline Alexandra",
    Apellido: "Guachisaca Zhunio",
    Usuario: "JakiAl",
    Contraseña: "jaki123",
    Id_Grado: 5,
    rol: 2,
    registro: [7, 8],
  });

  estudiante.create({
    _id: 4,
    Nombre: "Cristian Israel",
    Apellido: "Guachizaca Sarango",
    Usuario: "CrisG",
    Contraseña: "cris12",
    Id_Grado: 5,
    rol: 2,
    registro: [9, 10],
  });

  estudiante.create({
    _id: 5,
    Nombre: "Daniela Lisbeth",
    Apellido: "Jara Armijos",
    Usuario: "DaniLis",
    Contraseña: "Dan123",
    Id_Grado: 5,
    rol: 2,
    registro: [11, 12],
  });
//Sección de representantes 
  representante.create({
    _id: 1,
    Nombre: "Rosalio",
    Apellido: "Jara Armijos",
    Usuario: "Roja",
    Contraseña: "Roja123",
    Id_Estudiante: 5,
    rol: 3,
  });

  representante.create({
    _id: 2,
    Nombre: "Gerardo",
    Apellido: "Abad Ruilova",
    Usuario: "GerAbad",
    Contraseña: "Ger123",
    Id_Estudiante: 1,
    rol: 3,
  });

  representante.create({
    _id: 3,
    Nombre: "Manuel",
    Apellido: "Armijos Pereira",
    Usuario: "Manu",
    Contraseña: "ocho_8",
    Id_Estudiante: 2,
    rol: 3,
  });

  representante.create({
    _id: 4,
    Nombre: "Anthony",
    Apellido: "Guachizaca Sarango",
    Usuario: "Anth",
    Contraseña: "anth12",
    Id_Estudiante: 4,
    rol: 3,
  });
  representante.create({
    _id: 5,
    Nombre: "Rene",
    Apellido: "Guachisaca Zhunio",
    Usuario: "ReneG",
    Contraseña: "reneg",
    Id_Estudiante: 3,
    rol: 3,
  });
  //Registros
  registro.create({
    _id: 1,
    Asistidas: 0,
    Id_Asignatura: 1,
    Id_Estudiante: 1,
  });
  registro.create({
    _id: 2,
    Asistidas: 0,
    Id_Asignatura: 3,
    Id_Estudiante: 1,
  });
  registro.create({
    _id: 3,
    Asistidas: 0,
    Id_Asignatura: 1,
    Id_Estudiante: 2,
  });
  registro.create({
    _id: 4,
    Asistidas: 0,
    Id_Asignatura: 3,
    Id_Estudiante: 2,
  });
  registro.create({
    _id: 5,
    Asistidas: 0,
    Id_Asignatura: 1,
    Id_Estudiante: 6,
  });
  registro.create({
    _id: 6,
    Asistidas: 0,
    Id_Asignatura: 3,
    Id_Estudiante: 6,
  });
  registro.create({
    _id: 7,
    Asistidas: 0,
    Id_Asignatura: 2,
    Id_Estudiante: 3,
  });
  registro.create({
    _id: 8,
    Asistidas: 0,
    Id_Asignatura: 4,
    Id_Estudiante: 3,
  });
  registro.create({
    _id: 9,
    Asistidas: 0,
    Id_Asignatura: 2,
    Id_Estudiante: 4,
  });
  registro.create({
    _id: 10,
    Asistidas: 0,
    Id_Asignatura: 4,
    Id_Estudiante: 4,
  });
  registro.create({
    _id: 11,
    Asistidas: 0,
    Id_Asignatura: 2,
    Id_Estudiante: 5,
  });
  registro.create({
    _id: 12,
    Asistidas: 0,
    Id_Asignatura: 4,
    Id_Estudiante: 5,
  });
};
module.exports = init();
