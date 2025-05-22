import React, { createContext, useContext, useState, useEffect } from "react";
type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};
// Context for authorization
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(()=>{
        // Set logged in to session storage
        const loggedIn = sessionStorage.getItem("IsLoggedIn");
        return loggedIn === "true";
    });

    // Change logged in
    useEffect(()=>{
        sessionStorage.setItem("IsLoggedIn", isLoggedIn.toString());
    },[isLoggedIn])

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false)
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}