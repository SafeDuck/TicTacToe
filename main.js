let counter = 0;
let timer_on = false;
let dead;
let tie = false;
var turnNumber = 1;
let timer; //variable to hold the timer
var turnTime = 30;
var win = false;
var xMoves = [];
var yMoves = [];
StartCount();
//New game and reset timer
function StartCount(){
    console.log("Game is running"); //Debugging
    tie = false;
    counter = 0;
    //Start the countdown timer
    if(!timer_on)
    {
      timer_on = true;
      TimedCount();
    }
  }
  
  function TimedCount(){
    if(counter == 120){ //Change the timer to 60 seconds
      alert("Time's up! Draw");
      win = true; //Ends the game
      tie = true;
      StopCount();
    }
    else {
      counter++;
      dead = setTimeout(TimedCount, 1000);
    }
  }
  
  function StopCount(){
    //Stop the countdown timer
    clearTimeout(dead);
    timer_on = false;
  }
startTurnTimer(turnTime); //Declared at the start of every game
  function startTurnTimer(turnTime) {
    timer = setTimeout(timeTurner, turnTime * 1000);
  }
  function timeTurner(){
    alert("Time's up! Next player's turn."); //Debugging purposes
    stopTurnTimer();
  }
  //This function stops the current player timer
  function stopTurnTimer() {
    let h = document.getElementsByClassName("AICheck")[0];
    let turnTime = 30;
    let currentPlayer; //Used to keep track of the current player
    clearTimeout(timer);
    if (turnNumber % 2 === 1) {
      currentPlayer = "X";
    } 
    else {
      currentPlayer = "O";
    }
    //switch turns if the current player runs out of time
    if(currentPlayer === "X" && !h.checked){
        document.getElementsByClassName("display_player")[0].innerHTML = "O"; //Changing player to "O"
        turnNumber++;
      }
    if (currentPlayer === "O") {
        document.getElementsByClassName("display_player")[0].innerHTML = "X"; //Changing Player to "X"
        turnNumber++;
    }
    if(currentPlayer === "X" && h.checked){
          const sqaures = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
          let r = sqaures.indexOf(this.className);
          turnNumber++;
          if(turnNumber % 2 === 0){
          var emptySquares = getEmptySquares();
          var randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          let g = document.getElementsByClassName(sqaures[randomSquare])[0];
          g.click();
          }
    }
    startTurnTimer(turnTime); //Prevents the next player from taking it's time
  }

