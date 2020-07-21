// Initalise variables
let cellSize,
    columns,
    rows,
    board,
    next,
    age;

let fr = 25;
let cycle = 0;
let limit = 100;

function setup() {
  let canvas = createCanvas(700, 400);

  canvas.parent('p5-conway-container')
  frameRate(fr);

  cellSize = 10;
  columns = width/cellSize;
  rows = height/cellSize;
  board = new Array(columns);
  next = new Array(columns);
  age = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    next[i] = new Array(rows);
    age[i] = new Array(rows);
  }  
  // Fill the board with 1s and 0s
  generate()
  
}

function draw() {
  background(220);
  frameRate(fr);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] ? fill(age[i][j]*20) : fill(0);
      stroke(235, 231, 223);
      strokeWeight(0.4);
      rect(i * cellSize, j * cellSize, (i + 1) * cellSize, (j + 1) * cellSize);
    }
  }
  step();
  cycle++
  if (cycle >= limit) noLoop()

  
}

function mousePressed() {
  cycle = 0;
  generate();  
  loop()
}

function generate() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (i === 0 || j === 0 || i === columns-1 || j === rows-1) {
        age[i][j] = 0;
        board[i][j] = 0;
      } else {
        let alive = floor(random(2));
        alive ? age[i][j] = 1 : age[i][j] = 0;
        board[i][j] = alive;
      }      
    }
  }
}

function step() {
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighbours = -1 * board[x][y];
      for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <=1; b++) {
             neighbours += board[x+a][y+b];
         }
      }
      
      // Rules for the Game of Life
      if ((board[x][y]) && ((neighbours === 2) || (neighbours === 3 ))) {
        next[x][y] = 1;    
        age[x][y]++;
      } else if (!board[x][y] && neighbours === 3) {
        next[x][y] = 1;
        age[x][y] = 1;
      } else {
        next[x][y] = 0;
        age[x][y] = 0;
      }
      
    }
  }
  
  let temp = board;
  board = next;
  next = temp;
}