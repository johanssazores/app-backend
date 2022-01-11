const router = require("express").Router();
const Person = require("../models/personModel");
// const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      district,
      barangay,
      streetName,
      houseNumber,
      subdivision,
      maritalStatus,
      citizenship,
      phoneNumber,
      religion,
      noOfChildren,
      email,
      highestAttainedEducation,
      statusEducation,
      courseEducation,
      schoolEducation,
      bloodType,
      pregnant,
      monthsPregnant,
      withMaintenance,
      onGoingMedication,
      nameOfMedicine,
      oftenCheckUp,
      lastHospitalVisit,
      smoking,
      packsPerDay,
      drinking,
      frequencyDrinking,
      conditionDisease,
      sourceOfIncome,
      estimatedYearlyIncome,
      yearOfGraduation
    } = req.body;


    if (!email)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingPerson = await Person.findOne({ email });
    if (existingPerson)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    const newPerson = new Person({
      firstName,
      lastName,
      sex,
      dateOfBirth,
      district,
      barangay,
      streetName,
      houseNumber,
      subdivision,
      maritalStatus,
      citizenship,
      phoneNumber,
      religion,
      noOfChildren,
      email,
      highestAttainedEducation,
      statusEducation,
      courseEducation,
      schoolEducation,
      bloodType,
      pregnant,
      monthsPregnant,
      withMaintenance,
      onGoingMedication,
      nameOfMedicine,
      oftenCheckUp,
      lastHospitalVisit,
      smoking,
      packsPerDay,
      drinking,
      frequencyDrinking,
      conditionDisease,
      sourceOfIncome,
      estimatedYearlyIncome,
      yearOfGraduation,
    });

    const savedPerson = await newPerson.save();

    res.status(200).json(savedPerson);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingPerson = await User.findOne({ email });
    if (!existingPerson)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });


    const token = utils.generateToken(existingPerson);
    const userObj = utils.getCleanUser(existingPerson);

    return res.json({ user: userObj, token });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }

});

router.post('/verifyToken/person', async (req, res) => {

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {

    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    const username = user.username;

    const existingUser = await User.findOne({ username });

    const userVerify = JSON.stringify(user.userId);
    const userVerifyData = JSON.stringify(existingUser._id);

    if (userVerify !== userVerifyData) {
       res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }

    var userObj = utils.getCleanUser(user);

     res.status(200).json({ user: userObj, token });

  });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }

});

router.put("/:id", async (req, res) => {
  try {
      const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPerson);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
      try {
          await person.delete();
          res.status(200).json("Person has been deleted.");
      } catch(err) {
          res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res)=> {
    try {
      const person = await Person.findById(req.params.id);
      res.status(200).json(person);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;