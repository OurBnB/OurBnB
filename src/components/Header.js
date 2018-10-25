import React from "react";
import "../styles/Header.scss";

class Header extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleClick(e){
      e.preventDefault();
      this.props.switchScreen(e.target.name);
  }

  render() {
    return (
      <header className="header">
        <h1>
          <div className="dropdown">
            <a onClick={this.handleSubmit} className="dropdown__btn" href="/">
              <i className="fas fa-1x fa-bars" />
            </a>

            <div className="dropdown__content">
              <a onClick={this.handleClick} name="guestLogin" href="#">Guest Login</a>
              <a onClick={this.handleClick} name="hostLogin" href="#">Host Login</a>
              <a onClick={this.handleClick} name="faq" href="#">FAQ</a>
              <a onClick={this.handleClick} name="contact" href="#">Contact Us</a>
            </div>
          </div>

          <a href="/" className="margin-left">
            Ourbnb
          </a>
        </h1>
      </header>
    );
  }
}

export default Header;
