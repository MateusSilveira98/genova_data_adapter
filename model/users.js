const DB = require('../persistence/index');

async function create(user) {
  let user_id = await DB.Users.createUser(user)
  console.log('user', user_id)
  return user_id
}

module.exports = {
  create
}