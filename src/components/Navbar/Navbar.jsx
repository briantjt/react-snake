import React, { Component } from "react";

export default class Navbar extends Component {

  render() {

    return (
      <div className="nav flex-column">
        <h1>Snake</h1>
        <button onClick={this.props.login}>Login</button>
        <button onClick={this.props.signup}>Signup</button>
        <button onClick={this.props.leaderboard}>Leaderboard</button>
      </div>
    );
  }
}
