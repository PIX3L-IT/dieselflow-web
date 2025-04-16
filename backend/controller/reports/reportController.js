const Report = require("../../models/reports/Report");
const Unit = require("../../models/units/Unit");
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

// Get filters for report page
async function getFilters(req, res, next) {
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
        reports: ''
      });
  } catch (error) {
    console.error("Error al obtener los elementos de filtros:", error);
    res.status(500).render('includes/500',{
      active: "" 
    });
  }
}

module.exports = {
    getFilters,
    //postReport
 };
