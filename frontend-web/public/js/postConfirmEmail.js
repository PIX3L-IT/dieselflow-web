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


document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const submitButton = document.querySelector(".single-input-form button[type='submit']");
    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            postConfirmEmail(email);
        });
    }
});

  