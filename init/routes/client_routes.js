/**
 * Created by fraggi on 9/25/2014.
 */
var authController = require('../../auth/localStrategy');

module.exports = function(app, express) {
  var clientRouter = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
  });

  clientRouter.get('/client/', function(req, res) {
    res.render('index.ejs');
  });

  clientRouter.get('/client/login', function(req, res) {
    res.render('login.ejs', { message: '' });
  });

  clientRouter.get('/client/signup', function(req, res) {
    res.render('signup.ejs', { message: '' });
  });

  clientRouter.get('/client/profile', authController.isAuthenticated, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });

  clientRouter.get('/client/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return clientRouter;
};
