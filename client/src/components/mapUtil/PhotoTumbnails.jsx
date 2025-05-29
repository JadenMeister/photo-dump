import React, {useEffect} from "react";
import { useMap } from "react-leaflet";
import { countryCoordinates } from "./CountryCordinates";

const PhotoThumbnails = ({ photos, setSelectedCountry, mapRef}) => {
  const map = useMap();
  const [position, setPosition] = React.useState([]);

  const updatePosition = () => {
    const newPositions = photos.map((photo) => {
      const coords = countryCoordinates[photo.country_name];
      if (!coords || !map) return null;

      const point = map.latLngToContainerPoint(coords);
      return{
        ...photo,
        x: point.x,
        y: point.y
      };
    }).filter(Boolean);
    setPosition(newPositions);
  }

  useEffect(() => {
    updatePosition();
    map.on("move", updatePosition);
    map.on("zoom", updatePosition);
    return () => {
      map.off("move", updatePosition);
      map.off("zoom", updatePosition);
    };
  }, [map, photos]);


  return (
      <>
        {position.map((photo, idx) => (
              <div
                  key={idx}
                  className="absolute z-[400] cursor-pointer"
                  style={{
                    left: `${photo.x}px`,
                    top: `${photo.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "60px",
                    height: "60px",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    position: "absolute",
                  }}
                  onClick={() => setSelectedCountry(photo.country_name)}
              >
                <img
                    src={photo.photo_url}
                    alt={photo.country_name}
                    className="w-full h-full object-cover"
                />
              </div>
        ))}
      </>
  );
};

export default PhotoThumbnails;