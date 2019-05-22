var playBtn, passBtn, audio, passChose, soundPlayBtn;
var modal, menuRender,sound, playAgain, inputDraw;
var songs = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var i;
var rand;
var SN = 14;
var name;
var flag1,flag2;


(function()
{
    window.addEventListener("load", main);
    rand = Math.floor(Math.random()*SN);
    name = songs[rand];
    songs.splice(rand,1);

}());

function main(){
    modal = document.getElementById("myModal");
    sound = document.getElementById("playSound");
    menuRender = document.getElementById("menuDef");
    playAgain = document.getElementById("playAgain");
    inputDraw = document.getElementById("inputDraw");

    //Play button
    playBtn = document.getElementById("playBtn");
    playBtn.addEventListener("click", replay);

    //Pass button
    passBtn = document.getElementById("passBtn");
    passBtn.addEventListener("click", next);

    //PassChose button
    passChose = document.getElementById("passChose");
    passChose.addEventListener("click", passSound);

    //PassChose button
    soundPlayBtn = document.getElementById("soundPlayBtn");
    soundPlayBtn.addEventListener("click", replay);
}

function replay(){
    if (window.getComputedStyle(modal).display === "block") {
        // Do something..
    }else{
        audio = new Audio('sounds_wav/'+name+'.wav');
        //audio = new Audio('sounds_mp3/'+name+'.mp3');
        //audio.setAttribute("type","video/mp4" );
        audio.play();
    }
    // audio = new Audio('sounds/'+name+'.mp3');
    // audio.play();

}

function next(){
    if(SN == 0){
        var m = confirm("No more sounds to play!");
    }else{
        rand = Math.floor(Math.random()*SN);
        name = songs[rand];
        songs.splice(rand,1);
        console.log(rand);
        console.log(songs);
        console.log(name);
        SN--;
    }
}

function passSound(){
    console.log("entra");
    next();
    replay();
}
