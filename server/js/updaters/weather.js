var constants = require('../constants.js');
var http = require('../utils//easyhttp.js');

function parseCommonWeather(weather) {
	return {
		humidity    : weather.main.humidity,
		wind        : weather.wind.speed,
		desc_simple : weather.weather[0].main.toLowerCase(),
		desc_full   : weather.weather[0].description.toLowerCase()
	};
}

function parseWeatherItem(weather) {
	var response = parseCommonWeather(weather);
	response.name = weather.name;
	response.temp = weather.main.temp;
	response.minTemp = weather.main.temp_min;
	response.maxTemp = weather.main.temp_max;

	return response;
}

function parseForcastItem(weather) {
	var response = parseCommonWeather(weather);
	response.temp = weather.main.temp_min;
	response.date = weather.dt;
	response.date_string = weather.dt_txt;

	return response;
}

function updateWeather(updateCallback, weather) {
	updateCallback('weather', parseWeatherItem(weather));
}

function updateForecast(updateCallback, forecast) {

	var sortforecasts = function(a, b) {
		return a.dt - b.dt;
	}

	updateCallback('forecast', {
		'city'    : forecast.city.name,
		'forecast' : forecast.list.sort(sortforecasts).map(parseForcastItem)
	})
}

function update(updateCallback) {
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
