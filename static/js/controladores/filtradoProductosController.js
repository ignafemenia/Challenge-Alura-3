/**
 *
 * Arcivo de java script el cual corresponde al controlador de la funcionalidad de
 * busqueda de un producto
 *
 * */


import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";


const barraBusqueda = document.querySelector(".input-search");
const productosItem = document.querySelector(".productos__items");
const load = document.querySelector(".load");
const imgError = document.querySelector(".error__busqueda");

// funcion para crear una nueva tarjeta
function  nuevaCard(nombre, precio, id, imagen) {

    let div = document.createElement("div");
    div.classList.add("productos__card");


    const card =  `
                <div class="card-img">
                    <img src="${imagen}" alt="">
                </div>
                <div class="card-body">
                    <p>${nombre}</p>
                    <span>$ ${precio}</span>
                    <a class="card__btn" id="${id}" href="detallesProducto.html">Ver producto</a>
                    <a  class="card__btn" id="${id}" href="formularioEditarProducto.html?id=${id}">editar Producto</a>
                    <a class="card__btn-eliminar" id="${id}" href="#">Eliminar Producto</a>
                </div>`;


    div.innerHTML = card;
    return div;
}


// evento de la barra de busqueda, se activa cada vez que el usario escribe una letra en la barra
barraBusqueda.addEventListener("input",function (){

    productosItem.innerHTML = " ";
    const nombre = barraBusqueda.value;

    // se activa el icono de carga
    load.style.display = "flex";

    // se llama a la funcion encargada de encontrar buscar el producto y devolverlo
    serviciosProductos.getProductoNombre(nombre).then((producto)=>{

        // si encuantra un producto se carga en el contenedor
        producto.forEach((datos)=>{
            let card = nuevaCard(datos.nombre, datos.precio, datos.id, datos.imagen);
            productosItem.appendChild(card);

        });

        // si  no se encuentra ningun producto se muestra un mensaje de no encontrado
        if (producto.length === 0){
            productosItem.innerHTML = " ";
            load.style.display="none";
            imgError.style.display = "flex";
            productosItem.appendChild(imgError);
        }else{
            imgError.style.display = "none";
            load.style.display = "none";
        }


    }).catch(()=>{ // si ocurre un error con el servidor se crea un modal de error
        mostrarModal();
    });
});

// funcion para crear un modal de error
function mostrarModal(){
    let url = window.location;
    const modal = modales.crearModal("../static/assets/logos/error.svg",
        "Opps! Ha ocurrido un error",
        "Por favor intentalo de nuevo en un momento, y si el problema persiste contactanos",
        url);

    modal.classList.add("show--modal")
}