function populateXorO(){
    let turnTime = 30;
    clearTimeout(timer); //Called to make sure the previous timer is gone
    console.log("Player moved!");
    startTurnTimer(turnTime); //Called to start timer
    let string1 = "";
    if (turnNumber % 2 === 1){
        string1 = "X";
    }
    else {
        string1 = "O";
    } 
    let h = document.getElementsByClassName("AICheck")[0];
    const p = this.children[0];
    if (p.innerHTML != "X" && p.innerHTML != "O" && !win){
        p.innerHTML = string1;
        const sqaures = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        let r = sqaures.indexOf(this.className);
        if (string1 === "X"){
            xy[r] = 1;
            xMoves.push(r);
            if (xMoves.length > 4){
                xy[xMoves[0]] = 0;
                document.getElementsByClassName(sqaures[xMoves[0]])[0].children[0].innerHTML = "";
                xMoves.shift();
            }
        }
        else{
            xy[r] = 2;
            yMoves.push(r);
            if (yMoves.length > 4){
                xy[yMoves[0]] = 0;
                document.getElementsByClassName(sqaures[yMoves[0]])[0].children[0].innerHTML = "";
                yMoves.shift();
            }
        }
        turnNumber = turnNumber + 1;
        if (turnNumber % 2 === 1){
            document.getElementsByClassName("whose_turn")[0].children[0].innerHTML = "X";
        }
        else{
            document.getElementsByClassName("whose_turn")[0].children[0].innerHTML = "O";
        }
        if(h.checked && turnNumber % 2 === 0) {
          var emptySquares = getEmptySquares();
          var randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          let g = document.getElementsByClassName(sqaures[randomSquare])[0];
          g.click();
        }
    }
    
    //let xyCopy = xy.map(x => x == 2 ? 0 : x).join('');
    let xyCopy = xy.map(x => x == 2 ? 0 : x);
    console.log(xyCopy);
    //checking if X won
    if ((xyCopy[0] === 1 && xyCopy[1] === 1 && xyCopy[2] === 1) || (xyCopy[3] === 1 && xyCopy[4] === 1 && xyCopy[5] === 1) ||
    (xyCopy[6] === 1 && xyCopy[7] === 1 && xyCopy[8] === 1) || (xyCopy[0] === 1 && xyCopy[4] === 1 && xyCopy[8] === 1) ||
    (xyCopy[2] === 1 && xyCopy[4] === 1 && xyCopy[6] === 1) || (xyCopy[0] === 1 && xyCopy[3] === 1 && xyCopy[6] === 1) ||
    (xyCopy[1] === 1 && xyCopy[4] === 1 && xyCopy[7] === 1) || (xyCopy[2] === 1 && xyCopy[5] === 1 && xyCopy[8] === 1))
    {
        ++numWinsX;
        document.getElementsByClassName("score_board")[0].children[0].children[0].innerHTML = numWinsX;
        win = true;
        xy = [0,0,0,0,0,0,0,0];
        document.getElementsByClassName("winner")[0].innerHTML = " X is the winner";
        clearTimeout(timer); //Ends player timer
        clearTimeout(dead); //Ends game timer
    }
    //checking if O won
    // xyCopy = xy.map(x => x == 1 ? 0 : x).join('');
    xyCopy = xy.map(x => x == 1 ? 0 : x);
    if ((xyCopy[0] === 2 && xyCopy[1] === 2 && xyCopy[2] === 2) || (xyCopy[3] === 2 && xyCopy[4] === 2 && xyCopy[5] === 2) ||
    (xyCopy[6] === 2 && xyCopy[7] === 2 && xyCopy[8] === 2) || (xyCopy[0] === 2 && xyCopy[4] === 2 && xyCopy[8] === 2) ||
    (xyCopy[2] === 2 && xyCopy[4] === 2 && xyCopy[6] === 2) || (xyCopy[0] === 2 && xyCopy[3] === 2 && xyCopy[6] === 2) ||
    (xyCopy[1] === 2 && xyCopy[4] === 2 && xyCopy[7] === 2) || (xyCopy[2] === 2 && xyCopy[5] === 2 && xyCopy[8] === 2))
    {
        ++numWinsY;
        document.getElementsByClassName("score_board")[0].children[1].children[0].innerHTML = numWinsY;
        win = true;
        xy = [0,0,0,0,0,0,0,0];
        document.getElementsByClassName("winner")[0].innerHTML = " O is the winner";
        clearTimeout(timer); //Ends player timer
        clearTimeout(dead); //Ends game timer
    }
    if(tie){
      console.log("Press new game or reset to play again"); //Debugging
      clearTimeout(timer); //Ends player timer
      clearTimeout(dead); //Ends game timer
    }
}
function getEmptySquares() {
  var emptySquares = [];
  for (let i = 0; i < xy.length; i++) {
      if (xy[i] === 0) {
          emptySquares.push(i);
      }
  }
  return emptySquares;
}

let numWinsX = 0;
let numWinsY = 0;
document.getElementsByClassName("whose_turn")[0].children[0].innerHTML = "X";
var xy = [0,0,0,0,0,0,0,0,0];

var collection = [];
collection = document.getElementsByClassName("one");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("two");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("three");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("four");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("five");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("six");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("seven");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("eight");
collection[0].addEventListener("click", populateXorO);

collection = document.getElementsByClassName("nine");
collection[0].addEventListener("click", populateXorO);

let newgame = document.getElementsByClassName("new_game");
newgame[0].addEventListener("click", (e) => {
    xy = [0,0,0,0,0,0,0,0,0];
    turnNumber = 1;
    const sqaures = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    for (let i = 0; i < sqaures.length; ++i){
        document.getElementsByClassName(sqaures[i])[0].children[0].innerHTML = "";
    }
    document.getElementsByClassName("score_board")[0].children[0].children[0].innerHTML = "";
    document.getElementsByClassName("score_board")[0].children[1].children[0].innerHTML = "";
    document.getElementsByClassName("whose_turn")[0].children[0].innerHTML = " X";
    document.getElementsByClassName("winner")[0].innerHTML = "";
    win = false;
    numWinsY = 0;
    numWinsX = 0;
    xMoves = [];
    yMoves = [];
});
let reset = document.getElementsByClassName("reset");
reset[0].addEventListener("click", (e)=> {
    xy = [0,0,0,0,0,0,0,0,0];
    turnNumber = 1;
    const sqaures = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    for (let i = 0; i < sqaures.length; ++i){
        document.getElementsByClassName(sqaures[i])[0].children[0].innerHTML = "";   
    }
    document.getElementsByClassName("whose_turn")[0].children[0].innerHTML = "X";
    win = false;
    document.getElementsByClassName("winner")[0].innerHTML = "";
    xMoves = [];
    yMoves = [];
});