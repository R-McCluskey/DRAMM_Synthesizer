import * as Tone from 'tone'

import React, { useRef } from 'react';
import Sketch from 'react-p5';

import styled from 'styled-components';

const FullScreen = styled.div`
width: 100vw;
`

var offset = -0.5;
var strum = 1;

function MenuSketch() {

    const parentRef = useRef();

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight/2).parent(canvasParentRef);        
    }

    const draw = (p5) => {
        const xCoord = p5.mouseX;
        const yCoord = p5.mouseY;

        p5.background(0, 0, 0);
        p5.stroke(0, 255, 0);
        p5.noFill();
        p5.beginShape();
        p5.vertex(0, p5.windowHeight);
        if(yCoord > 0 && yCoord < p5.windowHeight/2){
            for(var x = 0; x < p5.windowWidth; x++){
                //var angle = map(x, 0, width, 0, TWO_PI);
                var angle = offset + x * xCoord/50000;
                // map x between 0 and width to 0 and Two Pi
                var y = p5.map(p5.sin(angle), strum * 0, strum * 1, 250, yCoord);
                p5.vertex(x, y);
              }
        } else {
            for(var x = 0; x < p5.windowWidth; x++){
                //var angle = map(x, 0, width, 0, TWO_PI);
                var angle = offset + x * 0.01;
                // map x between 0 and width to 0 and Two Pi
                var y = p5.map(p5.sin(angle), -strum, strum, 225, 275);
                p5.vertex(x, y);
              }
        }
        console.log(xCoord);
        console.log(yCoord);

        
        p5.vertex(p5.windowWidth, p5.windowHeight);
        p5.endShape();
        offset += 0.1;
      }

    return (
        <FullScreen ref={parentRef}>
            <Sketch setup={setup} draw={draw} canvasParentRef={parentRef} />
        </FullScreen>
    )
}

export default MenuSketch;
        