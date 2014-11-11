// Author : Sheldon Trotman

var express = require('express');
var router = express.Router();
var Response = require('../util/response');
var Shift = require('../data/models/shifts');
var PostedShift = require('../data/models/postedshifts');

/* GET shifts listing. */
router.get('/', function(req, res) {
	Shift.find({}, function(err, docs) {
		if (err){
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : docs});
		}
	});
});

/* GET posted shifts listing. */
router.get('/posted', function(req, res) {
	PostedShift.find({}).populate('baseShift').exec(function(err, docs) {
		if (err){
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : docs});
		}
	});
});

/* GET a specific shift. */
router.get('/:sid', function(req, res) {
	Shift.findById(req.params.sid, function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : doc});
		}
	});
});

/* GET a specific posted shift. */
router.get('/posted/:sid', function(req, res) {
	PostedShifts.findById(req.params.sid, function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : doc});
		}
	});
});

/* POST a new shift. */
router.post('/', function(req, res){
	console.log(req.body);
	shift = new Shift({
		timestamp: req.body.timestamp,
		duration: req.body.duration,
		worker: req.body.worker
	});
	shift.save(function(err, doc) {
		if (err) {
			Response.sendErr(res, 500, 'An unknown error occurred.');
		}
		else {
			Response.sendSuccess(res, {data : shift});
		}
	});
});

/* DELETE an existing shift. */
router.delete('/:sid', function(req, res) {
	Response.requestForDelete(req, res, Shift, {_id : req.params.sid});

});

/* DELETE an existing shift. */
router.delete('/posted/:sid', function(req, res) {
	Response.requestForDelete(req, res, PostedShift, {_id : req.params.sid});
});

/* POST a shift for anyone to claim  */
router.post('/:sid/disclaim', function(req, res) {
	Shift.findById(req.body.sid, function(err, doc){
		if (err) {
			Response.sendErr(res, 500, 'An unknown error occurred.');
		}
		else {
			postedShift = new PostedShift({
				baseShift: req.body.sid, 
				claimedWorker: req.body.eid,
				claimed : false,
				timePosted: req.body.timeToPost
			});
			postedShift.save(function(err, doc) {
				if (err) {
					Response.sendErr(res, 404, 'Resource not found.');
				}
				else {
					Response.sendSuccess(res, {data : postedShift});
				}
			});
		}
	});
});

/* PUT a shift that someone has claimed  */
router.put('/posted/:sid/disclaim', function(req, res) {
	Response.requestForPut(req, res, PostedShift, {_id : req.params.sid}, {$set: {claimed : false}});
});

/* PUT a shift that someone has claimed  */
router.put('/:sid/claim', function(req, res) {
	Response.requestForPut(req, res, Shift, {_id : req.body.sid}, {$set: {worker : req.body.eid}});
});

/* PUT a shift that someone has claimed  */
router.put('/posted/:sid/claim', function(req, res) {
	Response.requestForPut(req, res, PostedShift, {_id : req.params.sid}, {$set: {claimedWorker : req.body.eid,
																claimed : true}});
});

module.exports = router;
