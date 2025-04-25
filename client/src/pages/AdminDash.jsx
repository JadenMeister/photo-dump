
import {useState, useEffect} from "react";
import AdminSide from "../components/AdminComps/AdminSide.jsx";
import TotalVisit from "../components/AdminComps/TotalVisit.jsx";
import UserChange from "../components/AdminComps/UserChange.jsx";
import UploadStatus from "../components/AdminComps/UploadStatus.jsx";
import UploadChart from "../components/AdminComps/UploadChart.jsx";
import UserManage from "../components/AdminComps/UserManage.jsx";

const AdminDash = () => {

const [countries, setCountries] = useState([]);
const [userData, setUserData] = useState([]);


useEffect(() => {
    const allDataFetch = async ()=>{
        try{
            const [countryRes, userRes] = await Promise.all([
                fetch("http://localhost:8080/admin/uploads"),
                fetch("http://localhost:8080/admin/users")
            ]);

            const countryData = await countryRes.json();
            const userData = await userRes.json();

            setCountries(countryData);
            setUserData(userData);


        } catch (err){
            console.error("모든 데이터 가져오기 실패", err);
        }
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
