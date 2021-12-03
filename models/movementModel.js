const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Movement = mongoose.model("movement", movementSchema);

module.exports = Movement;