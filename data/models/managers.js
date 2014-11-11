var mongoose = require('mongoose');
var ManagerSchema = require('../schemas/manager');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;