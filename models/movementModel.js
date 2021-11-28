const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movement = mongoose.model("movement", movementSchema);

module.exports = Movement;