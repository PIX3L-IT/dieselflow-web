document.addEventListener("DOMContentLoaded", () => {
    const form          = document.getElementById("registroForm");
    const confirmModal  = document.getElementById("confirmModal");
    const successModal  = document.getElementById("successModal");
    const errorModal    = document.getElementById("errorModal");
  
    const inputNombre   = document.getElementById("inputNombre");
    const mensajeConfirm= confirmModal.querySelector(".modal-message");
    const btnConfirmar  = confirmModal.querySelector(".btn-confirmacion");
    const btnCancelar   = confirmModal.querySelector(".btn-cancelar");
  
    const mensajeSuccess= successModal.querySelector(".modal-message");
    const btnCerrar     = successModal.querySelector(".btn-confirmacion");
  
    const mensajeError  = errorModal.querySelector(".modal-message");
    const btnErrorClose = errorModal.querySelector(".btn-confirmacion");
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      mensajeConfirm.innerText = `¿Estás seguro que quieres registrar a ${inputNombre.value.trim()}?`;
      confirmModal.style.display = "flex";
    });
  
    btnCancelar.addEventListener("click", () => confirmModal.style.display = "none");
  
    btnConfirmar.addEventListener("click", () => {
      confirmModal.style.display = "none";
  
      const data = Object.fromEntries(new FormData(form).entries());
  
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.message === "Usuario creado correctamente") {
          mensajeSuccess.innerText = ` ${inputNombre.value.trim()} ha sido registrado exitosamente`;
          successModal.style.display = "flex";
          btnCerrar.onclick = () => window.location.href = "/usuarios";
        }
        else if (resp.message === "El correo ya está registrado") {
          mensajeError.innerText = "El correo ya está registrado";
          errorModal.style.display = "flex";
        }
        else {
          mensajeError.innerText = resp.message || "Ocurrió un error";
          errorModal.style.display = "flex";
        }
      })
      .catch(() => {
        mensajeError.innerText = "Error de red, inténtalo más tarde";
        errorModal.style.display = "flex";
      });
    });
  
    btnErrorClose.addEventListener("click", () => {
      errorModal.style.display = "none";
    });
  });