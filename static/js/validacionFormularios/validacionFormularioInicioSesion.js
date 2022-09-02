/**
 * metodos para la validacion del formulario Iniciosesion
 */

const formSesion = document.querySelector(".formulario__form");
const campoNombreProducto = formSesion.usuario;
const campoContra = formSesion.contrasenia;
const errorContra = document.querySelector("#error-contra");
const errorUsuario = document.querySelector("#error-usuario");


campoNombreProducto.addEventListener("input", function () {
    // validacion campo nombre

    console.log(campoNombreProducto.value);

    if (campoNombreProducto.validity.valid) {

        console.log("entre aqui");
        errorUsuario.textContent = "";
        campoNombreProducto.style.background = "#FFFFFF";
        campoNombreProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorSesion();
    }
});



campoContra.addEventListener("input", function () {
    if (campoContra.validity.valid) {

        errorContra.textContent = "";
        campoContra.style.background = "#FFFFFF";
        campoContra.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorSesion();
    }
});



function mostrarErrorSesion() {

    // comprobaciones campo usuario
    if (campoNombreProducto.validity.valueMissing) {
        errorUsuario.textContent = "Debe introducir su usuario";
        campoNombreProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoNombreProducto.style.backgroundColor = "#ffeaea";

    }else if(campoNombreProducto.validity.typeMismatch){
        errorUsuario.textContent = "ingrese un usario correcto: ejemplo@gmail.con";
        campoNombreProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoNombreProducto.style.backgroundColor = "#ffeaea";
    }

    // comprobaciones campo contraseña
    if (campoContra.validity.valueMissing) {
        errorContra.textContent = "Debe introducir su contraseña";
        campoContra.parentElement.style.backgroundColor = "#ffeaea";
        campoContra.style.backgroundColor = "#ffeaea";
    }
}

formSesion.addEventListener("submit", function (event) {
    if (!campoNombreProducto.validity.valid || !campoContra.validity.valid) {
        mostrarErrorSesion();
        event.preventDefault();
    }
});