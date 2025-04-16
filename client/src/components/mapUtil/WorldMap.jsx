import React, { useState, useEffect,  } from "react";
import {Link, Links, useNavigate} from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "../../styles/WorldMap.css";
import {UploadTooltip} from "./UploadTooltip";



const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const Navigate = useNavigate() ;


  function logout() {
    fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
    })
      alert("로그아웃 되었습니다.");
    Navigate("/");
  }


  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

  useEffect(() => {
    // session Storage에서 사용자 이름 가져오기
    const storedUsername = sessionStorage.getItem("username");
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
        <p>지도에서 원하는 나라를 클릭하여 사진을 업로드하세요.</p>

          <button className="logoutBtn" onClick={() => {logout()} }>Logout</button>
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
                  onClick={() => {
                      if(selectedCountry) return;
                      const countryName = geo.properties.name;
                      setSelectedCountry(countryName);
                      console.log("나라 클릭됨:", countryName);

                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "#383a42",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                        cursor: "pointer"
                    },
                    pressed: {
                      fill: "#383a42",
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
      {selectedCountry && (
          <UploadTooltip
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
          />
      )}
    </div>
  );
};

export default WorldMap;
