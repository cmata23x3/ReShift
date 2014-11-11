var mongoose = require('mongoose');
var WorkplaceSchema = require('../schemas/workplace');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Workplace = mongoose.model('Workplace', WorkplaceSchema);

module.exports = Workplace;