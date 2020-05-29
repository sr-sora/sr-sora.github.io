//global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var score1 = 0;
var score2 = 0;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

const speedRange = 2;
var speedMin = 2;

var bounce = new sound("droplet.mp3");
var out = new sound("violin.mp3");

var slowDown1 = 2;
var slowDown2 = 2;

//var takePoint1 = 1;
//var takePoint2 = 1;

//used to control game start/stop
var controlPlay;

//move paddles
document.addEventListener('keydown', function(e) {  
  //console.log("key down " + e.keyCode)
  //paddle1
  if (e.keyCode == 87 || e.which == 87){ //w
      speedOfPaddle1 = -10;
  }//if
  if (e.keyCode == 83 || e.which == 83){ //s
      speedOfPaddle1 = 10;
  }//if

  //paddle2
  if (e.keyCode == 38 || e.which == 38){ //up arrow
      speedOfPaddle2 = -10;
  }//if
  if (e.keyCode == 40 || e.which == 40){ //down arrow
      speedOfPaddle2 = 10;
  }//if
  
  if (e.keyCode == 32 || e.which == 32){
    pauseGame();
  }//if
  
  //Slow ball down p1
  if (e.keyCode == 16 || e.which == 16){
    if (slowDown1 > 0) {
      speedMin = 2;
      
      slowDown1--;
      document.getElementById("slowDown1").innerHTML = slowDown1;
    }//innerif
  }//if
        
  //Slow ball down p2
  if (e.keyCode == 13 || e.which == 13){
    if (slowDown2 > 0) {
      speedMin = 2;
        
      slowDown2--;
      document.getElementById("slowDown2").innerHTML = slowDown2;
    }//innerif
  }//if
  
  //Take point from other player
  /*if (e.keyCode == 27 || e.which == 27){
    if (takePoint1 > 0) {
      score2--;
      
      takePoint1--;
      //document.getElementById("slowDown2").innerHTML = slowDown2;
    }//innerif
  }//if
  
  //Take point from other player
  if (e.keyCode == 8 || e.which == 8){
    if (takePoint2 > 0) {
      score1--;
      
      takePoint2--;
      //document.getElementById("slowDown2").innerHTML = slowDown2;
    }//innerif
  }//if*/
        
});

//stop paddles
document.addEventListener('keyup', function(e) {
  //console.log("key up " + e.keyCode)
  //paddle1
  if (e.keyCode == 87 || e.which == 87){ //w
      speedOfPaddle1 = 0;
  }//if
  if (e.keyCode == 83 || e.which == 83){ //s
      speedOfPaddle1 = 0;
  }//if

  //paddle2
  if (e.keyCode == 38 || e.which == 38){ //up arrow
      speedOfPaddle2 = 0;
  }//if
  if (e.keyCode == 40 || e.which == 40){ //down arrow
      speedOfPaddle2 = 0;
  }//if
});

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//start the ball movement
function startBall() {
  let direction = 1;
  topPositionOfBall = startTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;

  //50% chance of starting in either direction (right or left)
  if (Math.random() < 0.5) {
      direction = 1;
  } else {
      direction = -1;
  }//else
  
  //ball gets faster with each round
  topSpeedOfBall = Math.random() * speedRange + speedMin;
  leftSpeedOfBall = direction * (Math.random() * speedRange + speedMin);
  speedMin++;
    
}//startBall

