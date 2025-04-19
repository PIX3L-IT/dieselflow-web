let loaderStartTime = performance.now();

// Mostrar el loader (por si quieres activarlo manualmente)
function showLoader() {
    loaderStartTime = performance.now();
    const loader = document.querySelector('.loader');
    loader?.classList.remove('hide-loader');
}

// Ocultar el loader después de un tiempo mínimo (por defecto: 2 segundos)
function hideLoader(minDuration = 1000) {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const elapsed = performance.now() - loaderStartTime;
    const delay = Math.max(minDuration - elapsed, 0);

    setTimeout(() => {
        loader.classList.add('hide-loader');
    }, delay);
}