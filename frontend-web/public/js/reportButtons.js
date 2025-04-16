flatpickr("#startDate", {
    altInput: true,
    altFormat: "j M Y",
    clickOpens: false,
    dateFormat: 'Y-m-d',
    maxDate: "today",
    locale: 'es',
    appendTo: document.body,
    positionElement: document.getElementById("startDateBtn"),
    onChange: function(selectedDates, dateStr, instance) {
      document.querySelector("#startDateBtn .label").textContent = ' ' + instance.altInput.value;
    }
    });

    document.getElementById("startDateBtn").addEventListener("click", function() {
    document.getElementById("startDate")._flatpickr.open();
});

flatpickr("#endDate", {
    altInput: true,
    altFormat: "j M Y",
    clickOpens: false,
    dateFormat: 'Y-m-d',
    maxDate: 'today',
    locale: 'es',
    appendTo: document.body,
    positionElement: document.getElementById("endDateBtn"),
    onChange: function(selectedDates, dateStr, instance) {
      document.querySelector("#endDateBtn .label").textContent = ' ' + instance.altInput.value;
    }
    });

    document.getElementById("endDateBtn").addEventListener("click", function() {
    document.getElementById("endDate")._flatpickr.open();
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const dropdown = this.closest('.dropdown');
      const button = dropdown.querySelector('.dropdown-toggle');

      let label = button.querySelector('.label');
      if (!label) {
        label = document.createElement('span');
        label.classList.add('label');
        button.appendChild(label);
      }

      label.textContent = ' ' + this.textContent;
    });
});