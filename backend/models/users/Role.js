const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, maxlength: 32 },
});

// Método estático para buscar los datos de un rol
roleSchema.statics.findRole = function(roleName) {
  return this.findOne({ roleName });
};

module.exports = mongoose.model("Role", roleSchema, "role");