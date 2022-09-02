/**
 *
 * Archivo de java script el cual corresponde al controlador de la funcionalidad de
 * funcionalidad listar productos por seccion, contiene los metodos para
 * filtrar los productos segun su categoria, y cargarlos en su categoria correspondiente,
 * asi como el manejo de errores
 *
 * */



import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";

const seccionStarWars = document.querySelector(".star-was");
const seccionConsolas = document.querySelector(".consolas");
const seccionDiversos = document.querySelector(".diversos");
const load = document.querySelector(".load");


// funcion para crear una nueva tarjeta con los datos obtenidos
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
                    <a class="card__btn" id="${id}" href="pages/detallesProducto.html?id=${id}">Ver producto</a>
             
                </div>`;


    div.innerHTML = card;

    return div;
}



// se activa el icono de carga
load.style.display = "flex";

// listar productos seccion star wars, se pasa como parametro las seccion a cargar
serviciosProductos.getProductoSeccion("starwars").then((productos) => {

    const productosItem = document.createElement("div");
    productosItem.classList.add("productos__items");

    // se van creando las distintas tarjetas con los datos obtenidos
    productos.forEach((datosProducto)=>{
        let card = nuevaCard(datosProducto.nombre, datosProducto.precio, datosProducto.id, datosProducto.imagen);
        productosItem.appendChild(card);
    });

    // se agregan a la seccion starwars
    seccionStarWars.appendChild(productosItem);

    // se desactiva el icono de carga
    load.style.display = "none";
}).catch(()=>{
    mostrarModal();
});


// listar productos seccion star wars, se pasa como parametro las seccion a cargar
serviciosProductos.getProductoSeccion("consolas").then((productos) => {

    const productosItem = document.createElement("div");
    productosItem.classList.add("productos__items");

    // se van creando las distintas tarjetas con los datos obtenidos
    productos.forEach((datosProducto)=>{
        let card = nuevaCard(datosProducto.nombre, datosProducto.precio, datosProducto.id, datosProducto.imagen);
        productosItem.appendChild(card);
    });

    // se agregan a la seccion consola
    seccionConsolas.appendChild(productosItem);

    // se desactiva el icono de carga
    load.style.display = "none";
}).catch(()=>{
    mostrarModal();
});

// listar productos seccion diversos, se pasa como parametro las seccion a cargar
serviciosProductos.getProductoSeccion("diversos").then((productos) => {

    const productosItem = document.createElement("div");
    productosItem.classList.add("productos__items");

    productos.forEach((datosProducto)=>{
        let card = nuevaCard(datosProducto.nombre, datosProducto.precio, datosProducto.id, datosProducto.imagen);
        productosItem.appendChild(card);
    });

    // se agregan a la seccion diversos
    seccionDiversos.appendChild(productosItem);

    // se desactiva el icono de carga
    load.style.display = "none";
}).catch(()=>{
    mostrarModal();
});


// funcion para crear un modal
function mostrarModal(){
    let url = window.location;
    const modal = modales.crearModal("static/assets/logos/error.svg",
        "Opps! Ha ocurrido un error",
        "Por favor intentalo de nuevo en un momento, y si el problema persiste contactanos",
        url);
    modal.classList.add("modal--show")
}