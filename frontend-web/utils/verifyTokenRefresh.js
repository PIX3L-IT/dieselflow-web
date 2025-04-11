export async function fetchWithAuth(url, options = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: 'include'
  });


  if (res.status === 401 || res.status === 403) {
    const refreshed = await refreshTokens();

    if (!refreshed) {
      alert('Tu sesión ha expirado. Inicia sesión otra vez.');
      window.location.href = '/auth/login';
      return;
    }

    res = await fetch(url, {
      ...options,
      credentials: 'include'
    });

  }
  return res;
}

async function refreshTokens() {

  const res = await fetch('/auth/refresh', {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) {
    console.warn('No se pudo renovar el token. Código:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
