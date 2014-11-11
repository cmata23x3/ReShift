$(document).on('click', '.gotoMyWorkplace', function(evt) {
	evt.preventDefault();
	var item = $(this).children();
	var workid = item.data('secret-id');
	evt.preventDefault();
	loadPage('specificWorkplace', {workID: workid}); 

	setCalendar();
});

$(document).on('click', '#newWorkplace-btn', function(evt) {
	evt.preventDefault();
});

$(document).on('submit', '#newWorkplace-form', function(evt) {
	evt.preventDefault();
	var formData = helpers.getFormData(this);
	$.post(
		'/workplaces', formData
		).done(function(res) {
			$('#createWorkplaceModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			loadBasePage('Manager');
		}).fail(function(err) {
			loadBasePage('Manager');
		});
	});

$(document).on('click', '.gotoWorkplaceInfo', function(evt) {
	evt.preventDefault();
});

$(document).on('show.bs.modal', '#WorkplaceInfoModal', function(e) {
	var item = $(e.relatedTarget).children();
	var workid = item.data('secret-id');
	$.get(
		'/workplaces/'+ workid
		).done(function(res) {
			var data = $.extend(res.response.data, {id: workid});
			$('#joinWorkplace').html(Handlebars.templates['joinWorkplace'](data));
		}).fail(function(err) {
			console.log(err);
		});

	});

$(document).on('submit', '#join-form', function(evt) {
	evt.preventDefault();
	var userid, role;
	var formData = helpers.getFormData(this);
	$.get('/sessions/current', function(res) {
		console.log(res);
		userid = res.response.data.id;
		role = res.response.data.role;
		role = role.toLowerCase() + "s";
		console.log(userid, role);
		$.ajax({
			url: '/workplaces/'+formData.workid+'/'+role+'/unapproved/'+userid,
			method: 'PUT'
		}).done(function(res) {
			$('#WorkplaceInfoModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			loadBasePage();
		}).fail(function(err) {
			console.log(err);
		});
	});
});