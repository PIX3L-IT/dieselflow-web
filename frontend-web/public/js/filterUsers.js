document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="userType"]');
    const userCards = document.querySelectorAll('.user-card');
    const searchInput = document.getElementById('searchInput');
    const noDataBanner = document.getElementById('noDataBanner');
  
    function filterUsers() {
      const selectedRadio = document.querySelector('input[name="userType"]:checked');
      const selectedRole = selectedRadio ? selectedRadio.value : '';
      const searchText = searchInput.value.toLowerCase();

      let visibleCount = 0;
  
      userCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const cardRole = card.classList.contains('Conductor') ? 'Conductor' :
                         card.classList.contains('Administrador') ? 'Administrador' : '';
        const matchesRole = selectedRole === '' || cardRole === selectedRole;
        const matchesSearch = cardText.includes(searchText);
        const shouldDisplay = matchesRole && matchesSearch;
        card.style.display = (matchesRole && matchesSearch) ? 'block' : 'none';
        if (shouldDisplay) visibleCount++;
      });
      noDataBanner.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  
    radioButtons.forEach(radio => {
      radio.addEventListener('change', filterUsers);
    });
  
    searchInput.addEventListener('input', filterUsers);
  
    filterUsers();
  });