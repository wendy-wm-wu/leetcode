/*
Create Tic Tac Toe using Object-Oriented Programming. 

Classes: 
Game 
  - initializes new board
  - initializes two players
  - tells you if someone has won game and who
  - makes a move and checks if move is valid 
Board
  - game state (x wins, o wins, tie, playing)
Player
  - who the player is
Square
  - check if it's empty or taken up by x or o 
*/

var Game = function(playerX = "X", playerO = "O") {
  this.board = new Board();
  this.playerX = new Player(playerX, Square.X_STATE);
  this.playerO = new Player(playerO, Square.O_STATE);
  this.currentMove = playerX; 
}

Game.prototype.makeMove = function(row, column) {
  if (this.board.empty(row, column) && this.board.setSquare(row, column, this.currentMove.squareState) !== undefined) {
    var tempState = this.currentMove.squareState;
    this.changeTurn();
    return tempState;
  }
  return undefined; 
}

Game.prototype.changeTurn = function() {
  if (this.currentMove === playerX) {
    this.currentMove = playerO;
  } else {
    this.currentMove = playerX;
  }
}

Game.prototype.winner = function() {
  return this.board.boardState(); 
}

Game.prototype.reset = function() {
  this.currentMove = playerX;
  this.board.reset(); 
}

var Board = function() {
  this.board = [];
  this.reset();
}

Board.PLAYING = 0; 
Board.X_WINS = 1; 
Board.O_WINS = 2;
Board.TIE = 3; 

Board.prototype.reset = function() {
  //2d matrix 
  this.board = [
    [ new Square(), new Square(), new Square() ],
    [ new Square(), new Square(), new Square() ],
    [ new Square(), new Square(), new Square() ]
  ]
}

//returns new state if square is set
//returns undefined if state is not set 
Board.prototype.setSquare = function(row, column, squareState) {
  if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
    this.board[row][column].state = squareState;
    return squareState;
  }
};

Board.prototype.squareState = function(row, column) {
  if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
    return this.board[row][column].state;
  }
};

Board.prototype.empty = function(row, column) {
  if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
    return this.board[row][column].empty();
  }
};

Board.prototype.stateWins = function(board, state) {
  for (let i = 0; i < 3; i++) {
    //rows
    if (board[i][0].state === state &&
        board[i][1].state === state && 
        board[i][2].state === state) {
          return true; 
    }
    //columns
    if (board[0][i].state === state && 
        board[1][i].state === state && 
        board[2][i].state === state) {
          return true; 
    }
    //diagonal-left
    if (board[i][2].state === state &&
        board[i][1].state === state &&
        board[i][0].state === state) {
          return true; 
    }
    //diagonal-right
    if (board[i][0].state === state &&
        board[i][1].state === state &&
        board[i][2].state === state) {
          return true; 
    }
    return false; 
  }
}

Board.prototype.checkAvailableSquare = function(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].empty()) {
        return true; 
      }
    }
  }
  return false; 
}

Board.prototype.boardState = function(board) {
  if (this.stateWins(board, Square.X_STATE)) {
    return Board.X_WINS;
  }
  
  if (this.stateWins(board, Square.O_STATE)) {
    return Board.O_WINS;
  }
  
  if (this.checkAvailableSquare(board)) {
    return Board.PLAYING;
  }
  return Board.TIE;
};


var Square = function() {
  this.state = Square.EMPTY_STATE; 
}

//variables
Square.EMPTY_STATE = 0; 
Square.X_STATE = 1; 
Square.O_STATE = 2; 

Square.prototype.x = function() {
  return this.state === Square.X_STATE;
};

Square.prototype.o = function() {
  return this.state === Square.O_STATE;
};

Square.prototype.empty = function() {
  return this.state === Square.EMPTY_STATE;
};

Square.prototype.stateToString = function(state) {
  if (state === Square.X_STATE) {
    return "X";
  } else if (state === Square.O_STATE) {
    return "O";
  } else {
    return ""; 
  }
};

var Player = function(username, squareState) {
  this.username = username;
  this.squareState = squareState;
}