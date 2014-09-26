var express = require('express');
var slash = require("express-slash");
var cors = require('cors');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');

require('./init/mongodb.js')();

var app = express();
app.enable('strict routing');

var apiRouter = require('./init/routes/api_routes.js')(app, express);
var clientRouter = require('./init/routes/client_routes.js')(app, express);

app.use(morgan('dev'));
app.use('/api', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use(apiRouter);
app.use(clientRouter);
app.use(slash());

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on: ' + port);