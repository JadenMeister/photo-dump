import React from "react";
import { useMap } from "react-leaflet";
import { countryCoordinates } from "./CountryCordinates";

const PhotoThumbnails = ({ photos, setSelectedCountry, mapRef}) => {
  const map = useMap();


  return (
      <>
        {photos.map((photo, idx) => {
          const coords = countryCoordinates[photo.country_name];
          if (!coords) return null;

          const point = map.latLngToContainerPoint([coords[0], coords[1]]);

          return (
              <div
                  key={idx}
                  className="absolute z-[400] cursor-pointer"
                  style={{
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "40px",
                    height: "40px",
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
          );
        })}
      </>
  );
};

export default PhotoThumbnails;