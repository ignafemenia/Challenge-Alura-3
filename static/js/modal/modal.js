
/**
 * Archivo para la creacion de un modal que utilizare en varias paginas del sistema
 */


function crearModal(urlImg, titulo, descripcion, urlDireccion) {
    const sectionModal = document.querySelector(".modal");
    const modal = `
                        <div class="modal__container">
                            <img src="${urlImg}" class="modal__img">
                                <h2 class="modal__title">
                                    ${titulo}
                                </h2>
                                <p class="modal__parrafo">
                                    ${descripcion}
                                </p>
                                <a href="" class="modal__close">Cerrar</a>
                    
                        </div>
                    `;

    sectionModal.innerHTML = modal;

    const closeModal = sectionModal.querySelector(".modal__close");

    closeModal.addEventListener("click", (e) => {
        e.preventDefault();
        sectionModal.classList.remove("modal--show");
        window.location.href = urlDireccion;

    });

    return sectionModal;

}
export const  modales = {
    crearModal
}