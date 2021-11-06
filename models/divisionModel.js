const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema(
  {
    division: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

const Division = mongoose.model("division", divisionSchema);

module.exports = Division;