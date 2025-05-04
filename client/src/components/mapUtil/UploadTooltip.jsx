import React, {useState} from "react";
import selectedContinent from "./WorldMap.jsx";
import {fetchUploads} from "@/api/fetchDataApi.js";
import {useAuth} from "@/context/AuthContext.jsx";




export function UploadTooltip({selectedCountry, setSelectedCountry }) {

  const {user} = useAuth();
  const [file, setFile] = useState(null);
  const [travelDate, setTravelDate] = useState("");


  const handleUpload  = async (e) => {

    if(!file){
        alert("파일을 업로드해주세요");
        return;
    }


    fetchUploads({
        file: e.target.files[0],
        userId: user.id,
        country_id: selectedCountry,
        travelDate: travelDate,
    })
      .then((res) => {
          if (res.ok) {
              alert("업로드 성공");
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
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="block w-full border border-gray-300 rounded px-3 py-2 mb-4" />

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