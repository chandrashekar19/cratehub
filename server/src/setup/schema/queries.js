// Imports
const { GraphQLObjectType } = require('graphql')

// App Imports
const user = require('../../modules/user/query')
const product = require('../../modules/product/query')
const crate = require('../../modules/crate/query')
const subscription = require('../../modules/subscription/query')

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription
  })
})

module.exports = query
