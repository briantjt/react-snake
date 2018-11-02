/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import wasd from "../../images/wasd.png";
import arrowkeys from "../../images/arrowkeys.png";
const axios = require("axios");
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  async logout() {
    let res = await axios.post(
      process.env.REACT_APP_BACKEND_API_URL + "/api/user/logout"
    );
    if (res.status === 200) {
      alert("You have been logged out.");
      this.props.clearUsername();
    }
  }
  render() {
    return (
      <ul className="nav flex-column bg-light">
        <li className="nav-item game-title">
          <h1 className="nav-link text-dark">SNAKE</h1>
        </li>
        {this.props.isLoggedIn ? (
          <li className="nav-item">
            <h5 className="nav-link text-dark">
              {String(this.props.username).toUpperCase()}o
            </h5>
          </li>
        ) : (
          <li className="nav-item">
            <a href="#" onClick={this.props.login} className="nav-link">
              LOGIN
            </a>
          </li>
        )}
        {this.props.isLoggedIn ? null : (
          <li className="nav-item">
            <a href="#" onClick={this.props.signup} className="nav-link">
              SIGNUP
            </a>
          </li>
        )}
        <li className="nav-item">
          <a href="#" onClick={this.props.leaderboard} className="nav-link">
            LEADERBOARD
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link"
            onClick={() => {
              this.logout();
              this.props.setLogout();
            }}
          >
            LOGOUT
          </a>
        </li>
        <li className="nav-item controls">
          <div>
            <h5 className="nav-link text-dark">CONTROLS</h5>
            <img className="images" src={wasd} width="100px" alt=""/>
            <img src={arrowkeys} width="100px" alt="" />
            <h6 className="nav-link text-dark"> 🄿 - PAUSE</h6>
          </div>
        </li>
      </ul>
    );
  }
}
