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
        synth.setNote(hertz)
        // startAudio()
    }


    const decreaseFrequency = () => {
        hertz -=50
        synth.setNote(hertz)
        // startAudio()
       
    }

    const increaseVolume = () => {
        vol.volume.value += 10
    }
    const decreaseVolume = () => {
        vol.volume.value -= 10
    }

    const muteVolume = () => {
      
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
         <button onClick={muteVolume}> mute </button>

         <input type ="number" onChange={handleChange}/>
        </>

    )
}

export default AudioSynth;