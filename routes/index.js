var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET update vote */
router.get('/upvote/:uid', function (req, res){
  console.log(req.params.uid);
  res.send(200);
});

module.exports = router;
