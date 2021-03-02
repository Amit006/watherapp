import logo from './logo.svg';
import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Home  from  "./pages/weather/home";


function App() {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Home />
      </Container>
    </React.Fragment>
  );
}

export default App;
