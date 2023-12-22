import { createContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [user, setUser] = null

    const signIn = async (user) => {
        const res = await registerRequest(values)
        setUser(res.data)
        console.log(res.data)
    }
    return (
        <AuthContext.Provider value={{

        }}>
            {children}
        </AuthContext.Provider>
    )
}