const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  idUnit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mileage: { type: Number, required: true },
  photoMileage: { type: String, required: true, maxlength: 255 },
  liters: { type: Number, required: true },
  photoLiters: { type: String, required: true, maxlength: 255 },
  efficiency: { type: Number, required: true },
  loadDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

// Obtener el número de viajes de un usuario
reportSchema.statics.countUserTrips = function (userId) {
  return this.countDocuments({ idUser: userId });
};

// Obtener los reportes paginados
reportSchema.statics.getPaginatedReports = async function (userId, page, limit = 5) {
  const reports = await this.find({ idUser: userId })
    .sort({ loadDate: -1 })
    .skip(page * limit)
    .limit(limit)
    .populate("idUnit");

  const total = await this.countDocuments({ idUser: userId });
  return { reports, total };
};

// Obtener consumo total de diesel por día
reportSchema.statics.getDieselByDay = function (userId) {
  return this.aggregate([
    { $match: { idUser: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$loadDate" } } },
        totalLiters: { $sum: "$liters" },
      }
    },
    { $sort: { "_id.day": 1 } }
  ]);
};

// Contar rendimientos malos fuera del rango permitido
reportSchema.statics.countBadEfficiencies = function (userId) {
  return this.countDocuments({
    idUser: userId,
    $or: [
      { efficiency: { $gt: 1.10 } },
      { efficiency: { $lt: 0.90 } }
    ]
  });
};

delete mongoose.connection.models['Report'];
module.exports = mongoose.model("Report", reportSchema, "report");
