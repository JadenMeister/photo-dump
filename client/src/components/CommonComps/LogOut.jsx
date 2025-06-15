import {useAuth} from "@/context/AuthContext.jsx";

export default  function LogOut() {

  const { setIsLogin, setUser } = useAuth();

  const logout  =  async () => {

    try{
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if(res.ok){
        alert("로그아웃 되었습니다.");
        sessionStorage.clear();
        setIsLogin(false);
        setUser(null);
        window.location.href = '/';
      }
    } catch(err){
      console.error("로그아웃 실패", err);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");

    }

  }

    return (
        <button onClick={logout} className="text-xl font-bold text-white cursor-pointer hover:text-[#FF7F50]">
            Logout
        </button>
    );
}