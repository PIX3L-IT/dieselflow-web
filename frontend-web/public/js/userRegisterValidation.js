document.addEventListener("DOMContentLoaded", () => {
  const nombre          = document.getElementById("inputNombre");
  const apellido        = document.getElementById("inputApellido");
  const email           = document.getElementById("email");
  const password        = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const rolRadios       = document.querySelectorAll('input[name="roleName"]');
  const submitBtn       = document.getElementById("submitBtn");

  // Para conductor
  const codeContainer = document.getElementById("codeContainer");
  const codigo        = document.getElementById("codigo");
  const codigoError   = document.getElementById("codigoError");

  // Regex
  const isEmailValid    = val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isCodeValid     = val => /^\d{4}$/.test(val);
  const isPasswordValid = val => /^(?=.*\d).{8,}$/.test(val); 

  // Mostrar u ocultar campo Código
  const updateRoleField = () => {
    const rol = document.querySelector('input[name="roleName"]:checked').value;
    if (rol === "Conductor") {
      codeContainer.classList.remove("d-none");
    } else {
      codeContainer.classList.add("d-none");
      codigo.value = "";
      codigoError.textContent = "";
    }
  };

  // Validar todo el formulario
  const validarFormulario = () => {
    const nombreValido    = nombre.value.trim() !== "";
    const apellidoValido  = apellido.value.trim() !== "";
    const emailValido     = isEmailValid(email.value.trim());
    const passwordValido  = isPasswordValid(password.value);
    const contrasIguales  = password.value === confirmPassword.value;
    const rolSeleccionado = Array.from(rolRadios).some(r => r.checked);

    // Validación de Código si es conductor
    const rol = document.querySelector('input[name="roleName"]:checked')?.value;
    let codigoValido = true;
    if (rol === "Conductor") {
      codigoValido = isCodeValid(codigo.value.trim());
      codigoError.textContent = codigoValido ? "" : "4 dígitos numéricos";
    }

    const todoOk = nombreValido &&
                   apellidoValido &&
                   emailValido &&
                   passwordValido &&
                   contrasIguales &&
                   rolSeleccionado &&
                   codigoValido;

    submitBtn.disabled = !todoOk;
  };

  // Listeners
  [nombre, apellido, email, password, confirmPassword, codigo]
    .forEach(el => el.addEventListener("input", validarFormulario));
  rolRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      updateRoleField();
      validarFormulario();
    });
  });

  // Init
  updateRoleField();
  validarFormulario();
});
