import React, { Component } from 'react'
import Grid from './Snake/Grid'

export class GameBoard extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         gridSize: 20,
         speed: 100
      }
      this.updateSpeed = this.updateSpeed.bind(this)
    }

    updateSpeed(e) {
      this.setState({speed: e.target.value})
    }
  render() {
    
    return (
      <div>
      <div className="game-menu">
      <select value={this.state.speed} name="Speed" id="" className="button" onChange={this.updateSpeed}>
      <option value="500">Slow</option>
      <option selected value="250">Medium</option>
      <option value="100">Fast</option>
      </select>
      </div>
      <div>
          <Grid gridSize={this.state.gridSize} snakeArray={this.state.snakeArray} applePos={this.state.applePos} speed={this.state.speed} />
      </div>
      </div>
    )
  }
}

export default GameBoard
