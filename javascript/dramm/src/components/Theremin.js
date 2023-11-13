
import React, { useRef } from 'react';
import Sketch from 'react-p5';

import styled from 'styled-components';

const SmallScreen = styled.div`
width: 40vw;
height: 40vw;
`


function Theremin() {

    const setup = (p5) => {
        p5.createCanvas(640, 360);
      };
    
      const draw = (p5) => {
        p5.loadPixels();
        const n = (p5.mouseX * 10.0) / p5.width;
        const w = 16.0;                    // 2D space width
        const h = 16.0;                    // 2D space height
        const dx = w / p5.width;            // Increment x this amount per pixel
        const dy = h / p5.height;           // Increment y this amount per pixel
        let x = -w / 2;                    // Start x at -1 * width / 2
        for (let i = 0; i < p5.width; i++) {
          let y = -h / 2;                  // Start y at -1 * height / 2
          for (let j = 0; j < p5.height; j++) {
            const r = p5.sqrt((x * x) + (y * y));  // Convert cartesian to polar
            const theta = p5.atan2(y, x);          // Convert cartesian to polar
            // Compute 2D polar coordinate function
            const val = p5.sin(n * p5.cos(r) + 5 * theta);    // Results in a value between -1 and 1
            // const val = p.cos(r)      // Another simple function
            // const val = p.sin(theta)  // Another simple function
            // Map resulting value to grayscale value
            p5.pixels[i + j * p5.width] = p5.color((val + 1.0) * 255.0 / 2.0);  // Scale to between 0 and 255
            y += dy;          // Increment y
          }
          x += dx;            // Increment x
        }
        p5.updatePixels();
      };
    
      return (

        <SmallScreen>
            <Sketch setup={setup} draw={draw} />
        </SmallScreen>
      )
      
    };
    
    
export default Theremin;