import React, { useState } from 'react';
import * as p5 from 'p5';
import { ReactP5Wrapper } from 'react-p5-wrapper';


const VisualSynth = () => {

    const [sketch, setSketch] = useState(undefined);
    const chooseNothing = () => setSketch(undefined);
    const chooseSketchOne = () => setSketch(sketchOne);

    function sketchOne(p5) {
        p5.setup = () => p5.createCanvas(200, 200);
    
        p5.draw = () => {
            p5.background(500);
            p5.normalMaterial();
            p5.push();
            p5.rotateZ(p5.frameCount * 0.01);
            p5.rotateX(p5.frameCount * 0.01);
            p5.rotateY(p5.frameCount * 0.01);
            p5.plane(100);
            p5.pop();
        };
    }

    return (
        <>
        <ul>
            <li>
                <button onClick={chooseNothing}>Choose Nothing</button>
            </li>
            <li>
                <button onClick={chooseSketchOne}>Choose Sketch 1</button>
            </li>
        </ul>
        <ReactP5Wrapper
        fallback={<p>No sketch selected yet.</p>}
        sketch={sketch}/>
        
        </>
    )
}

export default VisualSynth;
