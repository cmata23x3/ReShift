var mongoose = require('mongoose');
var PostedShiftSchema = require('../schemas/postedshift');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var PostedShift = mongoose.model('PostedShift', PostedShiftSchema);

module.exports = PostedShift;