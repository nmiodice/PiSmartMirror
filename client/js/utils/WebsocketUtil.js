var io = require('socket.io-client');
var ActionTypes = require('../constants/ActionTypes.js');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var socket;

WebsocketUtils = {
	init : function() {
		socket = io.connect('/');

		socket.on('weather', function(data) {
			AppDispatcher.dispatch({
				type : ActionTypes.ACTION_WEATHER,
				data : data
			});
		});

		socket.on('forecast', function(data) {
			AppDispatcher.dispatch({
				type : ActionTypes.ACTION_FORECAST,
				data : data
			});
		});

		socket.on('news', function(data) {
			AppDispatcher.dispatch({
				type : ActionTypes.ACTION_NEWS,
				data : data
			});
		});
	}
};

module.exports = WebsocketUtils;
