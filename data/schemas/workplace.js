var mongoose = require('mongoose');

/*
* Defining the Workplace Schema. 
* This schema will define how the Workplace collection will be organized.
*/
var WorkplaceSchema = new mongoose.Schema({
	name: {type: String, required:true, unique:true}, 
	location: String,
	description: String,
	managers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Manager'}],
	employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
	shifts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shift'}],
	postedShifts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shift'}],
	unapprovedE: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
	unapprovedM: [{type: mongoose.Schema.Types.ObjectId, ref: 'Manager'}]
});

module.exports = WorkplaceSchema;