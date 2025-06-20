import {useState,useEffect} from "react";

import {fetchUserEachPhoto, fetchUsers} from "../../api/fetchDataApi.js";
import UserMangeRow from "./UserManageRow.jsx";
import PhotoModal from "@/components/AdminComps/PhotoModal.jsx";




export default function UserManage() {

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [openRowId, setOpenRowId] = useState(null);


    const [modalPhotoOpen, setModalPhotoOpen] = useState(false);
    const [modalPhotos, setModalPhotos] = useState([]);


    const handleOpenModalPhoto = async (userId) => {
        console.log("유저 아이디", userId);
        try {
            console.log("시작")
            const res = await fetchUserEachPhoto(userId);

            console.log("유저별",res);
            setModalPhotos(res);
            setModalPhotoOpen(true);
        } catch (error) {
            console.error("유저 사진 가져오기 실패", error);
        }
    }



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
    const [, set] = useState();
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
                        <UserMangeRow key={user.id} user={user} openRowId={openRowId} setOpenRowId={setOpenRowId} onOpenModal={handleOpenModalPhoto}/>

                    ))}

                </tbody>
            </table>
            {modalPhotoOpen && (
                <PhotoModal
                    isOpen={modalPhotoOpen}
                    onClose={() => setModalPhotoOpen(false)}
                    photos={modalPhotos}

                />
            )}
        </div>
    )
}