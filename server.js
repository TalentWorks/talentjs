var express = require('express');
var slash = require("express-slash");
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var userController = require('./controllers/user');
var authController = require('./auth/localStrategy');

console.log('Connecting to database');
var mongodb = process.env.MONGODB || 'localhost';
mongoose.connect('mongodb://' + mongodb, function(err) {
  if (err) {
    throw err;
  }
  console.log('Db open');
});

console.log('Setting routes');
var app = express();
app.enable('strict routing');

var apiRouter = express.Router({
  caseSensitive: app.get('case sensitive routing'),
  strict       : app.get('strict routing')
});
apiRouter.get('/', function(req, res) {
  res.json({ message: 'API Root'});
});

console.log('Setting user routes');
apiRouter.route('/users')
  .get(userController.list)
  .post(userController.create);

apiRouter.route('/users/:user_id')
  .delete(authController.isAuthenticated, userController.remove)
  .get(authController.isAuthenticated, userController.get)
  .put(authController.isAuthenticated, userController.update);

console.log('Setting client routes');
var clientRouter = express.Router({
  caseSensitive: app.get('case sensitive routing'),
  strict       : app.get('strict routing')
});
clientRouter.get('/', function(req, res) {
  res.render('index.ejs');
});

clientRouter.get('/login', function(req, res) {
  res.render('login.ejs', { message: '' });
});

clientRouter.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: '' });
});

clientRouter.get('/profile', authController.isAuthenticated, function(req, res) {
  res.render('profile.ejs', {
    user : req.user
  });
});

clientRouter.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

console.log('Setting middleware');
app.use(morgan('dev'));
app.use('/api/', cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use('/api/', apiRouter);
app.use('/client/', clientRouter);
app.use(slash());

// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on: ' + port);