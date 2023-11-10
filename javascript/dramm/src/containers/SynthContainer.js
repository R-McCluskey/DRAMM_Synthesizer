import { useEffect, useState } from 'react';
import AudioSynth from '../components/AudioSynth';
import VisualSynth from '../components/VisualSynth';
import Request from '../helpers/request';
import DrumSynth from '../components/DrumSynth';

import logo_1 from '../components/images/logo_1.png'

const SynthContainer = () => {

  const [sounds, setSounds] = useState([])
    console.log(sounds);

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

    return(

        <> 
        <img src={logo_1}/>
        <br></br>
        <AudioSynth sounds = {sounds}/>
        <br></br>
        <hr></hr>
       
        </>
  );
}

export default SynthContainer;