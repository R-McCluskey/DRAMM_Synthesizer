import Popup from 'reactjs-popup'
import React, {useState, useEffect} from 'react';
import Request from '../helpers/request'

const SoundForm = ({sound, refresh}) => {

    const [name, setName] = useState("")
    // Dont pass in  reverb and distortion, since they are already set.

    const onChange = (e) => {
        setName(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({name, ...sound});
        let newSound = {name, ...sound}
        const request = new Request();
        request.postSound(newSound, 'api/sounds')
        .then(() => refresh());
    }

    return (
        <Popup trigger={<button ClassName="savebutton"> Save Sound</button>} position="right" >
            <div>
                <h2> Name Your Sound</h2>
            </div>
            <form onSubmit={onSubmit} id="sound-form">
            <input onChange={onChange}
            type="text"
            id="name"
            name="name"
            value = {name}
            />
            <input type="submit" value="save" id="save" />
            </form>

        </Popup>
      );
}
 
export default SoundForm;