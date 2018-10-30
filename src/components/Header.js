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

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick(event){
    event.preventDefault();
      this.props.switchScreen(event.target.name);
  }

  render() {
    const headerClass = this.props.activeScreen === "main" ? "header__browse" : "header__login"
    return (
      <div className={headerClass}>
        <header className="header__home">
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
          <h1>
            <a href="/">Ourbnb</a>
          </h1>
        </header>
        {this.props.currentGuest.id ?  
          <div className="header__guest">
            <h1>
              <i className="fas fa-1x fa-user margin-right-user" /> Welcome {this.props.currentGuest.first_name}
            </h1>
          </div> :
          <div className="header__guest"></div>
        }
      </div>
    );
  }
}

export default Header;
