const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: {
    type: String
  },
  district: {
    type: String
  },
  barangay: {
    type: String
  },
  address: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;