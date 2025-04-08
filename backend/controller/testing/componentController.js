exports.getNavbar = (req, res) => {
    // Enviar la lista de URLs firmadas al cliente
    res.render('includes/navbar', { active: '' });
  };

  exports.getModal = (req, res) => {
    res.render('testing/modalTest');
  };
  
  