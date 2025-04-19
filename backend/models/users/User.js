const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  idUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
  },
  username: { type: String, required: true, maxlength: 30 },
  lastName: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 100 },
  registrationDate: { type: Date, required: true },
  email: { type: String, required: true, maxlength: 64 },
  userStatus: { type: Boolean, required: true },
  accessCode: { type: String, required: true, maxlength: 10 },
});

// Función para consultar los usuarios con su rol
userSchema.statics.getAllUsers = function () {
  return this.find().populate("idRole").exec();
};

// Método estático para buscar por username y lastName
userSchema.statics.findByUsernameAndLastName = function(username, lastName) {
  return this.findOne({ username, lastName }).populate("idRole");
};

// Método estático para buscar por email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email }).populate("idRole");
};

// Método estático para buscar por username solo
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username }).populate("idRole");
};

// Método estático para buscar la unidad con un userId
userSchema.statics.getUserWithUnit = function (userId) {
  return  this.findById(userId).populate("idUnit");
}

module.exports = mongoose.model("User", userSchema, "user");