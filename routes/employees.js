// Author : Alex Romero
var express = require('express');
var router = express.Router();
var Response = require('../util/response');
var Employee = require('../data/models/employees');
var User = require('../data/models/users');
var Workplace = require('../data/models/workplaces');

/* POST a new employee. */
router.post('/', function(req, res) {
	var worker = new Employee({
		email : req.body.email,
		password : req.body.password,
		name : req.body.name
	}).save(function(err, worker){
		if (err) {
			Response.sendErr(res, 500, 'An unknown error occurred.');
		}
		else {
			req.session.name = worker.name;
            req.session._id = worker._id;
            req.session.role = 'Employee';
			Response.sendSuccess(res, {data : worker});
		}
	});
});

/* GET employees listing. */
router.get('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Employee.find({}, function(err, docs) {
		if (err){
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data:docs});
		}
	});
});

/* GET a specific employee. */
router.get('/:id', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Employee.findById(req.params.id, function(err, doc){
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
	Response.requestForDelete(req, res, Employee, {_id: req.params.id});
});

/* PUT a new shift to this employee's list of claimed shifts */
router.put('/:id/shifts/:claimed', function(req, res) {
	Response.requestForPut(req, res, Employee, {_id: req.params.id}, {$push: {claimed: req.params.claimed}});
});

/* PUT new credentials. */
router.put('/:id', function (req, res) {
	Response.requestForPut(req, res, Employee, {_id: req.params.id}, {
		$set: {
			name : req.body.name,
			email : req.body.email, 
			password: req.body.password}
		});
});

/* GET the workplaces this employee is in. */
router.get('/:id/workplaces/member', function (req, res) {
	Workplace.find({}).populate("employees").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				work.employees.forEach(function(emp) {
					if (("" + emp._id) === req.params.id){
						list.push(work);
					}
				});
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});

/* GET the workplaces this employee has requested to join. */
router.get('/:id/workplaces/requested', function (req, res) {
	Workplace.find({}).populate("unapprovedE").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				work.unapprovedE.forEach(function(emp) {
					if (("" + emp._id) === req.params.id){
						list.push(work);
					}
				});
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});

/* GET the workplaces this employee is not in. */
router.get('/:id/workplaces/others', function (req, res) {
	Workplace.find({}).populate("unapprovedE employees").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				if (work.unapprovedE.indexOf(req.params._id) === -1) {
					if (work.employees.indexOf(req.params._id) === -1) {
						list.push(work);
					}
				}
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});









module.exports = router;