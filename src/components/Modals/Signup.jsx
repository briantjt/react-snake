import "./modals.css";
import React, { Component } from "react";
const axios = require("axios");
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      const user = {
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      };
      let response = await axios
        .post(process.env.REACT_APP_BACKEND_API_URL + "/api/user/signup", user)
        .then(res => {
          console.log(res);
          return res;
        });
      if (response.status === 201) {
        alert("Successfully registered! You can now login.");
        this.setState({
          username: "",
          email: "",
          password: "",
          passwordConfirm: ""
        });
        this.props.handleClose();
      } else {
        alert("Oops! Something went wrong");
      }
    } else {
      alert("Passwords do not match!");
    }
  }
  render() {
    const toggleModal = this.props.show
      ? "modal-custom display-block"
      : "modal-custom display-none";
    return (
      <div className={toggleModal} onClick={this.props.handleClose}>
        <div
          className="modal-main text-dark"
          style={{ marginTop: "50px", width: "700px" }}
          onClick={e => e.stopPropagation()}
        >
          <h2 style={{ marginBottom: "40px" }}>Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                name="username"
                onChange={this.handleInput}
                value={this.state.username}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                onChange={this.handleInput}
                value={this.state.email}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={this.handleInput}
                value={this.state.password}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                name="passwordConfirm"
                onChange={this.handleInput}
                value={this.state.passwordConfirm}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register User
              </button>
              <button
                className="btn btn-danger"
                onClick={this.props.handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
