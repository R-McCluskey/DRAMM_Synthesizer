import React, {useEffect, useState} from 'react'
import * as Tone from 'tone'

import styled from 'styled-components';


const TopParams = styled.div`
display: flex;
width: 100%;
position: relative;
align-items: center;
justify-content: center;
overflow-x: scroll;
`

const ButtonStyle = styled.button`
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  min-height: 30%;
  padding: 1em 1em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  margin: 0.5em;
  width: 5em;
  will-change: transform;

&:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
`

const InputStyle2 = styled.input`
width: 8em;
height: 1.5em;
margin-top: 7.5%;

`

const TopRow = styled.span`
display: flex;
width: 55vw;
`



const BottomParams = styled.div`
display: grid;
width: 100%;
justify-content: center;
align-items: center;
overflow-x: scroll;
`

const PadStyle = styled.button`
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  min-height: 30%;
  padding: 1.5em;
  margin: 0.5em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 50vw;
  will-change: transform;

&:onClick{
    color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
`

const PadRow = styled.span`
display: flex;
flex-direction: row;
width: 45vw;
`

const InputStyle = styled.input`
margin: 5%;
width: 2em;
height: 2em;
`





const Sequencer = () => {

    // const seqAmount = (num) = {
    //     for (let i = 0; i < num.length; i++){
    //     <span><button></button></span>;
    //     }}

    let hz = 80
   


    const startLoop = () => {
        const synthA = new Tone.Synth().toDestination();
        new Tone.Loop(time => {
            synthA.triggerAttackRelease(hz, "8n", time);
        }, "16n").start(0);
        
        Tone.Transport.start();
    }

    const stopLoop = () => {
        Tone.Transport.stop();
    }

    const handleBpmChange = (evt) => {
        Tone.Transport.bpm.value = evt.target.value
    }

    const handleHzChange = (evt) => {
        hz = evt.target.value
    }

    
    const handleClick = (evt) => {

    }

    return ( 
        <>
        <TopParams>
            <TopRow>
                <InputStyle2 type='number' placeholder='BPM' onChange={handleBpmChange}/>
                <ButtonStyle onClick={startLoop}> Play </ButtonStyle>
                <ButtonStyle onClick={stopLoop}> Stop </ButtonStyle>
                <InputStyle2 type='number' placeholder='Hertz' onChange={handleHzChange}/>
            </TopRow>
        </TopParams>
        

        <BottomParams>
            <PadRow><InputStyle type='text'/><PadStyle onClick={handleClick}></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle></PadRow>
            <PadRow><InputStyle type='text'/><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle></PadRow>
            <PadRow><InputStyle type='text'/><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle></PadRow>
            <PadRow><InputStyle type='text'/><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle><PadStyle></PadStyle></PadRow>
        </BottomParams>


        </>
     );
}
 
export default Sequencer;