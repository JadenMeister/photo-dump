export default function LogOut() {

  const logout = () => {

    alert("로그아웃 되었습니다.");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("permissions");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("userId");
    sessionStorage.clear();
    window.location.href = '/';
  }



    return (
        <button onClick={logout} className="text-xl font-bold text-white cursor-pointer hover:text-[#FF7F50]">
            Logout
        </button>
    );
}