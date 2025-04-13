const mongoose = require("mongoose");

const containsSchema = new mongoose.Schema({
  idRole: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  idPrivilege: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Privilege",
    required: true,
  },
});

module.exports = mongoose.model("Contains", containsSchema, "contains");
