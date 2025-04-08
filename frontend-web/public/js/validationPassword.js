document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmPassword");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

  // Función para alternar visibilidad
  togglePassword.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    togglePassword.querySelector("i").classList.toggle("bi-eye-slash");
    togglePassword.querySelector("i").classList.toggle("bi-eye");
  });

  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordField.type === "password" ? "text" : "password";
    confirmPasswordField.type = type;
    toggleConfirmPassword.querySelector("i").classList.toggle("bi-eye-slash");
    toggleConfirmPassword.querySelector("i").classList.toggle("bi-eye");
  });

  // Validar contraseña en tiempo real
  function validatePassword() {
    const password = passwordField.value;
    const regex = /^(?=.*\d).{8,}$/;

    if (!regex.test(password)) {
      passwordError.textContent = "La contraseña debe tener al menos 8 caracteres y un número.";
    } else {
      passwordError.textContent = "";
    }

    validateConfirmPassword();
  }

  // Validar que coincidan
  function validateConfirmPassword() {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden.";
    } else {
      confirmPasswordError.textContent = "";
    }
  }

  // Escuchar en tiempo real
  passwordField.addEventListener("input", validatePassword);
  confirmPasswordField.addEventListener("input", validateConfirmPassword);
});
