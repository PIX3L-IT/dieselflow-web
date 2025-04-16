window.addEventListener("load", () => {
    const INDEX = document.querySelector('.main-content');
    hideLoader(); 
    INDEX?.classList.remove('.hidden-content')
    INDEX?.classList.add('.fade-in')
});
