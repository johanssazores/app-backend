const router = require("express").Router();
const Scanner = require("../models/scannerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils = require('../utils');

router.post("/create", async (req, res) => {
  try {
    const {
      email,
      locationName,
      password,
      passwordVerify,
      branch,
      firstName,
      lastName
      } = req.body;

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

    const existingUserScanner = await Scanner.findOne({ email });
    if (existingUserScanner)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
    });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newScanner = new Scanner({
      email,
      locationName,
      passwordHash,
      branch,
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
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingScanner = await Scanner.findOne({ email });

    if (!existingScanner)
      return res.status(401).json({ errorMessage: "No User Found" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingScanner.passwordHash
    );

    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const tokenScanner = utils.generateScannerToken(existingScanner);
    const userObj = utils.generateCleanScannerToken(existingScanner);

    return res.json({ scanner: userObj, tokenScanner });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }

});

router.post('/verifyToken/admin', async (req, res) => {

  try {
    const { tokenScanner } = req.body;

    if (!tokenScanner) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

  jwt.verify(tokenScanner, process.env.JWT_SECRET, async (err, scanner) => {

    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    const email = scanner.email;

    const existingUser = await Scanner.findOne({ email });

    const userVerify = JSON.stringify(scanner.id);
    const userVerifyData = JSON.stringify(existingUser._id);

    if (userVerify !== userVerifyData) {
       res.status(401).json({
        error: true,
        message: "Invalid scanner."
      });
    }

    var userObj = utils.generateCleanScannerToken(scanner);
    res.status(200).json({ scanner: userObj, tokenScanner });

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

      const updatedScanner = await Scanner.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedScanner);

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