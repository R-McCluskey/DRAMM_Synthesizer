import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import Reac, {useState, useEffect} from 'react'
import * as Tone from 'tone'

import styled from 'styled-components'

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
  padding: 1.5em 0.5em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 100%;
  will-change: transform;

&:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
`
const SliderStyle = styled.input`
position: relative;
/* left: 50%; */
/* transform: translate(-45%,-45%); */
width: 150%;
height: 10%;
padding-top: 10%;
padding-bottom: 10%;
/* padding-left: 15vw; */
border-radius: 10%;
display: flex;
align-items: center;
/* box-shadow: 0px 15px 40px #7E6D5766; */
color: black;
`

const StyledDrop = styled.select`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  display: inline-block;
  font-size: 1em;
  font-weight: 600;
  line-height: normal;
  min-height: 30%;
  padding: 1em 1em;
  text-align: center;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 100%;
  will-change: transform;

&:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
`

const SettingsRowStyle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const SettingFontStyle = styled.p`
margin-left: 1.5em;

`


const AudioSynth = ({sounds}) => {

    // if sound not loaded then

    const [selectedSound, setSelectedSound] = useState([]);

    const [selectedReverb, setSelectedReverb] = useState(0.01);
    const [selectedDistortion, setSelectedDistortion] = useState(0.1);


    useEffect(() => {

        setSelectedReverb(selectedSound.reverb);
        setSelectedDistortion(selectedSound.distortion);

        console.log("Use Effect running")
        console.log(selectedSound)
        console.log(selectedReverb)
        console.log(selectedDistortion)

    }, [selectedSound])

    const soundNodes = sounds.map((sound, index) => {
        return <option value = {index} key={index}>{sound.name}</option>
    })

    let hertz = 440;


    let vol = new Tone.Volume().toDestination();
    vol.volume.value = 0;

    let dec = 0.1
    let rev = new Tone.Reverb(dec).toDestination();

    let dst = 0
    let dist = new Tone.Distortion(dst).toDestination();
    

    // 'cannot access before initialization' - be careful where you define the settings
    
 
    let synth = new Tone.Synth(hertz).connect(vol).connect(rev).connect(dist).toDestination();

    const startAudio = () => {

    synth.triggerAttack(hertz)

    }

    const stopAudio = () => {
    synth.triggerRelease();
    }

    // const increaseFrequency = () => {
    //     hertz +=50
    //     startAudio()
    // }


    // const decreaseFrequency = () => {
    //     hertz -=50
    //     startAudio()
       
    // }

    const handlePitch = (evt) => {
        hertz = evt.target.value
    }


    

    // const increaseDistortion= () => {
    //     dst += 5
    //     dist.set({distortion:dst})
    // }

    // const decreaseDistortion= () => {
    //     dst -= 5
    //     dist.set({distortion:dst})
    // }

    const handleDistortion = (evt) => {
        dst = evt.target.value;
        dist.set({distortion:dst})
    }



    // const increaseReverb = () => {
    //     dec += 2
    //     rev.set({decay:dec})
    // }

    // const decreaseReverb = () => {
    //     dec -= 2
    //     rev.set({decay:dec})
    // }

    const handleReverb = (evt) => {
        dec = evt.target.value
        rev.set({decay:dec})

    }

    // const increaseVolume = () => {
    //     vol.volume.value += 2
    // }
    // const decreaseVolume = () => {
    //     vol.volume.value -= 2
    // }

    const handleVolume = (evt) => {
        vol.volume.value = evt.target.value
    }

    // const handleChange = (event) => {
    //   hertz = event.target.value
    //   startAudio()
    // }

    const handleLoad = (event) => {
        const selectedValue = event.target.value
        if(selectedValue === 'default'){

            setSelectedSound({
                'distortion' : 0.1,
                'name' : "default",
                'reverb' : 0.01
            })
        } else {
            const chosenSound = sounds[selectedValue];
            setSelectedSound(chosenSound)
        }
    //    console.log(event.target.value)
    //    console.log(sounds)
    //    console.log("Selected sound: " + selectedSound)
    }

    



    return (

        <>
        <div>
            <ButtonStyle onMouseDown={startAudio} onMouseUp={stopAudio}> Play </ButtonStyle>
            <br></br>
            <StyledDrop placeholder="Load Sound" defaultValue="default" onChange={handleLoad}>
                <option value='default'>Load Sound</option>
                {soundNodes}
            </StyledDrop>
        </div>
        

        {/* <button onClick={stopAudio}> Stop</button> */}
         {/* <button onClick={increaseFrequency}> Increase pitch</button>
         <button onClick={decreaseFrequency}> Decrease pitch</button>
         <button onClick={increaseVolume}> Increase vol</button>
         <button onClick={decreaseVolume}> Decrease vol</button> */}
         {/* <button onClick={increaseReverb}> MOAR REVURB </button>
         <button onClick={decreaseReverb}> LESS REVURB</button>
         <button onClick={increaseDistortion}> A WANT DISTORTION</button>
         <button onClick={decreaseDistortion}> A DONT WANT DISTORTION</button> */}
         {/* <input type ="number" onChange={handleChange}/> */}

         <div>
            <SettingsRowStyle>
                <SettingFontStyle>Pitch: </SettingFontStyle>
                <SliderStyle type="range" min="20" max="1500" className="slider" id="myRange" onChange={handlePitch}/>
                <SettingFontStyle>Volume: </SettingFontStyle>
                <SliderStyle type="range" min="1" max="100" className="slider" id="myRange" onChange={handleVolume}/>
            </SettingsRowStyle>

            <SettingsRowStyle>
                <SettingFontStyle>Reverb: </SettingFontStyle>
                <SliderStyle type="range" min="1" max="100" className="slider" id="myRange" onChange={handleReverb}/>

                <SettingFontStyle>Distortion: </SettingFontStyle>
                <SliderStyle type="range" min="1" max="100" className="slider" id="myRange" onChange={handleDistortion}/>
            </SettingsRowStyle>
         </div>

       

        </>

    )
}

export default AudioSynth;