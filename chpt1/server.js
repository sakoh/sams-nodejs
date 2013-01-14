var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('I am programming in Node.js\n');
}).listen(3000, "127.0.0.1");

console.log("Server running a http://127.0.0.1:3000");

