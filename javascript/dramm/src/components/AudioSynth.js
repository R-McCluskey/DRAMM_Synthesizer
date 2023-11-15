import React, {useState, useEffect, useRef} from 'react'
import * as Tone from 'tone'
import MenuSketch from '../components/MenuSketch';
import styled from 'styled-components'
import SoundForm from './SoundForm'
import SquareSketch from '../sketches/Square';


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
  min-height: 1.5em;
  padding: 0.5em 0em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
  margin-right: 5%;

&:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
`
const SliderStyle = styled.input`
position: relative;
width: 110%;
height: 10%;
border-radius: 10%;
display: flex;
align-items: center;
style : {background: orange }
`

const StyledDrop = styled.select`
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
  margin: 0em 0em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 170%;
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
gap: 10%;
margin-bottom: 0.5em;
`

const SettingFontStyle = styled.p`
margin-left: 0.5em;
margin-right: 0.5em;
color: #3B3B3B;
font-weight: 600;
`

const ReverbStyle = styled.div `
display: flex;
flex-direction: column;
align-items: center;
`

const DistortionStyle = styled.div `
display: flex;
flex-direction: column;
align-items: center;
`

const LoadSaveContainer = styled.div`
display: flex;
height: 50%;
width: 80vw;
justify-content: space-between;
margin-bottom: 2.5%;
`

const SoundFormStyle = styled.div`
    background-color: black;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    min-height: 30%;
`

const AudioSynth = ({sounds, refresh}) => {

    const [selectedSound, setSelectedSound] = useState({
        'distortion' : 0.1,
        'reverb' : 0.01
    }); // set default 
    // const [selectedVolume, setSelectedVolume] = useState(0.8);
    // const [selectedPitch, setSelectedPitch] = useState(440);
    // const [touching, setTouching] = useState(false);
    // const [coordinates, setCoordinates] = useState([0,0]);
    // const {onTouchStart, onTouchMove, onTouchEnd} = useTouchEvents(ref)

 
  


    useEffect(() => {
        rev.set({decay:selectedSound.reverb})
        dist.set({distortion:selectedSound.distortion})
    }, [selectedSound])

    // useEffect (() => {
    //     const now = Tone.now()
    // }, [])

    const container = useRef()

    

    const soundNodes = sounds.map((sound, index) => {
        return <option value = {index} key={index}>{sound.name}</option>
    })

    const comp = new Tone.MultibandCompressor({
        lowFrequency: 150,
        highFrequency: 2000,
        high: {
            threshold: -100
        }
    }); // added compressor to everything so that when values are set high it doesn't distort/clip

    // let vol = new Tone.Volume().toDestination();
    let dec = 0.1
    let rev = new Tone.Reverb(dec).toDestination();
    let dst = 0
    let dist = new Tone.Distortion(dst).toDestination();

    let eq = new Tone.EQ3(0, -2, -20);
    
        
    let synth = new Tone.Synth({
        oscillator: {
            type: 'sine'
        },
        envelope: {
            attack: 0.001,
            decay: 2,
            sustain: 0.3,
            release: 2
        } // how to shape the envelope and change the sinewave - needs state etc
    }).connect(comp).connect(dist).connect(rev).connect(eq).toDestination()

    const startTones = () => {
        Tone.start();
    }

    const startAudio = (e) => {
       let calculatedPitch = ((e.clientX) * (1013.8/window.innerWidth)) + 32.70
    //    console.log(e.clientX)
        console.log(e.clientY);
        synth.triggerAttack(calculatedPitch)
    }

    const stopAudio = () => {
        synth.triggerRelease();
    }

    const handleTouch = (e) => {
        handlePitch(e.touches[0])
        handleVolume(e.touches[0])

    }

    const handleTouchStart = (e) => {
        startAudio(e.touches[0])
    }   

    const handleTouchEnd = (e) => {
        stopAudio(e)
    }

    const handlePitch = (e) => {
        let calculatedPitch = ((e.clientX) * (1013.8/window.innerWidth)) + 32.70

        if (calculatedPitch <= 1046.50){
        synth.set({frequency:calculatedPitch})
        // setSelectedPitch(evt.target.value)
    }}

    const handleDistortion = (evt) => {
        dst = evt.target.value;
        // dist.set({distortion:dst})
        setSelectedSound({...selectedSound, distortion:dst}) // making deep copy, overwrite distortion value, setting sound
    }

    const handleReverb = (evt) => {
        dec = evt.target.value
        // rev.set({decay:dec})
        setSelectedSound({...selectedSound, reverb:dec}) // making deep copy, overwrite reverb value, setting sound
    }

    const handleVolume = (e) => {
        const styleHeight = container.current?.clientHeight
        console.log(styleHeight);
        let calculatedVolume = -((e.clientY-(window.innerHeight/2)) * (24/styleHeight) )
        console.log(e.clientY);
        console.log(calculatedVolume);
        if (calculatedVolume <= 10){
            synth.set({volume:calculatedVolume})
        // setSelectedVolume(evt.target.value)
    }}

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
    } // if there's a selected value from dropdown set it to that, if none selected set to default writing in quote marks above

    return (
        <>
        <div>
            <LoadSaveContainer>
                <ButtonStyle onClick={startTones}> Start </ButtonStyle>
                <SoundForm sound={selectedSound} /> 
                <StyledDrop placeholder="Load Sound" defaultValue="default" onChange={handleLoad}>
                    <option value='default'>Load Sound</option>
                    {soundNodes}
                </StyledDrop>
            </LoadSaveContainer>
        </div>

        <div>
         <SettingsRowStyle>
                <ReverbStyle>
                    <SettingFontStyle>Reverb: </SettingFontStyle>
                    <SliderStyle type="range" min="0.1" max="30" step='1' value={selectedSound.reverb} className="slider" id="myRange" onChange={handleReverb}/>
                </ReverbStyle>

                <DistortionStyle>
                    <SettingFontStyle>Distortion: </SettingFontStyle>
                    <SliderStyle type="range" min="0" max="3" step='0.1' value={selectedSound.distortion} className="slider" id="myRange" onChange={handleDistortion}/>
                </DistortionStyle>
            
            </SettingsRowStyle>
         </div>

        <div ref = {container} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouch} onMouseDown={startAudio} onMouseUp={stopAudio}>
         {/* <MenuSketch /> */}
         <SquareSketch/>
         </div>
    
        </>
    )
}

export default AudioSynth;