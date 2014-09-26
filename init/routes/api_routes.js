/**
 * Created by fraggi on 9/25/2014.
 */
var userController = require('../../controllers/user');
var authController = require('../../auth/localStrategy');

module.exports = function(app, express) {
  var apiRouter = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
  });

  apiRouter.get('/api/', function(req, res) {
    res.json({ message: 'API Root'});
  });

  apiRouter.route('/api/users')
      .get(userController.list)
      .post(userController.create);

  apiRouter.route('/api/users/:user_id')
      .delete(authController.isAuthenticated, userController.remove)
      .get(authController.isAuthenticated, userController.get)
      .put(authController.isAuthenticated, userController.update);

  return apiRouter;
};
