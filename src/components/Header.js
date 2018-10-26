import React from "react";
import "../styles/Header.scss";

class Header extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {

    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleClick(e){
      e.preventDefault();
      this.props.switchScreen(e.target.name);
  }

  render() {
    const headerClass = this.props.activeScreen === "main" ? "header" : "header-login"
      return <header className={headerClass}>
          <div className="dropdown">
              <a onClick={this.handleSubmit} className="dropdown__btn" href="/">
                  <i className="fas fa-1x fa-bars"/>
              </a>
              <div className="dropdown__content">
                  <a onClick={this.handleClick} name="guestLogin" href="#">Guest Login</a>
                  <a onClick={this.handleClick} name="hostLogin" href="#">Host Login</a>
                  <a onClick={this.handleClick} name="faq" href="#">FAQ</a>
                  <a onClick={this.handleClick} name="contact" href="#">Contact Us</a>
              </div>
          </div>
          <h1>
              <a href="/">
                  Ourbnb
              </a>
          </h1>
          {
              (this.props.loggedIn) ? (<h4> You are Logged in</h4>) : null
          }

      </header>;
  }
}

export default Header;
