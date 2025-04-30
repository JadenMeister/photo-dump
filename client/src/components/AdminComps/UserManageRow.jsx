import {HiDotsHorizontal} from "react-icons/hi";
import {useState} from "react";
import {textureLoad} from "three/tsl";


export default function UserManageRow({user, openRowId, setOpenRowId}) {

    const [userId, setUserId] = useState(user.id);

    const isOpen = openRowId === user.id;


    const handleDelete = async () => {
      try{
      const response = await fetch(`http://localhost:8080/api/admin/users/delete${userId}`,{

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
      })

        if(response.ok) {
            alert("유저 삭제 성공");
            window.location.reload();
        }
        else if(response.status === 401){
            alert("삭제 권한이 없습니다.");
        }
        else{
            alert("유저 삭제 실패");
        }

      } catch (error) {
        if (user.role === "admin") {
          alert("어드민 유저는 삭제할 수 없습니다.");
          console.error("유저 삭제 실패", error);
          return;

        }
      }

    }



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
                        <li onClick={handleDelete} className="px-4 py-2 hover:bg-red-200 text-red-500 cursor-pointer">삭제</li>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">사진 보기</li>
                    </ul>
                </div>
            )}


        </tr>
    )
}