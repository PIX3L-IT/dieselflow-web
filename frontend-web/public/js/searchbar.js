document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("liveSearchInput");
  const resultsContainer = document.getElementById("searchResultsContainer");

  if (!input) return;

  const endpoint = input.dataset.endpoint;
  const context = input.dataset.context;

  let timeout = null;

  input.addEventListener("input", () => {
    clearTimeout(timeout);

    const query = input.value.trim();

    if (query.length === 0) {
      resultsContainer.innerHTML = "";
      return;
    }

    timeout = setTimeout(() => {
      fetch(`${endpoint}?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          resultsContainer.innerHTML = data.results
            .map((item) => {
              if (context === "users") {
                return `<div class="search-result-item">${item.name}</div>`;
              } else if (context === "units") {
                return `<div class="search-result-item">${item.unitId}</div>`;
              }
            })
            .join("");
        })
        .catch((err) => {
          console.error("Error al buscar:", err);
        });
    }, 300);
  });
});
