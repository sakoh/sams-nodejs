var express = require('express'),
    http = require('http'),
    path = require('path'),
    twitter = require('ntwitter');

var app = express();
var nicknames = [];
var twit = new twitter({
  consumer_key: '8SpC7rMosmOQXgIVWqYQA',
  consumer_secret: '5I0OhvtRFB1sKadIgC8CcmCr9yqsRkfj4v6j424ZY',
  access_token_key: '906244369-Vo90HxhkJ6HiPl2ssBaZtJBOasv5CJbxgbUQfbwU',
  access_token_secret: 'OabA4JfNIRdidm5yWl17dUVEJOAbGH0giRhsf3c'
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

twit.stream('statuses/filter', { track: ['love', 'hate'] }, function(stream) {
  stream.on('data', function(data) {
    io.sockets.volatile.emit('tweet', {
      user: data.user.screen_name,
      text: data.text
    });
  });
});

