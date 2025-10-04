// Imports
const { GraphQLInt, GraphQLList } = require('graphql')

// App Imports
const SubscriptionType = require('./types')
const { getAll, getByUser, get } = require('./resolvers')

// Subscriptions All
const subscriptions = {
  type: new GraphQLList(SubscriptionType),
  resolve: getAll
}

// Subscriptions by user
const subscriptionsByUser = {
  type: new GraphQLList(SubscriptionType),
  resolve: getByUser
}

// Subscription By id
const subscription = {
  type: SubscriptionType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}

module.exports = { subscriptions, subscriptionsByUser, subscription }
