var User = require('../models/user');

exports.create = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      res.send(400, err);
      return;
    }

    res.json(201, user);
  });
};

// Create endpoint /api/users for GET
exports.list = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(400, err);
      return;
    }

    res.json(users);
  });
};