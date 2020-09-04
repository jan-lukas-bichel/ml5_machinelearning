// ml5.js: Train Your Own Neural Network
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/6.1-ml5-train-your-own.html
// https://youtu.be/8HEgeAbYphA
// https://editor.p5js.org/codingtrain/sketches/zwGahux8a

let model;
let targetLabel = 'C';
// let trainingData = [];

let state = 'collection';

function setup() {
  createCanvas(400, 400);
  background(100);

  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  };
  model = ml5.neuralNetwork(options);
}

function keyPressed() {
  if (key == 't') {
    state = 'training';
    console.log('starting training');
    model.normalizeData();
    let options = {
      epochs: 200
    };
    model.train(options, whileTraining, finishedTraining);
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log('finished training.');
  state = 'prediction';
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };

  if (state == 'collection') {
    let target = {
      label: targetLabel
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);

  } else if (state == 'prediction') {
    model.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  stroke(0);
  fill(0, 0, 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  let label = results[0].label;
  text(label, mouseX, mouseY);
}