import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkLogin = async () => {
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
            
            if(!hasToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest();
                if(!res.data) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const signIn = async (userData) => {
        try {
            const res = await registerRequest(userData);
            if (res.status === 200) {
                setUser(res.data);
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const logIn = async (userData) => {
        try {
            const res = await loginRequest(userData);
            if (res.status === 200) {
                setUser(res.data);
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            logIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};