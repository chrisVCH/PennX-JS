var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// requiere Person.js document
var Person = require('./schemas/Person.js');

app.use('/public', express.static('files'));

app.use('/handleForm', (req, res) => {
  var name = req.body.name;
  var lastName = req.body.lastname;
  res.write('Hello ' + name + ' ' + lastName);
  res.end();
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
