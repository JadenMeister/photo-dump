import { useState, useContext, createContext, useEffect } from "react";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 로그인 상태를 boolean이 아닌 null로 초기화
    const [isLogin, setIsLogin] = useState(null);
    const [user, setUser] = useState(null);

    const handleLogout = () => {

        setUser(null);
        setIsLogin(false);
        sessionStorage.clear();
    }



    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_TEST_API_BASE_URL}/api/session`, {
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setIsLogin(true);
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    // 세션이 없으면 로그아웃 처리
                    handleLogout();
                }
            } catch (err) {
                console.error("세션 확인 실패:", err);
                handleLogout();
            }
        };

        checkSession();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLogin(true);
        sessionStorage.setItem("user", JSON.stringify(userData));

    }




    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, handleLogin, handleLogout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);