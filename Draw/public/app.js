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



app.route('/menu').get(function (req, res) {
   res.sendFile(__dirname+'/index.html');
});

let palavra;
    //Insert Word FROM DRAW PERSPECTIVE =================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/insert', function(req, res, next) {
   palavra = req.query.guess;
      return res.send({ valid: true });
    //console.log(util.inspect(req, false, null));


});



//Insert Word FROM GUESS PERSPECTIVE=================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/word', function(req, res, next) {
  var guess = req.query.guess;
  console.log("hello:"+guess);
  if(guess == palavra){
    return res.send({ valid: true });
  }
  else{
    return res.send({ valid: false });
  }
//console.log(util.inspect(req, false, null));


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
