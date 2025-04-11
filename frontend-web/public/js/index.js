window.addEventListener("load", () => {
    const INDEX = document.querySelector('.main-content');
    //index?.classList.add('fade-in')
    hideLoader(); // Se activa una vez toda la página está cargada
    INDEX?.classList.remove('.hidden-content')
    INDEX?.classList.add('.fade-in')
});
