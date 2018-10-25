import React from "react";
import "../styles/Header.scss";

function Header() {
  return (
    <header className="header">
      <h1>
        <div className="dropdown">
        
            <a className="dropdown__btn" href="/">
              <i className="fas fa-1x fa-bars" />
            </a>
     
          <div className="dropdown__content">
            <a href="#">Guest Login</a>
            <a href="#">Host Login</a>
            <a href="#">FAQ</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <a href="/" className="margin-left">
          Ourbnb
        </a>
      </h1>
    </header>
  );
}

export default Header;
