const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unitName: { type: String, required: true, maxlength: 30 },
  unitRegistrationDate: { type: Date, required: true },
  unitModel: { type: String, required: true, maxlength: 64 },
  unitStatus: { type: Boolean, required: true },
});

// Método estático para buscar todas las unidades registradas
unitSchema.statics.findAll = function() {
  return this.find();
};

// Método estático para buscar una unidad por nombre
unitSchema.statics.findByName = function(unitName) {
  return this.findOne({ unitName });
};

module.exports = mongoose.model("Unit", unitSchema, "unit");
