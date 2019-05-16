var express = require('express'),
    app = express(),
    http = require('http'),
    bodyParser = require('body-parser'),
    socketIo = require('socket.io'),
    fs = require('fs');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(3000);
// add directory with our static files
app.use(express.static(__dirname));
console.log("Server running on 127.0.0.1:3000");


app.route('/draw')
 	.get(function (req, res) {
		res.sendFile(__dirname+'/clientD.html');
	});

  app.route('/guess')
   	.get(function (req, res) {
  		res.sendFile(__dirname+'/clientG.html');
  	});

    app.get('/word',function (req, res) {
        console.log("hello:"+String(req.query));
    		//res.sendFile(__dirname+'/clientG.html');
    	});

      
// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

     // first send the history to the new client
     for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] } );
     }

     // add handler for message type "draw_line".
     socket.on('draw_line', function (data) {
        // add received line to history
        line_history.push(data.line);
        // send line to all clients
        io.emit('draw_line', { line: data.line });
     });
  });
