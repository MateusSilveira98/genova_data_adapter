const axios = require('axios');
const JSONs = require('../extract/extractJSON');
const Sleep = require('sleep');
const endpoint = 'http://ec2-18-231-122-142.sa-east-1.compute.amazonaws.com';

module.exports = {
  createEmpresa() {
    let empresasWithUsers = JSONs.getEmpresas();
    for (let i = 0; i < empresasWithUsers.length; i++) {
      console.log('rodou', empresasWithUsers[i].nome);
      Sleep.sleep(5)
    }
    return empresasWithUsers
  }
}
