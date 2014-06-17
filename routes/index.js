var express = require('express');
var gif = require('../models/gif.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET wires */
router.get('/wires', function (req, res){
  gif.find({}, function (err, wires){
    if(err){ console.log(err) }
    res.send(wires);
  })
});

/* GET wires/wire */
router.get('/wires/:id', function (req, res){
  gif.findOne({id: req.params.id}, function (err, wire){
    res.send(wire);
  })
})

module.exports = router;