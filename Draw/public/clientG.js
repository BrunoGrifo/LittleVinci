document.addEventListener("DOMContentLoaded", function() {
   // get canvas element and create context
   var canvas  = document.getElementById('guessing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();







   menuResult = document.getElementById("resultpop");
   function exitDone() {
     menuResult.style.display = "none";
   }
   //Botão de sair do manu
   //closeit = document.getElementById("closeit");
   //closeit.addEventListener("click",exitDone);

   tryAgain = document.getElementById("tryAgain");
   function exitPop() {
     tryAgain.style.display = "none";
   }
   //Botão de sair do manu
   closeit = document.getElementById("continuePlay");
   closeit.addEventListener("click", exitPop);

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
var ready;
   // get the ready signal from server
 socket.on('ready', function (data) {
      console.log("i was called:"+data.palavra);
      createSoup(data.palavra);
      ready = data.ready;
      var buttonC = document.getElementById("closeBtn");
      if(ready==true){
        buttonC.disabled=false;
      }
   });

   // clean up canvas from server
	socket.on('clean_canvas', function (data) {
    console.log("dentro do clientG-cleanup");
    if(data.cleanup == true){
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
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

function createSoup(palavra){
  var array=[];
  //var string = String(palavra);
  //colocar as letras num array
  palavra = palavra.split(' ').join('');
  array = [...palavra];
  console.log("palavra feito em array:"+array);
  //Letras do abc
  var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'];
  //recebe o array de letras com ordem random
  while(array.length < 26){
    var item = abc[Math.floor(Math.random()*abc.length)];
    array.push(item);
  }
  console.log("sopinha:"+array);
  var array_random= shuffleArray(array);
  console.log("sopinha com desordem: "+array_random);
  createSoupView(array_random);
}

 function createSoupView(array){
   for(var i=0;i<26;i++){
     var id = "r"+i;
     var div = document.getElementById(id);
     // Create the inner div before appending to the body
     var innerDiv = document.createElement('div');
     innerDiv.setAttribute("class", "fill");
     innerDiv.setAttribute("id", "l"+i);
     innerDiv.setAttribute("draggable", "true");
     innerDiv.setAttribute("ondragstart", "start(event)");
     innerDiv.setAttribute("ondragstart", "start(event)");
     innerDiv.setAttribute("ondragend", "end(event)");
     innerDiv.style.background = 'url(LETRAS/'+array[i]+'.png) no-repeat center';
     innerDiv.style.backgroundSize = "30px 30px";
     div.appendChild(innerDiv);
   }
 }

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$(function(){
    $('#done').click(function(e) {
        e.preventDefault();
        var finalword='';
        var space = 0;
        for(var i=0;i<18;i++){
          var id= "#i"+i;
          //console.log(aux2);
          //console.log(aux3);
          if($(id).children().length > 0){
            var url = $(id).children().css('background-image');
            url = url.match(/url\(["']?([^"']*)["']?\)/)[1];
            console.log("estou aqui url:"+url);
            url= url.split("").reverse().join("");
            finalword = finalword + url[4];
            space=1;
            //console.log('batata:'+i+':'+$(id).children().css('background-image'));
            //console.log("url:"+);
          }
          else{
            if(space==1){
              finalword = finalword + " ";
              space=2;
            }
          }
        }
        console.log(finalword);
        var data = 'guess='+finalword;
        $.get('/word', data, function(result) {
            if(result.valid == false)
            {
               console.log('\'you suck');
               $('#tryAgain').show(result);
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


     $(function(){
              $('#closeit').click(function(e) {
                  //e.preventDefault();
                  var data = "";
                  $.get('/draw', function(result) {
                    window.location.href = '/draw';
                    });
                 });
               });
