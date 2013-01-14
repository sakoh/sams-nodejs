var fs = require('fs');

fs. readFile('somefile.txt', 'utf-8', function(err, data) {
  if (err) {
    console.log("Cant find file");
    throw err;
  } else {
    console.log(data);
  }
});

