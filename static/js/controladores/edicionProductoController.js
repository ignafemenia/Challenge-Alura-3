/**
 *
 * Arcivo de java script el cual corresponde al controlador de la funcionalidad de
 * editar un producto en el sistema, contiene la validacion del formulario,
 * el acceso a los datos del formulario, la llamada al servicio encargado de
 * realizar la comunicacion con la api y las validaciones en caso de exito o
 * fracaso del procedimiento de edicion
 *
 * */

import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";


const formProducto = document.querySelector(".formulario__form");
const campoNombreProducto = formProducto.nombreProducto;
const campoDescripcionproducto = formProducto.descripcionProducto;
const campoCategoriaProducto = formProducto.categoriaProducto;
const campoPrecioProducto = formProducto.precioProducto;

const errorNombreProducto = document.querySelector("#error-nombreProducto");
const errorCategoriaProducto = document.querySelector("#error-categoria");
const errorPrecioProducto = document.querySelector("#error-precio");
const errorDescripcionProducto = document.querySelector("#error-descripcion");


// nota: se repite el codigo de validacion de formulario del archivo registroProductoController.js
// para documentacion de estos metodos vaya a dicho archivo

campoNombreProducto.addEventListener("input", function () {


    if (campoNombreProducto.validity.valid) {

        console.log("entre aqui");
        errorNombreProducto.textContent = "";
        campoNombreProducto.style.background = "#FFFFFF";
        campoNombreProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});


campoCategoriaProducto.addEventListener("input", function () {
    if (campoCategoriaProducto.validity.valid) {

        errorCategoriaProducto.textContent = "";
        campoCategoriaProducto.style.background = "#FFFFFF";
        campoCategoriaProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});

campoPrecioProducto.addEventListener("input", function () {

    if (campoPrecioProducto.validity.valid) {
        errorPrecioProducto.textContent = "";
        campoPrecioProducto.style.background = "#FFFFFF";
        campoPrecioProducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});


campoDescripcionproducto.addEventListener("input", function () {

    if (campoDescripcionproducto.validity.valid) {
        errorDescripcionProducto.textContent = "";
        campoDescripcionproducto.style.background = "#FFFFFF";
        campoDescripcionproducto.parentElement.style.backgroundColor = "#FFFFFF";

    } else {
        mostrarErrorProducto();
    }
});


function mostrarErrorProducto() {

    // comprobaciones campo nombre producto
    if (campoNombreProducto.validity.valueMissing) {
        errorNombreProducto.textContent = "Debe introducir el nombre del producto";
        campoNombreProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoNombreProducto.style.backgroundColor = "#ffeaea";

    }

    // comprobaciones campo categoria
    if (campoCategoriaProducto.validity.valueMissing) {
        errorCategoriaProducto.textContent = "Debe introducir la categoria del producto";
        campoCategoriaProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoCategoriaProducto.style.backgroundColor = "#ffeaea";
    }

    // comprobaciones campo precio
    if (campoPrecioProducto.validity.valueMissing) {
        errorPrecioProducto.textContent = "Debe introducir el precio del producto";
        campoPrecioProducto.parentElement.style.backgroundColor = "#ffeaea";
        campoPrecioProducto.style.backgroundColor = "#ffeaea";

    }

    // comprobaciones campo Descripcion
    if (campoDescripcionproducto.validity.valueMissing) {
        errorDescripcionProducto.textContent = "Debe introducir el precio del producto";
        campoDescripcionproducto.parentElement.style.backgroundColor = "#ffeaea";
        campoDescripcionproducto.style.backgroundColor = "#ffeaea";

    }
}


const url = new URL(window.location);
const id = url.searchParams.get("id");


if (id === null || id.length <= 0) {
    mostrarModal();
}

// funcion para obtener los datos de un producto y cargarlos en el formulario
serviciosProductos.getProducto(id).then((producto) => {

    campoNombreProducto.value = producto.nombre;
    campoCategoriaProducto.value = producto.categoria;
    campoDescripcionproducto.value = producto.descripcion;
    campoPrecioProducto.value = producto.precio;

}).catch(() => {
    mostrarModal();
});

// evento editar producto
formProducto.addEventListener("submit", function (event) {

    // valido que los campos esten correctos
    if (!campoNombreProducto.validity.valid ||
        !campoCategoriaProducto.validity.valid ||
        !campoPrecioProducto.validity.valid ||
        !campoDescripcionproducto.validity.valid) {
        mostrarErrorProducto();
        event.preventDefault();

    } else {
        event.preventDefault();
        // obtengo los datos del formulario
        let nombre = campoNombreProducto.value;
        let descripcion = campoDescripcionproducto.value;
        let precio = campoPrecioProducto.value;
        let categoria = campoCategoriaProducto.value;

        // llamo a la funcion editar
        serviciosProductos.editarProductos(id, nombre, categoria, descripcion, precio).then((res) => {

            const modal = modales.crearModal("../static/assets/logos/succes.svg",
                "Producto Editado con Exito!!",
                "Cierre esta ventana para continuar en la aplicación",
                "productos.html");

            modal.classList.add("modal--show");


        }).catch(() => {
            mostrarModal();
        });

    }

});



// fincion para crear modal
function mostrarModal() {

    const modal = modales.crearModal("../static/assets/logos/error.svg",
        "Opps! Ha ocurrido un error",
        "Por favor intentalo de nuevo en un momento, y si el problema persiste contactanos",
        "../index.html");

    modal.classList.add("modal--show")
}

