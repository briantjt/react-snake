import React, { Component } from "react";
import Grid from "./Snake/Grid";

export class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridSize: 20,
      speed: 150,
      score: 0
    };
    this.updateSpeed = this.updateSpeed.bind(this);
    this.addScore = this.addScore.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }

  addScore() {
    this.setState(prevState => {
      return { score: prevState.score + 10 };
    });
  }

  resetScore() {
    this.setState({ score: 0 });
  }

  updateSpeed(e) {
    this.setState({ speed: e.target.value });
    document.querySelector("select").blur();
  }

  render() {
    return (
      <div>
        <div className="game-menu">
          <h1 className="score">Score: {this.state.score}</h1>
          <div className="button-container">
            <select
              value={this.state.speed}
              name="Speed"
              id=""
              className="button"
              onChange={this.updateSpeed}
            >
              <option value="500">Snail</option>
              <option value="250">Slow</option>
              <option value="150">Medium</option>
              <option value="75">Fast</option>
              <option value="25">Extreme</option>
            </select>
          </div>
        </div>
        <Grid
          gridSize={this.state.gridSize}
          snakeArray={this.state.snakeArray}
          applePos={this.state.applePos}
          speed={this.state.speed}
          addScore={this.addScore}
          resetScore={this.resetScore}
        />
      </div>
    );
  }
}

export default GameBoard;
