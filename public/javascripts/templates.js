(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['EWorkplaces'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"employeeWorkplaces\">\n	<h1 class=\"pageTitle\"> Workplaces </h1>\n";
  stack1 = this.invokePartial(partials.myWorkplaces, '	', 'myWorkplaces', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.otherWorkplaces, '	', 'otherWorkplaces', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n";
  stack1 = this.invokePartial(partials.workplaceInfo, '', 'workplaceInfo', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});
templates['MWorkplaces'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"managerWorkplaces\">\n	<h1 class=\"pageTitle\"> Workplaces </h1>\n";
  stack1 = this.invokePartial(partials.myWorkplaces, '	', 'myWorkplaces', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "	<form>\n		<button type= \"submit\" id=\"newWorkplace-btn\" data-toggle=\"modal\" data-target=\"#createWorkplaceModal\" class=\"btn btn-default\"> Create new Workplace </button>\n	</form>\n";
  stack1 = this.invokePartial(partials.otherWorkplaces, '	', 'otherWorkplaces', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n";
  stack1 = this.invokePartial(partials.createWorkplace, '', 'createWorkplace', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.workplaceInfo, '', 'workplaceInfo', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});
templates['createWorkplace'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal fade\" id=\"createWorkplaceModal\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n        	<span aria-hidden=\"true\">&times; </span>\n        	<span class=\"sr-only\"> Close </span>\n        </button>\n        <h4 class=\"modal-title\">Create a new Workplace</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div id=\"joinWorkplace\">\n		  <form id=\"newWorkplace-form\">\n		    <div>Name: <input type=\"text\" name=\"name\" class=\"form-control\" required /></div>\n		    <div>Location: <input type=\"text\" name=\"location\" class=\"form-control\" required /></div>\n		    <div>Description: <input type=\"text\" name=\"description\" class=\"form-control\" required /></div>\n		    <button type=\"submit\" id=\"createWorkplace-btn\" class=\"btn btn-default\"> Create Workplace </button>\n		  </form>\n		</div>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n\n\n";
},"useData":true});
templates['edit'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"Edit\">\n  <h1>Edit your personal information</h1>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <form id=\"signup-form\">\n    <div>Name: <input type=\"text\" name=\"name\" required /></div>\n    <div>Email: <input type=\"text\" name=\"email\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <button id=\"saveChanges-btn\" type=\"submit\"> Save </button>\n  </form>\n</div>\n";
},"useData":true});
templates['joinWorkplace'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<!--\n  Show the info of a specific workplace\n-->\n<div id=\"aWorkplace\">\n	<h3 style=\"margin-top: 0px;\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n	<p> Location: "
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + " </p>\n	<p> Description: "
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + " </p>\n	<form id=\"join-form\">\n		<input value="
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + " type=\"hidden\" name= \"workid\"/>\n		<button id=\"joinWorkplace-btn\" type=\"submit\"> Join Workplace! </button>\n	</form>\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					<div class=\"error\">"
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n<div class=\"modal fade\" id=\"loginModal\">\n	<div class=\"modal-dialog\">\n		<div class=\"modal-content\">\n			<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n					<span aria-hidden=\"true\">&times; </span>\n					<span class=\"sr-only\"> Close </span>\n				</button>\n				<h4 class=\"modal-title\">Log in</h4>\n			</div>\n			<div class=\"modal-body\">\n				<div id=\"login\">\n					<h1>Log in</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "					<form id=\"login-form\">\n						<div class=\"form-group\">\n							Email: \n							<input class=\"form-control\" type=\"email\" name=\"email\" required />\n						</div>\n						<div class=\"form-group\">Password: \n							<input class=\"form-control\" type=\"password\" name=\"password\" required /></div>\n						<button type=\"submit\" class=\"btn btn-default\" id=\"login-btn\"> Log in </button>\n					</form>\n				</div>\n			</div>\n    </div><!-- /.modal-content -->\n		</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
},"useData":true});
templates['myWorkplace'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<!--\n  Write a template for a SINGLE myWorkplace\n  Each workplace has fields: _id, name, location, description\n-->\n<a href=\"#\" class=\"gotoMyWorkplace\">\n	<div class=\"myWorkplace\" data-secret-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n		<p>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</p>\n	</div>\n</a>\n";
},"useData":true});
templates['myWorkplaces'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.myWorkplace, '    ', 'myWorkplace', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!--\n  Write a template for the entire myWorkplaces block\n-->\n<div id=\"myWorkplaces\">\n  <h1>Your Workplaces</h1>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.your : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true});
templates['navbar'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "				<p class=\"navbar-text\" style=\"text-align:center; color:white;\">Hi, "
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</p>\n				<input id=\"dataId\" type=\"hidden\" value="
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + ">\n				<li>\n					<form id=\"logout-form\">\n						<button type=\"submit\" id=\"headerSignButton\" class=\"btn btn-default navbar-btn\">Log Out</button>\n					</form>\n				</li>\n";
},"3":function(depth0,helpers,partials,data) {
  return "				<li>\n					<form>\n						<input type=\"text\" hidden/> \n						<button type=\"submit\" id=\"headerSignButton\" class=\"btn btn-default navbar-btn\" data-toggle=\"modal\" data-target=\"#loginModal\">Log In</button>\n					</form>\n				</li>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<nav class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\n	<div class=\"container-fluid\">\n		<!-- Brand and toggle get grouped for better mobile display -->\n		<div class=\"navbar-header\">\n			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n				<span class=\"sr-only\">Toggle navigation</span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n			</button>\n			<a class=\"navbar-brand\" href=\"#\">ReShift</a>\n		</div>\n		<!-- Collect the nav links, forms, and other content for toggling -->\n		<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n			<ul class=\"nav navbar-nav navbar-right\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n			</ul>\n		</div><!-- /.navbar-collapse -->\n	</div><!-- /.container-fluid -->\n</nav>\n";
},"useData":true});
templates['otherWorkplace'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<!--\n  Write a template for a SINGLE otherWorkplace\n  Each workplace has fields: _id, name, location, description\n-->\n<a href=\"#\" class=\"gotoWorkplaceInfo\" data-secret-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " data-toggle=\"modal\" data-target=\"#WorkplaceInfoModal\">\n	<div class=\"myWorkplace\" data-secret-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n		<p>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</p>\n		<p>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n	</div>\n</a>\n";
},"useData":true});
templates['otherWorkplaces'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.otherWorkplace, '    ', 'otherWorkplace', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!--\n  Write a template for the entire otherWorkplaces block\n-->\n<div id=\"otherWorkplaces\">\n  <h1>Other Workplaces</h1>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.requested : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.other : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true});
templates['peopleTable'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<tr>\n			<td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n			<td>\n				<button data-secret-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " class=\"btn btn-default managerApprovalBtn\">Approve</button>\n			</td>\n		</tr>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<tr>\n			<td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n		</tr>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<tr>\n			<td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n			<td>\n				<button data-secret-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " class=\"btn btn-default employeeApprovalBtn\">Approve</button>\n			</td>\n		</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"optionContainer\">\n	<table>\n		<tr>\n			<th>Managers</th>\n		</tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.uManagers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.managers : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</table>\n</div>\n<br>\n<div class=\"optionContainer\">\n	<table>\n		<tr>\n			<th>Employees</th>\n		</tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.uEmployees : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.employees : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</table>\n</div>\n\n";
},"useData":true});
templates['settings'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"signup\">\n  <h1>Settings</h1>\n  <h2>Personal information</h2>\n  \n  <div id= \"personalInfo\">\n    <div> Name: "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " </div>\n    <div> Email: "
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + " </div>\n    <div> Password: "
    + escapeExpression(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"password","hash":{},"data":data}) : helper)))
    + " </div>\n  </div>\n  <form id=\"edit-form\">\n    <button type=\"submit\" id=\"edit-btn\"> Edit </button> \n  </form>\n</div>";
},"useData":true});
templates['signup'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"signup\">\n  <h1>Welcome to ReShift</h1>\n  <h2>Sign up</h2>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n  <form id=\"signup-form\">\n    <div>Name: <input type=\"text\" name=\"name\" class=\"form-control\" required /></div>\n    <div>Email: <input type=\"email\" name=\"email\" class=\"form-control\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" class=\"form-control\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" class=\"form-control\" required /></div>\n    <div>\n      <input type=\"radio\" name=\"role\" value=\"manager\" checked=\"checked\"> Manager  \n      <input type=\"radio\" name=\"role\" value=\"employee\"> Employee\n    </div>\n    <button class=\"btn btn-default\" type=\"submit\" id=\"signUp-btn\"> Sign up </button>\n  </form>\n\n</div>\n";
  stack1 = this.invokePartial(partials.login, '', 'login', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});
