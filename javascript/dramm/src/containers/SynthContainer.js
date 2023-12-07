import { useEffect, useState } from 'react';
import AudioSynth from '../components/AudioSynth';
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
background: rgb(255, 127, 80);
width: 100vw;
height: 100vh;
touch-action: none;
overflow: hidden;
`
const MainContainer = styled.div`
display: flex;
flex-direction: column;
position: absolute;
align-items: center;
width: 100%;
`

const EmptyBox = styled.div`
height: 5vh;
`

const StyledLogo = styled.img`
width: 35%;
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


  //   const refresh = () => {
  //   const request = new Request();
  //   console.log(request);
  //   const synthPromise = request.get("api/sounds")
  //   console.log(synthPromise);

  //   Promise.all([synthPromise])
  //   .then((data) => {
  //      setSounds(data[0])})
  //  }

    return(

        <div>
          <P5Container></P5Container>


            <MainContainer>
              <EmptyBox/>
                <StyledLogo src={logo_1} />
                <br></br>
                <AudioSynth sounds = {sounds}/>
            </MainContainer>

            
        </div>
  );
}

export default SynthContainer;