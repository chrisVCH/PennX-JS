var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// requiere Person.js document
var Person = require('./schemas/Person.js');

app.use('/public', express.static('files'));

app.use('/create', (req, res) => {
  // create new person, from Person.js, passing in values
  var newPerson = new Person( {
    name: req.body.name,
    age: req.body.age,
  });

  //save new person to DB
  newPerson.save( (err) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else {
      res.send('Person saved!');
    }
  })
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
