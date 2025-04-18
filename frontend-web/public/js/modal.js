document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("popupModal");

    window.showModal = function() {
        const modal = document.getElementById("popupModal");
        if (modal) {
            modal.style.display = "flex";
        }
    }
    // Cerrar el modal si el usuario hace clic fuera del contenido
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


  