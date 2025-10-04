const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

// App Imports
const { ProductType, ProductTypesType } = require('./types')
const { getAll, getBySlug, getById, getRelated, getTypes } = require('./resolvers')

// Products All
const products = {
  type: new GraphQLList(ProductType),
  resolve: getAll
}

// Product By slug
const product = {
  type: ProductType,
  args: {
    slug: { type: GraphQLString }
  },
  resolve: getBySlug
}

// Product By ID
const productById = {
  type: ProductType,
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getById
}

// Products Related
const productsRelated = {
  type: new GraphQLList(ProductType),
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getRelated
}

// Product Types
const productTypes = {
  type: new GraphQLList(ProductTypesType),
  resolve: getTypes
}

module.exports = { products, product, productById, productsRelated, productTypes }
