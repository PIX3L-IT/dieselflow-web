const loginForm = document.getElementById('loginForm');
  
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = loginForm.user.value;
  const password = loginForm.password.value;
  const type = loginForm.type.value; 

  document.getElementById('inputError').textContent = '';

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ user, password, type })
    });

    const text = await res.text();  // Obtén la respuesta como texto primero
    console.log(text);  // Muestra la respuesta completa
    const data = JSON.parse(text);  // Luego analiza el JSON

    if (res.ok) {
      localStorage.setItem('refreshToken', data.refreshToken);
      console.log("Login exitoso");  
    } else if (res.status === 401) {
      document.getElementById('inputError').textContent = data.message || 
        'Credenciales incorrectas';
    } else {
      document.getElementById('inputError').textContent = data.message || 
        'Hubo un problema en la solicitud, por favor intenta de nuevo';
    }

  } catch (err) {
    console.error('Error:', err);
    console.log(err);
    document.getElementById('inputError').textContent = 
      'Hubo un problema en la solicitud, por favor intenta de nuevo';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user');
  const passwordInput = document.getElementById('password');
  const loginButton = document.querySelector('.login-button');

  function toggleButtonState() {
    const hasUser = userInput.value.trim().length > 0;
    const hasPassword = passwordInput.value.trim().length > 0;
    loginButton.disabled = !(hasUser && hasPassword);
  }

  userInput.addEventListener('input', toggleButtonState);
  passwordInput.addEventListener('input', toggleButtonState);
});

document.getElementById('togglePassword').addEventListener('click', function () {
  const input = document.getElementById('password');
  const icon = this.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  }
});
