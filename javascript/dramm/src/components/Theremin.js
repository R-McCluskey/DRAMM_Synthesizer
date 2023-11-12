
import React, { useRef } from 'react';
import Sketch from 'react-p5';

import styled from 'styled-components';

const FullScreen = styled.div`
width: 40vw;
height: 40vw;
`


function Theremin() {

    const parentRef = useRef();

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        
    }

    // const windowResized = (p5, canvasParentRef) => {
    //     p5.resizecanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    // }

    const draw = (p5) => {
        p5.background(200, 200, 150);
        // p5.frameRate(30);
        // if(speed > 0) {
        //     if (x + 50 < p5.width) {
        //         x += speed
        //     } else {
        //         speed = -speed;
        //     }
        // } else {
        //     if (x - 50 > 0) {
        //         x += speed;
        //     } else {
        //         speed = -speed;
        //     }
        // }
        // p5.ellipse(x, 160, 180);

    }

    return (
        <FullScreen ref={parentRef}>
            <Sketch setup={setup} draw={draw} canvasParentRef={parentRef} />
        </FullScreen>
 
    )
}

export default Theremin;