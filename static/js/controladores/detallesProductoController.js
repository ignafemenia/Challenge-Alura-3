/**
 *
 * Arcivo de java script el cual corresponde al controlador de la funcionalidad de
 * seleccionar un producto del sistema y mostrar los detalles, tambien mostrar los
 * productos relacionados a la categoria de ese producto
 *
 * */


import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";

const descripcionProducto = document.querySelector(".descripcion-producto");
const seccionSimilares = document.querySelector(".productos__items");
const imagenDetalle = document.querySelector(".imagen-detalle");

const load = document.querySelector(".load");

const url = new URL(window.location);
const id = url.searchParams.get("id");


load.style.display = "flex";

function nuevaCard(nombre, precio, id, imagen) {

    let div = document.createElement("div");
    div.classList.add("productos__card");


    const card = `
                <div class="card-img">
                    <img src="${imagen}" alt="">
                </div>
                <div class="card-body">
                    <p>${nombre}</p>
                    <span>$ ${precio}</span>
                    <a class="card__btn" id="${id}" href="../pages/detallesProducto.html?id=${id}">Ver producto</a>
               
                </div>`;


    div.innerHTML = card;

    return div;
}

if (id === null || id.length <= 0 ) {
    mostrarModal();
}

serviciosProductos.getProducto(id).then((producto) => {

    // creo los elementos para agregar a la descripcion
    const h1 = document.createElement("h1");
    const span = document.createElement("span");
    const p = document.createElement("p");

    // agrego el contenido del producto a los elementos
    h1.textContent = producto.nombre;
    span.textContent = "$ " + producto.precio;
    p.textContent = producto.descripcion;

    // agrego los elementos al contenedor
    descripcionProducto.appendChild(h1);
    descripcionProducto.appendChild(span);
    descripcionProducto.appendChild(p);

    // agrgo la imagen del producto
    imagenDetalle.src = producto.imagen;


    // obtengo los productos relacionados a la categoria del producto seleccionado
    serviciosProductos.getProductoSeccion(producto.categoria).then((productos) => {

        productos.forEach((datosProducto) => {
            let card = nuevaCard(datosProducto.nombre, datosProducto.precio, datosProducto.id, datosProducto.imagen);
            seccionSimilares.appendChild(card);
        });

    }).catch(() => {
        mostrarModal();
    });
    load.style.display = "none";

}).catch(() => {
    mostrarModal();
});


// funcion para crear un modal
function mostrarModal() {

    console.log("entre a modal");
    const modal = modales.crearModal("../static/assets/logos/error.svg",
        "Opps! Ha ocurrido un error",
        "Por favor intentalo de nuevo en un momento, y si el problema persiste contactanos",
        "../index.html");

    modal.classList.add("modal--show");
}

