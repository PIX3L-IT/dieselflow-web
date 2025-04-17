// Función para habilitar el botón
window.enableButton = function () {
    const button = document.querySelector(".button-container .btn");
    if (button) {
        button.classList.remove("disabled");
    }
};

// Función para deshabilitar el botón
window.disableButton = function () {
    const button = document.querySelector(".button-container .btn");
    if (button) {
        button.classList.add("disabled");
    }
};