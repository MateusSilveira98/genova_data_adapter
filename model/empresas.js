const DB = require('../persistence/index');

async function create(empresa) {
  let empresa_id = await DB.Empresas.createEmpresa(empresa)
  console.log('Empresa', empresa_id)
  return empresa_id
}

module.exports = {
  create
}