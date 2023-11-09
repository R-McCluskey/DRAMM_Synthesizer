import { useEffect, useState } from 'react';
import AudioSynth from '../components/AudioSynth';
import VisualSynth from '../components/VisualSynth';
import Request from '../helpers/request';
import DrumSynth from '../components/DrumSynth';

import logo_1 from '../components/images/logo_1.png'

const SynthContainer = () => {

  const [users, setUsers] = useState([])
    console.log(users);

   useEffect(() => {
     const request = new Request();
     console.log(request);
     const synthPromise = request.get("api/users")
     console.log(synthPromise);

     Promise.all([synthPromise])
     .then((data) => {
        setUsers(data[0])
     })
   }, [])

    return(

        <> 
        <img src={logo_1}/>
        <br></br>
        <AudioSynth/>
        <br></br>
        <hr></hr>
        <DrumSynth/>
        {/* <p>{users}</p> */}
        </>
  );
}

export default SynthContainer;