import{useState, useContext, createContext} from "react";



// 컨텍스트 생성
const AuthContext = createContext();

// 관리할 상태들 및 컨텍스트 제공자
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({username: "", role: ""});
    const [role, setRole] = useState("");

    // 로그인/아웃 시 유저 정보 세팅
    const loginData = (userData) => {
        setUser({
            username: userData.username,
            role: userData.role,
        });
        setIsLogin(true);
    }

    const logout = () => {
        setUser({
            username: "",
            role: "",
        });
        setIsLogin(false);
    }

    return(
        <AuthContext.Provider value={{ isLogin, user, role, loginData, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);