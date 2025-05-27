export const useGroupedPhotos = (photos) => {
  return photos.reduce((acc, photo) => {
    const key = photo.country_name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(photo);
    return acc;
  }, {});
};