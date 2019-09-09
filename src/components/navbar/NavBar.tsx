import React from 'react';

import './NavBar.css';
import logo from './logo256.png';

export function NavBar() {
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo} alt="Logo"/>
            </div>
            <ul className="links-container">
                <li>All Events</li>
                <li>My Events</li>
            </ul>
        </nav>
    );
}