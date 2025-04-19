const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, maxlength: 32 },
});

// Método estático para buscar un rol por su nombre
roleSchema.statics.findByRoleName = async function (name) {
  return await this.findOne({ roleName: name.trim() });
};


module.exports = mongoose.model("Role", roleSchema, "role");