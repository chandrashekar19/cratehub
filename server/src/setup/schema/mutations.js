// Imports
const { GraphQLObjectType } = require('graphql')

// App Imports
const user = require('../../modules/user/mutations')
const product = require('../../modules/product/mutations')
const crate = require('../../modules/crate/mutations')
const subscription = require('../../modules/subscription/mutations')
// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

module.exports = mutation;
