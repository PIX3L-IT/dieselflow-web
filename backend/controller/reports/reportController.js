const Report = require("../../models/reports/Report");
const Unit = require("../../models/units/Unit");
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

// Get filters for report page
async function getFilters(req, res) {
  try {
    const units = await Unit.find();

    const driverRole = await Role.findOne({ roleName: "Conductor"});
    if (!driverRole) {
        return res.status(404).render('includes/404', { message: "Driver role not found" });
      }

    const drivers = await User.find({ idRole: driverRole._id});
    
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

// Post to generate report
async function postReport(req, res) {
  const { startDate, endDate, selectedUnit, selectedDriver } = req.body;

  try {
    const filter = {};

    filter.loadDate = {
      $gte: new Date(startDate).toISOString(),
      $lte: new Date(endDate).toISOString()
    };

    if (selectedDriver !== "todos") {
      const [username, lastName] = selectedDriver.split(" ");
      
      const user = await User.findOne({username: new RegExp(`^${username}$`, "i"),
        lastName: new RegExp(`^${lastName}$`, "i")
      });
      
      if (user) {
        filter.idUser = user._id;
      }
    }

    if (selectedUnit !== "todos") {
      const unit = await Unit.findOne({ unitName: { $regex: selectedUnit, $options: "i" } });
      
      if (unit) {
        filter.idUnit = unit._id;
      }
    }

    const reportData = await Report.find(filter);
    
    if (!reportData) {
        return res.render('statistics/partialReport',{
          reportData: 'none'
        });
      } else {
        res.render('statistics/partialReport',{          
          reportData
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
