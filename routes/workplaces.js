// Author : Sheldon Trotman
var express = require('express');
var router = express.Router();
var Response = require('../util/response');
var Workplace = require('../data/models/workplaces');

/* POST a new workplace. */
router.post('/', function(req, res){
	work = new Workplace({
		name : req.body.name,
		location: req.body.location,
		description: req.body.description,
		managers : [req.session._id],
		employees : [],
		shifts : [],
		postedShifts : [],
		unapprovedM : [],
		unapprovedE : []
	}).save(function(err, doc) {
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : doc});
		}
	});
});



/* GET workplaces listing. */
router.get('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Workplace.find({}, function(err, docs) {
		if (err){
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data:docs});
		}
	});
});

/* GET a specific workplace. */
router.get('/:id', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Workplace.findById(req.params.id).populate('managers employees unapprovedM unapprovedE shifts').exec(function (err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data:doc});
		}
	});
});

/* DELETE an existing employee. */
router.delete('/:id', function(req, res) {
	Response.requestForDelete(req, res, Workplace, {_id : req.params.id});
});

/* DELETE an existing postedShift. */
router.delete('/:id/postedShifts/:sid', function(req, res) {

	Workplace.findOneAndUpdate({_id: req.params.id}, {$pull: {postedShifts: req.params.sid}})
	.exec(function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : doc});
		}
	});
});

/* PUT a new manager to this workplace's list of managers  */
router.put('/:id/managers/:mid', function(req, res) {
	Workplace.findOneAndUpdate({_id: req.params.id}, {$push: {managers: req.params.mid}})
	.exec(function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Workplace.findOneAndUpdate({_id: req.params.id}, {$pull: {unapprovedM: req.params.mid}})
			.exec(function(err, doc){
				if (err) {
					Response.sendErr(res, 404, 'Resource not found.');
				}
				else {
					Response.sendSuccess(res, {data : doc});
				}
			});
		}
	});
});

/* PUT a new employee to this workplace's list of employees  */
router.put('/:id/employees/:eid', function(req, res) {
	Workplace.findOneAndUpdate({_id: req.params.id}, {$push: {employees: req.params.eid}})
	.exec(function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Workplace.findOneAndUpdate({_id: req.params.id}, {$pull: {unapprovedE: req.params.eid}})
			.exec(function(err, doc){
				if (err) {
					Response.sendErr(res, 404, 'Resource not found.');
				}
				else {
					Response.sendSuccess(res, {data : doc});
				}
			});
		}
	});
});

/* PUT a new manager to this workplace's list of unapproved managers  */
router.put('/:id/managers/unapproved/:mid', function(req, res) {
	Response.requestForPut(req, res, Workplace, {_id: req.params.id}, {$push: {unapprovedM: req.params.mid}});
});

/* PUT a new employee to this workplace's list of unapproved employees  */
router.put('/:id/employees/unapproved/:eid', function(req, res) {
	Response.requestForPut(req, res, Workplace, {_id: req.params.id}, {$push: {unapprovedE: req.params.eid}});
});

/* PUT a new shift to this workplace's list of shift  */
router.put('/:id/shifts/:sid', function(req, res) {
	Response.requestForPut(req, res, Workplace, {_id: req.params.id}, {$push: {shifts: req.params.sid}});
});

/* PUT a new posted shift to this workplace's list of posted shifts  */
router.put('/:id/postedShifts/:sid', function(req, res) {
	Response.requestForPut(req, res, Workplace, {_id: req.params.id}, {$push: {postedShifts: req.params.sid}});
});

module.exports = router;
