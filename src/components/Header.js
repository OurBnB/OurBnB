import React from 'react';
import '../styles/Header.scss';

function Header () {
    return (
        <header className="header">
            <h1>
                <a href="/"><i className="fas fa-1x fa-bars" /></a>
                <a href="/" className="margin-left">OurBnB</a>
            </h1>
        </header>
    )
}

export default Header;