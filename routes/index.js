var express = require('express');
var router = express.Router();
var Response = require('../util/response');
var Auth = require('../util/auth');
var Employee = require('../data/models/employees');
var Manager = require('../data/models/managers')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ReShift' });
});

/* GET test page */
router.get('/test', function(req, res){
    res.render('test', {title: 'ReShift'});
});

/* GET session info */
router.get('/sessions/current', function(req, res){
    if(req.session.name){//if someone is logged in
        // console.log("sessions has: ", req.session.name, req.session._id, req.session.role);
        Response.sendSuccess(res, {data: {
            loggedIn: true,
            name: req.session.name,
            id: req.session._id,
            role: req.session.role
        }
        });
    }
    else{
        Response.sendSuccess(res, {data: {loggedIn: false}});
    }
});

router.post('/sessions', function(req, res){
    if(Auth.isLoggedIn(req, res)){//checking if someone is logged in
        return;
    }
    var email = req.body.email;
    var pwrd = req.body.password; 
    Employee.findOne({'email': email }, function(err, employee){
    	if(employee){//found a user
    		if(pwrd !== employee.password ){
    			Response.sendErr(res, 401, "Password does not match");
    		}
            else{//we're good; assign session vars & send success
                req.session.name = employee.name;
                req.session._id = employee._id;
                req.session.role = "Employee";
                // console.log("setting up: ", req.session._id, req.session.name, req.session.role);
                Response.sendSuccess(res, {data: employee});
            }
        }
    	else
        {//no employee found -> try in managers!
            Manager.findOne({'email': email}, function(err, manager){
                if(manager){
                    if(pwrd !== manager.password ){
                        Response.sendErr(res, 401, "Password does not match");
                    }
                    else{//we're good; make name
                        req.session.name = manager.name;
                        req.session._id = manager._id;
                        req.session.role = "Manager";
                        // console.log("setting up: ", req.session._id, req.session.name, req.session.role);
                        Response.sendSuccess(res, {data: manager}); //not sure if this is correct
                    }
                }
                else{ // found no one :(
                    Response.sendErr(res, 404, "Email is not found");
                }
            });
    	}
    });
});

/*DELETE session info */
router.delete('/sessions', function(req, res){
    if(req.session.name){
        req.session.destroy();
        Response.sendSuccess(res, {});
    }
    else{
        Response.sendErr(res, 403, "There is no user signed in.");
    }
});


module.exports = router;