import { useState, useContext, createContext, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);


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



    useEffect(()=>{
        fetch('http://localhost:8080/api/authCheck/',{

            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else{
                    throw new Error("로그인 필요");
                }
            })
            .then((data =>{
                if(data?.user){
                    setIsLogin(true);
                    setUser(data.user);
                }
            })
            )

    },[])

    const handleLogin = () => {
        setIsLogin(true);
    }

    const handleLogout = () => {
        setIsLogin(false);
        sessionStorage.clear();
    }




    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, handleLogin, handleLogout, loginData, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);