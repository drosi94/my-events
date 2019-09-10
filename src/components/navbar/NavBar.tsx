import React from 'react';

import './NavBar.css';
import logo from './logo256.png';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="links-container">
                <li>
                    <Link to="/events">All Events</Link>
                </li>
                <li>
                    <Link to="/myevents">My Events</Link>
                </li>
            </ul>
        </nav>
    );
}