//Author: Christian Mata
// public/javascripts/tests.js basic file
/* 
* AJAX call to get all the employees
*/
QUnit.asyncTest("ReShift Managers Test Suite", function( assert ){
	//making the Manager calls
	makeAJAXCall(assert, {
		task: "GET managers",
		route: "managers",
		method: "GET",
		body: {},
		id: null
	}, function(result){
		//create inputs
		var email = 'test@mit.edu';
		var password = 'password';
		var name = 'Tester Manager';
		//make the AJAX call
		makeAJAXCall(assert, {
			task: "POST manager", 
			route: "managers",
			method: "POST", 
			body: {
				email: email,
				password: password,
				name: name
			},
			id: null,
			expected: {
				task: "POST manager",
				email: email,
				password: password,
				name: name
			}
		}, function(result){
			makeAJAXCall(assert, {
				task: "GET manager by ID", 
				route: "managers",
				method: "GET", 
				body: {},
				id: result.response.data._id,
				expected: {
					task: "GET manager by ID",
					_id: result.response.data._id,
					email: result.response.data.email,
					password: result.response.data.password,
					name: result.response.data.name
				}
			}, function(result){
				makeAJAXCall(assert, {
					task: "DELETE manager", 
					route: "managers",
					method: "DELETE", 
					body: {},
					id: result.response.data._id
				}, function(result){
					assert.ok(true, "completed");
					QUnit.start();
				});
			});
		});
	});
});

QUnit.asyncTest("ReShift Employees Test Suite", function( assert ){
	//Making the employee calls
	makeAJAXCall(assert, {
		task: "GET employees",
		route: "employees",
		method: "GET",
		body: {},
		id: null
	}, function(result){
		//create inputs
		var email = 'test@mit.edu';
		var password = 'password';
		var name = 'Tester Employee';
		//make the AJAX call
		makeAJAXCall(assert, {
			task: "POST employee", 
			route: "employees",
			method: "POST", 
			body: {
				email: 'test@mit.edu',
				password: 'password',
				name: 'Tester Employee'
			},
			id: null,
			expected: {
				task: "POST employee",
				email: email,
				password: password,
				name: name
			}
		}, function(result){
			//create inputs
			var email = 'test@mit.edu';
			var password = 'password';
			var name = 'Tester Employee';
			//make the AJAX call
			makeAJAXCall(assert, {
				task: "GET employee by ID", 
				route: "employees",
				method: "GET", 
				body: {},
				id: result.response.data._id,
				expected: {
					task: "GET Employee by ID",
					_id: result.response.data._id,
					email: result.response.data.email,
					password: result.response.data.password,
					name: result.response.data.name
				}
			}, function(result){
				makeAJAXCall(assert, {
					task: "DELETE employee", 
					route: "employees",
					method: "DELETE", 
					body: {},
					id: result.response.data._id
				}, function(result){
					assert.ok(true, "completed");
					QUnit.start();
				});
			});
		});
});
});

QUnit.asyncTest("ReShift Workplaces Test Suite", function( assert ){
	//create manager to have sessions:
	//create inputs
	var email = 'test@mit.edu';
	var password = 'password';
	var name = 'Tester Manager';
	var id;
	//make the AJAX call
	makeAJAXCall(assert, {
		task: "POST manager", 
		route: "managers",
		method: "POST", 
		body: {
			email: email,
			password: password,
			name: name
		},
		id: null,
		expected: {
			task: "POST manager",
			email: email,
			password: password,
			name: name
		}
	}, function(result){
		id = result.response.data._id;
		//Making the workplaces calls
		makeAJAXCall(assert, {
			task: "GET workplaces",
			route: "workplaces",
			method: "GET",
			body: {},
			id: null
		}, function(result){
			//create inputs
			var name = 'Test Workplace';
			var location = 'Somewhere over the rainbow';
			var description = 'Not Kansas';
			var managers = [id];
			var employees = [];
			var shifts = [];
			var unapprovedE = [];
			var unapprovedM = [];
			//make the AJAX call
			makeAJAXCall(assert, {
				task: "POST workplaces", 
				route: "workplaces",
				method: "POST", 
				body: {
					name: name,
					location: location,
					description: description
				},
				id: null
			}, function(result){
				makeAJAXCall(assert, {
					task: "GET workplaces by ID", 
					route: "workplaces",
					method: "GET", 
					body: {},
					id: result.response.data._id,
					expected: {
						task: "GET workplaces by ID",
						name: result.response.data.name,
						name: name,
						location: location,
						description: description,
						// managers: managers,
						employees: employees,
						shifts: shifts, 
						unapprovedE: unapprovedE,
						unapprovedM: unapprovedM
					}
				}, function(result){
					makeAJAXCall(assert, {
						task: "DELETE workplaces", 
						route: "workplaces",
						method: "DELETE", 
						body: {},
						id: result.response.data._id
					}, function(result){
						makeAJAXCall(assert, {
							task: "DELETE manager", 
							route: "managers",
							method: "DELETE", 
							body: {},
							id: id
						}, function(result){
							assert.ok(true, "completed");
							QUnit.start();
						});
					});
				});
			});
});
});
});

