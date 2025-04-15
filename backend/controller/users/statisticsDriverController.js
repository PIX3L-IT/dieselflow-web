const driverModel = require('../../models/users/User');
const reportModel = require('../../models/reports/Report');

exports.getDriver = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 0;

    const driver = await driverModel.getUserWithUnit(userId);
    const totalTrips = await reportModel.countUserTrips(userId);
    const dieselByDay = await driverModel.getDieselByDay(userId);

    const dieselData = dieselByDay.map(diesel => ({
      date: diesel._id.day,
      liters: diesel.totalLiters
    }));

    const { reports: lastReports } = await reportModel.getPaginatedReports(userId, page);

    res.render('statisticsConductorView', {
      unit: driver,
      totalTrips,
      dieselData,
      lastReports,
      page
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('includes/404', { active: "" });
  }
};

exports.getPaginated = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 0;
    const limit = 5;

    const { reports, total } = await driverModel.getPaginated(userId, page, limit);

    const conductorColumns = [
      { key: "loadDate", label: "Fecha de carga" },
      { key: "liters", label: "Litros" },
      { key: "mileage", label: "Kilometraje" },
      { key: "efficiency", label: "Rendimiento" }
    ];

    const factory = new BaseTableFactory({
      model: driverModel.model,
      baseRoute: `/conductor_page/${userId}/reports`,
      columns: conductorColumns,
      viewName: 'partials/lastReportsTable'
    });

    factory.render(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading paginated data");
  }
};
