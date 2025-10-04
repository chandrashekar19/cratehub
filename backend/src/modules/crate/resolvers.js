// App Imports
const models = require('../../setup/models')
const params = require('../../config/params')

// Get crate by ID
async function getById(parentValue, { crateId }) {
  const crate = await models.Crate.findOne({ where: { id: crateId } })

  if (!crate) {
    throw new Error('The crate you are looking for does not exist or has been discontinued.')
  } else {
    return crate
  }
}

// Get all crates
async function getAll(parentValue, { orderBy }) {
  return await models.Crate.findAll({ order: [['id', orderBy]] })
}

// Create crate
async function create(parentValue, { name, description }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.create({ name, description })
  } else {
    throw new Error('Operation denied.')
  }
}

// Update crate
async function update(parentValue, { id, name, description }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.update(
      { name, description },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Delete crate
async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.destroy({ where: { id } })
  } else {
    throw new Error('Operation denied.')
  }
}

module.exports = { getById, getAll, create, update, remove }
