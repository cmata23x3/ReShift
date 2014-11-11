var mongoose = require('mongoose');

/*
* Defining the User Schema. This schema will define how the User collection will be organized.
*/
var UserSchema = new mongoose.Schema({
	email: {type: String, required:true},
	password: {type: String, required:true}
});

module.exports = UserSchema;