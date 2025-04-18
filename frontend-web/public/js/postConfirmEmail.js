const postConfirmEmail = (email) => {
    fetch("/users/confirm-email", {
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

function validateEmail(email){
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

  