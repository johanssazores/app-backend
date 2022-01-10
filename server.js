const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,

  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

const userData = {
  userId: "123123",
  password: "123456",
  name: "Johanssen",
  username: "johanss",
  isAdmin: true
};

app.use(cookieParser());
app.use(
  cors({
    origin: [
      `${process.env.FRONTEND_URL}`,
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to Project App - ' + req.user.name);
});

app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }

  const token = utils.generateToken(userData);
  const userObj = utils.getCleanUser(userData);

  return res.json({ user: userObj, token });
});

app.get('/verifyToken', function (req, res) {

  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {

    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }

    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.use("/user", require("./routes/userRouter"));
app.use("/person", require("./routes/personRouter"));
app.use("/movement", require("./routes/movementRouter"));
app.use("/scanner", require("./routes/scannerRouter"));

app.listen(port, () => {
  console.log('Server started on: ' + port);
});