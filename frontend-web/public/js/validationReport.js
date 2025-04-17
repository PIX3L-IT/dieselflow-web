document.querySelectorAll('#unitSelect + .dropdown-menu .dropdown-item').forEach(function (item) {
    item.addEventListener('click', function () {
        const selectedValue = this.getAttribute('data-value');
        document.getElementById('selectedUnit').value = selectedValue;
    });
});

document.querySelectorAll('#driverSelect + .dropdown-menu .dropdown-item').forEach(function (item) {
    item.addEventListener('click', function () {
        const selectedValue = this.getAttribute('data-value');
        document.getElementById('selectedDriver').value = selectedValue;
    });
});

document.getElementById("generarBtn").addEventListener("click", function (e) {
    
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach(function (el) {
        el.classList.add("d-none");
    });

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const selectedUnit = document.getElementById("selectedUnit").value;
    const selectedDriver = document.getElementById("selectedDriver").value;

    let hasError = false;

    if (startDate && endDate && startDate > endDate) {
        document.getElementById("date-mismatch").classList.remove("d-none");
        hasError = true;
    }

    if (!selectedUnit) {
        document.getElementById("no-unit").classList.remove("d-none");
        hasError = true;
    }

    if (!selectedDriver) {
        document.getElementById("no-driver").classList.remove("d-none");
        hasError = true;
    }

    if (!startDate) {
        document.getElementById("no-startDate").classList.remove("d-none");
        hasError = true;
    }

    if (!endDate) {
        document.getElementById("no-endDate").classList.remove("d-none");
        hasError = true;
    }

    if(!hasError) {
        const data = {
            startDate,
            endDate,
            selectedUnit,
            selectedDriver
        };
    
        fetch("/reports/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(html => {
            document.getElementById("reportContainer").innerHTML = html;
        })
        .catch(err => {
            console.error("Error al generar el reporte", err);
        });
    }
});