templates['specificWorkplace'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id='specificWorkplaceTitle' style=\"text-align:center; padding-top: 50px;\">\n</div>\n<input id=\"workplaceID\" type=\"hidden\" value="
    + escapeExpression(((helper = (helper = helpers.workID || (depth0 != null ? depth0.workID : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"workID","hash":{},"data":data}) : helper)))
    + " />\n<br><br>\n\n<div id=\"overallPage\">\n	<div style=\"display:inline; float:left; width:29%; text-align: center;\">\n		<br><br><br>\n		<div id='peopleTables'>\n\n		</div>\n\n	</div>\n	<div style=\"display:inline; float:left; width:69%;\">\n		<div id=\"calendar\"></div>\n	</div>\n\n	\n\n</div>\n\n\n\n\n<div id=\"eventPage\">\n\n	<h2 id=\"eventPageStatus\">Status Of Event</h2>\n	<p id=\"eventPageTime\">Time</p>\n	<p id=\"eventPageManager\">Manager Of shift</p>\n	<div id=\"additionalInput\"></div>\n	<br>\n	<div style=\"display:inline-block; width: 100%; text-align:center; margin:0 auto;\">\n		<div style=\"display:inline; float:left; width:49%;\">\n			<p id=\"eventPageButton\"></p>\n		</div>\n		<div style=\"display:inline; float:left; width:49%;\">\n			<p><a onclick=\"closeEventPage();\">Cancel</a></p>\n		</div>\n	</div>\n	\n</div>\n<div id=\"cover\"></div>\n\n";
},"useData":true});
templates['specificWorkplaceTitle'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h1 id='specificWorkplaceTitle'>"
    + escapeExpression(((helper = (helper = helpers.workplaceName || (depth0 != null ? depth0.workplaceName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"workplaceName","hash":{},"data":data}) : helper)))
    + "</h1>";
},"useData":true});
templates['specificWorkplaceWorkers'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<option value="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n			"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n		</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select name='workers'>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.managers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.employees : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</select>";
},"useData":true});
templates['workplaceInfo'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal fade\" id=\"WorkplaceInfoModal\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n        	<span aria-hidden=\"true\">&times; </span>\n        	<span class=\"sr-only\"> Close </span>\n        </button>\n        <h4 class=\"modal-title\"> Workplace</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div id=\"joinWorkplace\">\n\n		    </div>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n";
},"useData":true});
})();
