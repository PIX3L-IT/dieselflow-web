// backend/models/users/User.js
//Mongoose se encarga de hacer el Schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  username: String,
  lastName: String,
  password: String,
  registrationDate: Date,
  email: String,
  userStatus: Boolean,
  accessCode: String,
});

module.exports = mongoose.model("User", userSchema, "user");