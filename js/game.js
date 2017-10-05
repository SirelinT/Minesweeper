'use strict';

function gid(x) {
    return document.getElementById(x);
}

function myFun(x) {
    var y = "Siin on uus sisu ja " + x;
    console.log("Vajutas nuppu");
    gid("koht1").innerHTML = y;
}

function press(x, y) {
    console.log(x+","+y);
}

function makeBoard(size, bombs) {
    var board = [];
    var bombs = document.getElementById("bombs").value;
    console.log("Pomme on: " + bombs);
    console.log("makeboard");
  
    if (bombs >= size * size) {
        throw "too many bombs for this size";
    }
    // initialize board, filling with zeros
    for (var x=0; x<size; x++) {
        board[x]=[]; // insert empty subarray
    for (var y=0; y<size; y++) board[x][y]=0;
}

    // now fill board with bombs in random positions
    var i=bombs;
    while (i>0) {
        // generate random x and y in range 0...size-1
        x=Math.floor(Math.random() * size);
        y=Math.floor(Math.random() * size);
        console.log("X: ", x, " Y: ", y, " Boardi massiiv: ", board[x]);
        console.log("Väljaku suurus: ", size);
        // put bomb on x,y unless there is a bomb already
        if (board[x][y]!=1) {
            board[x][y]=1;
            i--; // bomb successfully positioned, one less to go
            console.log("positioned "+x+", "+y+" yet to go "+i);
        }
    }
    return board;
    console.log("tere");
    
}
function drawBoard(size) {
    var c="";
    var board = makeBoard(size, bombs);
    console.log(size);
    
    c="<table>";
    for(var x=0; x<board.length; x++) {
        c+="<tr>";
        for(var y=0; y<board.length; y++) {
            c+="<td onclick='press("+x+", "+y+")'></td>";
        }
        c+="</tr>";
    }
    
    c+="</table>";
    //console.log(c);
    gid("koht1").innerHTML = c;
    //$("#koht1").html(c);
}
function neighbours(size,x,y) {
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
  return list;
    console.log(list);
}

function startGame() {
    var s,v;
    console.log("startGame");
    s=gid("sizeselect");
    console.log("index: "+s.selectedIndex);
    v=s.options[s.selectedIndex].value;
    console.log("ruute on: " + v);
    
    var b=makeBoard(parseInt(v),2);
    console.log("board b: ", b);
    drawBoard(b);
}