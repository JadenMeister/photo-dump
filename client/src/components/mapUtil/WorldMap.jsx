import React, { useState, useEffect,  } from "react";
import {Link, Links, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {MapContainer, TileLayer,  Marker, useMapEvents, GeoJSON,useMap} from "react-leaflet";
import {UploadTooltip} from "./UploadTooltip";
import {fetchUserPhotos} from "@/api/fetchDataApi.js";
import {countryCoordinates} from "./CountryCordinates.jsx"
import PhotoThumbnails from "./PhotoThumbnails.jsx";
import LogOut from "../CommonComps/LogOut.jsx";



const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const {user,isLogin, setIsLogin, setUser,loading} = useAuth();

  const Navigate = useNavigate() ;
  const [geoData, setGeoData] = useState(null);
  const [photos, setPhotos] = useState([]);



  if (loading) {
    return <div>Loading...</div>;
  }


  useEffect(() => {
    fetch(
        "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    )
        .then((res) => res.json())
        .then(setGeoData);
  }, []);

  useEffect(() => {
    const getUserPhotos = async () => {
      try{
      const data = await fetchUserPhotos();
      setPhotos(data);
      } catch (err){
        console.error("사진 가져오기 실패:", err);

      }
    };
    getUserPhotos();
  }, []);




  function handelMP(){
    Navigate("/mypage");
  }



  const onEachCountry = (feature, layer) => {
    const name = feature.properties.name;

    layer.bindTooltip(name, {
      sticky: false,
      direction: "top",
      opacity:0.7,
      className: "leaflet-tooltip",
    });

    layer.on({
      mouseover: () => {
        layer.setStyle({
          fillColor: "#444",
          fillOpacity: 0.3,
          features: feature.properties,
          weight: 1,
          color: "#666",
        });
      },

      mouseout: () => {
        layer.setStyle({
          fillColor: "#D6D6DA",
          fillOpacity: 0.5,
          weight: 0.5,
          color: "#aaa",
        });
      },
      click: () => {
        console.log("나라 클릭됨:", feature.properties.name);
        setSelectedCountry(name);
      },
    });
  };




    return (
        <div className="relative w-full h-screen bg-gray-100 overflow-hidden">

          <div className="absolute  top-5 bg-white/90 p-4  mx-15 rounded-lg shadow-md z-10000">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">환영합니다, {user?.username}님!</h2>
            <p className="text-sm text-gray-900">지도에서 원하는 나라를 클릭하여 사진을 업로드하세요.</p>

            <button className="mt-4 w-32 px-4 py-2 bg-red-950 text-white rounded hover:bg-red-700 mr-5">
              <LogOut/>
            </button>

            <button className="mt-4 w-32 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    onClick={handelMP}> MyPage
            </button>
          </div>


          <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} minZoom={3}
                        maxBounds={[[-90, -180], [90, 180]]} worldCopyJump={false} maxBoundsViscosity={1.0}
                        className="w-full h-full">
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />



            <PhotoThumbnails
                photos={photos}
                setSelectedCountry={setSelectedCountry}
            />

            {geoData && (
                <GeoJSON
                    data={geoData}
                    onEachFeature={onEachCountry}
                    style={{
                      fillColor: "#D6D6DA",
                      weight: 0.5,
                      color: "#aaa",
                      fillOpacity: 0.5,

                    }}
                />
            )}

          </MapContainer>


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
