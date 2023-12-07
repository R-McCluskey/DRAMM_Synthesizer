import React, {useEffect} from 'react';

import SynthContainer from './containers/SynthContainer'

import styled from 'styled-components';

const AppStyle = styled.div`
overflow: hidden;
overscroll-behavior: none;
`


const App = () => {

  useEffect(() => {
    const handleWheel = (event) => {
        // Prevent the default scroll behavior
        event.preventDefault(); 
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
    };

    // Add the event listener to the document
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return (
    <AppStyle>
    <SynthContainer/>
    </AppStyle>
  );
}

export default App;
