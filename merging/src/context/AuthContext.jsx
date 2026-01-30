import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Restore login after refresh
    useEffect(() => {
        const savedUser = localStorage.getItem('app-user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // 🔐 LOGIN (Spring Boot)
    const login = async (email, password) => {
        console.log(`Logging in to: ${SERVICES.AUTH}/login`, { email, password }); // DEBUG

        const response = await fetch(`${SERVICES.AUTH}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Login failed:", response.status, errorText);
            throw new Error(errorText || 'Invalid credentials');
        }

        const data = await response.json();
        // data = { token, userId, email }

        const loggedInUser = {
            email: data.email,
            id: data.userId,
            token: data.token
        };

        setUser(loggedInUser);
        localStorage.setItem('app-user', JSON.stringify(loggedInUser));

        return loggedInUser;
    };

    // 📝 REGISTER (Spring Boot)
    const register = async (name, email, password) => {
        const response = await fetch(`${SERVICES.AUTH}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, // Backend expects 'name', we have 'fname' argument
                email: email,
                password: password
            })
        });

        console.log("Registering with:", { name: name, email, password }); // DEBUG LOG

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Registration error:", errorText);
            throw new Error(errorText || 'Registration failed');
        }

        // Backend returns the User object on success
        return true;
    };

    // 🚪 LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem('app-user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

