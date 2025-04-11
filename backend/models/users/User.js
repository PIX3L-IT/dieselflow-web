const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  username: { type: String, required: true, maxlength: 30 },
  lastName: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 100 },
  registrationDate: { type: Date, required: true },
  email: { type: String, required: true, maxlength: 64 },
  userStatus: { type: Boolean, required: true },
  accessCode: { type: String, required: true, maxlength: 10 },
});

module.exports = mongoose.model("User", userSchema, "user");
