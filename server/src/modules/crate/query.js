const { GraphQLInt, GraphQLString, GraphQLList } = require('graphql')

// App Imports
const CrateType = require('./types')
const { getAll, getById } = require('./resolvers')

// Crates All
const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
  },
  resolve: getAll
}

// Crate By ID
const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  resolve: getById
}

module.exports = { crates, crateById }
