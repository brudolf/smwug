var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  email            : String,
  password         : String,
  firstname        : String,
  lastname         : String,
  profileimage     : String,
  facebook: {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter: {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}
