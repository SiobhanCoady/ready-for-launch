import React, { Component } from 'react';
import Launches from './components/Launches';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            <img className="Rocket-image" src={require("./images/rocket.png")} />
            Ready for Launch
            <img className="Rocket-image" src={require("./images/rocket.png")} />
          </h1>
        </div>
        <div className="App-intro">
          <Launches />
        </div>
      </div>
    );
  }
}

export default App;
