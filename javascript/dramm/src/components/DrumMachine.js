import React from 'react';
import * as Tone from 'tone'

const DrumMachine = () => {


    const bufferBass = new Tone.Buffer(require("../drumSounds/bass-drum.wav"))
    const bufferRide = new Tone.Buffer(require("../drumSounds/ride.wav"))
    const bufferSnare = new Tone.Buffer(require("../drumSounds/snares.wav"))
    const bufferTom = new Tone.Buffer(require("../drumSounds/drum-tom.wav"))
    const bufferCowbell = new Tone.Buffer(require("../drumSounds/cowbell.wav"))

    const drumKit = new Tone.Players({
            "Bass": bufferBass,
            "Ride" : bufferRide,
            "Snare" : bufferSnare,
            "Tom": bufferTom,
            "Cowbell": bufferCowbell
        }
    ).toDestination();

    const handleBass = () => {
      drumKit.player("Bass").start();
    }

    return ( 
        <>
        <button onClick = {handleBass}>Bass</button></>
     );
}
 
export default DrumMachine;