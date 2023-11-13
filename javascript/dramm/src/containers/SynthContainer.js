import { useEffect, useState } from 'react';
import AudioSynth from '../components/AudioSynth';
import VisualSynth from '../components/VisualSynth';
import Request from '../helpers/request';
import DrumSynth from '../components/DrumSynth';

import logo_1 from '../components/images/logo_1.png'
import P5Sketch from '../components/MenuSketch';

import styled from 'styled-components';
import Sequencer from '../components/Sequencer';

const P5Container = styled.div`
display: flex;
position: absolute;
align-items: center;
`
const MainContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
align-items: center;
width: 100%;
overflow-y: scroll;
`

const EmptyBox = styled.div`
height: 12.5vh;
`

const StyledLogo = styled.img`
width: 45%;
`

const NavMenu = styled.select`
width: 40%;
justify-content: center;
color: white;
text-align: center;
background-color: black;

`

const SynthContainer = () => {

  const [sounds, setSounds] = useState([])
    console.log(sounds);

  const [sequencers, setSequencers] = useState([])

   useEffect(() => {
     const request = new Request();
     console.log(request);
     const synthPromise = request.get("api/sounds")
     console.log(synthPromise);

     Promise.all([synthPromise])
     .then((data) => {
        setSounds(data[0])
     })
   }, [])

   const handleChange = (evt) => {
      console.log(evt)
      return evt.target.value
   }

    return(

        <div>
          <P5Container><P5Sketch/></P5Container>
            <MainContainer>
              <EmptyBox/>
                <StyledLogo src={logo_1} />
                <br></br>
                <NavMenu onChange={handleChange}>
                  {/* <option value=''>Synth_1</option> */}
                  {/* <option value={<DrumSynth/>}>Drum Synth</option> */}
                  {/* <option value={<Sequencer/>}>Sequencer</option> */}
                  <option value={<AudioSynth sounds = {sounds}/>}>Settings</option>
                </NavMenu>
                <br></br>
                {/* <EmptyBox/> */}

                {handleChange}
                <AudioSynth sounds = {sounds}/>
                {/* <Sequencer/> */}

              <EmptyBox></EmptyBox>
            </MainContainer>
        </div>
  );
}

export default SynthContainer;