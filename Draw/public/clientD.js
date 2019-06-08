document.addEventListener("DOMContentLoaded", function() {

   var mouse = {
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var erase = document.getElementById('erase');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();
   // set canvas to full browser width/height
   //canvas.width = width;
   //canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / canvas.width;
      mouse.pos.y = e.clientY / canvas.height;
      mouse.move = true;
   };

   erase.onmousedown = function(e){
      var m = confirm("Are you sure you want to erase everything?");
        if (m) {
          console.log("dentro do clientD-cleanup");
            context.clearRect(0, 0, canvas.width, canvas.height);
            socket.emit('clean_canvas', { cleanup: true })
        }
   }

   // Game ended handler
 socket.on('gameWin', function (data) {
      if(data.game==true){
        var menuGameEnd = document.getElementById("gameEnd");
        menuGameEnd.style.display = "block";
      }
      console.log("i was called:"+data.game);


   });

   $(function(){
            $('#closeit').click(function(e) {
                //e.preventDefault();
                var data = "";
                $.get('/guess', function(result) {
                  window.location.href = '/guess';
                  });
               });
             });

   // draw line received from server
	socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
      context.moveTo(line[0].x * canvas.width, line[0].y * canvas.height);
      //desenha um circulo
      //context.arc(line[1].x * canvas.width, line[1].y * canvas.height, 10, 0, Math.PI * 2);
      context.lineTo(line[1].x * canvas.width, line[1].y * canvas.height);
      context.lineWidth = 15;
      context.lineHeight = 15;
      context.opacity = 0.5;
       context.strokeStyle = "white";
      context.stroke();
   });

   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         // send line to to the server
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }

   mainLoop();

   // WORD UPDATE LIVE WAITING FOR HTML
      // put letter received from server
      socket.on('word_update', function (data) {
                var letter = data.letter;
                var id = "i"+letter[0];
                //console.log("posicao:"+letter[0]+" letter:"+letter[1]);
                var div = document.getElementById(id);
                if(div.childElementCount > 0 ){
                  var sonId = div.childNodes[0].id;
                  if(letter[1] == '0'){
                    div.removeChild(div.childNodes[0]);
                  }
                  else{
                    //DO NOTHING
                  }

                }
                else{
                  if(letter[1] == '0'){
                    //
                  }
                  else{
                    // Create the inner div before appending to the body
                    var innerDiv = document.createElement('div');
                    innerDiv.setAttribute("class", "fill");
                    innerDiv.setAttribute("id", "p"+letter[0]);
                    innerDiv.setAttribute("draggable", "true");
                    innerDiv.setAttribute("ondragstart", "start(event)");
                    innerDiv.setAttribute("ondragstart", "start(event)");
                    innerDiv.setAttribute("ondragend", "end(event)");
                    innerDiv.style.background = 'url(LETRAS/'+letter[1]+'.png) no-repeat center';
                    innerDiv.style.backgroundSize = "12.5px 12.5px";
                    div.appendChild(innerDiv);
                  }

                }

            });

            // draw line received from server
         	socket.on('game_over', function (data) {
            if(data.game==true){
              console.log("Hello modafuka");
              var modal = document.getElementById("gameOVER");
              modal.style.display = "block";
            }
            });

            $(function(){
                     $('#leaveGame').click(function(e) {
                         //e.preventDefault();
                           window.location.href = '/';
                        });
                      });
            var reload = document.getElementById("startOver");
            reload.addEventListener("click", reloadP);
            //start again when ppl close
            function reloadP() {
              location.reload();
            }

});



$(function(){
         $('#soundChose2').click(function(e) {
             e.preventDefault();
             var data = 'guess='+$('#wordToDraw').val();;
             $.get('/insert', data, function(result) {
                 if(result.valid == false)
                 {
                    console.log('you suck');
                     //window.location.href = '/something';
                 }
                 else
                 {
                    $('#playSound').hide(result);
                     $('#inputDraw').hide(result);
                     console.log('depois do popup');
                 }
               });
            });
          });
