/**
 * Created by fraggi on 9/26/2014.
 */

exports.dbUrl = function() {
  return 'mongodb://' + (process.env.MONGODB || 'localhost');
};