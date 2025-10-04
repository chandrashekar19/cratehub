// Imports
const express = require('express')

// App Imports
const setupLoadModules = require('./setup/load-modules')
const setupGraphQL = require('./setup/graphql')
const setupUpload = require('./setup/upload')
const setupStartServer = require('./setup/start-server')

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)
