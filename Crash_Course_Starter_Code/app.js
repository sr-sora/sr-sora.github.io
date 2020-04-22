// Write your JS in here
var pics = [
	"imgs/kitty_basket.jpg",
	"imgs/kitty_bed.jpg",
	"imgs/kitty_laptop.jpg",
	"imgs/kitty_door.jpg",
	"imgs/kitty_sink.jpg",
	"imgs/kitty_wall.jpg"
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
