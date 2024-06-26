import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/tech-support">tech support</Link></li>
                <li><Link to="/admin">Admin</Link></li>

            </ul>
        </nav>
    );
};

export default Navigation;