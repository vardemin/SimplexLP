var express = require('express');
var router = express.Router();
var YASMIJ = require('../YASMIJ');

router.get('/', function(req, res, next) {
  res.render('index',{title:'Симплекс метод ЛП'});
});
router.post('/', function(req, res) {
  var input = {
    type: req.body.types,
    objective : req.body.task,
    constraints : req.body.limit
  };
  var output = YASMIJ.solve( input );
  var result = output.result;
  var roots = {};
  var resu;
  for (var i in result) {
    if (i.indexOf('slack') == -1 && i.indexOf('z') == -1)
      roots[i] = result[i].toFixed(3);
    else if (i.indexOf('z')>-1)
      resu = result[i];
  }
  res.render('Result',{roots: roots,result: resu});
  //res.json(mas);
});
module.exports = router;
