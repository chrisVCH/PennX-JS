var express = require('express');
var app = express();

app.use('/', (req, res) => {

  var method = req.method;
  var url = req.url;
  var headers = req.headers;

  res.status(200);
  res.type('html');
  res.write('Hello World');
  res.write('<p>');
  res.write('method: ' + method + ' url: ' + url + ' headers: ' + headers);

  res.end();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
