import React, { Component } from 'react';
import './App.css';
import Meter from './components/Meter';

class App extends Component {
  render() {
    return (<div>
      <div className="App">
        <header className="App-header">Consumption UI</header>
      </div>
      <div className="App-content">
        <div className="meterGroup">
          <Meter meterId="1" />
          <Meter meterId="2" />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
