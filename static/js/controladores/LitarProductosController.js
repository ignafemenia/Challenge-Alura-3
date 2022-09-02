
/**
 *
 * Arcivo de java script el cual corresponde al controlador de la funcionalidad de
 * mostrar todos los productos en la pagina, y controlar la paginacion de los productos.
 * contiene la funcionalidad para llamara al sevicio de listar productos,
 * y para realizar la paginacion de los productos
 *
 * */

import {serviciosProductos} from "../servicios/servicioProducto.js";
import {modales} from "../modal/modal.js";

// botones de paginacion
const btnSiguiente = document.querySelector(".btn-siguiente");
const btnAnterior = document.querySelector(".btn-anterior");

// elemento donde se cargaran las cards
const productosItem = document.querySelector(".productos__items");

// icono de carga
const load = document.querySelector(".load");


// funcion para crear una nueva tarjeta con los parametros enviados
function  nuevaCard(nombre, precio, id, imagen) {

    // se crea un nuevo elemento para incrustar la plantilla
    let div = document.createElement("div");
    div.classList.add("productos__card");


    // se crar una plantilla y se insertan los datos recividos por parametro
    const card =  `
                <div class="card-img">
                    <img src="${imagen}" alt="">
                </div>
                <div class="card-body">
                    <p>${nombre}</p>
                    <span>$ ${precio}</span>
                    <a class="card__btn" id="${id}" href="detallesProducto.html?id=${id}">Ver producto</a>
                    <a  class="card__btn" id="${id}" href="formularioEditarProducto.html?id=${id}">editar Producto</a>
                    <a class="card__btn-eliminar" id="${id}" href="#">Eliminar Producto</a>
                </div>`;



    // se incrusta la plantilla al elemento div
    div.innerHTML = card;

    const btnEliminar = div.querySelector(".card__btn-eliminar");

    // se crea y se enlaza un evento en el boton eliminar de la tarjeta crada
    btnEliminar.addEventListener("click", function (e){

        e.preventDefault();

        // se obtiene el id que se le asigno a la tarjeta del cobtexto actual
        const id = btnEliminar.id;

        // se llama al metodo para eliminar el producto desde la clase servicio
        // y se le envia el id del registro a eliminar
        serviciosProductos.eliminarProducto(id).then((respuesta)=>{

            // si la respuesta es correcta se crea un modal de exito
            if(respuesta.status <= 400){

               const modal = modales.crearModal("../static/assets/logos/succes.svg",
                    "Producto Eliminado con Exito!",
                    "Cierre esta ventana para regresar a la aplicación",
                   "../pages/productos.html");
                modal.classList.add("modal--show");


            }else{ // si la respuesta es incorrecta se crea un modar de error
                const modal = modales.crearModal("../static/assets/logos/error.svg",
                    "Opps! Ocurrio un error",
                    "Ha ocurrido un error al eliminar el producto, por favor intentelo de nuevo en un momento, si el problema persiste contactenos",
                    "../pages/productos.html");
                modal.classList.add("modal--show");

            }

        }).catch(()=>{

            // si hay algun error en el servidor se  crea un modal de error
            let url = window.location;
            const modal = modales.crearModal("../static/assets/logos/error.svg",
                "Opps! Ocurrio un error",
                "Ha ocurrido un error al eliminar el producto, por favor intentelo de nuevo en un momento, si el problema persiste contactenos",
                url);

            modal.classList.add("modal--show");

        });
    });

    // se retorna el div correspondiente al evento creado
    return div;
}

// variable de incremento para llevar control de la paginacion
let offSet = 1;

// evento del boton siguiente, carga un nuevo lote de productos
btnSiguiente.addEventListener("click",function (e){
    e.preventDefault();
    offSet += 12;
    subirScroll();
    paginarProductos();

});

// evento del boton anterior, carga el lote anterior de productos
btnAnterior.addEventListener("click",function (e){
    e.preventDefault();
    offSet -= 12;

    subirScroll();
    paginarProductos();

});


// funcion encargada de paginar y cargar los productos en la pagina
function paginarProductos(){

    // se limpia el contenedor de las tarjetas y se ejecuta el icono de carga
    productosItem.innerHTML ="";
    load.style.display = "flex";


    if(offSet > 1){
        btnAnterior.removeAttribute("disabled");
    }else{
        btnAnterior.setAttribute("disabled","");
    }

    // se llama a la clase encargada de recuperar los productos de la api
    // se le envia como parametro el lote offset
    serviciosProductos.listaProductos(offSet).then((producto)=>{
        producto.forEach(data => {

            // se recuperan los datos obtenidos
            let nombre = data.nombre;
            let precio = data.precio;
            let id = data.id;
            let imagen = data.imagen;

            // se llama al metodo para crear una nueva tarjeta
            let card = nuevaCard(nombre, precio, id, imagen);

            // se agrega la nueva tarjeta al contenedor
            productosItem.appendChild(card);
        });

        // se desactiva el icono de carga
        load.style.display = "none";

    }).catch(()=>{ // si ocurre un error se crea un modal de error
        const modal = modales.crearModal("../static/assets/logos/error.svg",
            "Opps! Ocurrio un error",
            "Ha ocurrido un error al cargar los productos, por favor intentelo de nuevo en un momento, si el problema persiste contactenos");
        modal.classList.add("modal--show");
        window.location.reload();
    });
}

// se paginan los productos al la ejecucion de la pagina
if(offSet === 1){
    paginarProductos();
}

// funcion para subir  el scroll al top de la pagina
function subirScroll(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

