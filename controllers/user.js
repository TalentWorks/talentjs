var User = require('../models/user');

exports.create = function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,  
    primaryEmail: req.body.primaryEmail,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      res.json(400, err);
      return;
    }

    res.json(201, user);
  });
};

// Create endpoint /api/users for GET
exports.list = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.json(400, err);
      return;
    }

    res.json(users);
  });
};

exports.get = function(req, res) {
  User.findById(req.params.user_id, function(err, beer) {
    if (err) {
      res.json(400, err);
      return;
    }

    res.json(beer);
  });
};

exports.update = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.json(400, err);
      return;
    }

    user.firstName = req.body.firstName;
    user.middleName = req.body.middleName;
    user.lastName = req.body.lastName;
    user.primaryEmail = req.body.primaryEmail;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) {
          res.json(400, err);
          return;
        }

        res.json(user);
    });
  });
};

exports.remove = function(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err) {
      res.json(400, err);
      return;
    }

    res.json({ message: 'User ' + req.params.user_id + ' removed' });
  });
};
