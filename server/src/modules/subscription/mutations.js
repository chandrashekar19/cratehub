const { GraphQLInt } = require('graphql')

// App Imports
const SubscriptionType = require('./types')
const { create, remove } = require('./resolvers')

// Subscription create
const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Subscription remove
const subscriptionRemove = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

module.exports = { subscriptionCreate, subscriptionRemove }
