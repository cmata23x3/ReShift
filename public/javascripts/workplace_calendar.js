// Author : Sheldon Trotman

var showEventPage = function(eventPageStatus, eventPageTime, timeFieldValue, eventPageManager, eventPageButton, clickMethod, additionalInput, lastFunction) {
	
	// Set the Text
	var eventPage_status = document.getElementById("eventPageStatus");
	eventPage_status.innerHTML = eventPageStatus;

	var eventPage_time = document.getElementById("eventPageTime");	
	eventPage_time.innerHTML = eventPageTime;
	eventPage_time.value = timeFieldValue;

	var eventPage_manager = document.getElementById("eventPageManager");	
	eventPage_manager.innerHTML = eventPageManager;

	var additionalFields = document.getElementById("additionalInput");	
	additionalFields.innerHTML = additionalInput;

	
	var fullButton = '<a><button type="submit" onclick="'+ clickMethod + '">' + eventPageButton + '</button></a>';

	var eventPage_button = document.getElementById("eventPageButton");	
	eventPage_button.innerHTML = fullButton;


	// Move the Event Page Down
	var eventPage = "eventPage";

	var eventPage_section = document.getElementById(eventPage);	

	eventPage_section.style.top = "30%";

	eventPage_section.style.position = "fixed";

	eventPage_section.style.opacity = "1";
	eventPage_section.style.transition = "opacity 0.5s ease";

	// Move the Cover Down
	var cover_section = document.getElementById("cover");	

	cover_section.style.top = "0%";

	cover_section.style.position = "fixed";

	cover_section.style.opacity = "1";
	cover_section.style.transition = "opacity 0.5s ease";

	lastFunction();
};

var closeEventPage = function() {
	// Move Event page
	var eventPage_section = document.getElementById("eventPage");	

	eventPage_section.style.top = "-100%";
	eventPage_section.style.position = "absolute";

	eventPage_section.style.opacity = "0";
	eventPage_section.style.transition = "opacity 0.5s ease, top 0s linear 0.5s";

	// Move the Cover
	var cover_section = document.getElementById("cover");	

	cover_section.style.top = "-100%";
	cover_section.style.position = "absolute";

	cover_section.style.opacity = "0";
	cover_section.style.transition = "opacity 0.5s ease, top 0s linear 0.5s";
	
};

var generatePeopleTable = function(){
	//make call to get info. 
	var id = $('#workplaceID').val();
	if(id){
		$.ajax({
			url: '/workplaces/' + id,
			method: 'GET'
		}).done(function(res){
		//add the template with the results
		$('#peopleTables').html(Handlebars.templates['peopleTable']({
			uManagers: res.response.data.unapprovedM,
			managers: res.response.data.managers,
			uEmployees: res.response.data.unapprovedE,
			employees: res.response.data.employees
		}));
	});
	}
}

var changeTitle = function(){
	//make call to get info. 
	var id = $('#workplaceID').val();
	if(id){
		$.ajax({
			url: '/workplaces/' + id,
			method: 'GET'
		}).done(function(res){
			
			//add the template with the results
			$('#specificWorkplaceTitle').html(Handlebars.templates['specificWorkplaceTitle']({

				workplaceName: res.response.data.name
			}));
		});
	}
}

//event listeners
$(document).on('click', '.employeeApprovalBtn', function(evt) {
	evt.preventDefault();
	var employeeid = $(this).data('secret-id');
	var workplaceid = $('#workplaceID').val();
	$.ajax({
		url: '/workplaces/'+workplaceid+'/employees/'+employeeid,
		method: 'PUT'
	}).done(function(res) {
		loadPage('specificWorkplace', {workID: workplaceid}); 
		setCalendar();
	}).fail(function(err) {
		console.log(err);
	});
});

$(document).on('click', '.managerApprovalBtn', function(evt) {
	evt.preventDefault();
	var managerid = $(this).data('secret-id');
	var workplaceid = $('#workplaceID').val();
	$.ajax({
		url: '/workplaces/'+workplaceid+'/managers/'+managerid,
		method: 'PUT'
	}).done(function(res) {
		loadPage('specificWorkplace', {workID: workplaceid}); 
		setCalendar();
	}).fail(function(err) {
		console.log(err);
	});
});

