import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CountryPhotoGrid = ({ polygon, photos, onSelect }) => {
  const map = useMap();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (!polygon || !map) return;

    const latlngs = L.geoJSON(polygon).getBounds();

    // 경계 박스
    const topLeft = map.latLngToContainerPoint(latlngs.getNorthWest());
    const bottomRight = map.latLngToContainerPoint(latlngs.getSouthEast());

    const width = bottomRight.x - topLeft.x;
    const height = bottomRight.y - topLeft.y;

    const cols = Math.ceil(Math.sqrt(photos.length));
    const rows = Math.ceil(photos.length / cols);

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const newPositions = photos.map((photo, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      return {
        ...photo,
        x: topLeft.x + col * cellWidth + cellWidth / 2,
        y: topLeft.y + row * cellHeight + cellHeight / 2,
        cellWidth,
        cellHeight
      };
    });

    setPositions(newPositions);
  }, [polygon, photos, map]);

  return (
      <>
        {positions.map((photo, i) => (
            <div
                key={i}
                className="absolute z-[500] cursor-pointer"
                style={{
                  left: `${photo.x}px`,
                  top: `${photo.y}px`,
                  transform: "translate(-50%, -50%)",
                  width: `${photo.cellWidth}px`,
                  height: `${photo.cellHeight}px`,
                  overflow: "hidden",
                  position: "absolute",
                }}
                onClick={() => onSelect(photo.country_name)}
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

export default CountryPhotoGrid;