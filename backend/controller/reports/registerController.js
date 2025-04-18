const Report = require('../../models/reports/Report');

// POST: Crear un nuevo reporte
exports.createReport = async (req, res) => {
  try {
    const { idUnit, mileage, photoMileage, liters, photoLiters, efficiency, loadDate, startTime, endTime } = req.body;

    // Obtener el idUser del token verificado
    const idUser = req.user.id;

    const newReport = await Report.createReport({
      idUnit,
      idUser,
      mileage,
      photoMileage,
      liters,
      photoLiters,
      efficiency,
      loadDate,
      startTime,
      endTime
    });

    return res.status(201).json({
      message: 'Reporte creado exitosamente',
      report: newReport
    });
  } catch (error) {
    console.error('Error al crear el reporte:', error);
    return res.status(500).json({
      message: 'Hubo un error al crear el reporte',
      error: error.message
    });
  }
};
