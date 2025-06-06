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
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
       <div className="w-full h-screen flex flex-col lg:flex-row bg-gray-50"> <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
         <h1 className="text-xl font-semibold text-gray-800">마이페이지</h1>
         <button
             onClick={() => setSidebarOpen(!sidebarOpen)}
             className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
         >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
           </svg>
         </button>
       </div>


         <div
             className={`
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 transition-transform duration-300 ease-in-out
                fixed lg:relative z-30 lg:z-auto
                w-100 lg:w-auto h-full lg:h-auto
                bg-transparent lg:bg-transparent
                shadow-lg lg:shadow-none
            `}
         >
         <UserSide/>
         </div>

         <div className="flex-1 bg-gray-300 rounded-none lg:rounded-lg p-4 lg:p-6 xl:p-8">
           <div className="w-full h-1/5 flex flex-col gap-4 lg:gap-6 xl:gap-8">

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
               <div className="w-full">
                 <TotalUpload />
               </div>
               <div className="w-full">
                 <TotalCountry />
               </div>
             </div>
           </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 min-h-0 ">
            <div className="flex justify-center w-full h-64 md:h-80 lg:h-96 xl:h-full order-1 xl:order-none mb-[25rem] lg:mb-0">
               <UserAlbum photoId={selectedPhoto} openRowId={openRowId} setOpenRowId={setOpenRowId} />
             </div>

             <div className="flex justify-center w-full h-64 md:h-80 lg:h-96 xl:h-full order-2 xl:order-none">
               <UserUploadChart />
              </div>

           </div>
         </div>

       </div>











    )
};

export default Mypage;
