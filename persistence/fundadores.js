const knex = require('knex')(require('../knexfile'))

async function createFundador(fundador) {
  try {
    let response = await knex('bolt_fundadores').insert(fundador).returning('id');
    return response
  } catch (e) {
    return e
  }
}
module.exports = {
  createFundador
}