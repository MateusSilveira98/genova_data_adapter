var express = require('express');
var router = express.Router();
const service = require('../services/index')

router.get('/', function(req, res, next) {
  service.createEmpresa(res).then(() => res.sendStatus(200))
});

module.exports = router;
