import React, {useState} from "react";
import selectedContinent from "./WorldMap.jsx";
import {fetchUploads} from "@/api/fetchDataApi.js";
import {useAuth} from "@/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";




export function UploadTooltip({selectedCountry, setSelectedCountry }) {

  const {user} = useAuth();
  const [file, setFile] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const [photoSpot, setPhotoSpot] = useState("");
  const Navigate = useNavigate();


  const handleUpload  = async (e) => {
    console.log("나라", selectedCountry);

    if(!file){
        alert("파일을 업로드해주세요");
        return;
    }


    fetchUploads({
        file,
        userId: user.id,
        country_name: selectedCountry,
        travelDate: travelDate,
        photoSpot: photoSpot
    })
      .then((res) => {
          if (res.ok) {
              alert("업로드 성공");
              Navigate("/map");
              setSelectedCountry(null);

          } else {
              alert("업로드 실패");



          }
      })
      .catch((error) => {
          console.error("Error:", error);
          alert("업로드 중 오류 발생");
    })
  }

    const backgroundClick = (e)=>{
        if(e.target.classList.contains("upload-modal")){
            setSelectedCountry(null);

        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">

            <h3 className="text-lg font-bold text-gray-800 mb-4">{selectedCountry} 사진 업로드</h3>

            <input
                type="file"
                // 사용자 경험을 고려한 힌트 제공
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"

                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="block w-full border border-gray-300 rounded px-3 py-2 mb-4" />

            <input type="text" placeholder="photo spot: ex: Dumbo, Brooklyn" value={photoSpot} onChange={(e)=>setPhotoSpot((e.target.value))} className="block w-full border border-gray-300 rounded px-3 py-2 mb-4" />

            <button
                className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                onClick={handleUpload}
            >
              올리기
            </button>

            <button
                onClick={() => setSelectedCountry(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
    )
}