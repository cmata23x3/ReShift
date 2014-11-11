var Response = {};

//Authors: Christian & Sheldon
/// Code inspired by Charles's example code that was provided.

/**
* Helper method that will edit response JSON for successful API calls. 
*
* @method sendSuccess
* @param {Object} res Express response object that will be returned
* @param {Object} content Content that was returned from the previous method
*/
Response.sendSuccess = function(res, content) {
	res.setHeader('Content-Type', 'application/json');
	res.status(200).json({
		status: "ok",
		response: content
	}).end();
};

/**
* Helper method that will edit response JSON for failing API calls. 
*
* @method sendErr
* @param {Object} res Express response object that will be returned
* @param {Integer} errcode Integer of the HTTP code that occurred
* @param {String} err error string describing the error that occurred
*/
Response.sendErr = function(res, errcode, err) {
	res.setHeader('Content-Type', 'application/json');
	res.status(errcode).json({
		status: "error",
		response: err
	}).end();
};

Response.requestForDelete = function (req, res, model, params) {
	model.findOneAndRemove(params, function (err) {
		if (err) {
			Response.sendErr(res, 500, 'An unknown error occurred.');
		}
		else {
			Response.sendSuccess(res, {data: null});
		}
	})
};

Response.requestForPut = function (req, res, model, find_params, update_params) {
	model.findOneAndUpdate(find_params, update_params)
	.exec(function(err, doc){
		if (err) {
			Response.sendErr(res, 404, 'Resource not found.');
		}
		else {
			Response.sendSuccess(res, {data : doc});
		}
	});
};

	module.exports = Response;
