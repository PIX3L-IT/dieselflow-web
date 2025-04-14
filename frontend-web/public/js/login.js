const loginForm = document.getElementById('loginForm');
  
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
