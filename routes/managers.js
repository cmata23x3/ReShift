// Author : Alex Romero

var express = require('express');
var router = express.Router();
var Response = require('../util/response');
var User = require('../data/models/users');
var Manager = require('../data/models/managers');
var Workplace = require('../data/models/workplaces');


/* POST a new manager. */
router.post('/', function(req, res) {
	var worker = new Manager({
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
            req.session.role = 'Manager';
			Response.sendSuccess(res, {data : worker});
		}
	});
});


/* GET managers listing. */
router.get('/', function(req, res) {
	Manager.find({}, function(err, docs) {
		if (err){
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data:docs});
		}
	});
});

/* GET a specific manager. */
router.get('/:id', function(req, res) {
	Manager.findById(req.params.id, function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data: doc});
		}
	});
});

/* DELETE an existing manager. */
router.delete('/:id', function(req, res) {
	Response.requestForDelete(req, res, Manager, {_id : req.params.id});
});

/* PUT a new shift to this manager's list of supervised shifts */
router.put('/:id/shifts/:supervised', function(req, res) {
	Response.requestForPut(req, res, Manager, {_id: req.params.id}, {$push: {supervised: req.params.supervised}});
});

/* PUT new credentials. */
router.put('/:id', function (req, res) {
	Response.requestForPut(req, res, Manager, {
		_id: req.params.id}, 
		{$set: {
			name : req.body.name,
			email : req.body.email,
			password: req.body.password
		}
	});
});

/* GET the workplaces this manager is in. */
router.get('/:id/workplaces/member', function (req, res) {
	Workplace.find({}).populate("managers").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				work.managers.forEach(function(manag) {
					if (("" + manag._id) === req.params.id){
						list.push(work);
					}
				});
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});

/* GET the workplaces this manager has requested to join. */
router.get('/:id/workplaces/requested', function (req, res) {
	Workplace.find({}).populate("unapprovedM").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				work.unapprovedM.forEach(function(manag) {
					if (("" + manag._id) === req.params.id){
						list.push(work);
					}
				});
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});

/* GET the workplaces this manager is not in. */
router.get('/:id/workplaces/others', function (req, res) {
	Workplace.find({}).populate("unapprovedM managers").exec(function (err, docs) {
		if (err) {
			Response.sendErr(res, 404, "Resource not found.");
		} else {
			var list = [];
			docs.forEach(function(work) {
				work.unapprovedM.forEach(function(unap) {
					if (("" + unap._id) !== req.params.id){
						work.managers.forEach(function(manag) {
							if (("" + manag._id) !== req.params.id){
								list.push(work);
							}
						});
					}
				});
			});
			Response.sendSuccess(res, {data:list});
		}
	});
});


module.exports = router;