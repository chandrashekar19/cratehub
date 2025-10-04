// Imports
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// App Imports
const { NODE_ENV } = require('../config/env')

// Load express modules
function setupLoadModules(server) {
  console.info('SETUP - Loading modules...')

  // Enable CORS
  server.use(cors())

  // Request body parser
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))

  // Request body cookie parser
  server.use(cookieParser())

  // Static files folder
  server.use(express.static(path.join(__dirname, '..', '..', 'public')))

  // HTTP logger
  if (NODE_ENV === 'development') {
    server.use(morgan('tiny'))
  }
}

module.exports = setupLoadModules;
