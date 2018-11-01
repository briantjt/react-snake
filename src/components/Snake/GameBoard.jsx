import React, { Component } from "react";
import Grid from "./Grid";
const axios = require("axios");
axios.defaults.withCredentials = true;
export class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridSize: 20,
      speed: 150,
      score: 0,
      highScore: 0
    };
    this.updateSpeed = this.updateSpeed.bind(this);
    this.addScore = this.addScore.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.postScore = this.postScore.bind(this);
    this.getHighScore = this.getHighScore.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.getHighScore();
    }
  }
  addScore() {
    this.setState(prevState => {
      if (this.state.score === this.state.highScore)
        return {
          score: prevState.score + 10,
          highScore: prevState.score + 10
        };
    });
  }

  resetScore() {
    this.setState({ score: 0 });
  }

  updateSpeed(e) {
    this.setState({ speed: e.target.value });
    document.querySelector("select").blur();
  }

  async getHighScore() {
    try {
      // @ts-ignore
      let res = await axios("http://localhost:3001/api/score/high_score", {
        method: "get"
      });
      this.setState({ highScore: res.data.score });
    } catch (err) {
      console.log(err);
    }
  }
  async postScore() {
    try {
      // @ts-ignore
      let res = await axios("http://localhost:3001/api/score/new_score", {
        method: "post",
        data: { score: this.state.score },
        withCredentials: true
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div>
        <div className="game-menu">
          <div className="scores">
            <h1 className="score">Score</h1>
            <h5>Current: {this.state.score}</h5>
            <h5>Highest: {this.state.highScore}</h5>
          </div>
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
          speed={this.state.speed}
          addScore={this.addScore}
          resetScore={this.resetScore}
          postScore={this.postScore}
          getHighScore={this.getHighScore}
        />
      </div>
    );
  }
}

export default GameBoard;
