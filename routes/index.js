var express = require('express');
var router = express.Router();
const service = require('../services/index')

router.get('/', function(req, res, next) {
  let obj = service.create().map(item => JSON.stringify(item)).join('<p></p>')
  res.send(obj)
});

module.exports = router;
