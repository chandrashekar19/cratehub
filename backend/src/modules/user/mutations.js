// Imports
const { GraphQLString, GraphQLInt } = require('graphql')

// App Imports
const { UserType } = require('./types')
const { create, remove } = require('./resolvers')

// Create
const userSignup = {
  type: UserType,
  args: {
    name: { name: 'name', type: GraphQLString },
    email: { name: 'email', type: GraphQLString },
    password: { name: 'password', type: GraphQLString }
  },
  resolve: create
}

// Remove
const userRemove = {
  type: UserType,
  args: {
    id: { name: 'id', type: GraphQLInt }
  },
  resolve: remove
}

module.exports = { userSignup, userRemove }
