var mongoose    = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    firstName:    { type: String, required: 'First name is required' },
    middleName:   { type: String, required: false },
    lastName:     { type: String, required: 'Last name is required' },
    primaryEmail: { type: String, required: 'Primary email is required', 
                    index: true, unique: true },
    password:     { type: String, required: 'Password is required' }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
 // bcrypt.genSalt(5, function(err, salt) {
 //   if (err) return callback(err);

    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
//  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);