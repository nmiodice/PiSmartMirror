var constants = require('./constants.js');
var http = require('./easyhttp.js');

var parseWeatherItem = function(weather) {
	return {
		minTemp     : weather.main.temp_min,
		maxTemp     : weather.main.temp_max,
		humidity    : weather.main.humidity,
		wind        : weather.wind.speed,
		desc_simple : weather.weather[0].main.toLowerCase(),
		desc_full   : weather.weather[0].description.toLowerCase()
	};
}

var updateWeather = function(updateCallback, weather) {
	var response = parseWeatherItem(weather);
	response.name = weather.name;
	response.temp = weather.main.temp;

	updateCallback('weather', response);
}

var updateForecast = function(updateCallback, forecast) {

	var sortforecasts = function(a, b) {
		return a.dt - b.dt;
	}

	updateCallback('forecast', {
		'city'    : forecast.city.name,
		'forecast' : forecast.list.sort(sortforecasts).map(parseWeatherItem)
	})
}

var update = function(updateCallback) {
	http.call(constants.WEATHER.API_HOST, constants.WEATHER.API_WEATHER_PATH, function(weather) {
		updateWeather(updateCallback, weather);
	})

	http.call(constants.WEATHER.API_HOST, constants.WEATHER.API_FORECAST_PATH, function(forecast) {
		updateForecast(updateCallback, forecast);
	})
};

module.exports = {
	update : update
};
