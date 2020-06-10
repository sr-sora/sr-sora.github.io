//Global Variables
const levels = [ 
  //level 0
  ["flag", "rock", "tree", "tree", "tree", "tree",
  "fenceside", "rock", "", "", "rider", "tree",
  "", "tree", "animate", "animate", "animate", "tree",
  "", "tree", "", "", "rock", "rock",
  "", "tree", "", "", "", "",
  "", "fenceup", "", "", "horseup", ""],
  
  //level 1
  ["animate", "animate", "animate", "animate", "animate", "animate",
  "", "tree", "tree", "", "tree", "",
  "", "", "tree", "horseup", "tree", "",
  "", "", "tree", "tree", "rock", "",
  "", "tree", "", "flag", "rock", "", 
  "", "fenceup", "", "rock", "rider", ""],
  
  //level 2
  ["rock", "", "", "", "", "horsedown",
  "", "", "", "rock", "rock", "",
  "", "", "", "rock", "", "",
  "tree", "fenceside", "tree", "animate", "animate", "animate",
  "water", "", "water", "water", "", "", 
  "flag", "bridge", "water", "water", "water", "rider"],
  
  //level 3
  ["flag", "fenceup", "horseright", "", "", "",
  "fenceside", "rock", "rock", "rock", "", "water",
  "", "", "", "rock", "", "water",
  "rock", "", "", "", "", "water",
  "rock", "", "rock", "rock", "rock", "", 
  "rock", "", "", "", "", "rider"],  
  
  //level 4
  ["flag", "tree", "", "", "", "",
  "", "", "", "tree", "rock", "fenceside",
  "tree", "tree", "tree", "tree", "", "",
  "", "", "", "tree", "", "",
  "", "tree", "", "tree", "tree", "", 
  "horseup", "tree", "rider", "", "", ""], 
  
  //level 5
  ["rider", "tree", "horsedown", "tree", "tree", "flag",
  "", "tree", "", "tree", "", "",
  "", "fenceup", "", "rock", "", "rock",
  "", "rock", "", "water", "", "",
  "", "rock", "", "water", "water", "fenceside", 
  "animate", "animate", "animate", "animate", "bridge", ""],  
  
  //level 6
  ["horsedown", "rock", "animate", "animate", "animate", "animate",
  "", "rock", "", "tree", "", "tree",
  "", "rock", "", "tree", "", "",
  "", "", "", "", "rock", "",
  //"animate", "animate", "animate", "animate", "rock", "",
  "tree", "water", "water", "", "fenceup", "", 
  "flag", "", "fenceup", "", "water", "rider"],
]; //end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "water", "tree"];

var widthOfBoard = 6;
var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; //allows 1 animation per level

let nextClass = ""; //class of location we wish to move to


//start game
window.addEventListener ("load", function () {
  loadLevel();
});//eventListener

//move horse
window.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37: //left arrow
      if (currentLocationOfHorse % widthOfBoard !== 0) {
        tryToMove("left");
      }//if
      break;
    case 38: //up arrow
      if (currentLocationOfHorse - widthOfBoard >= 0) {
        tryToMove("up");
      }//if
      break;
    case 39: //right arrow
      if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
        tryToMove("right");
      }//if
      break;
    case 40: //down arrow
      if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
        tryToMove("down");
      }//if
      break;
  }//switch
});//key eventListener
      
