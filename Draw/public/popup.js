var modal, btn, span, menuP, menuX, menuRender,sound, playAgain, inputDraw, soundChose ;

(function()
{
    window.addEventListener("load", main);

}());

function main() {
  modal = document.getElementById("myModal");
  sound = document.getElementById("playSound");
  menuRender = document.getElementById("menuDef");
  playAgain = document.getElementById("playAgain");
  inputDraw = document.getElementById("inputDraw");

  //Continuar nas instruções
  span = document.getElementById("closeBtn");;
  span.addEventListener("click", ctn);

  //Botão das definições
  menuP = document.getElementById("menuP");
  menuP.addEventListener("click", menu);

  //Botão das instruções do menu
  btn = document.getElementById("myBtn");
  btn.addEventListener("click", instru);

  //Botão de leave do menu
  leaveBtn =  document.getElementById("leaveBtn");
  leaveBtn.addEventListener("click", leave);

  //Botão de sair do manu
  menuX = document.getElementById("menuX");
  menuX.addEventListener("click",exitMenu);


  if (window.location.pathname == '/draw'){
    //Botão de escolher musica
    //console.log("estou a escolher o som"+window.location.pathname);
    soundChose = document.getElementById("soundChose");
    soundChose.addEventListener("click",writeDrawName);
  }


  modal.style.display = "block";


//   menuPC.addEventListener("click", menuClose);
//   window.addEventListener("click", fora);

}
    // When the user clicks the button, open the modal
  function instru() {
    menuRender.style.display = "none";
    modal.style.display = "block";
  }

  function ctn() {
    modal.style.display = "none";
    inputDraw.style.display = "none";
    playAgain.style.display = "block";
    sound.style.display = "block";
  }

  function menu() {
    menuRender.style.display = "block";
  }
  function exitMenu() {
    menuRender.style.display = "none";
  }

  function writeDrawName(){
    console.log("mudo de modal");
    playAgain.style.display = "none";
    inputDraw.style.display = "block";
  }




  function leave(){
    var m = confirm("Are you sure you want to leave the game?");
  }

//   function () {
//     menuP.style.display = "none";
//   }

  // When the user clicks anywhere outside of the modal, close it
//   function fora(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
// }
