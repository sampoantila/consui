import React, { Component } from 'react';
import Content from './components/Content';
import './App.css';

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
