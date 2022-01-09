const router = require("express").Router();
const Scanner = require("../models/scannerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils = require('../utils');

router.post("/create", async (req, res) => {
  try {
    const { email, username, password, passwordVerify, role, firstName, lastName, district, barangay, address } = req.body;

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

    const existingUserEmail = await Scanner.findOne({ email });
    if (existingUserEmail)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
    });

    const existingUserUsername = await Scanner.findOne({ username });
    if (existingUserUsername)
      return res.status(400).json({
        errorMessage: "An account with this username already exists.",
    });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newScanner = new Scanner({
      email,
      passwordHash,
      username,
      district,
      barangay,
      address,
      role,
      firstName,
      lastName
    });

    const savedScanner = await newScanner.save();
    
    res.status(200).json(savedScanner);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


router.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingScanner = await Scanner.findOne({ username });
    if (!existingScanner)
      return res.status(401).json({ errorMessage: "Wrong username or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingScanner.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong username or password." });


    const token = utils.generateToken(existingScanner);
    const userObj = utils.getCleanUser(existingScanner);

    return res.json({ scanner: userObj, token });
      
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
  
});

// verify the token and return it if it's valid
router.post('/verifyToken/admin', async (req, res) => {

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

  jwt.verify(token, process.env.JWT_SECRET, async (err, scanner) => {

    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    const username = scanner.username;

    const existingUser = await Scanner.findOne({ username });

    const userVerify = JSON.stringify(scanner.userId);
    const userVerifyData = JSON.stringify(existingUser._id);

    if (userVerify !== userVerifyData) {
       res.status(401).json({
        error: true,
        message: "Invalid scanner."
      });
    }

    var userObj = utils.getCleanUser(scanner);
    res.status(200).json({ scanner: userObj, token });

  });
      
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
 
});

router.get("/", async (req, res) => {
  try {
    const users = await Scanner.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const scanner = await Scanner.findById(req.params.id)
    res.json(scanner);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    
      const updatedUser = await Scanner.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);

  } catch(err) {
      res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Scanner.findById(req.params.id);
      try {
        await deleteUser.delete();
        res.status(200).json("Scanner has been deleted.");
      } catch(err) {
        res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;