import { useState, useEffect } from "react";
import { fetchUserPhotos } from "../../api/fetchDataApi.js"
import {ChakraProvider} from "@chakra-ui/react";
import {system} from "@/components/ui/theme.js";




export default function UserAlbum() {


  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    const photoData = async () => {
      try{
        const res = await fetchUserPhotos();


        setPhotos(res);



      }catch(err){
        console.error("사진 데이터 가져오기 실패", err);
      }
    }
    console.log("photo", photos);
    photoData();


  }, []);



  return (

      <div className="w-108 h-170.25 flex flex-col items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Gallery</h2>

        {photos.length > 0 ?(
          <div className="grid grid-cols-3 px-5 gap-4">

            {photos
                .filter(photo => photo && photo.photo_url)
                .map((photo, index) => (
              <div key={index} className="w-full h-full flex items-center justify-center">
                <img
                  src={photo.photo_url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>업로드된 사진이 없습니다.</p>
        )}



      </div>


  )








}