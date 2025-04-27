import {useState,useEffect} from "react";

import {fetchUsers} from "../../api/fetchDataApi.js";
import UserMangeRow from "./UserManageRow.jsx";



export default function UserManage() {

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [openRowId, setOpenRowId] = useState(null);


    useEffect(() => {
        const getUserData = async () => {
            try{
                const data = await fetchUsers();
                setUserData(data);
                console.log("유저 데이터", data); //디버깅용
                console.log("유저 데이터", userData); //디버깅용
            } catch(err){
                console.error("유저 데이터 가져오기 실패", err);
            } finally {
                setIsLoading(false);
            }
        }
        getUserData()
    }, []);

    if(isLoading){
        return(
            <div className="w-245 h-170.25 flex items-center justify-center bg-[#F5F5F5]  shadow-lg">
                <p>Loading...</p>
            </div>
        )
    }

    const tableHeader = ["아이디", "이메일", "권한", "가입날짜", "관리"]

    return(



        <div className="w-245 h-170.25 flex flex-col justify-start  bg-[#F5F5F5]  shadow-lg">
            <div className="mb-5 mt-5 text-center text-2xl font-bold text-gray-700">
                회원관리
            </div>
            <table className="w-full  overflow-scroll">

                <thead className="bg-gray-300 ">
                <tr>
                    {tableHeader.map((header, index) => (
                        <th key={index} className="border-b px-4 py-2 text-center">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <UserMangeRow key={user.id} user={user} openRowId={openRowId} setOpenRowId={setOpenRowId}/>

                    ))}
                </tbody>
            </table>
        </div>
    )
}