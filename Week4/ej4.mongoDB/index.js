var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// requiere Person.js document
var Person = require('./schemas/Person.js');

app.use('/public', express.static('files'));

// create new entry and save to DB
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

// query all entries in DB
app.use('/all', (req, res) => {
  // use person schema
  Person.find( (err, allPeople) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else if (allPeople.length === 0) {
      res.type('html').status(200);
      res.send('There are no people!')
    } else {
      res.send(allPeople);
    }
  })
})

// query one entry in DB
app.use('/person', (req, res) => {
  var searchName = req.query.name;
  // Schema.findOne(queryString, callback)
  Person.findOne( {name: searchName}, (err, person) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else if (person.length === 0) {
      res.type('html').status(200);
      res.send('No person named ' + searchName);
    } else {
      res.send(person);
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
