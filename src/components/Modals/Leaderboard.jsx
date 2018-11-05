import "./modals.css";
import React, { Component } from "react";
const axios = require("axios");
export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
    this.getScores = this.getScores.bind(this);
  }
  async getScores() {
    let res = await axios.get(
      process.env.REACT_APP_BACKEND_API_URL + "/api/score/leaderboard"
    );
    this.setState({ scores: res.data });
  }
  async componentDidMount() {
    await this.getScores();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      await this.getScores();
    }
  }
  render() {
    const toggleModal = this.props.show
      ? "modal-custom display-block"
      : "modal-custom display-none";
    return (
      <div className={toggleModal} onClick={this.props.handleClose}>
        <div className="modal-main text-dark" onClick={e => e.stopPropagation()}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.scores.map((score, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{score.user.username}</td>
                    <td>{score.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={this.getScores}>
            Refresh
          </button>
          <button className="btn btn-danger" onClick={this.props.handleClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
