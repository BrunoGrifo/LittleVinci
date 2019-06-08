document.addEventListener("DOMContentLoaded", function() {
   // get canvas element and create context
   var canvas  = document.getElementById('guessing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   //ajuda help1
   var help1 = document.getElementById("help1");
   help1.addEventListener("click", clickHelp1);

   //ajuda help2
   var help2 = document.getElementById("help2");
   help2.addEventListener("click", clickHelp2);

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
      global_word = data.palavra;
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
/// UPDATING WORD -WAITINF FOR HTML IN DRAW
   // updating word loop, running every 1000ms
     function updateWord() {
        // check the array of the word
        for(var i=0;i<18;i++){
        var id= "#i"+i;
        //console.log(aux2);
        //console.log(aux3);
        if($(id).children().length > 0){
          var url = $(id).children().css('background-image');
          url = url.match(/url\(["']?([^"']*)["']?\)/)[1];
          console.log("estou aqui url:"+url);
          url= url.split("").reverse().join("");
          //finalword = finalword + url[4];
          //space=1;
          socket.emit('word_update', { letter : [ i , url[4] ] });
          //console.log('batata:'+i+':'+$(id).children().css('background-image'));
          //console.log("url:"+);
        }
        else{
          socket.emit('word_update', { letter : [ i , '0' ] });
        }
      }
        setTimeout(updateWord, 25);
     }
     updateWord();

     var reload = document.getElementById("startOver");
     reload.addEventListener("click", reloadP);
     //start again when ppl close
     function reloadP() {
       location.reload();
     }

     $(function(){
              $('#leaveGame').click(function(e) {
                  //e.preventDefault();
                    //console.log("fechar a janelita");
                    //socket.emit('game_over', { game : true });
                    //console.log("fechar a janelita apos o emit da treta");
                    window.location.href = '/';
                 });
               });

               var lives=3;
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

                              var lifeId = "lf"+lives;
                             if(lives > 1){
                               $('#tryAgain').show(result);
                               lives--;
                               document.getElementById(lifeId).src="img/life_used.png";
                             }
                             else{
                               socket.emit('game_over', { game : true });
                               $('#gameOVER').show(result);
                               console.log('\'you lost noob');
                             }
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

});

let global_word;
/**
*Funçao que se executa quando clicko na help1 - GIVE NUMBER OF LETTERS
**/
function clickHelp1(){
    var tamanho=global_word.length;
    for(var i=0;i<tamanho;i++){
      var id= "t"+i;
      //console.log(aux2);
      div = document.getElementById(id);
      div.style.background = 'url(img/traço.png) center' ;
    }
}


/**
*Funçao que se executa quando clicko na help2 - GIVE RANDOM LETTER
**/
function clickHelp2(){
//FIRST CLEAR THE LETTERS THAT ARE PUT
  for(var i=0;i<18;i++){
    console.log("sou chamado");
    var id= "i"+i;
    //console.log(aux2);
    var son = document.getElementById(id);
    //console.log("what:"+son);
    if(son.children.length > 0){
      console.log(document.getElementById(son.childNodes[1].id));
      for(var j=0;j<26;j++){
        var id_aux= "r"+j;
        var son_aux = document.getElementById(id_aux).children.length;
        //console.log("what:"+son);
        if(son_aux < 1){
          document.getElementById(id_aux).appendChild(
            document.getElementById(son.childNodes[1].id) );
            break;
        }
      }
    }
  }
    //TO-DO GIVE RANDOM LETTER
    console.log("global word:"+global_word);
    var random = Math.floor(Math.random()*global_word.length)
    var random_letter = global_word.charAt(random);
    console.log("posicao"+random+"random letter to give:"+random_letter);
  for(var j=0;j<26;j++){
    if(array_random[j]==random_letter){
      id_soup = "l"+j;
      id_word = "i"+random;
      document.getElementById(id_word).appendChild(
        document.getElementById(id_soup) );
      break;
    }
  }


}


/**
*Funçao que se executa quando clicko num elemento
**/
function clickLetter(e) {

    var x = document.getElementById(e.target.id).parentNode.className;
    if(x=="emptyW"){
      for(var i=0;i<26;i++){
        var id= "r"+i;
        //console.log(aux2);
        var son = document.getElementById(id).children.length;
        //console.log("what:"+son);
        if(son < 1){
          document.getElementById(id).appendChild(
            document.getElementById(e.target.id) );
            break;
        }
        else{
          continue;
        }
      }
    }
    else{
      for(var i=0;i<18;i++){
        var id= "i"+i;
        //console.log(aux2);
        var son = document.getElementById(id).children.length;
        //console.log("what:"+son);
        if(son < 1){
          document.getElementById(id).appendChild(
            document.getElementById(e.target.id) );
            break;
        }
        else{
          continue;
        }
      }
    }


}

/**
* Función que se ejecuta al arrastrar el elemento.
**/
/*
function start(e) {
	e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
	e.dataTransfer.setData("Text", e.target.id); // Coje el elemento que se va a mover
	e.target.style.opacity = '0.4';
}
*/
/**
* Función que se ejecuta se termina de arrastrar el elemento.
**/
/*
function end(e){
	e.target.style.opacity = ''; // Restaura la opacidad del elemento
	e.dataTransfer.clearData("Data");
}
*/

/**
* Función que se ejecuta cuando un elemento arrastrable entra en el elemento desde del que se llama.
**/
/*
function enter(e) {
	return true;
}
*/
/**
* Función que se ejecuta cuando un elemento arrastrable esta sobre el elemento desde del que se llama.
* Devuelve false si el objeto se puede soltar en ese elemento y true en caso contrario.
**/
/*
function over(e) {
	if ((e.target.className == "empty") || e.target.className == "emptyW"){
    console.log("ja estou ocuopado");
    return false;
  }

	else
	return true;
}*/

/**
* Función que se ejecuta cuando un elemento arrastrable se suelta sobre el elemento desde del que se llama.
**/
/*
function drop(e){
	e.preventDefault(); // Evita que se ejecute la accion por defecto del elemento soltado.
	var elementoArrastrado = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(elementoArrastrado)); // Coloca el elemento soltado sobre el elemento desde el que se llamo esta funcion
}
*/
var array=[];
var array_random;
function createSoup(palavra){

  //var string = String(palavra);
  global_word = palavra;
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
  array_random = shuffleArray(array);
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
     //innerDiv.setAttribute("draggable", "true");
     //innerDiv.setAttribute("ondragstart", "start(event)");
     //innerDiv.setAttribute("ondragstart", "start(event)");
     //innerDiv.setAttribute("ondragend", "end(event)");
     innerDiv.setAttribute ("onclick", "clickLetter(event)");;
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
              $('#closeit').click(function(e) {
                  //e.preventDefault();
                  var data = "";
                  $.get('/draw', function(result) {
                    window.location.href = '/draw';
                    });
                 });
               });
