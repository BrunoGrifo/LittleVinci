document.addEventListener("DOMContentLoaded", function() {
   // get canvas element and create context
   var canvas  = document.getElementById('guessing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();




   //Botão done
  /*var done = document.getElementById("done");
   done.addEventListener("click", menuB);

  resultRender = document.getElementById("resultpop");
   function menuB() {
     resultRender.style.display = "block";
   }*/


   menuResult = document.getElementById("resultpop");
   function exitDone() {
     menuResult.style.display = "none";
   }
   //Botão de sair do manu
   closeit = document.getElementById("closeit");
   closeit.addEventListener("click",exitDone);

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

/**
* Función que se ejecuta al arrastrar el elemento.
**/
function start(e) {
	e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
	e.dataTransfer.setData("Text", e.target.id); // Coje el elemento que se va a mover
	e.target.style.opacity = '0.4';
}

/**
* Función que se ejecuta se termina de arrastrar el elemento.
**/
function end(e){
	e.target.style.opacity = ''; // Restaura la opacidad del elemento
	e.dataTransfer.clearData("Data");
}

/**
* Función que se ejecuta cuando un elemento arrastrable entra en el elemento desde del que se llama.
**/
function enter(e) {
	return true;
}

/**
* Función que se ejecuta cuando un elemento arrastrable esta sobre el elemento desde del que se llama.
* Devuelve false si el objeto se puede soltar en ese elemento y true en caso contrario.
**/
function over(e) {
	if ((e.target.className == "empty") || e.target.className == "emptyW"){
    console.log("ja estou ocuopado");
    return false;
  }

	else
	return true;
}

/**
* Función que se ejecuta cuando un elemento arrastrable se suelta sobre el elemento desde del que se llama.
**/
function drop(e){
	e.preventDefault(); // Evita que se ejecute la accion por defecto del elemento soltado.
	var elementoArrastrado = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(elementoArrastrado)); // Coloca el elemento soltado sobre el elemento desde el que se llamo esta funcion
}



$(function(){
    $('#done').click(function(e) {
        e.preventDefault();
        var finalword='';
        for(var i=0;i<11;i++){
          var aux= "#i"+i;
          //console.log(aux2);
          //console.log(aux3);
          if($(aux).children().length > 0){
            finalword = finalword + $(aux).children().attr('id');
            console.log('batata:'+i+':'+$(aux).children().attr('id'));
          }
        }
        console.log(finalword);
        data = 'guess='+finalword;
        $.get('/word', data, function(result) {
            if(result.valid == false)
            {
               console.log('\'you suck');
                //window.location.href = '/something';
            }
            else
            {
              console.log('\'you rock');
                $('#resultpop').show(result);
                //$('#myModal').modal('show');
                console.log('depois do popup');
            }
          });
       });
     });