//try to move horse
function tryToMove (direction) {
  //location before move
  let oldLocation = currentLocationOfHorse;
  
  //class of location before move
  let oldClassName = gridBoxes[oldLocation].className;
  
  let nextlocation = 0; //location we wish to move to
  let nextClass = ""; //class of location we wish to move to
  
  let nextlocation2 = 0;
  let nextClass2 = "";
  
  let newClass = ""; //new class to switch to if move sucessful
    
  switch (direction) {
    case "left":
      nextlocation = currentLocationOfHorse - 1;
      break;
    case "up":
      nextlocation = currentLocationOfHorse - widthOfBoard;
      break;
    case "right":
      nextlocation = currentLocationOfHorse + 1;
      break;
    case "down":
      nextlocation = currentLocationOfHorse + widthOfBoard;
      break;
  }//switch
  
  nextClass = gridBoxes[nextlocation].className;
  
  //if the obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) {return;}
  
  //if it's a fence and there's no rider, don't move
  if (!riderOn && nextClass.includes("fence")) {return;}
  
  //if there is a fence & rider, move 2 spaces with animation
  if (nextClass.includes("fence")) {
    //rider must be on to jump
    if (riderOn) {
      gridBoxes[currentLocationOfHorse].className = "";
      oldClassName = gridBoxes[nextlocation].className;
      
      //set values according to direction
      if (direction == "left") {
        nextClass = "jumpleft";
        nextClass2 = "horserideleft";
        nextlocation2 = nextlocation - 1;
      } else if (direction == "right") {
        nextClass = "jumpright";
        nextClass2 = "horserideright";
        nextlocation2 = nextlocation + 1;
      } else if (direction == "up") {
        nextClass = "jumpup";
        nextClass2 = "horserideup";
        nextlocation2 = nextlocation - widthOfBoard;
      } else if (direction == "down") {
        nextClass = "jumpdown";
        nextClass2 = "horseridedown";
        nextlocation2 = nextlocation + widthOfBoard;
      }//if else
      
      //show horse jumping
      gridBoxes[nextlocation].className = nextClass;
      
      setTimeout(function() {
        
        //set jump back to just a fence
        gridBoxes[nextlocation].className = oldClassName;
        
        //update current location of the horse to be two spaces  past take off
        currentLocationOfHorse = nextlocation2;
        
        //get class of box after jump
        nextClass = gridBoxes[currentLocationOfHorse].className;
        
        //show horse and rider after landing
        gridBoxes[currentLocationOfHorse].className = nextClass2;
        
        //if next box is a flag, level up
        levelUp(nextClass);
        
      }, 350);
      
      return;
      
    }//if rider is on
  }//if class has fence
  
  //if there is a rider, add rider
  if (nextClass == "rider") {
    riderOn = true;
  }//if
  
  //if there is a bridge in the old location, keep it
  if (oldClassName.includes("bridge")) {
    gridBoxes[oldLocation].className = "bridge";
  } else {
    gridBoxes[oldLocation].className = "";
  }//else
  //build name of new class
  newClass = (riderOn) ? "horseride" : "horse";
  newClass += direction;
  
  //if there is a bridge in the next location, keep it
  if (gridBoxes[nextlocation].classList.contains("bridge")) {
    newClass += " bridge";
  }//if
  
  //move 1 space
  currentLocationOfHorse = nextlocation;
  gridBoxes[currentLocationOfHorse].className = newClass;
  
  //if it is an enemy
  if (nextClass.includes("enemy")) {
    document.getElementById("lose").style.display = "block";
    return;
  }//if
  
  //if it is a flag move up to next level
  levelUp(nextClass); 
}//tryToMove

//move up a level
function levelUp (nextClass) {
  if (nextClass == "flag" && riderOn) {
    document.getElementById("levelup").style.display = "block";
    clearTimeout(currentAnimation);
    setTimeout (function () {
      document.getElementById("levelup").style.display = "none";
      //add if statement for last level here
      currentLevel++;
      loadLevel();
    }, 1000);
  }//if
}//levelUp

//load levels 0-maxlevel
function loadLevel () {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;
  
  //load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
  }//for
  
  animateBoxes = document.querySelectorAll(".animate");
  
  animateEnemy(animateBoxes, 0, "right");
  
}//loadLevel

//animate enemy left to right (could add up and down to this)
//boxes - array of grid boxes that include animation
//index - current location of animation
//direction - current direction of animation
function animateEnemy (boxes, index, direction) {
  //exit function if no animation
  if (boxes.length <= 0) {return;}
  
  //update images
  if (direction == "right") {
    boxes[index].classList.add("enemyright");
  } else {
    boxes[index].classList.add("enemyleft");
  }//else
  
  //remove images from other boxes
  for (i = 0; i < boxes.length; i++){
    if (i != index) {
      boxes[i].classList.remove("enemyright");
      boxes[i].classList.remove("enemyleft");
    }//if
  }//for
  
  //moving right
  if (direction == "right") {
    //turn around if hit right side
    if (index == boxes.length - 1){
      index--;
      direction = "left";
    } else {
      index++;
    }//else
    
  //moving left
  } else {
    //turn around if hit left side
    if (index == 0){
      index++;
      direction = "right";
    } else {
      index--;
    }//else
  }//else
  
  currentAnimation = setTimeout(function() {
    animateEnemy(boxes, index, direction);
  }, 750);
}//animateEnemy






/*Finish the game. Add the following elements:
a start screen with the title, a description of the game, instructions, and a "start" button. This could be done with a seperate html page, or with a lightbox.
an end screen to the game. When you finish, the game currently throws a javascript error. Instead, load an end screen that wraps up the game and allows you to start over. This could be done with a seperate html page, or with a lightbox.
Make this game your own. Write an engaging storyline that encourages participation. Improve the graphics so that when combined with the CSS, make a great design. Add creative features that motivate the player.
Use your creativity and programming skills learned throughout the course to enhance the game with additional features. It may include things such as controls (like we did in Pong), power ups, scoring, lives, etc.*/