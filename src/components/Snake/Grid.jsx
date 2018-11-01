import React, { Component } from "react";
import "./Grid.css";
import {
  checkValidMove,
  createCoords,
  checkReflect,
  objectEqual,
  appleGen,
  calcSnakeHead
} from "./helperFunctions";
const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
const { left, up, right, down } = arrowKeys;

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.originalState = {
      snakeArray: [{ x: 4, y: 4 }, { x: 3, y: 4 }],
      applePos: { x: 13, y: 4 },
      snakeDirection: right,
      gameOver: false
    };
    this.state = this.originalState;
    this.gridMatrix = this.createGridMatrix();

    this.controls = this.controls.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.createGridMatrix = this.createGridMatrix.bind(this);
  }

  controls(e) {
    // Check if input control is a valid move, e.g. snake cannot move right if it is already moving left or right
    return checkValidMove(
      e.keyCode,
      this.state.snakeArray[0],
      this.state.snakeArray[1]
    )
      ? this.setState({ snakeDirection: e.keyCode })
      : null;
  }

  restartGame() {
    this.props.resetScore();
    this.setState(this.originalState);
    clearInterval(this.tick);
    this.tick = setInterval(this.updateGameState, this.props.speed);
  }

  async checkGameOver(snakeHead) {
    if (
      this.state.snakeArray.some(snakePos => objectEqual(snakePos, snakeHead))
    ) {
      clearInterval(this.tick);
      this.setState({ gameOver: true });
      await this.props.postScore()
    }
  }

  createGridMatrix() {
    let array = [];
    for (let y = 0; y < this.props.gridSize; y++) {
      for (let x = 0; x < this.props.gridSize; x++) {
        array = array.concat({ x: x, y: y });
      }
    }
    return array;
  }

  componentDidMount() {
    window.addEventListener("keydown", e => this.controls(e));
    this.tick = setInterval(this.updateGameState, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.tick);
  }

  componentDidUpdate(prevProps) {
    if (this.props.speed !== prevProps.speed && this.state.gameOver === false) {
      clearInterval(this.tick);
      this.tick = setInterval(this.updateGameState, this.props.speed);
    }
  }

  updateGameState() {
    let helperCoords = createCoords(this.state.snakeDirection);
    let snakeHead = calcSnakeHead(this.state.snakeArray[0], helperCoords);
    let newSnakeArray = [...this.state.snakeArray];

    checkReflect(snakeHead);
    this.checkGameOver(snakeHead);

    if (objectEqual(snakeHead, this.state.applePos)) {
      newSnakeArray.unshift(snakeHead);
      this.props.addScore();
      let newApplePos = appleGen(this.state.snakeArray);
      this.setState({ snakeArray: newSnakeArray, applePos: newApplePos });
    } else {
      let newSnakeArray = this.state.snakeArray.slice(0, -1);
      newSnakeArray.unshift(snakeHead);
      this.setState({ snakeArray: newSnakeArray });
    }
  }

  render() {
    return (
      <div className="grid-container">
        {this.state.gameOver ? (
          <div className="gameover-overlay">
            <h1>Game Over!</h1>
            <button onClick={this.restartGame} className="button secondary">
              Restart
            </button>
          </div>
        ) : null}
        <div className="snake-grid">
          {this.gridMatrix.map(gridSquare => (
            <span
              className={`${
                this.state.snakeArray.some(snakePos =>
                  objectEqual(snakePos, gridSquare)
                )
                  ? "snake-square"
                  : objectEqual(this.state.applePos, gridSquare)
                    ? "apple-square"
                    : "grid-square"
              }`}
              key={`x${gridSquare.x}y${gridSquare.y}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Grid;
