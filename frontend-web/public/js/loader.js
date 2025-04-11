window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    // Wait 2 seconds before starting the hide animation
    setTimeout(() => {
        loader.classList.add("hide-loader");

        loader.addEventListener("transitionend", () => {
            document.body.removeChild(loader);
        });
    }, 2000); // 2000 ms = 2 seconds
});
