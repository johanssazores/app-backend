var jwt = require('jsonwebtoken')

function generateTokenAdmin(userAdmin) {
  if (!userAdmin) return null

  var u = {
    userId: userAdmin.userId,
    name: userAdmin.name,
    username: userAdmin.username,
    isAdmin: userAdmin.isAdmin
  }

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

function getCleanUserAdmin(userAdmin) {
  if (!userAdmin) return null

  return {
    userId: userAdmin.userId,
    name: userAdmin.name,
    username: userAdmin.username,
    isAdmin: userAdmin.isAdmin
  }
}

module.exports = {
  generateTokenAdmin,
  getCleanUserAdmin
}