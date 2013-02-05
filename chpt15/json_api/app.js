var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http'),
    path = require('path');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Task = new Schema({
  task: {
    type: String,
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

var Task = mongoose.model('Task', Task);

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost/todo_development');
  app.set('port', 3000);
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost/todo_test');
  app.set('port', 3001);
});

app.get('/api/v1/tasks', function(req, res, next) {
  Task.fine({}, function(err, docs) {
    res.send(docs);
  });
});

app.get('/', routes.index);

app.get('/api/v1/tasks', function(req, res) {
  Task.find({}, function (err, docs) {
    res.render('/api/v1/tasks/index', {
      title: 'Todos index view',
      docs: docs
    });
  });
});

app.get('/api/v1/tasks/new', function(req, res) {
  res.render('/api/v1/tasks/new', {
    title: 'New Task'
  });
});

app.post('/api/v1/tasks', function(req, res) {
  var task = new Task(req.body.task);
  task.save(function(err) {
    if (!err) {
      req.flash('info', 'Task Created');
      res.redirect('/api/v1/tasks');
    } else {
      req.flash('warning', err);
      res.redirect('/api/v1/tasks/new');
    }
  });
});

app.get('/api/v1/tasks/:id/edit', function(req, res) {
  Task.findById(req.params.id, function (err, doc) {
    res.render('/api/v1/tasks/edit', {
      title: 'Edit Task View',
      task: doc
    });
  });
});

app.put('/api/v1/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function (err, doc) {
    doc.task = req.body.task.task;
    doc.save(function(err) {
      if (!err) {
        res.redirect('/api/v1/tasks');
      } else {
        // error handling
      }
    });
  });
});

app.del('/api/v1/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function (err, doc) {
    if (!doc) return next(new NotFound('Document not found'));
    doc.remove(function() {
      res.redirect('/api/v1/tasks');
    });
  });
});


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode.", app.get('port'), app.settings.env);
});