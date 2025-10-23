// Imports
const { GraphQLString, GraphQLInt } = require('graphql')

// App Imports
const { ProductType } = require('./types')
const { create, update, remove } = require('./resolvers')

// Product create
const productCreate = {
  type: ProductType,
  args: {
    name: { name: 'name', type: GraphQLString },
    slug: { name: 'slug', type: GraphQLString },
    description: { name: 'description', type: GraphQLString },
    type: { name: 'type', type: GraphQLInt },
    gender: { name: 'gender', type: GraphQLInt },
    image: { name: 'image', type: GraphQLString }
  },
  resolve: create
}

// Product update
const productUpdate = {
  type: ProductType,
  args: {
    id: { name: 'id', type: GraphQLInt },
    name: { name: 'name', type: GraphQLString },
    slug: { name: 'slug', type: GraphQLString },
    description: { name: 'description', type: GraphQLString },
    type: { name: 'type', type: GraphQLInt },
    gender: { name: 'gender', type: GraphQLInt },
    image: { name: 'image', type: GraphQLString }
  },
  resolve: update
}

// Product remove
const productRemove = {
  type: ProductType,
  args: {
    id: { name: 'id', type: GraphQLInt }
  },
  resolve: remove
}

module.exports = { productCreate, productUpdate, productRemove }
