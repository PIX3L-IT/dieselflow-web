const BaseTableFactory = require('./tableFactory');
const UnitTest = require('../../models/units/Unit');
const UserTest = require('../../models/users/User');

exports.getNavbar = (req, res) => {
  res.render("includes/navbar", { active: "" });
};

exports.getModal = (req, res) => {
  res.render("testing/modalTest");
};

exports.getSwitch = (req, res) => {
  res.render("includes/switch");
};

exports.getText = (req, res) => {
  res.render("includes/text");
};

exports.getInputEmail = (req, res) => {
  res.render("includes/inputEmail", { active: "" });
};

exports.getInputPassword = (req, res) => {
  res.render("includes/inputPassword", { active: "" });
};

exports.getCard = (req, res) => {
  res.render("includes/card");
};

exports.getButton = (req, res) => {
  res.render("includes/button", { active: "" });
}

exports.getSubtitle = (req, res) => {
  res.render("includes/subtitle");
}


exports.renderUnitsClassic = (req, res) => {
  const unitColumns = [
    { key: 'unitName', label: 'Unidad' },
    { key: 'unitRegistrationDate', label: 'Fecha de registro' },
    { key: 'unitModel', label: 'Modelo' },
    { key: 'unitStatus', label: 'Estado' }
  ];

  const factory = new BaseTableFactory({
    model: UnitTest,
    baseRoute: '/component/simple-table',
    columns: unitColumns,
    viewName: 'includes/simpleTable'
  });

  factory.render(req, res);
};


exports.renderUsersDatatable = (req, res) => {
  const userColumns = [
    { key: 'username', label: 'Nombre de usuario' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'email', label: 'Correo electrónico' },
    { key: 'registrationDate', label: 'Fecha de registro' },
    { key: 'userStatus', label: 'Estado' }
  ];

  const factory = new BaseTableFactory({
    model: UserTest,
    baseRoute: '/component/data-table',
    columns: userColumns,
    viewName: 'includes/dataTable'
  });

  factory.render(req, res);
};

exports.get404 = (req, res) => {
  res.render("includes/404",  { active: "" });
}

exports.getSearchbarUsers = (req, res) => {
  res.render("includes/searchbar", {
    active: "",
    placeholder: "Buscar usuario",
    endpoint: "/users/search",
    context: "users"
  });
};

exports.getSearchbarUnits = (req, res) => {
  res.render("includes/searchbar", {
    active: "",
    placeholder: "Buscar unidad",
    endpoint: "/units/search",
    context: "units"
  });
};

exports.getInput = (req, res) => {
  res.render("includes/input",  { active: "" });
};

exports.getBackArrow = (req, res) => {
  res.render("includes/backArrow");
};
}

exports.getStatsButton = (req, res) => {
  res.render("includes/userStatsButton");
}