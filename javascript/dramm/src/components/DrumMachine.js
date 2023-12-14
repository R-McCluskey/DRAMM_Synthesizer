import React from 'react';
import * as Tone from 'tone'
import styled from 'styled-components'

const DrumButtons = styled.div`
display: flex;
flex-direction: row;
gap: 3vw;
margin-bottom: 3vh;
`

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

    const handleRide = () => {
        drumKit.player("Ride").start();
    }

    const handleSnare = () => {
        drumKit.player("Snare").start();
    }

    const handleTom = () => {
        drumKit.player("Tom").start();
    }

    const handleCowbell = () => {
        drumKit.player("Cowbell").start();
      }

    return ( 
        <DrumButtons>
        <button onClick = {handleBass}>Bass</button>
        <button onClick = {handleRide}>Ride</button>
        <button onClick = {handleSnare}>Snare</button>
        <button onClick = {handleTom}>Tom</button>
        <button onClick = {handleCowbell}>Cowbell</button>
        </DrumButtons>
     );
}
 
export default DrumMachine;