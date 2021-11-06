const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema(
  {
    division: {
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
    },
    sex: { 
      type: String, 
      required: true 
    },
    dateOfBirth: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    maritalStatus: {
      type: String, 
      required: true 
    },
    numberOfChildren: {
      type: String, 
    },
    citizenship: {
      type: String, 
      required: true 
    },
    religion: {
      type: String, 
      required: true 
    },
    phoneNumber: {
      type: String, 
      required: true 
    }, 
    email: {
      type: String, 
      required: true 
    },
    highestAttainedEducation: {
      type: String, 
      required: true 
    },
    statusEducation: {
      type: String, 
      required: true 
    }, 
    schoolEducation: {
      type: String, 
      required: true 
    }, 
    courseEducation: {
      type: String, 
      required: true 
    }, 
    pregnantMedical: {
      type: String, 
      required: true 
    }, 
    pregnantMonthsMedical: {
      type: String, 
    }, 
    bloodTypeMedical: {
      type: String, 
      required: true 
    }, 
    withMaintenanceMedical: {
      type: String, 
      required: true 
    }, 
    onGoingMedicationMedical: {
      type: String, 
      required: true 
    }, 
    nameOfMedicineMedical: {
      type: String, 
    }, 
    lastHospitalMedical: {
      type: String, 
    },
    username: {
      type: String, 
      required: true 
    },
    hashedPassword: {
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

const Division = mongoose.model("division", divisionSchema);

module.exports = Division;