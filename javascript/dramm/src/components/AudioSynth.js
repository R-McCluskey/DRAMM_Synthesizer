import React from 'react'
import * as Tone from 'tone'


const AudioSynth = () => {

    const synthA = new Tone.Synth().toDestination();

    const loop = new Tone.Loop(time => {
        synthA.triggerAttackRelease(440, "8n", time);
    }, "4n").start(0);


    const startAudio = () => {
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