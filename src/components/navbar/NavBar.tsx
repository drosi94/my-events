import React from 'react';

import './NavBar.css';
import logo from './logo256.png';
import { NavLink } from 'react-router-dom';

export function NavBar() {
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="links-container">
                <li>
                    <NavLink activeClassName="active" to="/events">All Events</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/myevents">My Events</NavLink>
                </li>
            </ul>
        </nav>
    );
}