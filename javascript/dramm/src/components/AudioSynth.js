import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import Reac, {useState, useEffect} from 'react'
import * as Tone from 'tone'

import Theremin from './Theremin'

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
  margin-right: 0.5em;
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

const LoadSaveContainer = styled.div`
display: flex;
height: 50%;
width: 100%;
`

const SaveButtonStyle = styled.button`
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

const ThereminWindow = styled.div`
position: relative;
`


const AudioSynth = ({sounds}) => {

    const [selectedSound, setSelectedSound] = useState({});
    const [selectedVolume, setSelectedVolume] = useState(0.8);
    const [selectedPitch, setSelectedPitch] = useState(440);

    useEffect(() => {
        rev.set({decay:selectedSound.reverb})
        dist.set({distortion:selectedSound.distortion})
    }, [selectedSound])

    const soundNodes = sounds.map((sound, index) => {
        return <option value = {index} key={index}>{sound.name}</option>
    })

    const comp = new Tone.Compressor(-50, 4); // added compressor to everything so that when values are set high it doesn't distort/clip

    let vol = new Tone.Volume().toDestination();
    let dec = 0.1
    let rev = new Tone.Reverb(dec).toDestination();
    let dst = 0
    let dist = new Tone.Distortion(dst).toDestination();
        
    let synth = new Tone.Synth(selectedPitch).connect(vol).connect(rev).connect(dist).connect(comp).toDestination();

    const startAudio = () => {
        synth.triggerAttack(selectedPitch)
    }

    const stopAudio = () => {
    synth.triggerRelease();
    }

    const handlePitch = (evt) => {
        synth.set({frequency:evt.target.value})
        setSelectedPitch(evt.target.value)
    }

    const handleDistortion = (evt) => {
        dst = evt.target.value;
        dist.set({distortion:dst})
        setSelectedSound({...selectedSound, distortion:dst}) // making deep copy, overwrite distortion value, setting sound
    }

    const handleReverb = (evt) => {
        dec = evt.target.value
        rev.set({decay:dec})
        setSelectedSound({...selectedSound, reverb:dec}) // making deep copy, overwrite reverb value, setting sound
    }

    const handleVolume = (evt) => {
        vol.set({volume:evt.target.value})
        setSelectedVolume(evt.target.value)
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
                <ButtonStyle onMouseDown={startAudio} onMouseUp={stopAudio}> Play </ButtonStyle>
                <div></div>
                <SaveButtonStyle> Save </SaveButtonStyle>
            <br></br>
            </LoadSaveContainer>
                <StyledDrop placeholder="Load Sound" defaultValue="default" onChange={handleLoad}>
                    <option value='default'>Load Sound</option>
                    {soundNodes}
                </StyledDrop>
                
            
            

        </div>

         <div>
            <SettingsRowStyle>
                <SettingFontStyle>Pitch: </SettingFontStyle>
                <SliderStyle type="range" min="20" max="1500" className="slider" id="myRange" onChange={handlePitch}/>
                <SettingFontStyle>Volume: </SettingFontStyle>
                <SliderStyle type="range" min="0" max="20" className="slider" id="myRange" onChange={handleVolume}/>
            </SettingsRowStyle>

            <SettingsRowStyle>
                <SettingFontStyle>Reverb: </SettingFontStyle>
                <SliderStyle type="range" min="0.1" max="30" step='1' value={selectedSound.reverb} className="slider" id="myRange" onChange={handleReverb}/>

                <SettingFontStyle>Distortion: </SettingFontStyle>
                <SliderStyle type="range" min="0" max="3" step='0.1' value={selectedSound.distortion} className="slider" id="myRange" onChange={handleDistortion}/>
{/* 
                <ThereminWindow>
                    <Theremin/>
                </ThereminWindow> */}
            </SettingsRowStyle>

         
         </div>
        </>
    )
}

export default AudioSynth;