var express = require('express');
var gif = require('../models/gif.js');
var Subscription = require('../models/subscription.js');

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
  });
});

/* GET wires/wire */
router.get('/wires/:id', function (req, res){
  gif.findOne({_id: req.params.id}, function (err, wire){
    res.send(wire);
  });
});

/* GET upvote/wire */
router.get('/upvote/:id', function (req, res){
  gif.findOneAndUpdate({_id: req.params.id}, {$inc:{votes:1}}, function(err, wire){
    if(err){ console.log(err) }
    res.send(200);
  })
})

/* GET subscribe/email */
router.post('/subscribe/:email', function (req, res){
  console.log('POST subscribe');
  var d = Date.now();
  var subscriber = {
    email: req.params.email,
    date: d
  }

  console.log(subscriber);

  var subscription = new Subscription(subscriber);
  subscription.save();
  res.send(200);
})

module.exports = router;