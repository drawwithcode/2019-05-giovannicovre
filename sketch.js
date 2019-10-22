var cnv;
var capture;
var mic;
var snoopDoggOne, snoopDoggTwo, snoopDoggThree;

function preload() {
  //BACKGROUND
  bg = loadImage('assets/img/bg.jpg');
  //IMAGES
  snoopDoggOne = loadImage('assets/img/snoopdogg-1.png');
  snoopDoggTwo = loadImage('assets/img/snoopdogg-2.png');
  snoopDoggThree = loadImage('assets/img/snoopdogg-3.png');
}

function setup() {
  //CANVAS
  cnv = createCanvas(windowWidth, windowHeight);

  //CAPTURE
  capture = createCapture(VIDEO);
  capture.hide();

  //MIC
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  //BACKGROUND
  backgroundImage(bg);

  //MIC
  var vol = mic.getLevel();

  //TXT 0
  strokeWeight(0);
  fill("rgb(255,0,0)");
  textFont("VT323");
  textSize(22);
  textAlign(CENTER, CENTER);
  text("WAIT UNTIL THE WEBCAM IS LOADED", windowWidth / 2, windowHeight / 2);

  //CAPTURE - FLIP CAPTURE
  var myImage = capture.loadPixels();
  push();
  translate(windowWidth, 0);
  scale(-1.0, 1.0);
  image(myImage, (windowWidth - capture.width) / 2, (windowHeight - capture.height) / 2, capture.width, capture.height);
  pop();

  //TXT 1
  strokeWeight(0);
  fill("rgb(254,254,215)");
  textFont("ChomskyRegular");
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Me & Snoop Dogg", windowWidth / 2, (windowHeight - capture.height) / 4);
  //TXT 2
  strokeWeight(0);
  fill("rgb(254,254,215)");
  textFont("VT323");
  textSize(20);
  text("PRESS AND HOLD 1, 2 OR 3", windowWidth / 2, capture.height + ((windowHeight - capture.height) / 4) + ((windowHeight - capture.height) / 2) - 12);
  text("SING TO SAVE THE PICTURE", windowWidth / 2, capture.height + ((windowHeight - capture.height) / 4) + ((windowHeight - capture.height) / 2) + 12);

  //IMAGES
  if (keyIsDown(49)) {
    //Resize in case the image is bigger than 'capture'
    if (snoopDoggOne.width > capture.width) {
      snoopDoggOne.resize(capture.width - 50, 0);
    }
    if (snoopDoggOne.height > capture.height) {
      snoopDoggOne.resize(0, capture.height - 50);
    }
    image(snoopDoggOne, (windowWidth - capture.width) / 2 + 20, (windowHeight - capture.height) / 2);
  }
  if (keyIsDown(50)) {
    //Resize in case the image is bigger than 'capture'
    if (snoopDoggTwo.width > capture.width) {
      snoopDoggTwo.resize(capture.width - 50, 0);
    }
    if (snoopDoggTwo.height > capture.height) {
      snoopDoggTwo.resize(0, capture.height - 50);
    }
    image(snoopDoggTwo, (windowWidth - capture.width) / 2, (windowHeight - capture.height) / 2 + capture.height - snoopDoggTwo.height);
  }
  if (keyIsDown(51)) {
    //Resize in case the image is bigger than 'capture'
    if (snoopDoggThree.width > capture.width) {
      snoopDoggThree.resize(capture.width - 50, 0);
    }
    if (snoopDoggThree.height > capture.height) {
      snoopDoggThree.resize(0, capture.height - 50);
    }
    image(snoopDoggThree, (windowWidth - capture.width) / 2 + capture.width - snoopDoggThree.width - 10, (windowHeight - capture.height) / 2 + capture.height - snoopDoggThree.height);
  }

  //CAPTURE BORDER
  stroke("black");
  strokeWeight(8);
  noFill();
  rect((windowWidth - capture.width) / 2, (windowHeight - capture.height) / 2, capture.width, capture.height);

  //SAVE PICTURE
  if ((keyIsDown(49) || keyIsDown(50) || keyIsDown(51)) && vol > 0.1) {
    save(cnv, 'meandsnoopdogg.jpg');
  }
}

function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  var scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width * scale, img.height * scale);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
