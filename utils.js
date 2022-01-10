var jwt = require('jsonwebtoken');

function generateToken(userAdmin) {
  if (!userAdmin) return null;
  var u = {
    userId: userAdmin._id,
    username: userAdmin.username,
    role: userAdmin.role,
    district: userAdmin.district,
    address: userAdmin.address,
    barangay: userAdmin.barangay,
    firstName: userAdmin.firstName,
    lastName: userAdmin.lastName,
  };
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function getCleanUser(userAdmin) {
  if (!userAdmin) return null;
  return {
    userId: userAdmin._id,
    username: userAdmin.username,
    role: userAdmin.role,
    district: userAdmin.district,
    address: userAdmin.address,
    barangay: userAdmin.barangay,
    firstName: userAdmin.firstName,
    lastName: userAdmin.lastName,
  };
}


function generateScannerToken(user) {
  if (!user) return null;
  var u = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    branch: user.branch,
    locationName: user.locationName,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function generateCleanScannerToken(user) {
  if (!user) return null;
  return {
     id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    branch: user.branch,
    locationName: user.locationName,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
  generatePersonToken,
  getCleanPerson
}




function generatePersonToken(user) {

  if (!user) return null;
  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

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
  getCleanPerson,
  generateScannerToken,
  generateCleanScannerToken
}