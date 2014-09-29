/**
 * Created by fraggi on 9/26/2014.
 */
var mongoose = require('mongoose');
var config = require('../config/database.js');

module.exports = function() {
  var dbUrl = config.dbUrl();
  mongoose.connect(dbUrl, function(err) {
    if (err) {
      throw err;
    }
    console.log('Db open on: ' + dbUrl);
  });
};
