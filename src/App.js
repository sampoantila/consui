import React, { Component } from 'react';
import './App.css';
import Content from './components/Content';

class App extends Component {
  render() {
    return (<div>
      <div className="App">
        <header className="App-header">Consumption UI</header>
      </div>
      <div className="App-content">
        <Content />
      </div>
      </div>
    );
  }
}

export default App;
