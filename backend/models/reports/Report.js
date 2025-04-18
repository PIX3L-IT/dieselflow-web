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

delete mongoose.connection.models['Report'];

const Report = mongoose.model("Report", reportSchema, "report");

class ReportClass {
  static async countUserTrips(userId) {
    return await Report.countDocuments({ idUser: userId });
  }

  static async getPaginatedReports(userId, page, limit = 5) {
    const reports = await Report.find({ idUser: userId })
      .sort({ loadDate: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate("idUnit");
  
    const total = await Report.countDocuments({ idUser: userId });
    return { reports, total };
  }
    
  //Obtener el diesel gastado por día de un camionero
  static async getDieselByDay (userId) {
    return  Report.aggregate([
      { $match: { idUser: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$loadDate" } },
          },
          totalLiters: { $sum: "$liters" },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);
  }

  static get model() {
    return Report;
  }
}

module.exports = ReportClass;
