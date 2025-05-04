import React, {useState} from "react";
import selectedContinent from "./WorldMap.jsx";
import {Tooltip} from "react-tooltip";


export function UploadTooltip({selectedCountry, setSelectedCountry }) {

    const backgroundClick = (e)=>{
        if(e.target.classList.contains("upload-modal")){
            setSelectedCountry(null);

        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <button
                onClick={() => setSelectedCountry(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ×
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{selectedCountry} 사진 업로드</h3>

            <input
                type="file"
                accept="image/*"
                className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <button
                className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              올리기
            </button>
          </div>
        </div>
    )
}