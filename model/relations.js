const DB = require('../persistence/index');

async function create(relation) {
  relation = await DB.Relations.createRelation(relation)
  console.log('Relation', relation)
  return relation
}

module.exports = {
  create
}