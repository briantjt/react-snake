import React, { Component } from "react";
const axios = require("axios");
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  async logout() {
    let res = await axios.post("http://localhost:3001/api/user/logout");
    if (res.status === 200) {
      alert("You have been logged out.");
      this.props.clearUsername()
    }
  }
  render() {
    return (
      <div className="nav flex-column">
        <h1>Snake</h1>
        {this.props.isLoggedIn ? (<h4>Welcome, {this.props.username}!</h4>): (
          <div className="button-wrapper">
            <button onClick={this.props.login}>Login</button>
          </div>
        )}
        <div className="button-wrapper">
          <button onClick={this.props.signup}>Signup</button>
        </div>
        <div className="button-wrapper">
          <button onClick={this.props.leaderboard}>Leaderboard</button>
        </div>
        <div className="button-wrapper">
          <button
            onClick={() => {
              this.logout();
              this.props.setLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
