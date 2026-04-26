import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    // Clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        const checkLogin = async () => {
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
            
            if(!hasToken) {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest();
                if(!res.data) {
                    setUser(null);
                    setIsAuthenticated(false);
                } else {
                    setUser(res.data);
                    setIsAuthenticated(true);
                }
                setLoading(false);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const signIn = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            const errorMsg = error.response?.data?.message || ["Registration failed"];
            setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
            return false;
        }
    }

    const logIn = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            const errorMsg = error.response?.data?.message || ["Login failed"];
            setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
            return false;
        }
    }

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            loading,
            signIn,
            logIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};