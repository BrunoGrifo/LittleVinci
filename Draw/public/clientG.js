document.addEventListener("DOMContentLoaded", function() {
   // get canvas element and create context
   var canvas  = document.getElementById('guessing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   //canvas.width = width;
   //canvas.height = height;

   // draw line received from server
	socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
      context.moveTo(line[0].x * canvas.width, line[0].y * canvas.height);
      context.lineTo(line[1].x * canvas.width, line[1].y * canvas.height);
      context.stroke();
   });
});
