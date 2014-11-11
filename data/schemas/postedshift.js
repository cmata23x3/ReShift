var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var ShiftSchema = require('./shift')

/*
* Defining the PostedShift Schema. 
* This schema will define how the PostedShift collection will be organized.
*/
var PostedShiftSchema = new mongoose.Schema({
	baseShift: {type: mongoose.Schema.Types.ObjectId, ref: 'Shift'}, 
	claimed: {type: Boolean, default: false},
	claimedWorker: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
	timePosted: {type: Date, default: Date.now}
});

module.exports = PostedShiftSchema;