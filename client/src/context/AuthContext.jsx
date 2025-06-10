import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null); // null: 초기 로딩 중
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            console.warn("서버 로그아웃 실패:", e);
        }
        setUser(null);
        setIsLogin(false);
    };

    const checkSession = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/session`, {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setIsLogin(true);
            } else {
                setUser(null);
                setIsLogin(false);
            }
        } catch (err) {
            console.error("세션 확인 실패:", err);
            setUser(null);
            setIsLogin(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLogin(true);
    };

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, handleLogin, handleLogout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);