import SynthContainer from './containers/SynthContainer'

import styled from 'styled-components';

const AppStyle = styled.div`
overflow: hidden;
overscroll-behavior: none;
`


const App = () => {

  document.body.classList.add("no-scroll")
  
  return (
    <AppStyle>
    <SynthContainer/>
    </AppStyle>
  );
}

export default App;
