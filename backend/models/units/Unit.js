const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unitName: { type: String, required: true, maxlength: 30 },
  unitRegistrationDate: { type: Date, required: true },
  unitModel: { type: String, required: true, maxlength: 64 },
  unitStatus: { type: Boolean, required: true },
});

module.exports = mongoose.model("Unit", unitSchema);
