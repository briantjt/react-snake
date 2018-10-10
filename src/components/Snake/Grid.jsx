import React, { Component } from "react";
import "./Grid.css";

const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
const { left, up, right, down } = arrowKeys;

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.originalState = {
      snakeArray: [{ x: 4, y: 4 }],
      applePos: { x: 13, y: 4 },
      snakeDirection: right,
      gameOver: false,
    };
    this.state = this.originalState;

    this.controls = this.controls.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  controls(e) {
    //Needs to be modified to check snake[0] and snake[1] for valid move instead
    let snakeHead = this.state.snakeArray[0];
    let snakeBody = this.state.snakeArray[1];
    switch (e.keyCode) {
      case left:
        if (snakeHead.y - snakeBody.y !== 0) {
          this.setState({ snakeDirection: left });
        }
        break;
      case right:
        if (snakeHead.y - snakeBody.y !== 0) {
          this.setState({ snakeDirection: right });
        }
        break;
      case up:
        if (snakeHead.x - snakeBody.x !== 0) {
          this.setState({ snakeDirection: up });
        }
        break;
      case down:
        if (snakeHead.x - snakeBody.x !== 0) {
          this.setState({ snakeDirection: down });
        }
        break;
      default:
        break;
    }
  }

  restartGame() {
    this.setState(this.originalState);
    clearInterval(this.tick)
    this.tick = setInterval(this.updateGameState, this.props.speed) 
  }

  checkGameOver(snakeHead) {
    if (
      this.state.snakeArray.some(
        snakePos => JSON.stringify(snakePos) === JSON.stringify(snakeHead)
      )
    ) {
      clearInterval(this.tick);
      this.setState({ gameOver: true });
    }
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
      clearInterval(this.tick)
      this.tick = setInterval(this.updateGameState, this.props.speed)
    }
  }

  updateGameState() {
    let helperCoords;
    switch (this.state.snakeDirection) {
      case left:
        helperCoords = { x: -1, y: 0 };
        break;
      case right:
        helperCoords = { x: 1, y: 0 };
        break;
      case up:
        helperCoords = { x: 0, y: 1 };
        break;
      case down:
        helperCoords = { x: 0, y: -1 };
        break;
      default:
        break;
    }
    let snakeHead = {
      x: this.state.snakeArray[0].x + helperCoords.x,
      y: this.state.snakeArray[0].y - helperCoords.y
    };

    this.checkGameOver(snakeHead);

    let { x, y } = snakeHead;
    if (x < 0) {
      snakeHead.x = 19;
    } else if (x > 19) {
      snakeHead.x = 0;
    } else if (y < 0) {
      snakeHead.y = 19;
    } else if (y > 19) {
      snakeHead.y = 0;
    }

    let newSnakeArray = this.state.snakeArray;
    if (JSON.stringify(snakeHead) === JSON.stringify(this.state.applePos)) {
      newSnakeArray.unshift(snakeHead);
      const appleGen = () => {
        return {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        };
      };
      let newApplePos = appleGen();
      while (
        this.state.snakeArray.some(
          snakePos => JSON.stringify(snakePos) === JSON.stringify(newApplePos)
        )
      ) {
        newApplePos = appleGen();
      }
      this.setState({ snakeArray: newSnakeArray, applePos: newApplePos });
    } else {
      let newSnakeArray = this.state.snakeArray.slice(0, -1);
      newSnakeArray.unshift(snakeHead);
      this.setState({ snakeArray: newSnakeArray });
    }
  }

  render() {
    const gridMatrix = (() => {
      let array = [];
      for (let y = 0; y < this.props.gridSize; y++) {
        for (let x = 0; x < this.props.gridSize; x++) {
          array = array.concat({ x: x, y: y });
        }
      }
      return array;
    })();
    return (
      <div className="grid-container">
        {this.state.gameOver ? (
          <div className="gameover-overlay">
            <h1>Game Over!</h1>
            <button onClick={this.restartGame} className="button secondary">Restart</button>
          </div>
        ) : null}
        <div className="snake-grid">
          {gridMatrix.map(gridSquare => (
            <span
              className={`${
                this.state.snakeArray.some(
                  snakePos =>
                    JSON.stringify(snakePos) === JSON.stringify(gridSquare)
                )
                  ? "snake-square"
                  : JSON.stringify(this.state.applePos) ===
                    JSON.stringify(gridSquare)
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
