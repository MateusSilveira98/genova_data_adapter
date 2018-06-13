const knex = require('knex')(require('../knexfile'))

async function createUser(user) {
  try {
    let response = await knex('bolt_users').insert(user).returning('id');
    return response
  } catch (e) {
    return e
  }
}
module.exports = {
  createUser
}