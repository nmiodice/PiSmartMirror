var weather = require('./weather.js')
var news = require('./news.js')

module.exports = {
	update : function(updateCallback) {
		weather.update(updateCallback);
		news.update(updateCallback);
	}
};