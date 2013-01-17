var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
var nicknames = [];

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


io.sockets.on('connection', function(socket) {
    socket.on('nickname', function(data, callback) {
      if (nicknames.indexOf(data) != -1) {
        callback(false);
      } else {
        callback(true);
        nicknames.push(data);
        socket.nickname = data;
        console.log('Nicknames are: ', nicknames);
      }
    });
    socket.on('disconnect', function() {
      if (!socket.nickname) return;
      if (nicknames.indexOf(socket.nickname) > -1) {
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      }
      console.log('Nicknames are: ', nicknames);
    });
});
