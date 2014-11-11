var mongoose = require('mongoose');

/*
* Defining the Manager Schema. 
* This schema will define how the Manager collection will be organized.
*/
var ManagerSchema = new mongoose.Schema({
	name: {type: String, required:true},
	email: {type: String, required:true},
	password: {type: String, required:true}
});

module.exports = ManagerSchema;