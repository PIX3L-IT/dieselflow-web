const mongoose = require("mongoose");

// 🔧 Schema
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

const ReportModel = mongoose.model("Report", reportSchema, "report");

class ReportClass {
  static async countUserTrips(userId) {
    return await ReportModel.countDocuments({ idUser: userId });
  }

  static async getPaginatedReports(userId, page, limit = 5) {
    return await ReportModel.find({ idUser: userId })
      .sort({ loadDate: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate("idUnit");
  }

  static get model() {
    return ReportModel;
  }
}

module.exports = ReportClass;
