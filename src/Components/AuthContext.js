// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const history = useHistory(); // Initialize useHistory

    const login = async (userData, role) => {
        try {
            setAuthenticated(true);
            setUser(userData);
            // Redirect to role-specific route after login
            redirectToRoleRoute(role);
        } catch (error) {
            console.error('Login error:', error);
            // Optionally, handle error (e.g., display error message)
        }
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);
        history.push('/login');
    };

    const redirectToRoleRoute = (role) => {
        switch (role) {
            case 'end-user':
                history.push('/end-user');
                break;
            case 'tech-support':
                history.push('/tech-support');
                break;
            case 'admin':
                history.push('/admin');
                break;
            default:
                history.push('/');
                break;
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
