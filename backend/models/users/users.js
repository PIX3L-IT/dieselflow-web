const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role" // Cambia esto si el nombre de tu modelo de rol es distinto
  },
  username: {
    type: String,
    required: true
  },
  lastName: String,
  password: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  userStatus: {
    type: Boolean,
    default: true
  },
  accessCode: String
});

module.exports = mongoose.model("user", userSchema);
