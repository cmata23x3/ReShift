var mongoose = require('mongoose');

/*
* Defining the Shift Schema. 
* This schema will define how the Shift collection will be organized.
*/
var ShiftSchema = new mongoose.Schema({
	timestamp: {type: Date, required:true}, 
	duration: {type: Number, required:true},
	worker: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
	manager: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'}
});

module.exports = ShiftSchema;