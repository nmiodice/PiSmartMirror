var http = require('follow-redirects').http;

var easyHTTPCall = function(host, path, callback) {
	var options = {
		host : host,
		path : path
	};

	var httpCallback = function(response) {
		var responseString = '';

		response.on('data', function(chunk) {
			responseString += chunk;
		})

		response.on('end', function() {
			callback(JSON.parse(responseString))
		});
	};

	http.request(options, httpCallback).end();
}

/**
 * this chains many HTTP calls together and only executes the callback
 * when all of the individual HTTP requests have been made
 */
var easyHttpBatchCall = function(callData, callback) {
	_easyHttpBatchCall(callData, callback, []);
};

var _easyHttpBatchCall = function(callData, callback, allResponses) {
	if (allResponses.length == callData.length) {
		callback(allResponses);
		return;
	}

	var batchCallback = function(response) {
		allResponses.push(response);
		_easyHttpBatchCall(callData, callback, allResponses);
	}

	nextCall = callData[allResponses.length];
	nextHost = nextCall.host;
	nextPath = nextCall.path;
	easyHTTPCall(nextHost, nextPath, batchCallback);
};

module.exports = {
	call      : easyHTTPCall,
	batchCall : easyHttpBatchCall
};