QUnit.asyncTest("ReShift Shifts Test Suite", function( assert ){
	//Making the workplaces calls
	var worker, person;
	var email = 'test2@mit.edu';
	var password = 'password';
	var name = 'Tester Employee';
	var timestamp = Date.now();
	var duration = 1; 
	makeAJAXCall(assert, {
		task: "POST employee", 
		route: "employees",
		method: "POST", 
		body: {
			email: email,
			password: password,
			name: name
		},
		id: null,
		expected: {
			task: "POST employee",
			email: email,
			password: password,
			name: name
		}
	}, function(result){
		worker = result;
		person = result.response.data._id;
		makeAJAXCall(assert, {
			task: "POST shift",
			route: "shifts",
			method: "POST",
			body: {
				timestamp: timestamp,
				duration: duration,
				worker: result.response.data._id
			},
			id: null,
			expected: {
				task: "POST shift",
				duration: duration,
				worker: result.response.data._id
			}
		}, function(result){
			makeAJAXCall(assert, {
				task: "GET shift by ID", 
				route: "shifts",
				method: "GET", 
				body: {},
				id: result.response.data._id,
				expected: {
					task: "GET shift by ID",
					_id: result.response.data._id,
					duration: duration,
					worker: person
				}
			}, function(result){
				makeAJAXCall(assert, {
					task: "DELETE shift", 
					route: "shifts",
					method: "DELETE", 
					body: {},
					id: result.response.data._id
				}, function(result){
					makeAJAXCall(assert, {
						task: "DELETE employee", 
						route: "employees",
						method: "DELETE", 
						body: {},
						id: worker.response.data._id
					}, function(result){
						assert.ok(true, "completed");
						QUnit.start();
					});
				});
			});
		});
});
});

QUnit.asyncTest("ReShift Sessions Test Suite", function(assert){
	var email = 'test@mit.edu';
	var password = 'password';
	var name = 'Tester';
	var employeeID;
	//make the AJAX call
	makeAJAXCall(assert, {
		task: "POST Employee", 
		route: "employees",
		method: "POST", 
		body: {
			email: email,
			password: password,
			name: name
		},
		id: null,
		expected: {
			task: "POST employee",
			email: email,
			password: password,
			name: name
		}
	}, function(result){
		employeeID = result.response.data._id;
		makeAJAXCall(assert, {
			task: "GET session", 
			route: "sessions/current", 
			method: "GET",
			body: {},
			id: null,
			noRender: true,
			expected: {
				task: "GET session",
				loggedIn: true,
				name: name
			} 
		}, function(result){
			makeAJAXCall(assert, {
				task: "DELETE session", 
				route: "sessions",
				method: "DELETE",
				body: {},
				id: null
			}, function(result){
				makeAJAXCall(assert, {
					task: "DELETE employee", 
					route: "employees",
					method: "DELETE", 
					body: {},
					id: employeeID
				}, function(result){
					assert.ok(true, "completed");
					QUnit.start();
				});
			});
		});
	});
});//close asyncTest

QUnit.asyncTest("ReShift Error Test Suite", function( assert ){
	//Make some bad calls
	makeBadAJAXCall(assert, {
		task: "GET employee that doesn't exist",
		route: "employees",
		method: "GET",
		body: {},
		id: '123'
	}, function(result){
		makeBadAJAXCall(assert, {
			task: "GET manager that doesn't exist",
			route: "managers",
			method: "GET",
			body: {},
			id: '123'
		}, function(result){
			assert.ok(true, "completed");
			QUnit.start();
		});
	});
});
/*
* Method uses jQuery to append a status update about what events occurred. 
* Params object has fields that are formatted into HTML and appended into the 
* view.
*
* @method addResults
* @param {Object} params variable inputs that can be passed to addResults
* ex: params = {
	route: 'managers', 'employee', 
* 	task: 'what was done'
*	status: 'ok'/'error'
*	data: {}
* }
*/
function addResults(params){
	var container = $("#" + params.route);
	container.append('<div><p>'+ params.task + ': '+params.status+ ' <br> Result: ' + params.data+'</p></div><br>')
}

