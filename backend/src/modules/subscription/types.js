// Imports
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

// App Imports
const { UserType } = require('../user/types')
const CrateType = require('../crate/types')

// Subscription type
const SubscriptionType = new GraphQLObjectType({
  name: 'subscription',
  description: 'Subscription Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    crate: { type: CrateType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

module.exports = SubscriptionType
