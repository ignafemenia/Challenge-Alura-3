/**
 * modulo correspondiente a los metodos para interactuar con la api
 * recibir y enviar peticiones
*/

function listaProductos (offset){
    return fetch(`https://mockend.com/Hector-Gallego/apiFake/productos?offset=${offset}&limit=12`).then(
        function respuesta(respuesta){
            return respuesta.json();
        }
    )
}
function crearProducto(nombre, categoria, descripcion, precio){

    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify({id: uuid.v4(), nombre, categoria, descripcion, precio}),

    })

}

function editarProductos(id, nombre, categoria, descripcion, precio){
    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos/"+id, {
        method : "PUT",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify({nombre, categoria, descripcion, precio})

    }).then((respuesta) =>{
        return respuesta;
    }).catch((error)=>{
        return error;

    });
}

function getProducto(id){
    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos/" + id).then((respuesta) => {
        return respuesta.json();
    });
}

function getProductoNombre(nombre){
    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos?nombre_contains=" + nombre+"&limit=12").then((respuesta) => {
        return respuesta.json();
    });
}

function getProductoSeccion(seccion){
    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos?categoria_contains="+seccion+"&limit=4").then((respuesta)=>{
        return respuesta.json();
    });
}

function eliminarProducto(id){
    return fetch("https://mockend.com/Hector-Gallego/apiFake/productos/" + id, {

        method: "DELETE",

    });
}
export const serviciosProductos = {
    listaProductos,
    crearProducto,
    editarProductos,
    getProducto,
    eliminarProducto,
    getProductoNombre,
    getProductoSeccion
}