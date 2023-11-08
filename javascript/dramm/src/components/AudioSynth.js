import React from 'react'
import * as Tone from 'tone'


const AudioSynth = () => {

    const startAudio = () => {

        const synthA = new Tone.Synth().toDestination();

        new Tone.Loop(time => {
            synthA.triggerAttackRelease(440, "64n", time);
        }, "16n").start(0);

        Tone.Transport.start();
        console.log()
    }

    const stopAudio = () => {
        Tone.Transport.stop();
    }

    return (

        <>
         <button onClick={startAudio}> Start</button>
         <button onClick={stopAudio}> Stop</button>
        </>

    )
}

export default AudioSynth;