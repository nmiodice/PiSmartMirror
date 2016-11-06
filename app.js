var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var constants = require('./constants.js');
var clientupdater = require('./clientupdater.js')

var initServer = function() {
	app.get('/', function(req, res) {  
	    res.sendFile(__dirname + '/index.html');
	});

	server.listen(constants.CONNECTION.PORT);  	
}

var initWebSockets = function() {
	io.on('connection', function(socket) {

		var updateCallback = function(topic, message) {
			console.log('emitting message on topic = \'' + topic + '\'');
			io.to(socket.id).emit(topic, message)
		}
		
		clientupdater.update(updateCallback);

		// var interval = setInterval(function() {
		// 	clientupdater.update(updateCallback);
		// }, 2000)

	    // socket.on('disconnect', function() {
     //    	clearInterval(interval)
     //    });
    });
};

initServer();
initWebSockets();
