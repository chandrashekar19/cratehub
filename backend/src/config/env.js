// Imports
const dotenv = require('dotenv')

// Load .env
dotenv.config()

// Environment & Port
const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 8000

module.exports = { NODE_ENV, PORT }
