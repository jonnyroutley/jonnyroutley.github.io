// Initalise variables
// let cycle = 0;
// let limit = 1000;
// let fr = 20;

// let octaveSlider;

// Ball Class
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };
  
  update() {
    this.x = this.x + this.xVel
    this.y = this.y + this.yVel
    if (this.x >= WORLDWIDTH-BOUND || this.x <= BOUND)  {
      this.xVel = this.xVel * -1;   
    }

    if (this.y >= WORLDHEIGHT-BOUND || this.y <= BOUND)  {
      this.yVel = this.yVel * -1;   
    }
  }
}

let targetDiv = document.getElementById("p5-container")
let WORLDWIDTH = targetDiv.clientWidth

function inputNoise() {
  let val = document.getElementById("noiseInput").value;
  return val;
  
}


  
// let xold = 30;
// let yold = 300;
const WORLDHEIGHT = 400;
const BOUND = 80;

let follower1_x = [0, 0, 0],
follower1_y = [0, 0, 0],
follower2_x = [0, 0, 0],
follower2_y = [0, 0, 0],
intervalLength = 30;

let ball1 = new Ball(5*WORLDWIDTH/8, 150)
let ball2 = new Ball(3*WORLDWIDTH/8, 250)

// function preload() {
let ready = false
let noiseInput = inputNoise()

// }
  
function setup() {

  let canvas = createCanvas(WORLDWIDTH, WORLDHEIGHT);
  canvas.parent('p5-container');
  // canvas.mouseClicked(canvClick);
  background(245);

  
  console.log("noise seed: ", noiseInput);
  // ready = true
  
  // let noiseInput = inputNoise();
  // console.log(noiseInput);
  // console.log(noiseInput)
  // noiseSeed(noiseInput);

  // ball1.xVel = 2*random([-1,1])*random([0.8, 1.2]);
  // ball1.yVel = 2*random([-1,1])*random([0.1, 1.4]);

  // ball2.xVel = 2*random([-1,1])*random([0.6, 1]);
  // ball2.yVel = 2*random([-1,1])*random([0.8, 1.2]);
  ball1.xVel = 0.6;
  ball1.yVel = 1;
  ball2.xVel = 1.1;
  ball2.yVel = 0.5;
  
}
  
function myInputEvent() {
  console.log("noise seed: ", this.value)
  noiseSeed(this.value)
}

function draw() {

  // background(220);

  // for (let i = 0; i < 800; i++){
    ball1.xVel = ball1.xVel - 0.01*noise(0.02*ball1.x);
    // ball2.xVel = ball2.xVel + 0.4*noise(0.02*ball2.x) - 0.4*noise(0.02*ball2.y);  
    ball1.yVel = ball1.yVel - 0.01*noise(0.02*ball1.y);
    // ball2.yVel = ball2.yVel + 0.4*noise(0.02*ball2.y) - 0.4*noise(0.02*ball2.x); 

    ball1.update();
    ball2.update();
    stroke('purple'); // Change the color
    strokeWeight(2);
    // point(ball1.x, ball1.y);
    // point(ball2.x, ball2.y);
    
    stroke('white')
    followPoint1(0, ball1.x, ball1.y);
    followPoint1(1, follower1_x[0], follower1_y[0]);
    followPoint2(0, ball2.x, ball2.y);
    followPoint2(1, follower2_x[0], follower2_y[0]);


    stroke('black')
    followPoint1(2, follower1_x[1], follower1_y[1]);
    followPoint2(2, follower2_x[1], follower2_y[1]);

    let c = color(75, 129, 132, 50);
    stroke(c);
    strokeWeight(2);
    line(follower1_x[2], follower1_y[2], follower2_x[2], follower2_y[2]);

    if (frameCount >= 1000) {
      noLoop();
    }
    // if (i >= 10) {
    //   noLoop()
    // }
  // }
    if (ready == false) {
      background(245);
      noLoop();
    }
}
  
  
  
function followPoint1(i, xin, yin) {
  const dx = xin - follower1_x[i];
  const dy = yin - follower1_y[i];
  const angle = atan2(dy, dx);
  follower1_x[i] = xin - cos(angle) * intervalLength;
  follower1_y[i] = yin - sin(angle) * intervalLength;
  // point(follower1_x[i], follower1_y[i]);
}

function followPoint2(i, xin, yin) {
  const dx = xin - follower2_x[i];
  const dy = yin - follower2_y[i];
  const angle = atan2(dy, dx);
  follower2_x[i] = xin - cos(angle) * intervalLength;
  follower2_y[i] = yin - sin(angle) * intervalLength;
  // point(follower2_x[i], follower2_y[i]);
}
  
 

// function setup() {
      

//     speedSlider = createSlider(1, 10, 1, 1);
//     speedSlider.parent(targetDiv)
//     // octaveSlider.position(canvas.x, canvas.y);
//     speedSlider.style('width', '80px');
// }

// let x1,
//     y1,
//     x2,
//     y2;
// let t = 0;

// function draw() {
    // frameRate(fr);
    // let speed = speedSlider.value();
    

    // for (let i = 0; i < speed; i++){
    //     noiseDetail(10, 0.4);
    //     x1 = map(noise(t, 1), 0, 1, width/4, width);
    //     y1 = map(noise(t, 2), 0, 1, 125, height);
    //     noiseDetail(50, 0.4);
    //     x2 = map(noise(t, 100), 0, 1, width/4, width);
    //     y2 = map(noise(t, 200), 0, 1, 125, height);
    //     line(x1, y1, x2, y2);
    //     t+=0.03;
    //     cycle ++
    //     if (cycle >= limit) {
    //         noLoop()
    //     }
    // }

    
// }

// function mouseClicked(){
//     cycle = 0;
//     loop()
// }
// //click anywhere to continue current cycle
// function canvClick() {
//     clear();
//     background(245);
//     cycle = 0;
//     loop();
// }

