import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const signIn = async (userData) => {
        const res = await registerRequest(userData)
        setUser(res.data)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};