var setCalendar = function() {
	changeTitle();
	generatePeopleTable();
// page is now ready, initialize the calendar...

$('#calendar').fullCalendar({
		// put your options and callbacks here

		defaultView : 'agendaWeek',
		allDaySlot : false,

		header : {
			left : '',
			center : 'title',
			right : 'prev today next',
		}, 

		minTime : '08:00:00',
		maxTime : '20:00:00',


		height: 500,

		events: function(start, end, timezone, callback) {

			var id = $('#workplaceID').val();

			$.ajax({
				url: '/workplaces/' + id,
				method: 'GET'
			}).done(function(res){
				var events = [];
				var data = res.response.data;
				var shiftArray = data.shifts;

				for (var i = 0; i < shiftArray.length; i++) {
					var duration = shiftArray[i].duration;

					var startTimestamp = new Date(shiftArray[i].timestamp);
					var endTimestamp = new Date(shiftArray[i].timestamp);
					endTimestamp.setTime(startTimestamp.getTime() + (duration * 60 * 1000));


					var userId = shiftArray[i].worker;
					var shiftTitle = getShiftTitle(data, userId);

					var colorValue = "gray";
					var className = ["others", userId, shiftArray[i]._id];

					if (shiftIsFree(data.postedShifts, shiftArray[i]._id)) {
						shiftTitle = "Free";

						colorValue = "#5BC236";
						className = ["free", userId, shiftArray[i]._id];
					} else if( $('#dataId').val() === userId) {
						colorValue = "#5195CE";
						className = ["your", userId, shiftArray[i]._id];

					}

					events.push({
						title: shiftTitle,
						start: startTimestamp.toISOString(),

						end: endTimestamp.toISOString(),
						color: colorValue,
						className : className
					});
					
				};
				callback(events);
			});

		},



		dayClick : function(date) {
			var id = $('#workplaceID').val();

			$.ajax({
				url: '/workplaces/' + id,
				method: 'GET'
			}).done(function(res){
				var managers = res.response.data.managers;

				var rawDate = new Date();

				var cleanedStringDate = rawDate.toISOString();


				var currDate = $.fullCalendar.moment(cleanedStringDate);
				var boolResult = date > currDate;

				// Restrict clicks to only after right now and only managers
				if (boolResult && isManager(managers, $('#dataId').val())) {
					var scrollers = '<div>Duration: <select id="durationHours">' +
						'<option value="1">1 Hours</option>' +
						'<option value="2">2 Hours</option>' +
						'<option value="3">3 Hours</option>' +
						'<option value="4">4 Hours</option>' +
						'<option value="5">5 Hours</option>' +
						'<option value="6">6 Hours</option>' +
						'<option value="7">7 Hours</option>' +
						'<option value="8">8 Hours</option>' +
						'<option value="9">9 Hours</option>' +
						'<option value="10">10 Hours</option>' +
						'<option value="11">11 Hours</option>' +
						'<option value="12">12 Hours</option>' +
						'</select>' +
						'<select id="durationMinutes">' +
						'<option value="0">0 Minutes</option>' +
						'<option value="15">15 Hours</option>' +
						'<option value="30">30 Hours</option>' +
						'<option value="45">45 Hours</option>' +
						'</select></div><br>' +
						'<div>Workers: <select id="possibleWorkersScroller" name="possibleWorkersScroller">' +
						'</select></div>';
						


						var timeField = 'Starting on: ' + date.format('MM-DD-YYYY, HH:mm a');
						var timeFieldValue = date.toISOString();

						var extendFunction = function() {
							var id = $('#workplaceID').val();
							if(id){
								$.ajax({
									url: '/workplaces/' + id,
									method: 'GET'
								}).done(function(res){
									//add the template with the results
									$('#possibleWorkersScroller').html(Handlebars.templates['specificWorkplaceWorkers']({
										managers: res.response.data.managers,
										employees: res.response.data.employees
									}));

								});
							}
						}
					showEventPage("Create a Shift?", timeField, timeFieldValue, "", "Create Shift", "createShift()", scrollers, extendFunction);

				}
			});
		},

		eventClick : function(calEvent) {
			var rawDate = new Date();

			var cleanedStringDate = rawDate.toISOString();


			var currDate = $.fullCalendar.moment(cleanedStringDate);
			var boolResult = calEvent.start > currDate;

			// Restrict clicks to only after current time

			if (boolResult) {
					
				var extendFunction = function() {}


				var extra = '<input id="sid" type="hidden" value="' + calEvent.className[2] + '">'
				
				var timeField = 'Starting on: ' + calEvent.start.format('MM-DD-YYYY, HH:mm a');
				var endTime = 'Ending on: ' + calEvent.end.format('MM-DD-YYYY, HH:mm a');

				var timeFieldValue = calEvent.start.toISOString();

				if (calEvent.className[0] === "your") {
					showEventPage("Your Shift", timeField, timeFieldValue, endTime, "Discard Shift?", "unclaimShift()", extra, extendFunction);
				
				} else if (calEvent.className[0] === "free") {
					showEventPage("Free Shift", timeField, timeFieldValue, endTime, "Claim Shift?", "claimShift()", extra, extendFunction);
				
				}

			}
		}


	})

}

