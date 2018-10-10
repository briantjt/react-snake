import React, { Component } from 'react'
import Grid from './Snake/Grid'

export class GameBoard extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         gridSize: 20,
         speed: 500
      }
    }
  render() {
    
    return (
      <div>
          <Grid gridSize={this.state.gridSize} snakeArray={this.state.snakeArray} applePos={this.state.applePos} />
      </div>
    )
  }
}

export default GameBoard
