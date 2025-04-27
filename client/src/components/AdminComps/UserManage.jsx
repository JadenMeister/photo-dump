import {useState,useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {fetchUsers} from "../../api/fetchDataApi.js";

export default function UserManage() {
    const {user} = useAuth();
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
        <div className="w-245 h-170.25 flex items-center justify-center bg-[#F5F5F5]  shadow-lg">
            <table className="w-full h-full">
                <thead>
                    <tr>
                        {tableHeader.map((header, index) => (
                            <th key={index} className="border-b px-4 text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id} className="overflow-auto">
                            <td className="border-b text-center">{user.username}</td>
                            <td className="border-b text-center">{user.email}</td>
                            <td className="border-b text-center">{user.role}</td>
                            <td className="border-b text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="border-b px-4 text-center">
                                <button className="bg-red-500 text-white px-2 py-1 rounded">삭제</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}