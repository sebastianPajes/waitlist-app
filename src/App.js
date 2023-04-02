import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
        API_URL: <a href={process.env.REACT_APP_API} >{process.env.REACT_APP_API}</a>
        </p>
        <p>
        API_KEY: {process.env.REACT_APP_API_KEY}
        </p>
        <p>
        REGION: {process.env.REACT_APP_REGION}
        </p>
      </header>
    </div>
  );
}

export default App;
