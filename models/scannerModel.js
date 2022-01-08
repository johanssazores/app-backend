const mongoose = require("mongoose");

const scannerSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  locationName: {
    type: String, 
    required: true 
  },
  branch: {
    type: String, 
    required: true 
  },
  firstName: {
    type: String, 
    required: true 
  },
  lastName: {
    type: String, 
    required: true 
  }
});

const Scanner = mongoose.model("scanner", scannerSchema);

module.exports = Scanner;