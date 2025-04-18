import { fetchWithAuth } from '/utils/verifyTokenRefresh.js';

document.querySelectorAll('#unitSelect + .dropdown-menu .dropdown-item')
  .forEach(item => {
    item.addEventListener('click', () => {
      const selectedValue = item.getAttribute('data-value');
      document.getElementById('selectedUnit').value = selectedValue;
    });
  });

document.querySelectorAll('#driverSelect + .dropdown-menu .dropdown-item')
  .forEach(item => {
    item.addEventListener('click', () => {
      const selectedValue = item.getAttribute('data-value');
      document.getElementById('selectedDriver').value = selectedValue;
    });
  });

document.getElementById('generarBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  // Oculta todos los mensajes de error
  document.querySelectorAll('.error-message').forEach(el => el.classList.add('d-none'));

  // Obtiene valores de los filtros
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const selectedUnit = document.getElementById('selectedUnit').value;
  const selectedDriver = document.getElementById('selectedDriver').value;

  let hasError = false;

  // Validaciones
  if (startDate && endDate && startDate > endDate) {
    document.getElementById('date-mismatch').classList.remove('d-none');
    hasError = true;
  }
  if (!startDate) {
    document.getElementById('no-startDate').classList.remove('d-none');
    hasError = true;
  }
  if (!endDate) {
    document.getElementById('no-endDate').classList.remove('d-none');
    hasError = true;
  }
  if (!selectedUnit) {
    document.getElementById('no-unit').classList.remove('d-none');
    hasError = true;
  }
  if (!selectedDriver) {
    document.getElementById('no-driver').classList.remove('d-none');
    hasError = true;
  }

  if (hasError) return;

  // Lógica de fetch con refresco de token
  try {
    const response = await fetchWithAuth('/reportes/generar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, selectedUnit, selectedDriver }),
    });

    const html = await response.text();
    document.getElementById('reportContainer').innerHTML = html;

    // Inicializa DataTable
    setTimeout(() => {
      $('#reportTable').DataTable({
        paging: true,
        ordering: true,
        searching: true,
        pageLength: 7,
        dom: 'Bfrtip',
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
          paginate: { previous: '<', next: '>' },
        },
        buttons: ['csv', 'pdf'],
      });
    }, 0);

  } catch (err) {
    console.error('Error al generar el reporte', err);
    }
});
