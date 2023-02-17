// --------- GUARDAMOS NUESTRO FORMULARIO E INPUTS EN CONSTANTES ---------------
const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("formulario input");


// -------------- OBJETO CON NUESTROS CAMPOS ----------------------
const campos = {
    usuario: false,
    password: false
}


// --------- SWITCH PARA SELECCIONAR EL INPUT DONDE ÉSTE HACIENDO FOCO EL USUARIO  ---------------
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario")
            break;

        default:
            break;
    }
}

// -------------- VALIDAMOS NUESTROS INPUTS ------------------------
const validarCampo = (expresiones, input,) => {
    if (expresiones.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.getElementById(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.getElementById(`#grupo__${campo} .formulario__input-error`).classList.remove
            ("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[password] = true;
        console.log("Funciona");
    }
    $inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    });



    // --------- VALIDAMOS TODO NUESTRO FORMULARIO ---------------
    $formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const $terminos = document.getElementById("terminos");
        if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && $terminos.checked) {
            // formulario.reset();

            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
            setTimeout(() => {
                document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
                document.getElementById("formulario__grupo-terminos").style.display = "none";

            }, 3000);

            document.querySelectorAll(".formulario__grupo--correcto").forEach((icono) => {
                icono.classList.remove("formulario__grupo--correcto");
            });

            setTimeout(() => {
                location.reload();
            }, 5000);

        } else {
            document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
        }
    });

}

