const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true, maxlength: 255 },
  questionType: { type: String, required: true, maxlength: 32 },
});

module.exports = mongoose.model("Question", questionSchema);
