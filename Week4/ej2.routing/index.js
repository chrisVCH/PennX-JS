var express = require('express');
var app = express();

// a middleware function
var nameFinder = (req, res, next) => {
  // get name from URL query
  var name = req.query.name;
  if (name) {
    // save to new req property
    req.username = name.toUpperCase();
  } else {
    req.username = 'Guest'
  };
  // call next() to chain middlewares
  next();
}

// another middleware function
var greeter = (req, res, next) => {
  res.status(200).type('html');
  // here we can use the saved property, saved in another middleware
  res.write('Hello, ' + req.username);
  next();
}
// another middleware function
var adminName = (req,res,next) => {
  req.username = 'Admin';
  next();
}

// now we can use multiple middleware in a single route
// this is called 'chaining'
app.use('/welcome', nameFinder, greeter, (req, res) => {
  res.end();
});

// and in another route, another chain
// we chaing 3 middleware functions here
app.use('/admin', adminName, greeter, (req, res) => {
  res.end();
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
