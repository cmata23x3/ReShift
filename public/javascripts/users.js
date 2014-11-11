//Author: Alex & Christian
//Credit to 6.170 resource repo

$(document).on('submit', '#login-form', function(evt) {
	evt.preventDefault();
	var formData = helpers.getFormData(this);
	$.post('/sessions', formData).done(function(res) {
		$('#loginModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		loadBasePage();
	}).fail(function(error) {
		console.log(error); //:(
	});
});

$(document).on('click', '#logout-form', function(evt) {
	evt.preventDefault();
	$.ajax({
		url: '/sessions',
		method: 'DELETE'
	}).done(function(res){
		loadBasePage();
	}).fail(function(error){
		console.log(error);
	});
});

$(document).on('submit', '#signup-form', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  if (formData.password !== formData.confirm) {
    $('.error').text('Password and confirmation do not match!');
    return;
  }
  delete formData['confirm'];
  if (formData.role === 'manager'){
    $.post(
        '/managers', formData
      ).done(function(res) {
        loadBasePage('Manager');
      }).fail(function(error) {
        console.log(error);
        loadPage('signup', {error: response.err});
      });
  } else {
    $.post(
        '/employees', formData
      ).done(function(response) {
        loadBasePage('Employee');
      }).fail(function(jqxhr) {
        console.log(error);
        loadPage('signup', {error: response.err});
      });
  }
  
});

$(document).on('click', '.navbar-brand', function(evt) {
  evt.preventDefault();
  loadBasePage();
});