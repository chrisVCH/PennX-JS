var express = require('express');
var app = express();

// express routing examples

// this is a middleware function. it runs with /about URI
app.use('/about', (req, res) => {
  res.send('This is the about page');
});

// this is another middleware function, at /login URI
app.use('/login', (req, res) => {
  res.send('This is the login page');
});

// finally, a default page, in case the others aren't matched
app.use( /*default*/ (req, res) => {

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
