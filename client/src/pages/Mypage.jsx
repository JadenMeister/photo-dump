import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserSide from "../components/UserComps/UserSide.jsx";
import UserUploadChart from "../components/UserComps/UserUploadChart.jsx";
import UserAlbum from "../components/UserComps/UserAlbum.jsx";
import TotalUpload from "../components/UserComps/TotalUpload.jsx";
import TotalCountry from "@/components/UserComps/TotalCountry.jsx";

const Mypage = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openRowId, setOpenRowId] = useState(null);
    const Navigate = useNavigate() ;

    useEffect(() => {
       const usernameStorage = sessionStorage.getItem("username");

       if(usernameStorage){
           setUsername(usernameStorage);
              setIsLogin(true);

       } else{
              alert("잘못된 접근입니다.");
              Navigate("/");
       }
    }, []);

    return(
       <div className="w-full h-screen flex">
         <UserSide/>

         <div className="w-full bg-gray-300 flex justify-around pt-20 rounded-lg flex-col gap-8">
           <div className= "flex justify-around">
             <TotalUpload/>
             <TotalCountry/>
           </div>

           <div className="h-screen overflow-hidden flex justify-around mb-5">
             <UserUploadChart/>
             <UserAlbum
                photoId={selectedPhoto}
                openRowId={openRowId}
                setOpenRowId={setOpenRowId}

             />
           </div>
         </div>

       </div>











    )
};

export default Mypage;
