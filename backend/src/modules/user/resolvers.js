// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// App Imports
const serverConfig = require('../../config/server')
const params = require('../../config/params')
const models = require('../../setup/models')

// Create
async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exist
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${email} is already registered. Please try to login.`)
  }
}

// Login
async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exist
    throw new Error(`We do not have any user registered with ${email} email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
async function getAll() {
  return await models.User.findAll()
}

// Delete
async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
async function getGenders() {
  return Object.values(params.user.gender)
}

module.exports = {
  create,
  login,
  getById,
  getAll,
  remove,
  getGenders
}
