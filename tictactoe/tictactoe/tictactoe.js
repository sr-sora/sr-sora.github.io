let currentPlayer = "X";
let gameStatus = ""; //"" - continue game, "Tie Game", "X Wins", "O Wins"
let numTurns = 0;
let btn = document.querySelector("button");
let cb = []; //current board

//take player turn
function playerTakeTurn(e){
    if (e.innerHTML == ""){
        e.innerHTML = currentPlayer;
        checkGameStatus();
    } else {
        showLightBox("This box has already been selected.", "Please select another!");
        return;
    } //else
}//playerTakeTurn

//after each turn, check for winner, tie, or continue playing
function checkGameStatus(){
    numTurns++; //count turns
    
    //check for winner
    if (checkWin()){
        gameStatus = currentPlayer + " wins!";
        showLightBox(gameStatus, "The game is over!");
        return;
    }//if    
    
    //check for tie
    if (numTurns == 9){
        gameStatus = "Tie Game!";
        showLightBox(gameStatus, "The game is over.");
    }//if
    
    //switch current player
    currentPlayer = (currentPlayer == "X" ? "O" : "X");
}//checkGameStatus

//check for a win, there are 8 win paths
function checkWin(){
    cb[0] = ""; //empty
    cb[1] = document.getElementById("one").innerHTML;
    cb[2] = document.getElementById("two").innerHTML;
    cb[3] = document.getElementById("three").innerHTML;
    cb[4] = document.getElementById("four").innerHTML;
    cb[5] = document.getElementById("five").innerHTML;
    cb[6] = document.getElementById("six").innerHTML;
    cb[7] = document.getElementById("seven").innerHTML;
    cb[8] = document.getElementById("eight").innerHTML;
    cb[9] = document.getElementById("nine").innerHTML;
    
    //top row, middle row, bottom row, left column, middle column, right column, left diagonal, right digonal
    if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
        return true;
    } else if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
        return true;
    } else if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
        return true;
    } else if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
        return true;
    } else if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
        return true;
    } else if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
        return true;
    } else if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
        return true;
    } else if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
        return true;
    }//else if
}//checkWin

//change the visibility of ID
function changeVisibility(divID) {
    var element = document.getElementById(divID);
    
    //if element exists, it is considered true
    if (element) {
        element.className = (element.className == "hidden") ? "unhidden" : "hidden";
    }//if
}//changeVisibility

//display message in lightbox
function showLightBox(message, message2) {
    //set messages
    document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
    
    //show lightbox
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
}

function continueGame() {
    //if the game is over, show controls
    if(gameStatus == "") {
        changeVisibility("lightbox");
        changeVisibility("boundaryMessage");
    } else {
        changeVisibility("button");
    }
}//continueGame

function restart() {
    document.location.href = "";
}//restart