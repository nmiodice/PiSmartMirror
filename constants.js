fs = require('fs');

var CONNECTION = {
	PORT : 8080
};

var LOCATION = {
	CITY : 'Boston',
	COUNTRY : 'US'
};

var getAPIKey = function(keyname) {
	var apiKey = fs.readFileSync('api_keys/' + keyname, 'utf8');
	console.log('found api key: ' + apiKey);
	return apiKey;
}

var API_KEYS = {
	WEATHER_KEY : getAPIKey('weather.key'),
	NEWS_KEY    : getAPIKey('news.key')
}

var buildWeatherAPIPath = function(uriPart) {
	return '/data/2.5/' + uriPart + '?q=' + LOCATION.CITY + ',' + LOCATION.COUNTRY + '&units=imperial' + '&APPID=' + API_KEYS.WEATHER_KEY;
};

var WEATHER = {
	API_HOST : 'api.openweathermap.org',
	API_FORECAST_PATH : buildWeatherAPIPath('forecast'),
	API_WEATHER_PATH : buildWeatherAPIPath('weather')
};

var newsSources = [
	'reddit-r-all',
	'hacker-news',
	'bbc-news',
	'cnn',
	'the-economist'
];

var buildNewsAPIPath = function(newsSource) {
	return '/v1/articles?source=' + newsSource + '&apiKey=' + API_KEYS.NEWS_KEY;
};

var NEWS = {
	API_HOST : 'newsapi.org',
	API_PATHS : newsSources.map(buildNewsAPIPath),
};

module.exports = {
	CONNECTION : CONNECTION,
	LOCATION   : LOCATION,
	WEATHER    : WEATHER,
	NEWS       : NEWS
};
