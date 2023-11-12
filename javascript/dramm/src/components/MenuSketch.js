import * as Tone from 'tone'

// import AudioSynth from './AudioSynth';

import React, { useRef } from 'react';
import Sketch from 'react-p5';

import styled from 'styled-components';

const FullScreen = styled.div`
width: 100vw;
height: 100vw;
`

let synth;
let vol = 0;
let hertz = 440;
let now = Tone.now();

var x = 50;
var speed = 2;

function MenuSketch() {

    const parentRef = useRef();

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        synth = new Tone.MonoSynth().toDestination();
        
    }

    const windowResized = (p5, canvasParentRef) => {
        p5.resizecanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    }

    const draw = (p5) => {
        p5.background(255, 120, 150);

        // synth.triggerAttackRelease("C3", "8n", now + 0.5);
        synth.volume.value = vol

        p5.frameRate(30);
        if(speed > 0) {
            if (x + 50 < p5.width) {
                x += speed
            } else {
                speed = -speed;
            }
        } else {
            if (x - 50 > 0) {
                x += speed;
            } else {
                speed = -speed;
            }
        }
        p5.ellipse(x, 160, 180);

        

    }

    return (
        <FullScreen ref={parentRef}>
            <Sketch setup={setup} draw={draw} canvasParentRef={parentRef} />
        </FullScreen>
 
    )
}

export default MenuSketch;
        