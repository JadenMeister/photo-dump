import { useState, useContext, createContext, useEffect } from "react";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);



    useEffect(() => {
        const stored = sessionStorage.getItem("user");
        console.log("session user:", stored);
        if (stored) {
            const sessionData = JSON.parse(stored);
            setUser(sessionData);
            setIsLogin(true);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLogin(true);
        sessionStorage.setItem("user", JSON.stringify(userData));

    }

    const handleLogout = () => {

        setUser(null);
        setIsLogin(false);
        sessionStorage.clear();
    }




    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, handleLogin, handleLogout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);