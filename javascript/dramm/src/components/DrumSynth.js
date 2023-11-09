import React, {useState, useEffect} from 'react'
import * as Tone from 'tone'
const DrumSynth = () => {
    // const [hzValue, setHzValue] = useState(1);
    // useEffect(() => {
    // }, [])
    let hz = 73.42;
    let hzValue = 50;
    const handleNumberChange = (evt) => {
    }
    const handleBpmChange = (evt) => {
        Tone.Transport.bpm.value = evt.target.value
    }
    const handleHzChange = (evt) => {
        hz = evt.target.value
    }
    // let handleNumberChange = (evt) => {
    //     // console.log(hzValue + "TEST!!!");
    //     if(evt == null){
    //         setHzValue = 1;
    //     } else {
    //         setHzValue = evt.target.value;
    //         console.log(hzValue);
    //     }
    // }
    const incrementValue = () => {
        hz += hzValue;
        console.log(hzValue)
    }
    const decrementValue = () => {
        hz -= hzValue;
    }
    const startLoop = () => {
        const synthA = new Tone.Synth().toDestination();
        new Tone.Loop(time => {
            synthA.triggerAttackRelease(hz, "8n", time);
        }, "16n").start(0);
        Tone.Transport.start();
        // console.log()
    }
    const stopLoop = () => {
        Tone.Transport.stop();
    }
    return (
        <>
         <button onClick={startLoop}> Start</button>
         <button onClick={stopLoop}> Stop</button>
         <button onClick={incrementValue}>+ hz</button>
         <button onClick={decrementValue}>- hz</button>
         <input type='number' name='hzValueSet' placeholder='Hz Value' onChange={handleNumberChange}></input>
         <input type='number' placeholder='BPM' onChange={handleBpmChange}></input>
         <input type='number' placeholder='Hz' onChange={handleHzChange}></input>
        </>
    )
}
export default DrumSynth;














