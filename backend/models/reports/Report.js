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

// Método estático para encontrar reportes que cumplen con filtros
reportSchema.statics.findByFilters = function(filter) {
  return this.find(filter)
    .populate("idUser")
    .populate("idUnit");
};

module.exports = mongoose.model("Report", reportSchema, "report");
