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
var adminName = (req, res, next) => {
  req.username = 'Admin';
  next();
}

var logger = (req, res, next) => {
  var url = req.url;
  var time = new Date();
  console.log('Recieved for ' + url + ' at ' + time);

  next();
}

// now we can use multiple middleware in a single route
// this is called 'chaining'
app.use('/welcome', nameFinder, greeter, logger, (req, res) => {
  res.end();
});

// and in another route, another chain
// we chaing 4 middleware functions here
app.use('/admin', adminName, greeter, logger, (req, res) => {
  res.end();
});

// Router example
// we can combine middleware function in common sub-routes
var commonRoute = express.Router();
commonRoute.use(greeter, logger, (req, res) => {res.end();});

app.use('/router', adminName, commonRoute);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
