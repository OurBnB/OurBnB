import React from "react";

import "../styles/guestLogin.scss";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      guest: {},
      guestOld: {},
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      emailOld: "",
      passwordOld: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitOld = this.handleSubmitOld.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        guest: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          mobile: this.state.mobile,
          password: this.state.password
        },
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: ""
      },
      () => this.props.addGuest(this.state.guest)
    );
  }

  handleSubmitOld(e) {
    e.preventDefault();
    this.setState(
      {
        guestOld: {
          emailOld: this.state.emailOld,
          passwordOld: this.state.passwordOld
        },
        emailOld: "",
        passwordOld: ""
      },
      () => this.props.retrieveGuest(this.state.guestOld)
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="existingGuest">
          <h2>Returning guest:</h2>
          <input
            className="emailInput"
            onChange={this.handleChange}
            name="emailOld"
            type="email"
            value={this.state.emailOld}
            placeholder='Email'
          />
          <input
            className="passwordInput"
            onChange={this.handleChange}
            name="passwordOld"
            type="password"
            value={this.state.passwordOld}
            placeholder="Password"
          />
          <button onClick={this.handleSubmitOld}>Login</button>
        </form>
        <form className="register">
          <h2>New guest:</h2>
          <input
            className="firstNameInput"
            onChange={this.handleChange}
            name="firstName"
            type="text"
            value={this.state.firstName}
            placeholder="First name"
          />
          <input
            className="lastNameInput"
            onChange={this.handleChange}
            name="lastName"
            type="text"
            value={this.state.lastName}
            placeholder="Last name"
          />
          <input
            className="emailInput"
            onChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            placeholder="Email"
          />
          <input
            className="mobileInput"
            onChange={this.handleChange}
            name="mobile"
            type="number"
            value={this.state.mobile}
            placeholder="Mobile"
          />
          <input
            className="passwordInput"
            onChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            placeholder="Password"
          />
          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
