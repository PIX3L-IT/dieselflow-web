const loginForm = document.getElementById('loginForm');
  
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // manda y recibe cookies
      body: JSON.stringify({ email, password,type })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('refreshToken', data.refreshToken);
      alert(data.message || 'Login exitoso ✅');

      // Ahora prueba acceder a ruta protegida
      const protectedRes = await fetch('/auth/protected', {
        method: 'GET',
        credentials: 'include'
      });

      if (protectedRes.ok) {
        const html = await protectedRes.text();
        document.open();
        document.write(html);
        document.close();
      } else {
        alert('Error al acceder a contenido protegido');
      }

    } else if (res.status === 401) {
      alert(data.message || 'Credenciales incorrectas');
    } else {
      alert(data.message || 'Error en el login');
    }

  } catch (err) {
    console.error('Error:', err);
    alert('Hubo un problema con el servidor');
  }
});