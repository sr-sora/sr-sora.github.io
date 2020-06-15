//Global Variables
const levels = [ 
  //level 0
  ["flag", "rock", "tree", "tree", "tree", "tree",
  "fenceside", "rock", "fragment", "", "rider", "tree",
  "", "tree", "animate", "animate", "animate", "tree",
  "", "tree", "", "", "rock", "rock",
  "", "tree", "", "", "", "",
  "", "fenceup", "", "", "horseup", ""],
  
  //level 1
  ["animate", "animate", "animate", "animate", "animate", "animate",
  "", "tree", "tree", "", "tree", "",
  "", "fragment", "tree", "horseup", "tree", "",
  "", "", "tree", "tree", "rock", "",
  "", "tree", "", "flag", "rock", "", 
  "", "fenceup", "", "rock", "rider", ""],
  
  //level 2
  ["rock", "vertical", "", "", "", "horsedown",
  "piece", "vertical", "", "rock", "rock", "",
  "", "vertical", "", "rock", "", "",
  "tree", "fenceside", "tree", "animate", "animate", "animate",
  "water", "", "water", "fragment", "water", "", 
  "flag", "bridge", "water", "water", "water", "rider"],
  
  //level 3
  ["flag", "fenceup", "horseright", "", "", "",
  "fenceside", "rock", "rock", "rock", "", "water",
  "", "vertical", "", "rock", "", "water",
  "rock", "vertical", "", "", "", "water",
  "rock", "vertical", "rock", "rock", "rock", "fragment", 
  "rock", "vertical", "", "", "", "rider"],  
  
  //level 4
  ["flag", "tree", "", "", "", "",
  "", "", "", "tree", "rock", "fenceside",
  "tree", "tree", "tree", "tree", "", "vertical",
  "", "", "", "tree", "fragment", "vertical",
  "", "tree", "", "tree", "tree", "vertical", 
  "horseup", "tree", "rider", "", "", "vertical"], 
  
  //level 5
  ["rider", "tree", "horsedown", "tree", "tree", "flag",
  "", "tree", "", "tree", "", "",
  "", "fenceup", "", "rock", "", "rock",
  "", "rock", "", "water", "fragment", "",
  "piece", "rock", "", "water", "water", "fenceside", 
  "animate", "animate", "animate", "animate", "bridge", ""],  
  
  //level 6
  ["horsedown", "rock", "animate", "animate", "animate", "animate",
  "", "rock", "", "tree", "fragment", "tree",
  "", "rock", "", "tree", "", "",
  "", "", "", "vertical", "rock", "",
  "tree", "water", "water", "vertical", "fenceup", "", 
  "flag", "", "fenceup", "vertical", "water", "rider"],
]; //end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "water", "tree"];

var widthOfBoard = 6;
var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; //horizontal animation
var currentAnimation2; //vertical animation
var lives = 3;
var fragment = 0;
var fragments = 0;
var controlPlay;

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

  //collect piece
  if (nextClass == "piece") {
    lives++;
    document.getElementById("lives").innerHTML = lives;
  }
  
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
    //document.getElementById("lose").style.display = "block";
    setTimeout (function () {
      if (lives > 0) {
        loadLevel();
        lives--; 
        document.getElementById("lives").innerHTML = lives;
      } else {
        location.replace("lose.html");
      }//if else
    }, 100);
    return;
  }//if
  
  if (nextClass.includes("fragment")) {
    fragment++;
  }
  
  //if it is a flag move up to next level
  levelUp(nextClass); 
}//tryToMove

//move up a level
function levelUp (nextClass) {
  if (nextClass == "flag" && riderOn) {
    if (currentLevel < 6) {
      document.getElementById("levelup").style.display = "block";
      clearTimeout(currentAnimation);
      clearTimeout(currentAnimation2);
      setTimeout (function () {
        document.getElementById("levelup").style.display = "none";
        if (fragment > 0) {
          fragments++;
          console.log(fragments);
        }//if
        currentLevel++;
        document.getElementById("level").innerHTML = currentLevel + 1;
        loadLevel();
      }, 1000);
    } else if (currentLevel < 6 && fragments == 6) {
      location.replace("alternativeEnding.html")
    } else {
      location.replace("endscreen.html");
    }//if else end screen
  }//if
}//levelUp

//load levels 0-maxlevel
function loadLevel () {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  let animateBoxes2;
  fragment = 0;
  riderOn = false;
  
  //load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
  }//for
  
  animateBoxes = document.querySelectorAll(".animate");
  animateBoxes2 = document.querySelectorAll(".vertical");
  
  animateEnemy(animateBoxes, 0, "right");
  animateEnemy2(animateBoxes2, 0, "down");
}//loadLevel

