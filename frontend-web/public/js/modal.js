document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("popupModal");
  
    // Ocultar el modal al cargar la página
    if (modal) {
        modal.style.display = "none";
    }
  
    // Escuchar el botón de "Enviar correo"
    const submitButton = document.querySelector(".single-input-form button[type='submit']");
    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault(); // Evita que se envíe el formulario
            if (modal) {
            modal.style.display = "flex"; // Mostrar el modal centrado
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
  