import {HiDotsHorizontal} from "react-icons/hi";
import {useState} from "react";


export default function UserManageRow({user, openRowId, setOpenRowId}) {

    const isOpen = openRowId === user.id;

    const handleToggle = () => {
        if(isOpen){
            setOpenRowId(null);  // 열려있으면 닫고
        }
        else{
            setOpenRowId(user.id); // 아니면 새로열고
        }
    }

    return (
        <tr key={user.id} className="overflow-auto">
            <td className="border-b py-2 px-2 text-center ">{user.username}</td>
            <td className="border-b py-2 px-2 text-center">{user.email}</td>
            <td className="border-b py-2 px-2 text-center">{user.role}</td>
            <td className="border-b py-2 px-2 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
            <td className="border-b px-4 text-center">
                <button onClick={handleToggle} className="text-black px-2 py-1rounded">

                    <HiDotsHorizontal className="text-sm cursor-pointer"/>
                </button>
            </td>
            {isOpen && (
                <div className="absolute right-10 mt-8 bg-white shadow-lg rounded-md mt-2">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">수정</li>
                        <li className="px-4 py-2 hover:bg-red-200 text-red-500 cursor-pointer">삭제</li>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">사진 보기</li>
                    </ul>
                </div>
            )}


        </tr>
    )
}