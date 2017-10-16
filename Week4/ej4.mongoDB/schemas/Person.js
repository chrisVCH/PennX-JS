/**
* this is Person.js
* it is a mongoDB document
**/

// load mongoose helper
var mongoose = require('mongoose');

// connect to mongodb server
mongoose.connect('mongodb://localhost:27017/personDB');

// create a Schema
var Schema = mongoose.Schema;

var personSchema = new Schema( {
  name: {type: String, required: true, unique: true},
  age: Number
});

// export so others can use this document, as 'Person'
module.exports = mongoose.model('Person', personSchema);
