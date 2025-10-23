// Imports
const { GraphQLInt, GraphQLString, GraphQLList } = require('graphql')

// App Imports
const { UserType, UserLoginType, UserGenderType } = require('./types')
const { getAll, getById, login, getGenders } = require('./resolvers')

// All
const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
const userLogin = {
  type: UserLoginType,
  args: {
    email: { name: 'email', type: GraphQLString },
    password: { name: 'password', type: GraphQLString },
    role: { name: 'role', type: GraphQLString }
  },
  resolve: login
}

// Genders
const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}

module.exports = { users, user, userLogin, userGenders }
