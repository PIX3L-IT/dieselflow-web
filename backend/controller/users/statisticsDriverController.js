const driverModel = require('../../models/users/User');
const reportModel = require('../../models/reports/Report');
const BaseTableFactory = require('../../controller/testing/tableFactory');

exports.getDriver = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const driver = await driverModel.getUserWithUnit(userId);
    console.log("Driver data:", driver);
    const totalTrips = await reportModel.countUserTrips(userId);
    console.log("Total Trips:", totalTrips);
    const dieselByDay = await driverModel.getDieselByDay(userId);
    console.log("Diesel by day:", dieselByDay);
    const dieselData = dieselByDay.map(diesel => ({
      date: diesel._id.day,
      liters: diesel.totalLiters
    }));

    const limit = 5;
    const { reports, total } = await reportModel.getPaginatedReports(userId, page - 1, limit);
    console.log("Table Data (Reports):", reports);
    const totalPages = Math.ceil(total / limit);
    const tableColumns = [
      { key: "loadDate", label: "Fecha de carga" },
      { key: "liters", label: "Litros" },
      { key: "mileage", label: "Kilometraje" },
      { key: "efficiency", label: "Rendimiento" }
    ];

    res.render('users/statisticsDriverView', {
      unit: driver,
      totalTrips,
      dieselData,
      tableData: reports,
      tableColumns,
      currentPage: page,
      totalPages,
      BaseRoute: `/conductor/${userId}`,
      active: ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('includes/404', { active: "" });
  }
};

exports.getPaginated = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { reports, total } = await driverModel.getPaginated(userId, page, limit);
    const conductorColumns = [
      { key: "loadDate", label: "Fecha de carga" },
      { key: "liters", label: "Litros" },
      { key: "mileage", label: "Kilometraje" },
      { key: "efficiency", label: "Rendimiento" }
    ];
    const factory = new BaseTableFactory({
      model: reportModel.model,
      baseRoute: `/conductor/${userId}/reports`,
      columns: conductorColumns,
      viewName: 'users/statisticsDriverView'
    });    
    factory.render(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading paginated data");
  }
};