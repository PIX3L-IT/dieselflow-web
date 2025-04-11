const mongoose = require('mongoose');

const privilegeSchema = new mongoose.Schema({
  namePrivilege: { type: String, required: true, maxlength: 64 }
});

module.exports = mongoose.model('Privilege', privilegeSchema);
