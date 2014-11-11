//Author: Alex & Christian 
//Credit to 6.170 Project 3 example repo
//Register all the partials taht will be referreced.
Handlebars.registerPartial('login', Handlebars.templates['login']);
Handlebars.registerPartial('EWorkplaces', Handlebars.templates['EWorkplaces']);
Handlebars.registerPartial('myWorkplaces', Handlebars.templates['myWorkplaces']);
Handlebars.registerPartial('myWorkplace', Handlebars.templates['myWorkplace']);
Handlebars.registerPartial('otherWorkplaces', Handlebars.templates['otherWorkplaces']);
Handlebars.registerPartial('otherWorkplace', Handlebars.templates['otherWorkplace']);
Handlebars.registerPartial('createWorkplace', Handlebars.templates['createWorkplace']);
Handlebars.registerPartial('joinWorkplace', Handlebars.templates['joinWorkplace']);
Handlebars.registerPartial('workplaceInfo', Handlebars.templates['workplaceInfo']);
//templates for specific workplace
Handlebars.registerPartial('peopleTable', Handlebars.templates['peopleTable']);
//navbar
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);

/*
* Ready method will call loadBasePage() to begin with.
*/
$(document).ready(function() {
	loadBasePage();
});

/*
* Cancels the listener for the headerSignButton. 
* Each is event is handled elsewhere
*/
$(document).on('click', '#headerSignButton', function(evt) {
	evt.preventDefault();
  // loadPage('login');
});

/*
* Default loadPage method. It will take a template and a data object.
* Next the Handlebars template is rendered in the main-container.
* @method loadPage
* @param {String} template String name of the template
* @param {Object} data Object of field that will be populated in Handlebars template
*/
var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

/*
* Method takes a template and a data object and adds the 
* appropriate navbar into the view
* 
* @method loadNav
* @param {Object} data Object of field that will be populated in Handlebars template
*/
var loadNav = function(data){
	data = data || {};
	$('#nav').html(Handlebars.templates['navbar'](data));
}

/*
* Method loads a BasePage which is where the user gets directed based
* on their session info. 
* 
* @method loadBasePage
*/
var loadBasePage = function() {
	checkCurrentSession(function(params){
		if (params) {//if someone is logged in
			loadNav({
        user: params.name, 
        id: params.id});
			if(params.role === 'Employee'){
				loadEWorkplacesPage(); //log the Employee workplace select page
			}
			else{
				loadMWorkplacesPage(); //log the Manager workplace select page
			}
		} 
		else { //if not logged in, 
			loadNav();
			loadPage('signup'); //send to the landing page
		}
	}); // now either object or undefined
};

/*
* Helper method makes AJAX call to check the current session.
* 
* @method checkCurrentSession
* @param {Function} callback Function to be exectued when AJAX result comes back.
*/
var checkCurrentSession = function(callback){
	var currentInfo;
	$.get('/sessions/current', function(res) {
		if (res.response.data.loggedIn) { //someone is logged in
			currentInfo = {
				name: res.response.data.name,
				role: res.response.data.role,
        id: res.response.data.id,
			}
		}
		callback(currentInfo);
	});
};

var loadEWorkplacesPage = function(additional) {
  var id, yours, request, others;
  $.get('/sessions/current', function(res) {
    id = res.response.data.id;
    $.get('/employees/'+id+'/workplaces/member', function(res) {
      yours = res.response.data;
      $.get('/employees/'+id+'/workplaces/requested', function(res) {
        request = res.response.data;
        $.get('/employees/'+id+'/workplaces/others', function(res) {
          others = res.response.data;
          others = _.difference(others, yours);
          loadPage('EWorkplaces',
            $.extend(
              {},
              {your: yours},
              {other: others}
            )//extend
          ); //load page
        }); //get others
      }); //get requested
    }); //get yours
  }); //get user
} // load Workplaces page

var loadMWorkplacesPage = function(additional) {
  var id, yours, request, others;
  $.get('/sessions/current', function(res) {
    id = res.response.data.id;
    $.get('/managers/'+id+'/workplaces/member', function(res) {
      yours = res.response.data;
      $.get('/managers/'+id+'/workplaces/requested', function(res) {
        request = res.response.data;
        $.get('/managers/'+id+'/workplaces/others', function(res) {
          others = res.response.data;
          loadPage('MWorkplaces',
            $.extend(
              {},
              {your: yours},
              {requested: request},
              {other: others}
            )//extend
          ); //load page
        }); //get others
      }); //get requested
    }); //get yours
  }); //get user
} // load Workplaces page
