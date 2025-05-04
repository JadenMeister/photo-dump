import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null);
    const [user, setUser] = useState({
        username: "",
        role: "",
        permissions: []
    });

    const loginData = (userData) => {
        setUser({
            id: userData.id,
            username: userData.username,
            role: userData.role,
            permissions: userData.permissions || []
        });
        sessionStorage.setItem("id", userData.id);
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("role", userData.role);
        sessionStorage.setItem("permissions", JSON.stringify(userData.permissions || []));
        setIsLogin(true);
    };

    const logout = () => {
        setUser({ username: "", role: "", permissions: [] });
        sessionStorage.clear();
        setIsLogin(false);
    };

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        const permissions = JSON.parse(sessionStorage.getItem("permissions") || "[]");

        if (username && role) {
            setUser({ id, username, role, permissions });
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, user, loginData, logout, setUser, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);