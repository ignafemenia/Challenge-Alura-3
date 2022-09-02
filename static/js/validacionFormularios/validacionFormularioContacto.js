/**
 * metodos para la validacion del formulario contacto
 */

const formContacto = document.querySelector(".footer__form");
const errorNombre = document.querySelector("#error-nombre");
const errorMensaje = document.querySelector("#error-mensaje");
const campoNombre = formContacto.nombre;
const campoMensaje = formContacto.mensaje;

campoNombre.addEventListener("input", function (){
    // validacion campo nombre

    if(campoNombre.validity.valid){

        errorNombre.textContent = "";
        campoNombre.style.background = "#FFFFFF";
        campoNombre.parentElement.style.backgroundColor= "#FFFFFF";
    }else{
        mostrarError();
    }
});

campoMensaje.addEventListener("input", function (){
    if(campoNombre.validity.valid){

        errorMensaje.textContent = "";
        campoMensaje.style.background = "#FFFFFF";
        campoMensaje.parentElement.style.backgroundColor= "#FFFFFF";

    }else{
        mostrarError();
    }
});

function mostrarError(){

    // comprobaciones campo nombre
    if (campoNombre.validity.valueMissing) {
        errorNombre.textContent = "Debe introducir su nombre";
        campoNombre.parentElement.style.backgroundColor= "#ffeaea";
        campoNombre.style.backgroundColor = "#ffeaea";

    }
    if(campoMensaje.validity.valueMissing){
        errorMensaje.textContent = "Debe introducir un mensaje";
        campoMensaje.parentElement.style.backgroundColor= "#ffeaea";
        campoMensaje.style.backgroundColor = "#ffeaea";

    }
}

formContacto.addEventListener("submit", function (event){
    if (!campoNombre.validity.valid || !campoMensaje.validity.valid) {
        mostrarError();
        event.preventDefault();
    }
});