/*
* Method uses jQuery to make AJAX calls to test the server. Takes asserts object, 
* params objects and a callback function.
*
* @method makeAJAXCall
* @param {Object} assert JQuery object with assertion capabilities
* @param {Object} params variable inputs that can be passed to 
* ex: params: {
*	task: 'What is happening',
* 	route: 'employees', 'managers', workplacess', 
*	method: 'GET', 'POST', 'DELETE', 'PUT',
*	body: {object: values} or {}
* 	id: '123456' or null
* }
* @param {Function} callback function that will be exectued when the 
* AJAX call is done.
*/
function makeAJAXCall(assert, params, callback){
	//Build the URL
	var url = buildURL(params);
	//Make the AJAX call
	$.ajax({
		url: url,
		method: params.method,
		data: params.body,
		success : function(data) {
			if(params.expected){
				buildAssertion(assert, params.expected, data.response.data);
				// assert.equal("poop", params.expected, params.task + " Result returned & check status matches");
			}
			else{
				assert.equal(data.status, "ok", params.task + " Result returned & check status matches");
			}
			if(!params.noRender){
				addResults({
					route: params.route,
					task: params.task,
					status: "Success" ,
					data: JSON.stringify(data)
				});
			}
			callback(data);
		},
		failure : function(err) {
			console.log("Test failed with error : " + err);
			// assert.equal(data.status, "error", "Error occurred & check status matches");
			addResults({
				route: params.route,
				task: params.task,
				status: "Failure" ,
				data: err
			});
			callback(err);
		}
	});
}

/*
* Method uses jQuery to make AJAX calls to test the server. Takes asserts object, 
* params objects and a callback function. This AJAX call is expecting bad results
* and makes those assertions
*
* @method makeBadAJAXCall
* @param {Object} assert JQuery object with assertion capabilities
* @param {Object} params variable inputs that can be passed to 
* ex: params: {
*	task: 'What is happening',
* 	route: 'employees', 'managers', workplacess', 
*	method: 'GET', 'POST', 'DELETE', 'PUT',
*	body: {object: values} or {}
* 	id: '123456' or null
* }
* @param {Function} callback function that will be exectued when the 
* AJAX call is done.
*/
function makeBadAJAXCall(assert, params, callback){
	//Build the URL
	var url = buildURL(params);
	//Make the AJAX call
	$.ajax({
		url: url,
		method: params.method,
		data: params.body,
		complete: function(data){
			assert.equal(data.status, 404, params.task + " Status code = 404");
			assert.deepEqual(data.responseJSON, {status: "error", response: "Resource not found."}, params.task + " Checking Error JSON");
			callback();
		}
	});
}

/*
* Method uses jQuery to make AJAX calls to test the server. Takes asserts object, 
* params objects and a callback function. This AJAX call is expecting bad results
* and makes those assertions
*
* @method makeBadAJAXCall
* @param {Object} assert JQuery object with assertion capabilities
* @param {Object} params variable inputs that can be passed to 
* ex: params: {
*	task: 'What is happening',
* 	route: 'employees', 'managers', workplacess', 
*	method: 'GET', 'POST', 'DELETE', 'PUT',
*	body: {object: values} or {}
* 	id: '123456' or null
* }
* @param {Function} callback function that will be exectued when the 
* AJAX call is done.
*/
function buildAssertion(assert, params, data){
	// assert.equal(, params.expected, params.task + " Result returned & check status matches");
	Object.keys(params).forEach(function(field){
		if(field in data){
			if(data[field])
				assert.deepEqual(data[field], params[field], params.task + ": Checking field result: " + field);
		}
	});
}

/*
* Method uses jQuery to make AJAX calls to test the server. Takes asserts object, 
* params objects and a callback function. This AJAX call is expecting bad results
* and makes those assertions.
*
* @method buildURL
* @param {Object} params variable inputs that can be passed to 
* ex: params: {
* 	route: 'employees', 'managers', workplacess', 
* 	id: '123456' or null
* }
* @returns {String} url newly created URL string
*/
function buildURL(params){
	var url = '/' + params.route;
	if(params.id){
		url = url + '/' + params.id + '/'
	}
	return url;
}	