var getShiftTitle = function(data, userId) {
	var shiftTitle = "Free";
	
	// Go through employee listing to find a match
	for (var indexOfEmployee = 0; indexOfEmployee < data.employees.length; indexOfEmployee++) {
		var currentEmployee = data.employees[indexOfEmployee];
		if (currentEmployee._id === userId) {
			shiftTitle = currentEmployee.name;
			break;
		}

	}

	// Go through manager listing to find a match
	for (var indexOfManager = 0; indexOfManager < data.managers.length; indexOfManager++) {
		var currentManager = data.managers[indexOfManager];
		if(currentManager._id === userId) {
			shiftTitle = currentManager.name;
			break;
		}

	}

	return shiftTitle;
}

var isManager = function(managersArray, userId) {
	// Go through posted shift listing to find a match
	for (var index = 0; index < managersArray.length; index++) {
		var currManager = managersArray[index]._id;
		if(userId === currManager) {
			return true;
		}

	}
	return false;
}

var shiftIsFree = function(postedShifts, originalId) {
	// Go through posted shift listing to find a match
	for (var index = 0; index < postedShifts.length; index++) {
		var currBaseShift = postedShifts[index];
		if(originalId === currBaseShift) {
			return true;
		}

	}
	return false;
}

var unclaimShift = function() {
	var id = $('#workplaceID').val();

	if(id){
		$.ajax({
			url: '/shifts/' + id+ '/disclaim/',
			data : {
				sid: $('#sid').val(),
				eid: $('#dataId').val(),
				timeToPost:$('#eventPageTime').val()
			},
			method: 'POST'
		}).done(function(res){
			
			$.ajax({
				url: '/workplaces/' + id+ '/postedShifts/' + $('#sid').val(),
				method: 'PUT'
			}).done(function(res){
				//add the template with the results
				loadPage('specificWorkplace', {workID: id}); 
				setCalendar();

			});

		});
	}
}

var claimShift = function() {
	var id = $('#workplaceID').val();

	if(id){
		$.ajax({
			url: '/shifts/' + id+ '/claim/',
			data : {
				sid: $('#sid').val(),
				eid: $('#dataId').val(),
			},
			method: 'PUT'
		}).done(function(res){
			
			$.ajax({
				url: '/workplaces/' + id+ '/postedShifts/' + $('#sid').val(),
				method: 'DELETE'
			}).done(function(res){
				//add the template with the results
				loadPage('specificWorkplace', {workID: id}); 
				setCalendar();

			});

		});
	}
}


var createShift = function() {
	var id = $('#workplaceID').val();

	if(id){
		var totalDuration = 1 * $('#durationMinutes').val() + 60 * $('#durationHours').val();

		$.ajax({
			url: '/shifts/',
			method: 'POST',
			data: {
				timestamp: $('#eventPageTime').val(),
				duration: totalDuration,
				worker: $('#possibleWorkersScroller').val()
			}
		}).done(function(res){
			// Ajax call to workplaces to add the shift now

			$.ajax({
				url: '/workplaces/' + id+ '/shifts/' + res.response.data._id,
				method: 'PUT'
			}).done(function(res){
				//add the template with the results
				loadPage('specificWorkplace', {workID: id}); 
				setCalendar();

			});

		});
	}
}