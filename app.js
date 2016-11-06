var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var constants = require('./constants.js');
var clientupdater = require('./clientupdater.js')

function initServer() {
	app.get('/', function(req, res) {  
	    res.sendFile(__dirname + '/index.html');
	});

	server.listen(constants.CONNECTION.PORT);  	
}

function startInterval(seconds, callback) {
  callback();
  return setInterval(callback, seconds * 1000);
}

function initWebSockets() {
	io.on('connection', function(socket) {

		var updateCallback = function(topic, message) {
			console.log('emitting message on topic = \'' + topic + '\'');
			io.to(socket.id).emit(topic, message)
		}

		var interval = startInterval(5, function() {
			clientupdater.update(updateCallback);
		})

	    socket.on('disconnect', function() {
        	clearInterval(interval)
        });
    });
};

initServer();
initWebSockets();
