const router = require("express").Router();
const Person = require("../models/personModel");
// const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  try {
    const { 
      division,
      firstName,
      lastName,
      sex,
      dateOfBirth,
      address,
      maritalStatus,
      numberOfChildren,
      citizenship,
      religion,
      phoneNumber, 
      email,
      highestAttainedEducation,
      statusEducation, 
      schoolEducation, 
      courseEducation, 
      pregnantMedical, 
      pregnantMonthsMedical, 
      bloodTypeMedical, 
      withMaintenanceMedical, 
      onGoingMedicationMedical, 
      nameOfMedicineMedical, 
      lastHospitalMedical,
      password,
      passwordVerify
    } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingPerson = await Person.findOne({ email });
    if (existingPerson)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newPerson = new Person({
      division,
      firstName,
      lastName,
      sex,
      dateOfBirth,
      address,
      maritalStatus,
      numberOfChildren,
      citizenship,
      religion,
      phoneNumber, 
      email,
      highestAttainedEducation,
      statusEducation, 
      schoolEducation, 
      courseEducation, 
      pregnantMedical, 
      pregnantMonthsMedical, 
      bloodTypeMedical, 
      withMaintenanceMedical, 
      onGoingMedicationMedical, 
      nameOfMedicineMedical, 
      lastHospitalMedical,
      hashedPassword
    });

    const savedPerson = await newPerson.save();

    res.status(200).json(savedPerson);

    // // sign the token

    // const token = jwt.sign(
    //   {
    //     user: savedPerson._id,
    //   },
    //   process.env.JWT_SECRET
    // );

    // // send the token in a HTTP-only cookie

    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //   })
    //   .status(200).json(savedPerson);
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