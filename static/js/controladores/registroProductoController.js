/**
 *
 * Arcivo de java script el cual corresponde al controlador de la funcionalidad de
 * registrar un producto en el sistema, contiene la validacion del formulario,
 * el acceso a los datos del formulario, la llamada al servicio encargado de
 * realizar la comunicacion con la api y las validaciones en caso de exito o
 * fracaso del procedimiento de inserccion
 *
 * */

import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";

const formProducto = document.querySelector(".formulario__form");

// variables donde se guardan los campos del formulario agrgar productos
const campoNombreProducto = formProducto.nombreProducto;
const campoDescripcionproducto = formProducto.descripcionProducto;
const campoCategoriaProducto = formProducto.categoriaProducto;
const campoPrecioProducto = formProducto.precioProducto;

// variables donde se guardan los campos para mostrar errores
const errorNombreProducto = document.querySelector("#error-nombreProducto");
const errorCategoriaProducto = document.querySelector("#error-categoria");
const errorPrecioProducto = document.querySelector("#error-precio");
const errorDescripcionProducto = document.querySelector("#error-descripcion");




// validacion del campo nombre mediante el evnto input del campo
campoNombreProducto.addEventListener("input", function () {
    // validacion campo nombre

    if (campoNombreProducto.validity.valid) {

        console.log("entre aqui");
        errorNombreProducto.textContent = "";
        campoNombreProducto.style.background = "#FFFFFF";
        campoNombreProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});

// validacion del campo categoria mediante el evnto input del campo
campoCategoriaProducto.addEventListener("input", function () {
    if (campoCategoriaProducto.validity.valid) {

        errorCategoriaProducto.textContent = "";
        campoCategoriaProducto.style.background = "#FFFFFF";
        campoCategoriaProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});

// validacion del campo precio mediante el evnto input del campo
campoPrecioProducto.addEventListener("input", function () {

    if (campoPrecioProducto.validity.valid) {
        errorPrecioProducto.textContent = "";
        campoPrecioProducto.style.background = "#FFFFFF";
        campoPrecioProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});

// validacion del campo descripcion mediante el evnto input del campo
campoDescripcionproducto.addEventListener("input", function () {

    if (campoDescripcionproducto.validity.valid) {
        errorDescripcionProducto.textContent = "";
        campoDescripcionproducto.style.background = "#FFFFFF";
        campoDescripcionproducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});

// funcion que muestra un error en los campos si no cumplen las condiciones correctas
function mostrarErrorProducto() {

    // comprobaciones campo nombre producto no este vacio
    if (campoNombreProducto.validity.valueMissing) {
        errorNombreProducto.textContent = "Debe introducir el nombre del producto";
        campoNombreProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoNombreProducto.style.backgroundColor = "#ffeaea";

    }

    // comprobaciones campo categoria no este vacio
    if (campoCategoriaProducto.validity.valueMissing) {
        errorCategoriaProducto.textContent = "Debe introducir la categoria del producto";
        campoCategoriaProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoCategoriaProducto.style.backgroundColor = "#ffeaea";
    }

    // comprobaciones campo precio no este vacio
    if (campoPrecioProducto.validity.valueMissing) {
        errorPrecioProducto.textContent = "Debe introducir el precio del producto";
        campoPrecioProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoPrecioProducto.style.backgroundColor = "#ffeaea";

    }

    // comprobaciones campo Descripcion no este vacio
    if (campoDescripcionproducto.validity.valueMissing) {
        errorDescripcionProducto.textContent = "Debe introducir el precio del producto";
        campoDescripcionproducto.parentElement.style.backgroundColor = "#ffeaea";
        campoDescripcionproducto.style.backgroundColor = "#ffeaea";

    }
}

// evento enviar formulario
formProducto.addEventListener("submit", function (event) {

    // si los campos no son validos se llama a la funcion mostrar error
    // y no se envia el formulrio
    if (!campoNombreProducto.validity.valid ||
        !campoCategoriaProducto.validity.valid ||
        !campoPrecioProducto.validity.valid ||
        !campoDescripcionproducto.validity.valid) {
        mostrarErrorProducto();
        event.preventDefault();

    } else { //si los campos estan correctos se envian los datos del formulario a la api
        event.preventDefault();

        // se obtienen los valores de los campos del formulario
        let nombre = campoNombreProducto.value;
        let descripcion = campoDescripcionproducto.value;
        let precio = campoPrecioProducto.value;
        let categoria = campoCategoriaProducto.value;

        // se llama a la funcion encargada de enviar los datos a la API y se le pasan
        // los datos por parametro
        serviciosProductos.crearProducto(nombre, categoria, descripcion, precio).then(() => {

            //si el procedimiento es exito se abre un modal de confirmacion de exito
            const modal = modales.crearModal("../static/assets/logos/succes.svg",
                "Producto Agregado con exito",
                "Cierre esta ventana para continuar en la aplicación",
                "productos.html");

            // se hace visible el modal
            modal.classList.add("modal--show");

        }).catch(() => {

            // si ocurre algun error se abre un modal de confirmacion de error
            const modal = modales.crearModal("../static/assets/logos/error.svg",
                "Opps! Ha ocurrido un error ",
                "No se pudo agregar el producto, por favor intentelo dentro de un momento, si el problema perdura contactenos.",
                "productos.html");

            // se hace visible el modal
            modal.classList.add("modal--show");

        });


    }

});