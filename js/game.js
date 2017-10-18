'use strict';

var gameStarted;
var gameOver;
var clicks = 0;
var size;
var board = [];
var bombs;


function gid(x) {
    return document.getElementById(x).value;
}

function myFun(x) {
    var y = "Siin on uus sisu ja " + x;
    gid("koht1").innerHTML = y;
}

function startGame() {
    var numberOfSquares, bombs;
    numberOfSquares = gid("sizeselect");
    bombs = gid("bombs");
    size = parseInt(numberOfSquares);
    makeBoard(size, bombs);
    gameStarted = true;
    gameOver = false;
    clicks = 0;
}

function press(x, y) {
    console.log(x+"-"+y);
    document.getElementById(x+"-"+y).setAttribute("style", "background-color: gray");
    var neighboursList = getNeighbours(size, x, y);
    console.log(closerBombs(neighboursList));
    document.getElementById(x+"-"+y).innerHTML = closerBombs(neighboursList);
    if (closerBombs(neighboursList) === "0") {
         for (var i = 0; i < neighboursList.length; i++) {
             var neighbourBombs = closerBombs(GetNeighbours(size, neighboursList[i][0], neighboursList[i][1]));
             document.getElementById(neighboursList[i][0]+"-"+neighboursList[i][1]).innerHTML = neighbourBombs;
         }
     }
     console.log("Läheduses pomme: ", closerBombs(neighboursList));
     console.log("Vajutasid: "+x+" ja "+y);
     if (gameOver == false){
         clicks++;
     }
     if (board[x][y] == 1) {
        console.log("You died!");
        gameOver = true;
         alert("GAME OVER! You did " +clicks+ " steps.");
         location.reload();
     }
    console.log(size, bombs, clicks);
     if (size*size - bombs === clicks){
         //gameOver = true;
         alert("Congratulations You won!!");
         location.reload();
     }
     else if (board[x][y] == 0) console.log("Still alive!");
     
         
     
}

function makeBoard(size, bombs) {
    
    console.log("makeboard");
  
    if (bombs >= size * size) {
        document.getElementById("alert").innerHTML = "too many bombs for this size";
        return;
    }
    if (bombs == 0 || bombs == "") {
        document.getElementById("alert").innerHTML = "Please enter the number of bombs!";
        return;
    }
    // initialize board, filling with zeros
    for (var x = 0; x < size; x++) {
        board[x] = []; // insert empty subarray
    for (var y = 0; y<size; y++) board[x][y]=0;
}

    // now fill board with bombs in random positions
    while (bombs > 0) {
        // generate random x and y in range 0...size-1
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);

        // put bomb on x,y unless there is a bomb already
        if (board[x][y]!=1) {
            board[x][y]=1;
            bombs--; // bomb successfully positioned, one less to go
        }
    }
    drawBoard(board);
    console.log(board);
    
}

function drawBoard(board) {
    var c;
   c="<table id='table'>";
    
    for(var x = 0; x < board.length; x++) {
        c+="<tr>";
        for(var y = 0; y < board.length; y++) {
            c += "<td id="+ x + "-" + y +" onclick='press("+x+", "+y+")'></td>";
        }
        c += "</tr>";
    }
    
    c += "</table>";
    
    //console.log(c);
    document.getElementById('koht1').innerHTML = c;
    //$("#koht1").html(c);
}
function getNeighbours(size,x,y) {
    x = parseInt(x);
    y = parseInt(y); 
    var list=[];
    for (var i=-1; i<=1; i++) {    
        for (var j=-1; j<=1; j++) {
          // square is not a neighbour of itself
          if (i==0 && j==0) continue;
          // check whether the the neighbour is inside board bounds
          if ((x+i)>=0 && (x+i)<size && (y+j)>=0 && (y+j)<size) {
              list.push([x+i,y+j]);  
      }
    }
  }
    console.log(size, x, y);
  return list;
}  

function closerBombs(array) {
    
    var totalBombs = 0;
    for (var i = 0; i < array.length; i++){
        if (board[array[i][1]][array[i][0]] == 1)
        {
            totalBombs++;
        }
    }
    return totalBombs;
} 

function refresh() {
    location.reload();
}