// Imports
const { GraphQLString, GraphQLInt } = require('graphql')

// App Imports
const CrateType = require('./types')
const { create, remove, update } = require('./resolvers')

// Crate create
const crateCreate = {
  type: CrateType,
  args: {
    name: { name: 'name', type: GraphQLString },
    description: { name: 'description', type: GraphQLString }
  },
  resolve: create
}

// Crate update
const crateUpdate = {
  type: CrateType,
  args: {
    id: { name: 'id', type: GraphQLInt },
    name: { name: 'name', type: GraphQLString },
    description: { name: 'description', type: GraphQLString }
  },
  resolve: update
}

// Crate remove
const crateRemove = {
  type: CrateType,
  args: {
    id: { name: 'id', type: GraphQLInt }
  },
  resolve: remove
}

module.exports = { crateCreate, crateUpdate, crateRemove }
