var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');


app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
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
