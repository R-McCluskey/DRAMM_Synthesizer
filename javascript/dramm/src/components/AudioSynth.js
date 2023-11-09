import React from 'react'
import * as Tone from 'tone'


const AudioSynth = () => {

    let hertz = 440;

    let vol = new Tone.Volume().toDestination();
    vol.volume.value = 0;
 
    let synth = new Tone.Synth(hertz).connect(vol).toDestination();

    const startAudio = () => {

    synth.triggerAttack(hertz)

    }

    const stopAudio = () => {
    synth.triggerRelease();
    }

    const increaseFrequency = () => {
        hertz +=50
        startAudio()
    }


    const decreaseFrequency = () => {
        hertz -=50
        startAudio()
       
    }

    const increaseVolume = () => {
        vol.volume.value += 2
    }
    const decreaseVolume = () => {
        vol.volume.value -= 2
    }

    const handleChange = (event) => {
      hertz = event.target.value
      startAudio()
    }

    return (

        <>
         <button onClick={startAudio}> Start</button>
         <button onClick={stopAudio}> Stop</button>
         <button onClick={increaseFrequency}> Increase pitch</button>
         <button onClick={decreaseFrequency}> Decrease pitch</button>
         <button onClick={increaseVolume}> Increase vol</button>
         <button onClick={decreaseVolume}> Decrease vol</button>
         <input type ="number" onChange={handleChange}/>
        </>

    )
}

export default AudioSynth;