import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/Snake/GameBoard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Modals/Login";
import Leaderboard from "./components/Modals/Leaderboard";
import Signup from "./components/Modals/Signup";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      signup: false,
      leaderboard: false
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
    this.closeLeaderboard = this.closeLeaderboard.bind(this);
  }

  login() {
    this.setState({ login: true });
  }
  closeLogin() {
    this.setState({ login: false });
  }
  signup() {
    this.setState({ signup: true });
  }
  closeSignup() {
    this.setState({ signup: false });
  }
  leaderboard() {
    this.setState({ leaderboard: true });
  }
  closeLeaderboard() {
    this.setState({ leaderboard: false });
  }
  render() {
    return (
      <div className="App">
        <Navbar
          login={this.login}
          signup={this.signup}
          leaderboard={this.leaderboard}
        />
        <GameBoard />
        <Login closeLogin={this.closeLogin} show={this.state.login} />
        <Signup closeSignup={this.closeSignup} show={this.state.signup} />
        <Leaderboard
          closeLeaderboard={this.closeLeaderboard}
          show={this.state.leaderboard}
        />
      </div>
    );
  }
}

export default App;
