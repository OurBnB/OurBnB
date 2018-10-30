import React from "react";

import "../styles/guestLogin.scss";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      guest: {},
      guestOld: {},
      first_name: "",
      last_name: "",
      email: "",
      telephone: "",
      password: "",
      emailOld: "",
      passwordOld: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitOld = this.handleSubmitOld.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        guest: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          telephone: this.state.telephone,
          password: this.state.password
        },
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        password: ""
      },
      () => this.props.addGuest(this.state.guest)
    );
  }

  handleSubmitOld(event) {
    event.preventDefault();
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

        <form className="existing__guest">
          <h1><i className="fas fa-1x fa-user guest-page" />Guest login</h1>
          <h2>Returning guest</h2>
          <input
            className="emailInput"
            onChange={this.handleChange}
            name="emailOld"
            type="email"
            value={this.state.emailOld}

            placeholder="Email"
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
          <h2>New guest</h2>
          <input
            className="firstNameInput"
            onChange={this.handleChange}
            name="first_name"
            type="text"
            placeholder="First name"
            value={this.state.first_name}
          />
          <input
              className="lastNameInput"
              onChange={this.handleChange}
              name="last_name"
              type="text"
              value={this.state.last_name}
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
            className="telephoneInput"
            onChange={this.handleChange}
            name="telephone"
            type="number"
            value={this.state.telephone}
            placeholder="Telephone"

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
