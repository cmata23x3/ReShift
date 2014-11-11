var mongoose = require('mongoose');
var EmployeeSchema = require('../schemas/employee');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;