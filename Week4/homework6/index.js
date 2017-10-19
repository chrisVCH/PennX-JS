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
	var toyId = req.query.id;
	//Schema.findOne(queryString, callback)
	Toy.findOne({id: toyId}, (err, toy) => {
		if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else if (toy == null) {
      res.type('html').status(200);
      res.json({});
    } else {
      res.type('html').status(200);
      res.json(toy);
    }
	})
});

// finds animals
// query /findAnimals?species=Dog&trait=loyal&gender=female
app.use('/findAnimals', (req,res) => {
	// find every animal with query species and gender
	// and with the query trait among its traits

	var query = {};
	// with a proyection, we can define which fields return from the query
	// and wich fields we leave out
	var projection = { _id: 0, __v:0, traits: 0};

	if (req.query.species) query.species = req.query.species;
	if (req.query.trait) query.traits = req.query.trait;
	if (req.query.gender) query.gender = req.query.gender;

	Animal.find(query, projection, (err, results) => {
		if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else if (results == null) {
      res.type('html').status(200);
      res.json({});
    } else {
			// if query is empty, then return empty object
			if (Object.keys(query).length === 0) {
				res.type('html').status(200);
	      res.json({});
			} else {
	      res.type('html').status(200);
	      res.json(results);
			}
    }
	})


});

// finds animals under a certain age
// query /animalsYoungerThan?age=12
app.use('/animalsYoungerThan', (req,res) => {
	/*
	This API finds all Animals in the “animals” collection that have an age that is less than (but not equal to!) the age parameter.
	The return value is an object that has two properties:
	 “count”: the number of Animals whose age is less than the age> parameter.
	 “names”: an array containing the names of the Animals whose age is less than the age> parameter (these can be arranged in any order in the array)
	If there are no Animals that have an age less than the age> parameter, then the API should return an object that has a “count” property set to 0, but no “names” property
	If the age> parameter is unspecified or non-numeric, then the API should return an empty object
	*/
	var query = {age: {$lt: req.query.age}}
	Animal.find(query, (err, results) => {
		if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else if (results == null) {
      res.type('html').status(200);
      res.json({});
    } else {
			// if query is empty, then return empty object
			if (Object.keys(query).length === 0) {
				res.type('html').status(200);
	      res.json({});
			} else {
	      res.type('html').status(200);

				// parse results to {count: count, names: []}
				res.json(results);
			}
    }
	})
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
