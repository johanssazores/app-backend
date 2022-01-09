const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils = require('../utils');
// register

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

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
    });

    const existingUserUsername = await User.findOne({ username });
    if (existingUserUsername)
      return res.status(400).json({
        errorMessage: "An account with this username already exists.",
    });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
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

    const savedUser = await newUser.save();
    
    res.status(200).json(savedUser);

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

    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong username or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong username or password." });


    const token = utils.generateToken(existingUser);
    const userObj = utils.getCleanUser(existingUser);

    return res.json({ user: userObj, token });
      
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

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    
      const updatedUser = await User.findByIdAndUpdate(
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
    const deleteUser = await User.findById(req.params.id);
      try {
        await deleteUser.delete();
        res.status(200).json("User has been deleted.");
      } catch(err) {
        res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;