//updates location of paddles and ball
function show() {
  var i1 = 0;
  var i2 = 0;
  
  //update positions of elements
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;
  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;

  //stop paddle from leaving top of gameboard
  //paddle1
  if (positionOfPaddle1 <= 0) {
    positionOfPaddle1 = 0;
  }//if

  //paddle2
  if (positionOfPaddle2 <= 0) {
    positionOfPaddle2 = 0;
  }//if

  //stop paddles from leaving bottom of gameboard
  if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
    positionOfPaddle1 = gameboardHeight - paddleHeight;
  }//if
  if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
    positionOfPaddle2 = gameboardHeight - paddleHeight;
  }//if

  //if ball hits top or bottom or bottom of gameboard, change direction
  if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
    topSpeedOfBall *= -1;
  }//if

  //ball on left edge of gameboard
  if (leftPositionOfBall <= paddleWidth) {
    //if ball hits left paddle, change direction
    if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
      bounce.play();
      leftSpeedOfBall *= -1;
      i1++;
    } else {
      out.play();
      startBall();
      score2++;
      document.getElementById("score2").innerHTML = score2;
    }//else
  }//if

  //ball on right edge of gameboard
  if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
    //if ball hits right paddle, change direction
    if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
      bounce.play();
      leftSpeedOfBall *= -1;
      i2++;
    } else {
      out.play();
      startBall();
      score1++;
      document.getElementById("score1").innerHTML = score1;
    }//else
  }//if

  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";
  
  //Streak of 5 gives a player a super hit
  /*if (i1%5 != 0 || i2%5 != 0) {
    topSpeedOfBall = topSpeedOfBall * 2;
    topSpeedOfBall = topSpeedOfBall / 2;
  }*/
  
  //Stop game once a player reachers 10 points
  if (score1 == 10 || score2 == 10) {
    stopGame();
  }//if

}; //show

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

//start game play
function startGame() {
  //reset scores, paddles, and ball locations
  score1 = 0;
  score2 = 0;
  
  document.getElementById("score2").innerHTML = score2;
  document.getElementById("score1").innerHTML = score1;
  
  speedMin = 2;

  var slowDown1 = 2;
  var slowDown2 = 2;
  
  document.getElementById("slowDown1").innerHTML = slowDown1;
  document.getElementById("slowDown2").innerHTML = slowDown2;
  
  positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;
  
  startBall();
  
  if (!controlPlay) {
    controlPlay = window.setInterval(show, 800/60)
  }//if
}//startGame

//stop game play
function stopGame() {
  let message1 = "";
  let message2 = "";
  
  window.clearInterval(controlPlay);
  controlPlay = false;
  
  message1 = "Tie Game";
  message2 = "Both players tie at " + score1 + ". Close to continue. Press Start Game to restart game.";
  
  if (score2 > score1) {
    message1 = "Player 2 wins with " + score2 + " points!";
    message2 = "Player 1 had " + score1 + " points! Close to continue. Press Start Game to restart game.";
  } else if (score1 > score2) {
     message1 = "Player 1 wins with " + score1 + " points!";
     message2 = "Player 2 had " + score2 + " points! Close to continue. Press Start Game to restart game.";
  }
  
  showLightBox(message1, message2);  
}//stopGame

//next instruction slide
function nextSlide(message, message2) {
  document.getElementById("message").innerHTML = "Rules and Twists: ";
  document.getElementById("message2").innerHTML = "Compete against each other by controlling your respective paddle to hit a ball back and forth. The goal is to reach 10 points first; points are earned when one fails to return the ball to the other. \n In this version of the game, each player will have 2 chances to slow down the ball back to the original speed after the next death. To slow down the ball, Player 1 press 'shift' on the keyboard and Player 2 press 'enter' on the keyboard. You can access the rules at any time with the button in the top left corner. Good luck!";
  changeVisibility("continue");
}

//menu
function menu() {
  let message1 = "";
  let message2 = "";
  
  message1 = "Rules and Twists: ";
  message2 = "Compete against each other by controlling your respective paddle to hit a ball back and forth. The goal is to reach 10 points first; points are earned when one fails to return the ball to the other. \nIn this version of the game, each player will have 2 chances to slow down the ball back to the original speed after the next death. To slow down the ball, Player 1 press 'shift' on the keyboard and Player 2 press 'enter' on the keyboard.";
  
  showLightBox(message1, message2);
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

/* lightbox code */
