export default function AdminLogOut() {

  const logout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("permissions");
    sessionStorage.clear();
    window.location.href = '/';
    alert("로그아웃 되었습니다.");
  }



    return (
        <button onClick={logout} className="text-xl font-bold text-white cursor-pointer hover:text-[#FF7F50]">
            Logout
        </button>
    );
}