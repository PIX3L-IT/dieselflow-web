exports.getNavbar = (req, res) => {
    res.render('includes/navbar', { active: '' });
};

exports.getInputEmail = (req, res) => {
    res.render('includes/inputEmail', { active: '' });
};

exports.getInputPassword = (req, res) => {
    res.render('includes/inputPassword', { active: '' });
};