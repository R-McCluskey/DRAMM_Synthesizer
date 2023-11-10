import React from 'react'
import * as Tone from 'tone'


const AudioSynth = () => {

    let hertz = 440;

    let vol = new Tone.Volume().toDestination();
    vol.volume.value = 0;
    let dec = 0.1
    let rev = new Tone.Reverb(dec).toDestination();
    let dst = 0
    let dist = new Tone.Distortion(dst).toDestination();
    

    
 
    let synth = new Tone.Synth(hertz).connect(vol).connect(rev).connect(dist).toDestination();

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

    const handlePitch = (evt) => {
        hertz = evt.target.value


    }


    

    const increaseDistortion= () => {
        dst += 5
        dist.set({distortion:dst})
    }

    const decreaseDistortion= () => {
        dst -= 5
        dist.set({distortion:dst})
    }

    const handleDistortion = (evt) => {
        dst = evt.target.value;
        dist.set({distortion:dst})
    }



    const increaseReverb = () => {
        dec += 2
        rev.set({decay:dec})
    }

    const decreaseReverb = () => {
        dec -= 2
        rev.set({decay:dec})
    }

    const handleReverb = (evt) => {
        dec = evt.target.value
        rev.set({decay:dec})

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
        <button onMouseDown={startAudio} onMouseUp={stopAudio}> Play </button>
        {/* <button onClick={stopAudio}> Stop</button> */}
         <button onClick={increaseFrequency}> Increase pitch</button>
         <button onClick={decreaseFrequency}> Decrease pitch</button>
         <button onClick={increaseVolume}> Increase vol</button>
         <button onClick={decreaseVolume}> Decrease vol</button>
         <button onClick={increaseReverb}> MOAR REVURB </button>
         <button onClick={decreaseReverb}> LESS REVURB</button>
         <button onClick={increaseDistortion}> A WANT DISTORTION</button>
         <button onClick={decreaseDistortion}> A DONT WANT DISTORTION</button>

         <input type ="number" onChange={handleChange}/>

         <div>
            <span>Pitch: </span>
            <input type="range" min="1" max="1500" class="slider" id="myRange" onChange={handlePitch}/>
         </div>

         <div>
            <span>Reverb: </span>
            <input type="range" min="1" max="100" class="slider" id="myRange" onChange={handleReverb}/>
         </div>

         <div>
            <span>Distortion: </span>
            <input type="range" min="1" max="100" class="slider" id="myRange" onChange={handleDistortion}/>
         </div>



        </>

    )
}

export default AudioSynth;