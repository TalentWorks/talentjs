var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

console.log('Connecting to database');
var mongodb = process.env.MONGODB || 'localhost';
mongoose.connect('mongodb://' + mongodb, function(err) {
  if (err) {
    throw err;
  }
  console.log('Db open');
});

console.log('Setting generic routes');
var router = express.Router();
router.get('/', function(req, res) {
  res.json({ message: 'API Root'});
});

console.log('Setting user routes');
router.route('/users')
  .get(userController.list)
  .post(userController.create);

router.route('/users/:user_id')
	.delete(authController.isAuthenticated, userController.remove)
  .get(authController.isAuthenticated, userController.get)
	.put(authController.isAuthenticated, userController.update);

console.log('Setting middleware');
var app = express();
app.use(morgan('dev'));
app.use('/api', cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', router);

// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on: ' + port);