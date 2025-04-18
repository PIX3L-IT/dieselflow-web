const Report = require("../../models/reports/Report");
const Unit = require("../../models/units/Unit");
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

// Get filtros para la página inicial de reportes
async function getFilters(req, res) {
  try {
    const units = await Unit.findAll();

    const driverRole = await Role.findRole("Conductor");
    if (!driverRole) {
        return res.status(404).render('includes/404', { message: "No se encontró el rol Conductor" });
      }

    const drivers = await User.findById(driverRole._id);
    
    res.render('statistics/report',{
        units,
        drivers,
        active: "reportes",
        reportData: ''
      });
  } catch (error) {
    console.error("Error al obtener los elementos de filtros:", error);
    res.status(500).render('includes/500',{
      active: "" 
    });
  }
}

// Post para generar el reporte basado en filtros seleccionado
async function postReport(req, res) {
  const { startDate, endDate, selectedUnit, selectedDriver } = req.body;

  try {
    const filter = {};

    filter.loadDate = {
      $gte: new Date(`${startDate}T00:00:00Z`),
      $lte: new Date(`${endDate}T23:59:59Z`)
    };

    if (selectedDriver !== "todos") {
      const [username, lastName] = selectedDriver.split(" ");
      
      const user = await User.findByUsernameAndLastName(username, lastName);
      
      if (user) {
        filter.idUser = user._id;
      }
    }

    if (selectedUnit !== "todos") {
      const unit = await Unit.findByName(selectedUnit);
      
      if (unit) {
        filter.idUnit = unit._id;
      }
    }

    const reportData = await Report.findByFilters(filter);
    
    if (!reportData) {
        return res.render('statistics/partialReport',{
          reportData: []
        });
      } else {
        return res.render('statistics/partialReport',{          
          reportData: reportData
        });
      }
  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    res.status(500).render('includes/500',{
      active: "" 
    });
  }
}

module.exports = {
    getFilters,
    postReport
 };
