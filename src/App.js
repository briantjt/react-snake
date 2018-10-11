import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/Snake/GameBoard'
import Pong from './components/Pong/Pong'
class App extends Component {
  render() {
    return (
      <div className="App">
      <GameBoard />
      </div>
    );
  }
}

export default App;
