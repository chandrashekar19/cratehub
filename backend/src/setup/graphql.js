// Imports
const graphqlHTTP = require('express-graphql');

// App Imports
const serverConfig = require('../config/server.json')
const authentication = require('./authentication')
const schema = require('./schema')

// Setup GraphQL
function setupGraphQL(server) {
  console.info('SETUP - GraphQL...')

  // Apply authentication middleware
  server.use(authentication)

  // API (GraphQL on route `/graphql` or configured endpoint)
  server.use(
    serverConfig.graphql.endpoint,
    graphqlHTTP(request => ({
      schema,
      graphiql: serverConfig.graphql.ide,
      pretty: serverConfig.graphql.pretty,
      context: {
        auth: {
          user: request.user,
          isAuthenticated: request.user && request.user.id > 0
        }
      }
    }))
  )
}

module.exports = setupGraphQL
