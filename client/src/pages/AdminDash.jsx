
import {useState, useEffect} from "react";
import AdminSide from "../components/AdminComps/AdminSide.jsx";
import TotalVisit from "../components/AdminComps/TotalVisit.jsx";
import UserChange from "../components/AdminComps/UserChange.jsx";
import UploadStatus from "../components/AdminComps/UploadStatus.jsx";
import UploadChart from "../components/AdminComps/UploadChart.jsx";
import UserManage from "../components/AdminComps/UserManage.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import { useNavigate} from "react-router-dom";



const AdminDash = () => {

const [countries, setCountries] = useState([]);
const [userData, setUserData] = useState([]);
const navigate = useNavigate();

const {isLogin, user} = useAuth();

    useEffect(() => {
        if(isLogin === null) return;
        if (isLogin && user) {
            if (user.role !== "admin") {
                alert("관리자 권한이 없습니다.");
                navigate("/");
            }
        } else if (!isLogin) {
            alert("로그인이 필요합니다.");
            navigate("/");
        }
    }, []);




return(
    <div className="w-full h-screen flex">
        <AdminSide/>

        <div className="w-full bg-gray-300 flex justify-around pt-20 rounded-lg flex-col gap-8">
            <div className="flex justify-around">
                <TotalVisit/>
                <UserChange/>
                <UploadStatus/>
            </div>

            <div className="h-screen overflow-hidden flex justify-around mb-5">
                <UploadChart/>
                <UserManage/>
            </div>
        </div>




    </div>

)


};

export default AdminDash;
