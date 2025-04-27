import {useState,useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {fetchUsers} from "../../api/fetchDataApi.js";
import { HiDotsHorizontal } from "react-icons/hi";


export default function UserManage() {
    const {user} = useAuth();
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }


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
                        <tr key={user.id} className="overflow-auto">
                            <td className="border-b py-2 px-2 text-center ">{user.username}</td>
                            <td className="border-b py-2 px-2 text-center">{user.email}</td>
                            <td className="border-b py-2 px-2 text-center">{user.role}</td>
                            <td className="border-b py-2 px-2 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="border-b px-4 text-center">
                                <button onClick={toggleMenu} className="text-black px-2 py-1rounded">

                                    <HiDotsHorizontal className="text-sm cursor-pointer"/>
                                </button>
                            </td>
                            {isOpen &&(
                                <div className="absolute bg-white shadow-lg rounded-md mt-2">
                                    <ul className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">수정</li>
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">삭제</li>
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">사진 보기</li>
                                    </ul>
                                </div>
                            )}



                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}