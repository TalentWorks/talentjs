/**
 * Created by fraggi on 9/26/2014.
 */
var mongoose = require('mongoose');

module.exports = function() {
  var dbUrl = 'mongodb://' + (process.env.MONGODB || 'localhost');
  mongoose.connect(dbUrl, function(err) {
    if (err) {
      throw err;
    }
    console.log('Db open on: ' + dbUrl);
  });
};