//animate enemy left to right
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
  
  if ((boxes[index].classList.contains('horseup'))||(boxes[index].classList.contains('horsedown'))||   (boxes[index].classList.contains('horseleft'))|| (boxes[index].classList.contains('horseright')) | (boxes[index].classList.contains('horserideright'))| (boxes[index].classList.contains('horserideleft'))| (boxes[index].classList.contains('horserideup'))| (boxes[index].classList.contains('horseridedown'))) {
    //document.getElementById("lose").style.display = "block";
    setTimeout (function () {
      if (lives > 0) {
        loadLevel();
        lives--; 
        document.getElementById("lives").innerHTML = lives;
      } else {
        location.replace("lose.html");
      }//if else
    }, 100);
    return;
  }//if
  
  //remove images from other boxes
  for (i = 0; i < boxes.length; i++){
    if (i != index) {
      boxes[i].classList.remove("enemyleft");
      boxes[i].classList.remove("enemyright");
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

function animateEnemy2 (boxes, index, direction) {
  //exit function if no animation
  if (boxes.length <= 0) {return;}
  
  //update images
  if (direction == "up") {
    boxes[index].classList.add("enemyup");
  } else {
    boxes[index].classList.add("enemydown");
  }//else
  
  if ((boxes[index].classList.contains('horseup'))||(boxes[index].classList.contains('horsedown'))||   (boxes[index].classList.contains('horseleft'))|| (boxes[index].classList.contains('horseright')) | (boxes[index].classList.contains('horserideright'))| (boxes[index].classList.contains('horserideleft'))| (boxes[index].classList.contains('horserideup'))| (boxes[index].classList.contains('horseridedown'))) {
    //document.getElementById("lose").style.display = "block";
    setTimeout (function () {
      if (lives > 0) {
        loadLevel();
        lives--; 
        document.getElementById("lives").innerHTML = lives;
      } else {
        location.replace("lose.html");
      }//if else
    }, 100);
    return;
  }//if
  
  //remove images from other boxes
  for (i = 0; i < boxes.length; i++){
    if (i != index) {
      boxes[i].classList.remove("enemyup");
      boxes[i].classList.remove("enemydown");
    }//if
  }//for
  
  //moving up
  if (direction == "up") {
    //turn around if hit up side
    if (index == boxes.length - 1){
      index--;
      direction = "down";
    } else {
      index++;
    }//else
    
  //moving left
  } else {
    //turn around if hit down side
    if (index == 0){
      index++;
      direction = "up";
    } else {
      index--;
    }//else
  }//else
  
  currentAnimation2 = setTimeout(function() {
    animateEnemy2(boxes, index, direction);
  }, 750);
}//animateEnemy2

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/* lightbox code */

//change the visibility of ID
function changeVisibility(divID) {
  var element = document.getElementById(divID);

  //if element exists, it is considered true
  if (element) {
      element.className = (element.className == "hidden") ? "unhidden" : "hidden";
  } else {
    element.className = (element.className == "unhidden") ? "hidden" : "unhidden";
  }
}//changeVisibility

//display message in lightbox
function showLightBox(message, message2) {
  //set messages
  document.getElementById("message").innerHTML = message;
  document.getElementById("message2").innerHTML = message2;

  //show lightbox
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
}//showLightBox

//continues game
function continueGame() {    
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
}//continueGame

function controls() {
  let message1 = "";
  let message2 = "";
  
  message1 = "Controls";
  message2 = "To play, use the &#x2B06; &#x2B07; &#x2B05; &#x27A1; keys on the keyboard to control the player! ";
  
  showLightBox(message1, message2);
}//controls

function rules() {
  let message1 = "";
  let message2 = "";
  
  message1 = "Rules";
  message2 = "First, go find and equip yourself with the jar. You will only be able to get past gates when you're equiped with the jar. Then, go collect the final star to proceed to the next level. Avoid all enemies along the way. If you get hit by an enemy, you will restart the level and lose a life. You will have 3 lives in total. Occasionally, there will be a star fragment which you can collect to gain 1 life.";
  
  showLightBox(message1, message2);
}//controls

//resume game play
function resumeGame() {
  if (!controlPlay) {
    controlPlay = window.setInterval(show, 800/60)
  }//if
}//resumeGame

//pause game play
function pauseGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
}//pauseGame

/* lightbox code */

//fix fragments and enemy
//             document.getElementById("lives").innerHTML = "Lives <br> ❤ ❤";
