let items = [];
let score = 0;
let seeds = [];
let board;
let next;
let colours = ["BLACK", "BLUE", "INDIGO", "VIOLET", "GREEN", "YELLOW", "ORANGE", "RED"];
let fc;
let alive;
let timeRemaining = 30;


function create(game) {
    board = new Array(23);
    next = new Array(23);
      age = new Array(23);
    for (let i = 0; i < 24; i++) {
        board[i] = new Array(23);
        next[i] = new Array(23);
        age[i] = new Array(23);
    };

    generate()
}

function aliveCount(board) {
    alive = 0;
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            if (board[i][j] === 1) alive ++
        }
    }
    return alive
}

function generate() {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            if (i === 0 || j === 0 || i === 23 || j === 23) {
            board[i][j] = 0;
            age[i][j] = 0;

            } else {
                let alive = Math.floor(Math.random() * 2);
                alive ? age[i][j] = 1 : age[i][j] = 0;
                board[i][j] = alive;
            }      
        }
    }
}

function update(game) {
    for (let i = 0; i < 24; i++) {   
        for (let j = 0; j < 24; j++) {
            board[i][j] ? game.setDot(i, j, Color.Gray) : game.setDot(i, j, Color.Black);
        }
    }

    step()

    fc = game.getFrameCount()
    alive = aliveCount(board)
    game.setText(`Generations Elapsed: ${fc}. Number of Live Cells: ${alive}`);

    
    if (!aliveCount(next) || (timeRemaining <= 0)) {
        let maxRow = age.map(function(row){return Math.max.apply(Math, row)});
        let max = Math.max.apply(null, maxRow);
        for (let i = 0; i < 24; i++) {   
            for (let j = 0; j < 24; j++) {
                game.setDot(i, j, colours[age[i].map(x => Math.floor(x*7/max))[j]])
            }
        }

        game.setText(`Game over! Final Generations Elapsed: ${fc}`);
        game.end()
    }
}

function step() {
    for (let x = 1; x < 23; x++) {
        for (let y = 1; y < 23; y++) {
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
                // age[x][y] = 1;
                age[x][y]++
            } else {
                next[x][y] = 0;
                // age[x][y] = 0;
            }
        
        }
    }
    
    let temp = board;
    board = next;
    next = temp;
}
    
function onDotClicked(x, y) {
    board[x][y] = 1;
    timeRemaining += 5;
}


let interval = setInterval(decreaseTimer, 1000);

function decreaseTimer() {
  timeRemaining--;
  if (timeRemaining == 0) {
    clearInterval(interval);
  }
}

function onKeyPress(direction) {
    if (direction == Direction.Up && player.y > 0) {
        // player.y--;
        }
        if (direction == Direction.Down && player.y < 23) {
        // player.y++;
        }
        if (direction == Direction.Left && player.x > 0) {
        // player.x--;
        }
        if (direction == Direction.Right && player.x < 23) {
        // player.x++;
        }
};

let config = {
    create: create,
    update: update,
    onKeyPress: onKeyPress,
    onDotClicked: onDotClicked,
    frameRate: 20,
    containerId: "24a2-container"
};

let game = new Game(config);
game.run();
