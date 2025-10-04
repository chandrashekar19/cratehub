// Imports
const { GraphQLSchema } = require('graphql')

// App Imports
const query = require('./queries')
const mutation = require('./mutations')

// Export schema
module.exports = new GraphQLSchema({
  query,
  mutation
})


// Schema
module.exports = new GraphQLSchema({
  query,
  mutation
})
 