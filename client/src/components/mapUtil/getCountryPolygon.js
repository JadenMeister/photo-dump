export const getCountryPolygon = (geoData, countryName) => {
  if (!geoData) return null;
  const match = geoData.features.find(
      (feature) => feature.properties.name === countryName
  );
  return match ? match.geometry : null;
};