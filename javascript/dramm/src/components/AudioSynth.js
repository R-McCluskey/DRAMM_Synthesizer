import React, {useState, useEffect} from 'react'
import * as Tone from 'tone'
import MenuSketch from '../components/MenuSketch';
import styled from 'styled-components'
import SoundForm from './SoundForm'
import useTouchEvents from 'beautiful-react-hooks/useTouchEvents'

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
  width: 85%;
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
width: 150%;
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
  padding: 1.5em 0.5em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  width: 85%;
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
margin-right: 0.5em;
color: #3B3B3B;
font-weight: 600;
`

const LoadSaveContainer = styled.div`
display: flex;
height: 50%;
width: 60vw;
justify-content: space-between;
margin-bottom: 2.5%;
`

const SoundFormStyle = styled.div`
    background-color: transparent;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    min-height: 30%;
`

const AudioSynth = ({sounds, refresh}) => {

    const [selectedSound, setSelectedSound] = useState({
        'distortion' : 0.1,
        'name' : "default",
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

    useEffect (() => {
        const now = Tone.now()
    }, [])

    const soundNodes = sounds.map((sound, index) => {
        return <option value = {index} key={index}>{sound.name}</option>
    })

    const comp = new Tone.Compressor(-50, 2); // added compressor to everything so that when values are set high it doesn't distort/clip

    let vol = new Tone.Volume().toDestination();
    let dec = 0.1
    let rev = new Tone.Reverb(dec).toDestination();
    let dst = 0
    let dist = new Tone.Distortion(dst).toDestination();
    
        
    let synth = new Tone.Synth({
        oscillator: {
            type: 'triangle12'
        },
        envelope: {
            attack: 0.001,
            decay: 2,
            sustain: 0.3,
            release: 2
        } // how to shape the envelope and change the sinewave - needs state etc
    }).connect(vol).connect(rev).connect(dist).connect(comp).toDestination();

    const startTones = () => {
        Tone.start();
    }

    const startAudio = (e) => {
        synth.triggerAttack(e)
    }

    const stopAudio = () => {
        synth.triggerRelease();
    }

    const handleTouch = (e) => {
        handlePitch(e.touches[0].clientX*3)
        handleVolume(e.touches[0].clientY/10)
    }

    const handleTouchStart = (e) => {
        startAudio(e.touches[0].clientX*3)
        console.log('handleTouchStart');
    }   

    const handleTouchEnd = (e) => {
        stopAudio(e)
        console.log('handleTouchStart');
    }

    const handlePitch = (evt) => {
        synth.set({frequency:evt})
        // setSelectedPitch(evt.target.value)
    }

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

    const handleVolume = (evt) => {
        vol.set({volume:evt})
        // setSelectedVolume(evt.target.value)
    }

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
                <SoundForm sound={selectedSound} refresh={refresh}/> 
                <StyledDrop placeholder="Load Sound" defaultValue="default" onChange={handleLoad}>
                    <option value='default'>Load Sound</option>
                    {soundNodes}
                </StyledDrop>
            </LoadSaveContainer>
        </div>
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouch} onMouseDown={startAudio} onMouseUp={stopAudio}>
         <MenuSketch />
         </div>
         <div>
         <SettingsRowStyle>
                <SettingFontStyle>Reverb: </SettingFontStyle>
                <SliderStyle type="range" min="0.1" max="30" step='1' value={selectedSound.reverb} className="slider" id="myRange" onChange={handleReverb}/>

                <SettingFontStyle>Distortion: </SettingFontStyle>
                <SliderStyle type="range" min="0" max="3" step='0.1' value={selectedSound.distortion} className="slider" id="myRange" onChange={handleDistortion}/>
 
                {/* <SettingFontStyle>Pitch: </SettingFontStyle>
                <SliderStyle type="range" min="20" max="1500" value={selectedPitch} className="slider" id="myRange" onChange={handlePitch}/>

                <SettingFontStyle>Volume: </SettingFontStyle>
                <SliderStyle type="range" min="0" max="200" value={selectedVolume} className="slider" id="myRange" onChange={handleVolume}/> */}
            </SettingsRowStyle>
         </div>
        </>
    )
}

export default AudioSynth;