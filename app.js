var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var config = require('./config.json');
var CronJob = require('cron').CronJob;
var request = require('request');
var bodyParser = require('body-parser');
var Gif = require('./models/gif.js');
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');

mongoose.connect(config.mongodbConnection);

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
new CronJob('* * * * * *', function(){
  scrape();
}, null, true, "America/Los_Angeles");


var scrape = function (){
  request('http://www.reddit.com/r/HighlightGIFS.json?sort=new', function (error, response, body){
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      var posts = body.data.children;
      for(post in posts){
        var title = posts[post].data.title;
        var domain = posts[post].data.domain;
        var url = posts[post].data.url;
        console.log(title);

        if(domain === 'gfycat.com'){
          url += '.gif';
          url = url.replace('http://', 'giant.', 'gi');
        } 

        Gif.findOne({name: title}, function(err, post){
          if(!err && !post){
            console.log('no gif!', title);
            var d = new Date();
            var myGif = {
              name: title,
              imgUrl: url,
              created: d,
              votes: 0,
            }

            var gif = Gif(myGif);
            gif.save();
          } else {
            console.log('gif found!  ', post);
          }
        });
      }
    }
  });
}

*/



var scrape = function (){
  request('http://www.reddit.com/r/HighlightGIFS.json?sort=new', function (error, response, body){
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      var posts = body.data.children;
      
      function asyncLoop( i, callback ) {
        if( i < posts.length ) {

          var title = posts[i].data.title;
          var domain = posts[i].data.domain;
          var url = posts[i].data.url; 

          if(domain === 'gfycat.com'){
            url += '.gif';
            url = url.replace('http://www.', 'giant.', 'gi');
            url = url.replace('http://', 'giant.', 'gi');
          } else {
            url = url.replace('http://www.', '', 'gi');
            url = url.replace('http://', '', 'gi');
          } 

          Gif.findOne({name: title}, function(err, post){
            if(!err && !post){
              console.log('no gif!', title);
              var d = new Date();
              var myGif = {
                name: title,
                imgUrl: url,
                created: d,
                votes: 0,
              }

              var gif = Gif(myGif);
              gif.save(function (err){
                if(err){console.log('err', err)}
                asyncLoop( i+1, callback );
              });
            } else {
              asyncLoop( i+1, callback );
              console.log('gif found!  ', post);
            }
          });

        } else {
          callback();
        }
      }

      asyncLoop( 0, function() {
        console.log('done');
          // put the code that should happen after the loop here
      });
    }

  })
}





scrape();

module.exports = app;
