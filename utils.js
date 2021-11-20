// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');

// generate token and return it
function generateToken(userAdmin) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!userAdmin) return null;

  var u = {
    userId: userAdmin._id,
    username: userAdmin.username,
    role: userAdmin.role,
    division: userAdmin.division,
    firstName: userAdmin.firstName,
    lastName: userAdmin.lastName,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// return basic user details
function getCleanUser(userAdmin) {
  if (!userAdmin) return null;

  return {
    userId: userAdmin._id,
    username: userAdmin.username,
    role: userAdmin.role,
    division: userAdmin.division,
    firstName: userAdmin.firstName,
    lastName: userAdmin.lastName,
  };
}

// generate token and return it
function generatePersonToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;

  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// return basic user details
function getCleanPerson(user) {
  if (!user) return null;
  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

module.exports = {
  generateToken,
  getCleanUser,
  generatePersonToken,
  getCleanPerson
}