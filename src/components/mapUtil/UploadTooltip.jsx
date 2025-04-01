import React, {useState} from "react";
import selectedContinent from "./WorldMap.jsx";
import {Tooltip} from "react-tooltip";


export function UploadTooltip({selectedContinent, setSelectedContinent }) {

    return (

        <div className="upload-modal">



            <div className="close" onClick={() => setSelectedContinent(null)}>x</div>
            <h3>{selectedContinent} 사진 업로드</h3>
            <input type="file" accept="image/*"/>
            <button>올리기</button>
        </div>
    )
}