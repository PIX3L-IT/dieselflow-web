/*
    Descripción sobre la función:
    Esta función se encarga de llamar a la ruta para enviar el correo de confirmación al usuario.

    Parámetros:
    - email: Dirección de correo electrónico del destinatario.

    Valor de retorno:
    - No devuelve nada, pero envía una solicitud POST a la ruta "/usuarios/confirmar-email" con el correo electrónico del usuario.
*/
const postConfirmEmail = (email) => {
    fetch("/usuarios/confirmar-email", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error("Error al enviar el correo:", error.message);
    });
};

/*
    Descripción sobre la función:
    Esta función se encarga de validar el formato del correo electrónico ingresado por el usuario.

    Parámetros:
    - email: Dirección de correo electrónico a validar.

    Valor de retorno:
    - True: Si el correo tiene un formato válido
    - False: Si el correo no tiene un formato válido o está vacío.
*/
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|mx)$/;
    const errorMessage = document.getElementById("emailError");

    if (email === "") {
        errorMessage.textContent = "El correo no puede estar vacío.";
        return false;
    }
    
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "El correo debe tener un formato válido y terminar en '.com' o '.mx'.";
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const submitButton = document.querySelector(".single-input-form button[type='submit']");
    
    // Cuando se presione el botón, se validará el correo electrónico y se enviará la solicitud POST si es válido.
    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (validateEmail(email)) {
                postConfirmEmail(email);
                if (typeof window.showModal === "function") {
                    window.showModal();
                }
            } 
        });
    }
});

  