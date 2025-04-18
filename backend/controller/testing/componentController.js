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

exports.getNoDataBanner = (req, res) => {
  res.render("includes/noDataBanner"); 
};

exports.getHeader = (req, res) => { 
  res.render("testing/head")
};

exports.getStatBox = (req, res) => { 
  const { username, lastname } = req.user;
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  res.render("testing/statBox", {
    title: "example",
    value: "2",
    username,
    lastname,
    accessToken,
    refreshToken
  });
}


exports.getLoader = (req, res) => {
  res.render("includes/loader")
}

exports.getIndex = (req, res) => {
  res.render("testing/index")
}

exports.getChart = (req, res) => {
  const dieselData = [
    // Enero
    { date: '2025-01-03', liters: 42 },
    { date: '2025-01-05', liters: 45 },
    { date: '2025-01-07', liters: 50 },
    { date: '2025-01-10', liters: 38 },
    { date: '2025-01-15', liters: 46 },
    { date: '2025-01-20', liters: 44 },
    { date: '2025-01-25', liters: 41 },

    // Febrero
    { date: '2025-02-02', liters: 47 },
    { date: '2025-02-04', liters: 49 },
    { date: '2025-02-07', liters: 53 },
    { date: '2025-02-12', liters: 39 },
    { date: '2025-02-18', liters: 51 },
    { date: '2025-02-22', liters: 45 },
    { date: '2025-02-27', liters: 48 },

    // Marzo
    { date: '2025-03-03', liters: 52 },
    { date: '2025-03-08', liters: 55 },
    { date: '2025-03-12', liters: 49 },
    { date: '2025-03-17', liters: 46 },
    { date: '2025-03-21', liters: 50 },
    { date: '2025-03-26', liters: 53 },
    { date: '2025-03-29', liters: 51 },

    // Abril
    { date: '2025-04-01', liters: 43 },
    { date: '2025-04-04', liters: 45 },
    { date: '2025-04-08', liters: 40 },
    { date: '2025-04-12', liters: 42 },
    { date: '2025-04-15', liters: 47 },
    { date: '2025-04-20', liters: 49 },
    { date: '2025-04-25', liters: 46 },
    { date: '2025-04-30', liters: 50 }
  ];

  res.render("testing/lineChart", {
    chartData: dieselData,
    containerId: "diesel-line-chart"
  });
};

