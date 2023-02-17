function buscar(grado, materia, fecha) {
  var parametros = { grado: grado, materia: materia, fecha: fecha };
  $.ajax({
    data: parametros,
    url: "http://localhost:4000/asistencias",
    type: "post",
    success: function (registros) {
      $("#detailAsistencia").removeAttr("hidden");
      $("#listAsis").attr("hidden", true);
      let date = moment(registros[0].CreatedAt).format("YYYY-MM-DD");
      console.log(date);
      $("#fecha").val(date);
      let tbody = $("#bodyAsis");
      if (Object.keys(registros).length === 0) {
        tbody.html("");
      } else {
        $("#formUpdate").val(registros[0]._id);
        $("#horas").val(registros[0].Num_horas);
        tbody.html("");
        registros.forEach((registro) => {
          if (registro.Estado) {
            tbody.append(`
                          <tr>
                            <td class="id">${registro.Id_Estudiante.Nombre}  ${registro.Id_Estudiante.Apellido}</td>
                            <td>
                            <label class="col-sm-4">
                                 SI <input type="radio" name="${registro.Id_Estudiante._id}" value="1" checked>
                            </label>
                            <label class="col-sm-4">
                                NO <input type="radio" name="${registro.Id_Estudiante._id}" value="0">
                            </label>
                            </td>
                          </tr>
                      `);
          } else {
            tbody.append(`
                        <tr >
                          <td class="id">${registro.Id_Estudiante.Nombre}  ${registro.Id_Estudiante.Apellido}</td>
                          <td>
                          <label class="col-sm-4">
                               SI <input type="radio" name="${registro.Id_Estudiante._id}" value="1">
                          </label>
                          <label class="col-sm-4">
                              NO <input type="radio" name="${registro.Id_Estudiante._id}" value="0" checked>
                          </label>
                          </td>
                        </tr>
                    `);
          }
        });
      }
    },
  });
}

function update() {
  var url = "http://localhost:4000/asistencia/update/";
  var data = {};
  $("input").each(function () {
    data[this.name] = this.value;
  });
  $("input[type=radio]").each(function () {
    if ($(this).is(":checked")) {
      data[this.name] = this.value;
    }
  });
  $.ajax({
    type: "post",
    url: url,
    data: data,
    success: function (constantes) {
      let tbody = $("tbody");
      tbody.html("");
      console.log(constantes);
      let _date = moment(constantes.fecha).format("DD/MM/YYYY");
      buscar(constantes.grado, constantes.asignatura, _date);
    },
  });
}

function details(idUrl) {
  var url = "http://localhost:4000/detalleAsistencias/" + idUrl;
  $.ajax({
    type: "get",
    url: url,
    success: function (registros) {
      let tbody = $("#bodyDetails");
      let _estado;
      tbody.html("");
      $("#detailsSection").removeAttr("hidden");
      registros.forEach((registro) => {
        let date = moment(registro.CreatedAt).format("DD-MM-YYYY");
        if (registro.Estado) {
          _estado = "<a style='font-weight:bold;color:#11DC61'>Asiste</a>";
        } else {
          _estado = "<a style='font-weight:bold;color:#D54716'>No Asiste</a>";
        }
        tbody.append(`
                      <tr >
                        <td>${date}</td>
                        <td>${registro.Num_horas}</td>
                        <td>${_estado}</td>
                      </tr>
                  `);
      });
    },
  });
}

function back() {
    $("#listAsis").removeAttr("hidden");
    $("#detailAsistencia").attr("hidden", true);
    $("#fecha").val('')
}
