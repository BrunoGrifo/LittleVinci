var modal, btn, span, menuP;
(function()
{	
	window.addEventListener("load", main);

}());

function main() {
  modal = document.getElementById("myModal");
  menuRender = document.getElementById("menuDef");
  
  //Continuar nas instruções
  span = document.getElementById("closeBtn");;
  span.addEventListener("click", ctn);

  //Botão das definições
  menuP = document.getElementById("menuP");
  menuP.addEventListener("click", menu);

  //Botão das instruções do menu
//   btn = document.getElementById("myBtn");
//   btn.addEventListener("click", instru);
  
  

 
//   menuPC.addEventListener("click", menuClose);



    modal.style.display = "block";

//   window.addEventListener("click", fora);

}
    // When the user clicks the button, open the modal 
//   function instru() {
//     modal.style.display = "block";
//   }
  
  function ctn() {
    modal.style.display = "none";
  }
  
  function menu() {
    menuRender.style.display = "block";
  }
  
//   function () {
//     menuP.style.display = "none";
//   }

  // When the user clicks anywhere outside of the modal, close it
//   function fora(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }