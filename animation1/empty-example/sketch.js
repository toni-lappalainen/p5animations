let snowflakes = []; // array to hold snowflake objects

let song;
let fft;


function preload() {
  song = loadSound('song.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  fill('white');
  noStroke();
  fft = new p5.FFT(0.9, 128);
  song.play();
}


let col = {
  r: 255,
  g: 0,
  b: 0
};

let x = 0;
let speed = 0;
let changedSize = 0;

function draw() {
  let spectrum = fft.analyze();
  if (x < 10)
    console.log(spectrum);
  x++

  background('black');
  let t = frameCount / 60; // update time
  
  col.r = random(0, 20) +spectrum[15];
  col.g = 0+spectrum[50]+spectrum[65]+20;
  col.b = random(0, 20)+ spectrum[25]+spectrum[45]+spectrum[50]+spectrum[65]+spectrum[60]+spectrum[70]+spectrum[40]+20;
  col.a = 130 + spectrum[70]+spectrum[60];
  speed = spectrum[50] / 10;
  changedSize = spectrum[50] / 10;
  //console.log(col.r, col.b);
  
  fill(col.r, col.g, col.b, col.a);

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 6);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
