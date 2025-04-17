document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("popupModal");
  
    // Escuchar el botón de "Enviar correo"
    const submitButton = document.querySelector(".single-input-form button[type='submit']");
    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            if (modal) {
                modal.style.display = "flex";
            }
        });
    }
  
    // Cerrar el modal si el usuario hace clic fuera del contenido
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
  