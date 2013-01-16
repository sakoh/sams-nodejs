var fs = require('fs');
fs.readFile('file.txt', 'utf-8', function(err, data) {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});