// Mostrar el loader (por si quieres activarlo manualmente)
function showLoader() {
    const LOADER = document.querySelector('.loader');
    loader?.classList.remove('hide-loader');
}

// Ocultar el loader después de un tiempo mínimo (por defecto: 2 segundos)
function hideLoader(minDuration = 2000) {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const start = performance.now();
    const delay = Math.max(minDuration - (performance.now() - start), 0);

    setTimeout(() => {
        loader.classList.add('hide-loader');

        // Eliminar del DOM cuando termine la transición
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    }, delay);
}
