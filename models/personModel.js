const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    sex: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    district: {
      type: String,
    },
    barangay: {
      type: String,
    },
    streetName: {
      type: String,
    },
    houseNumber: {
      type: String,
    },
    subdivision: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    citizenship: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    religion: {
      type: String,
    },
    noOfChildren: {
      type: String,
    },
    email: {
      type: String,
    },
    highestAttainedEducation: {
      type: String,
    },
    courseEducation: {
      type: String,
    },
    schoolEducation: {
      type: String,
    },
    bloodType: {
      type: String,
    },
    pregnant: {
      type: String,
    },
    monthsPregnant: {
      type: String,
    },
    withMaintenance: {
      type: String,
    },
    onGoingMedication: {
      type: String,
    },
    nameOfMedicine: {
      type: String,
    },
    oftenCheckUp: {
      type: String,
    },
    lastHospitalVisit: {
      type: String,
    },
    smoking: {
      type: String,
    },
    packsPerDay: {
      type: String,
    },
    drinking: {
      type: String,
    },
    frequencyDrinking: {
      type: String,
    },
    conditionDisease: {
      type: String,
    },
    sourceOfIncome: {
      type: String,
    },
    estimatedYearlyIncome: {
      type: String,
    },
    yearOfGraduation: {
      type: String,
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("person", personSchema);

module.exports = Person;