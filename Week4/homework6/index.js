var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

/*
app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
});
*/

// create new entry and save to DB
// http://localhost:3000/createToy?id=1234&name=toy1&price=2.2
app.use('/createToy', (req, res) => {

	var newToy = new Toy( {
		id: req.query.id,
		name: req.query.name,
		price: req.query.price,
	});

  newToy.save( (err) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else {
      res.type('html').status(200);
      res.json(1);
    }
  })
});

// create new entry and save to DB
// http://localhost:3000/createAnimal?name=tt&species=dog&breed=yorkie&gender=female&traits=crazy&age=3
app.use('/createAnimal', (req, res) => {

	var newAnimal = new Animal( {
		name: req.query.name,
		species: req.query.species,
		breed: req.query.breed,
		gender: req.query.gender,
		traits: req.query.traits,
		age: req.query.age,
	});

  newAnimal.save( (err) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else {
      res.type('html').status(200);
      res.json(1);
    }
  })
});

// finds toy with a given id
// query: /findToy?id=1234
app.use('/findToy', (req,res) => {

});

// finds animals
// query /findAnimals?species=Dog&trait=loyal&gender=female
app.use('/findAnimals', (req,res) => {

});

// finds animals under a certain age
// query /animalsYoungerThan?age=12
app.use('/animalsYoungerThan', (req,res) => {

});

// calculates price of a sum of toys
// query /calculatePrice?id[0]=123&qty[0]=2&id[1]=456&qty[1]=3
app.use('/calculatePrice', (req,res) => {

});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;
