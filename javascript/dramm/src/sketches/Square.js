
import React, { useRef } from 'react';
import Sketch from 'react-p5';
import styled from 'styled-components';
import * as P5 from 'p5';

const FullScreen = styled.div`
width: 100vw;
`

export default function SquareSketch(){

    const parentRef = useRef();

// let mic, fft;
// Two ArrayLists to store the vertices for two shapes
// This example assumes that each shape will have the same
// number of vertices, i.e. the size of each ArrayList will be the same

let circle = [];
let square = [];
// An ArrayList for a third set of vertices, the ones we will be drawing
// in the window

let morph = [];
// This boolean variable will control if we are morphing to a circle or square

let state = false;

function setup(p5, canvasParentRef) {

    p5.createCanvas(p5.windowWidth, p5.windowHeight/2).parent(canvasParentRef);   
    // 720/400
//   mic = new p5.AudioIn();
//   mic.start();
//   fft = new p5.FFT();
//   fft.setInput(mic);
  // Create a circle using vectors pointing from center
  for (let angle = 0; angle < 360; angle += 9) {
    // Note we are not starting from 0 in order to match the
    // path of a circle.
    let v = P5.Vector.fromAngle(p5.radians(angle - 135));
    v.mult(1000);
    circle.push(v);
    // Let's fill out morph ArrayList with blank PVectors while we are at it
    morph.push(p5.createVector());
  }

  let scale = 10


  // A square is a bunch of vertices along straight lines
  // Top of square
  for (let x = -50; x < 50; x += scale) {
    square.push(p5.createVector(x, -50));
  }
  // Right side
  for (let y = -50; y < 50; y += scale) {
    square.push(p5.createVector(50, y));
  }
  // Bottom
  for (let x = 50; x > -50; x -= scale) {
    square.push(p5.createVector(x, 50));
  }
  // Left side
  for (let y = 50; y > -50; y -= scale) {
    square.push(p5.createVector(-50, y));
  }
  console.log(square)
//   p5.noLoop()
}



function draw(p5) {

    // const xCoord = p5.mouseX;
    // const yCoord = p5.mouseY;


  p5.background(51);
  let spectrum = p5.mouseX;
  let amplitude = 0.7;
  // We will keep how far the vertices are from their target
  let totalDistance = 0;
  // Look at each vertex
  for (let i = 0; i < circle.length; i++) {
    let v1;
    // Are we lerping to the circle or square?
    if (amplitude > 0.05) {
      v1 = circle[i];
    } else {
      v1 = square[i];
    }
    // Get the vertex we will draw
    let v2 = morph[i];
    // Lerp to the target
    v2.lerp(v1, 0.1);
    // Check how far we are from target
    totalDistance += P5.Vector.dist(v1, v2);
  }
  // If all the vertices are close, switch shape
  if (totalDistance < 0.1) {
    state = !state;
  }
  // Draw relative to center
  p5.translate(p5.width / 2, p5.height / 2);
  p5.strokeWeight(4);
  // Draw a polygon that makes up all the vertices
  p5.beginShape();
  p5.noFill();
  p5.stroke(255);
  morph.forEach(v => {
    p5.vertex(v.x, v.y);
  });
  p5.endShape(p5.CLOSE);
}
return (
        <FullScreen ref={parentRef}>
            <Sketch setup={setup} draw={draw} canvasParentRef={parentRef} />
        </FullScreen>
    )
}

