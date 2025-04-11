document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("emailError");
  const form = document.querySelector(".single-input-form");

  function validateEmail() {
    const email = emailInput.value.trim();
    
    // Expresión regular para validar un correo con @, y terminando en .com o .mx
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|mx)$/;

    // Verifica si el correo es válido
    if (!emailRegex.test(email)) {
      errorMessage.textContent = "El correo debe tener un formato válido y terminar en '.com' o '.mx'.";
      emailInput.classList.add("error");
    } else {
      errorMessage.textContent = "";
      emailInput.classList.remove("error");
    }
  }

  emailInput.addEventListener("input", validateEmail);

  form.addEventListener("submit", function (e) {
    validateEmail(); // Aseguramos que se valide justo antes de enviar
    if (errorMessage.textContent !== "") {
      e.preventDefault();
      emailInput.focus();
    }
  });
});
