// Write your JS in here
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

//change the visibility of divID
function changeVisibility(divID) {
    var element = document.getElementById(divID);
    
    //if element exists, toggle it's class between hidden and unhidden
    
    if (element) {
        element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
    }//if
    
}//changeVisibility

//toggles lightbox with bigImage in it
function toggleLightBox(imageFile, alt) {
    
    var image = new Image();
    var bigImage = document.getElementById("bigImage");
    
    image.src = "imgs/" + imageFile;
    image.alt = alt;
    
    //force big image to preload so we can have access to its width so it will be centered
    image.onload = function () {
        var width = image.width;
        document.getElementById("boundaryBigImage").style.width = width + "px";
    };
    
    bigImage.src = image.src;
    bigImage.alt = image.alt;
    
    changeVisibility('lightbox');
    changeVisibility('boundaryBigImage');
}//toggleLightBox

// Write your JS in here
var pics = [
	"imgs/grad.png",
	"imgs/ch.png",
	"imgs/toge.png",
	"imgs/chenle.jpg",
	"imgs/jackson.png",
	"imgs/Cover%20YB.png"
];

var pics1 = [
	"imgs/left.png",
	"imgs/back.png",
	"imgs/riht.png",
	"imgs/front.png",
];

var btn = document.querySelector("button");
var img = document.querySelector("img");
var i = 1;

btn.addEventListener("click", function(){
    if(i === 6){
        i = 0;
    }
    img.src = pics[i];
    i = i + 1;
});

var img1 = document.getElementById("ims");
var j = 0;

var slider = document.getElementById("myRange");

slider.oninput = function() {
  if (this.value <= 20) {
    img1.src = pics1[3];
  } else if (this.value <= 40 && this.value > 20){
    img1.src = pics1[0];
  } else if (this.value <= 60 && this.value > 40){
    img1.src = pics1[1];
  } else if (this.value <= 80 && this.value > 60){
    img1.src = pics1[2];
  } else if (this.value > 80){
    img1.src = pics1[3];
  }
}

//video
var myVideo = document.getElementById("video1"); 

function playPause() { 
  if (myVideo.paused) 
    myVideo.play(); 
  else 
    myVideo.pause(); 
}