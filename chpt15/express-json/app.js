var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
var rebels = [
  { name: 'Han Solo' },
  { name: 'Luke Skywalker' },
  { name: 'C-3PO' },
  { name: 'R2-D2' },
  { name: 'Chewbacca' },
  { name: 'Princess Leia' }
];



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
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res) {
    res.send(rebels);
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode.", app.get('port'), app.settings.env);
});