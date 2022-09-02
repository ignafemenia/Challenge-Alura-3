/**
 *
 * modulo correspondiente a la funcionalidad de agregar o arrastrar una
 * imagen al campo de seleccionar una imagen
 *
 * */

const fileSelect = document.querySelector("#fileSelect");
const fileElem = document.querySelector("#fileElem");
const fileList = document.querySelector("#filelist");


//eventos de caida

fileList.addEventListener("dragenter", dragenter, false);
fileList.addEventListener("dragover", dragover, false);
fileList.addEventListener("drop", drop, false);

// eventos auxiliares para prevenir acciones inesperadas
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

// evento para aceptar la caida de una imagen en el div seleccionado
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);

}

// evento para seleccionar una imagen y cargarla al div mediante el selector de archivos
fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false);


// funcion para cargar la miniatura en el div
function handleFiles(files) {

    const img = document.createElement("img");
    img.height = 150;
    const info = document.createElement("span");
    info.classList.add("input__label-label");

    if (files.length) {

        fileList.innerHTML = "";

        img.src = URL.createObjectURL(files[0]);
        img.onload = function () {
            URL.revokeObjectURL(this.src);
        }
        info.innerHTML = `${files[0].name}: ${files[0].size} bytes`;

    } else {

        if (!this.files.length) {
            fileList.innerHTML = "<p>No files selected!</p>";
        } else {
            fileList.innerHTML = "";

            img.src = URL.createObjectURL(this.files[0]);

            img.onload = function () {
                URL.revokeObjectURL(this.src);
            }
            info.innerHTML = `${this.files[0].name}: ${this.files[0].size} bytes`;

        }

    }
    fileList.appendChild(img);
    fileList.appendChild(info);

}

