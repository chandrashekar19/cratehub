// App Imports
const params = require('../../config/params')
const models = require('../../setup/models')

// Get all products
async function getAll() {
  return await models.Product.findAll({ order: [['id', 'DESC']] })
}

// Get product by slug
async function getBySlug(parentValue, { slug }) {
  const product = await models.Product.findOne({ where: { slug } })

  if (!product) {
    throw new Error('The product you are looking for does not exist or has been discontinued.')
  } else {
    return product
  }
}

// Get product by ID
async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } })

  if (!product) {
    throw new Error('The product you are looking for does not exist or has been discontinued.')
  } else {
    return product
  }
}

// Get related products
async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
    where: {
      id: { [models.Sequelize.Op.not]: productId }
    },
    limit: 3,
    order: [[models.Sequelize.fn('RAND')]] // mock related products by showing random products
  })
}

// Create product
async function create(parentValue, { name, slug, description, type, gender, image }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image
    })
  } else {
    throw new Error('Operation denied.')
  }
}

// Update product
async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      { name, slug, description, type, gender, image },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Delete product
async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({ where: { id } })

    if (!product) {
      throw new Error('The product does not exist.')
    } else {
      return await models.Product.destroy({ where: { id } })
    }
  } else {
    throw new Error('Operation denied.')
  }
}

// Product types
async function getTypes() {
  return Object.values(params.product.types)
}

module.exports = {
  getAll,
  getBySlug,
  getById,
  getRelated,
  create,
  update,
  remove,
  getTypes
}
