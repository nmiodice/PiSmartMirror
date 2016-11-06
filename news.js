var constants = require('./constants.js');
var http = require('./easyhttp.js');

function updateNews(updateCallback, news) {
	console.log('-----');
	news.forEach(function(x) {
		console.log(x);
	})
}

function update(updateCallback) {
	var callData = constants.NEWS.API_PATHS.map(function(path) {
		return {
			host : constants.NEWS.API_HOST,
			path : path
		};
	});

	http.batchCall(callData, function(news) {
		updateNews(updateCallback, news);
	})
};

module.exports = {
	update : update
};
