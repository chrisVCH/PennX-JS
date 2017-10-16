var express = require('express');
var app = express();

// use body-parser middleware for http POST method
// saves http body into req.body
var bodyParser = require('body-parser');
// app use on every request.
app.use(bodyParser.urlencoded({ extended: true}));

// form.hmtl router. static files
app.use('/public', express.static('files'));

// form submition example. used with http POST method
app.use('/handleForm', (req, res) => {
  var name = req.body.name;
  var lastName = req.body.lastname;
  res.write('Hello ' + name + ' ' + lastName);
  res.end();
});

app.use('/', (req, res) => {

  // get data from URL. used on http GET method
  // example: /?name=gero&lastname=gil
  var query = req.query;
  var name = query.name;
  var lastName = query.lastname;
  res.write('Hello ' + name + ' ' + lastName);
  res.end();
});
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
