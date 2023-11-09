import { useEffect, useState } from 'react';
import AudioSynth from '../components/AudioSynth';
import VisualSynth from '../components/VisualSynth';
import Request from '../helpers/request';
import DrumSynth from '../components/DrumSynth';

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
        <h1>Dramm & Bass </h1>
        <AudioSynth/>
        <br></br>
        <DrumSynth/>
        {/* <p>{users}</p> */}
        </>
  );
}

export default SynthContainer;