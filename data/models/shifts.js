var mongoose = require('mongoose');
var ShiftSchema = require('../schemas/shift');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Shift = mongoose.model('Shift', ShiftSchema);

module.exports = Shift;