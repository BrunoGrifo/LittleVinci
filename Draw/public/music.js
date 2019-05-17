var playBtn, passBtn, audio;
var songs = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
var i;
var rand;
var SN = 22;
var name;


(function()
{	
    window.addEventListener("load", main);
    rand = Math.floor(Math.random()*SN);
    name = songs[rand];
    songs.splice(rand,1);

}());

function main(){
    //Play button
    playBtn = document.getElementById("playBtn");;
    playBtn.addEventListener("click", replay);

    //Play button
    passBtn = document.getElementById("passBtn");;
    passBtn.addEventListener("click", next);
}

function replay(){
    audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
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