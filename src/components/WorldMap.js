import React, { useState, useEffect,  } from "react";
import {Link, Links, useNavigate} from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "../styles/WorldMap.css";



const WorldMap = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const Navigate = useNavigate() ;

  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

  useEffect(() => {
    // localStorage에서 사용자 이름 가져오기
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
        setIsLogin(true);
    } else{
        alert("잘못된 접근입니다.");
        Navigate("/");
    }
  }, []);



  return (
    <div className="world-map-container">

      <div className="welcome-message">
        <h2>환영합니다, {username}님!</h2>
        <p>지도에서 원하는 대륙을 클릭하여 사진을 업로드하세요.</p>
      </div>

      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          scale: 200,
          center: [0, 0],
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-tooltip-id="continent-tooltip"
                  data-tooltip-content={geo.properties.name}
                  onClick={() => setSelectedContinent(geo.properties.name)}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip id="continent-tooltip" />

      {selectedContinent && (
        <div className="upload-modal">
          <h3>{selectedContinent} 사진 업로드</h3>
          <input type="file" accept="image/*" />
          <button onClick={() => setSelectedContinent(null)}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
