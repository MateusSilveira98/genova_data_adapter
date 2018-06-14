const knex = require('knex')(require('../knexfile'))
async function createRelation(relation) {
  try {
    let response = await knex('bolt_relations').insert(relation).returning('*');
    return response
  } catch (e) {
    return e
  }
}
module.exports = {
  createRelation
}