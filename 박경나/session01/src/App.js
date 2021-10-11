import React from "react";
import Myname from './Myname'
import './App.css'

function App() {
  const name = '박경나';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fonstsize: 24,
    padding: '1rem'
  } 
  return (
    <>
      <Myname />
      <div style = {style}>{name}</div>

      <div className = "pink-box">
      </div>
    </>
  );
}

export default App;
