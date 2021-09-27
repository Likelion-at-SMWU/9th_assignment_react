import React from "react";
import Hi from './Hi';
import logo from './logo.svg';
import './App.css';

function App() {
  const name = 'KangYeonWoo';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontsize: 24,
    padding: '1rem'
  }

  return (
    <>
        <Hi />
        <div style={style}>{name}</div>
        <div className="pink-box"></div>     
    </>
  );
}

export default App;
