const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, maxlength: 32 },
});

module.exports = mongoose.model("Role", roleSchema);
