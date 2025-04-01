import React, {useState} from "react";
import selectedContinent from "./WorldMap.jsx";
import {Tooltip} from "react-tooltip";


export function UploadTooltip({selectedContinent, setSelectedContinent }) {

    const backgroundClick = (e)=>{
        if(e.target.classList.contains("upload-modal")){
            setSelectedContinent(null);

        }

    }

    return (
        <div className="upload-modal" onClick={backgroundClick}>

            <div className="close" onClick={() => setSelectedContinent(null)}>x</div>

            <h3>{selectedContinent} 사진 업로드</h3>
            <input type="file" accept="image/*"/>
            <button>올리기</button>
        </div>
    )
}