var express = require('express');
var router = express.Router();
var User = require('../data/models/users');
var Response = require('../util/response.js');

/* GET users listing. */
router.get('/', function(req, res) {
	User.find({}, function(err, users){
		if (err){
			Response.sendErr(res, 404, "Resource not Found");
		}
		else{
			Response.sendSuccess(res, {users: users});
		}
	});
});

module.exports = router;
