let targetDiv = document.getElementById("p5-container")
let divWidth = targetDiv.clientWidth


function setup() {
    frameRate(5)
    let canvas = createCanvas(divWidth, 500);
    canvas.parent('p5-container');
    canvas.mouseClicked(canvClick);
    background(245);
    let c = color(75, 129, 132);
    stroke(c);  
}

let n = 0.0;
function draw() {
    background(245);
    let numPoints = 50;
    let age = 20;
    let points;
    for (let year = 0; year <= age; year++){
        points = new Array(numPoints);
        for (let i = 0; i <= numPoints; i++) {
            let angle = 2*Math.PI*i/numPoints
            let radius = log(year)*60 + exp(-1/4*year)*40*noise(n);
            points[i] = [radius*Math.cos(angle), radius*Math.sin(angle)]
            n += 0.1;
        }
        points.splice(numPoints+1, 0, points[0])
        let xoff = divWidth/2;
        let yoff = divWidth/2;
        for (let i = 0; i <= numPoints; i++) {
            line(points[i][0] + xoff, points[i][1] + yoff, points[i+1][0] + xoff, points[i+1][1] + yoff)
        }
    }

}

function canvClick() {
    clear();
    background(245);
    loop()
}