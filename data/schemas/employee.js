var mongoose = require('mongoose');

/*
* Defining the Employee Schema. This extends the User schema
* This schema will define how the Employee collection will be organized.
*/
var EmployeeSchema = new mongoose.Schema({
	name: {type: String, required:true},
	email: {type: String, required:true},
	password: {type: String, required:true}
});

module.exports = EmployeeSchema;