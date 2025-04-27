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

    const th = ["아이디", "이메일", "권한", "관리"]

    return(
        <div className="w-245 h-170.25 flex items-center justify-center bg-[#F5F5F5]  shadow-lg">
            <table className="w-full h-full">
                <thead>
                    <tr>
                        {th.map((header, index) => (
                            <th key={index} className="border-b px-4 py-2 text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}