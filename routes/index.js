var express = require('express');
var router = express.Router();
const service = require('../services/index')

router.get('/', function(req, res, next) {
  res.send(service.createEmpresa().map(item => JSON.stringify(item)).join('<p></p>'))
});

module.exports = router;
