const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
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
    district: {
      type: String, 
      required: true 
    },
    barangay: {
      type: String, 
      required: true 
    },
    streetName: {
      type: String, 
      required: true 
    },
    houseNumber: {
      type: String, 
      required: true 
    },
    subdivision: {
      type: String, 
      required: true 
    },
    maritalStatus: {
      type: String, 
      required: true 
    },
    citizenship: {
      type: String, 
      required: true 
    },
    phoneNumber: {
      type: String, 
      required: true 
    },
    religion: {
      type: String, 
      required: true 
    },
    noOfChildren: {
      type: String, 
    },
    email: {
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
    courseEducation: {
      type: String, 
      required: true 
    },
    schoolEducation: {
      type: String, 
      required: true 
    },
    bloodType: {
      type: String, 
      required: true 
    },
    pregnant: {
      type: String, 
    },
    monthsPregnant: {
      type: String, 
    },
    withMaintenance: {
      type: String, 
      required: true 
    },
    onGoingMedication: {
      type: String, 
      required: true 
    },
    nameOfMedicine: {
      type: String, 
    },
    oftenCheckUp: {
      type: String, 
      required: true 
    },
    lastHospitalVisit: {
      type: String, 
    },
    smoking: {
      type: String, 
      required: true 
    },
    packsPerDay: {
      type: String, 
    },
    drinking: {
      type: String, 
      required: true 
    },
    frequencyDrinking: {
      type: String, 
    },
    conditionDisease: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("person", personSchema);

module.exports = Person;