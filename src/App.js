import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/Snake/GameBoard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Modals/Login";
import Leaderboard from "./components/Modals/Leaderboard";
import Signup from "./components/Modals/Signup";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      signup: false,
      leaderboard: false,
      isLoggedIn: false,
      username: null
    };
    this.setUsername = this.setUsername.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setLoggedOut = this.setLoggedOut.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
    this.closeLeaderboard = this.closeLeaderboard.bind(this);
    this.clearUsername = this.clearUsername.bind(this);
  }

  setUsername(user) {
    this.setState({ username: user });
  }
  clearUsername() {
    this.setState({ username: null });
  }
  setLoggedIn() {
    this.setState({ isLoggedIn: true });
  }
  setLoggedOut() {
    this.setState({ isLoggedIn: false });
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
      <div className="app">
          <Navbar
            login={this.login}
            signup={this.signup}
            leaderboard={this.leaderboard}
            setLogout={this.setLoggedOut}
            isLoggedIn={this.state.isLoggedIn}
            username={this.state.username}
            clearUsername={this.clearUsername}
          />
        <div className="main-board">
          <GameBoard isLoggedIn={this.state.isLoggedIn}/>
        </div>
        <Login
          handleClose={this.closeLogin}
          show={this.state.login}
          setLogin={this.setLoggedIn}
          setUsername={this.setUsername}
        />
        <Signup handleClose={this.closeSignup} show={this.state.signup} />
        <Leaderboard
          handleClose={this.closeLeaderboard}
          show={this.state.leaderboard}
        />
      </div>
    );
  }
}

export default App;
