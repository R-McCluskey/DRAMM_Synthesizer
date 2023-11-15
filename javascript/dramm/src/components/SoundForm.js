import Popup from 'reactjs-popup'
import React, {useState, useEffect} from 'react';
import Request from '../helpers/request'

import styled from 'styled-components';

const StyledButton = styled.button`
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

const SoundForm = ({sound}) => {

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
    }

    return (
        <Popup trigger={<StyledButton className="savebutton"> Save Sound</StyledButton>} position="right" >
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