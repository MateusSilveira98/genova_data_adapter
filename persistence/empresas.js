const knex = require('knex')(require('../knexfile'))
async function createEmpresa(empresa) {
  try {
    let response = await knex('bolt_empresas').insert(empresa).returning('id');
    return response
  } catch (e) {
    return e
  }
}
module.exports = {
  createEmpresa
}