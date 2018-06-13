const DB = require('../persistence/index');

async function create(fundador) {
  let fundador_id = await DB.Fundadores.createFundador(fundador)
  console.log('Fundadores', fundador_id)
  return fundador_id
}

module.exports = {
  create
}