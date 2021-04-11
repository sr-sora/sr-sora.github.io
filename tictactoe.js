let currentPlayer = "X";
let gameStatus = ""; //"" - continue game, "Tie Game", "X Wins", "O Wins"
let numTurns = 0;
let cb = []; //current board
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//reset board and all variables
function newGame() {
    //document.location.href = "";
    
    //reset board
    for (var i = 0; i < idNames.length; i++) {
        document.getElementById(idNames[i]).innerHTML = "";
    }//for
    
    numTurns = 0;
    gameStatus = "";
    currentPlayer = "X";
    
    changeVisibility("controls");
}//newGame

    //choose random boxes until empty box is found
    /*do {
        let rand = parseInt(Math.random()*9) + 1; //1-9
        idName = idNames[rand - 1];
        
        //check if chosen box is empty
        if (document.getElementById(idName).innerHTML == "") {
            document.getElementById(idName).innerHTML = currentPlayer;
            break;
        }//if
    } while (true); //do while */
    
//place O depending on the board situation
function computerTakeTurn(){
    let idName = "";
    let i = 1;

    do {
        do{
            if (document.getElementById(idNames[i-1]).innerHTML == "X") {
                if (i == 1) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("nine").innerHTML == "") {
                        idName="nine";
                    } else if (document.getElementById("two").innerHTML == "") {
                        idName="two";
                    } else if (document.getElementById("four").innerHTML == "") {
                        idName="four";
                    } 
                } else if (i == 2) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("one").innerHTML == "") {
                        idName="one";
                    } else if (document.getElementById("three").innerHTML == "") {
                        idName="three";
                    }
                } else if (i == 3) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("seven").innerHTML == "") {
                        idName="seven";
                    } else if (document.getElementById("two").innerHTML == "") {
                        idName="two";
                    } else if (document.getElementById("six").innerHTML == "") {
                        idName="six";
                    } 
                } else if (i == 4) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("one").innerHTML == "") {
                        idName="one";
                    } else if (document.getElementById("seven").innerHTML == "") {
                        idName="seven";
                    } 
                } else if (i == 5) {
                    if (document.getElementById("one").innerHTML == "") {
                        idName="one";
                    } else if (document.getElementById("three").innerHTML == "") {
                        idName="three";
                    } else if (document.getElementById("seven").innerHTML == "") {
                        idName="seven";
                    } else if (document.getElementById("nine").innerHTML == "") {
                        idName="nine";
                    } 
                } else if (i == 6) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("three").innerHTML == "") {
                        idName="three";
                    } else if (document.getElementById("nine").innerHTML == "") {
                        idName="nine";
                    }
                } else if (i == 7) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("three").innerHTML == "") {
                        idName="three";
                    } else if (document.getElementById("four").innerHTML == "") {
                        idName="four";
                    } else if (document.getElementById("eight").innerHTML == "") {
                        idName="eight";
                    } 
                } else if (i == 8) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("seven").innerHTML == "") {
                        idName="seven";
                    } else if (document.getElementById("nine").innerHTML == "") {
                        idName="nine";
                    }
                } else if (i == 9) {
                    if (document.getElementById("five").innerHTML == "") {
                        idName="five";
                    } else if (document.getElementById("one").innerHTML == "") {
                        idName="one";
                    } else if (document.getElementById("eight").innerHTML == "") {
                        idName="eight";
                    } else if (document.getElementById("six").innerHTML == "") {
                        idName="six";
                    } 
                }
            }

        i++;

        }while(idName == "");

        //check to see if box is empty
        if (document.getElementById(idName).innerHTML == "") {
            document.getElementById(idName).innerHTML = currentPlayer;
            break;
        }//if

    }while(true);
}//computerTakeTurn
            
//take player turn
function playerTakeTurn(e){
    if (e.innerHTML == ""){
        e.innerHTML = currentPlayer;
        checkGameStatus();
        
        //if game not over, computer goes
        if (gameStatus == ""){
            setTimeout(function() {
                    computerTakeTurn();
                    checkGameStatus();
                }, 500
            );
        }//if
        
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
    }//if    
    
    //check for tie
    if (numTurns == 9){
        gameStatus = "Tie Game!";
    }//if
    
    //switch current player
    currentPlayer = (currentPlayer == "X" ? "O" : "X");
    
    if (gameStatus != ""){
    setTimeout(function() {
            showLightBox(gameStatus, "The game is over!");
        }, 300
    );
    }
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
}//showLightBox

function continueGame() {    
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
    
    //if the game is over, show controls
    if(gameStatus != "") {
        changeVisibility("controls");
    }    
}//continueGame