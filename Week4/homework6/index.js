var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');


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

	var query = {};
	if (Number(req.query.age)>0) query = {age: {$lt: req.query.age}};

	Animal.find(query, {_id: 0, name: 1}, (err, results) => {
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
				var parsedResult = {};
				var count = results.length;
				parsedResult.count = count;

				var names = [];
				if (count > 0) {
					 names = results.map((element) => {
						 return element.name;
					});
					parsedResult.names = names;
				};
				res.json(parsedResult);
			}
    }
	})
});

// calculates price of a sum of toys
// query /calculatePrice?id[0]=123&qty[0]=2&id[1]=456&qty[1]=3
app.use('/calculatePrice', (req,res) => {

	// validate url query and write mongo query
	var ids = req.query.id;
	var qtys = req.query.qty;

	// if empty query
	if (!ids || !qtys) {
		res.json({});
		return;
	}
	// if the number of ids and qtys dont match
	if (ids.length !== qtys.length) {
		res.json({});
		return;
	}

	// filter ids where qty isnt valid
	var idsFiltered = [];
	var qtysFiltered = [];

	ids.forEach((id, index) => {
		if (qtys[index] > 0 && !Number.isNaN(qtys[index])) {
			idsFiltered.push(id);
			qtysFiltered.push(qtys[index]);
		};
	});

	// sumarize repited ids
	idsFiltered.forEach((id, index) => {
		// if we are at a repeated id, then we can find that id in a smaller index
		var firstIndex = idsFiltered.indexOf(id);
		if(index > firstIndex) {
			// add the repeated qty to the first index cuantity
			qtysFiltered[firstIndex] = String(Number(qtysFiltered[firstIndex]) + Number(qtysFiltered[index]));
		}
	});


	// perform find
	Toy.find({id: {$in: idsFiltered}}, {_id: 0}, (err, results) => {
		var response = {
									items: [],
									totalPrice: 0
								};

		//validate results
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		} else if (results == null) {
			res.type('html').status(200);
			res.json({});
		} else {
			// if query is empty, then return empty response
			if (idsFiltered.length === 0) {
				res.type('html').status(200);
				res.json(response);
			} else {
				// parse results and calculate totals
				results.forEach((result) => {
					var idIndex = idsFiltered.indexOf(result.id);
					var qty = qtysFiltered[idIndex];
					var subtotal = qty * result.price;
					var item = {
											item: result.id,
											qty: qty,
											subtotal: subtotal,
					};
					response.items.push(item);
					response.totalPrice = String(Number(response.totalPrice) + subtotal);
				});

				// send response
				res.json(response);
			}
		}
	});
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});


// Please do not delete the following line; we need it for testing!
module.exports = app;
