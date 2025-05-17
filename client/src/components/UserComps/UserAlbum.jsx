import {useState, useEffect} from "react";
import {fetchUserPhotoDelete, fetchUserPhotos} from "../../api/fetchDataApi.js"
// Charkra ui v3부턴 modal이 아닌 Dialog로 바뀜
import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {HiDotsHorizontal} from "react-icons/hi";


export default function UserAlbum() {


  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  const handleToggle = (photo) => {
    setIsOpen(isOpen === photo ? null : photo);

  }

  const handleDeletePhoto = async (id) => {
    try {
      const res = await fetchUserPhotoDelete(id);
        alert("사진 삭제 성공");
        setPhotos(photos.filter(photo => photo.id !== id));
      } catch (err) {
      console.error("사진 삭제 실패", err);
    }
  }



  useEffect(() => {
    const photoData = async () => {
      try {
        const res = await fetchUserPhotos();


        setPhotos(res);


      } catch (err) {
        console.error("사진 데이터 가져오기 실패", err);
      }
    }
    console.log("photo", photos);
    photoData();


  }, []);


  return (

      <div className="w-108 h-170.25 flex flex-col pt-10 bg-[#F5F5F5] transition-all duration-300 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center top-0 justify-center items-center ">Gallery</h2>

        {photos.length > 0 ? (
            <div className="grid w-full grid-cols-3 px-5 gap-3">

              {photos
                  .filter(photo => photo && photo.photo_url)
                  .map((photo, index) => (
                      <Dialog.Root key={index}>
                        <Dialog.Trigger asChild>
                          {/*table안에 있는 s3 사진 경로 */}
                          <img
                              src={photo.photo_url}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer pointer-events-auto "
                          />
                        </Dialog.Trigger>

                        {/*//다이얼로그 세팅 */}

                        <Portal>
                          <Dialog.Backdrop/>
                          <Dialog.Positioner>

                            <Dialog.Content>
                              <button onClick={()=>{handleToggle(photo.id)}} className="text-black px-2 py-1rounded">

                                <HiDotsHorizontal className="text-sm cursor-pointer mt-5"/>
                              </button>

                              {isOpen === photo.id && (
                                  <div className="absolute left-6 mt-8 bg-white shadow-lg rounded-md mt-2">
                                    <ul className="py-2">
                                      <li onClick={()=>{handleDeletePhoto(photo.id)}} className=" px-4 py-2 hover:bg-red-200 text-red-500 cursor-pointer">삭제</li>
                                    </ul>
                                  </div>
                              )}

                              <Dialog.CloseTrigger asChild>
                                <CloseButton size="lg"/>
                              </Dialog.CloseTrigger>
                              <Dialog.Header display="flex" justifyContent="center" alignItems="center" width="auto"
                                             mt="2">
                                자세히 보기
                              </Dialog.Header>

                              {/*모달 바디*/}
                              <Dialog.Body width="30vw">
                                <img
                                    src={photo.photo_url}
                                    alt="자세히 볼 사진"
                                    className="w-auto h-auto object-contain rounded-lg"
                                />
                              </Dialog.Body>
                            </Dialog.Content>
                          </Dialog.Positioner>
                        </Portal>
                      </Dialog.Root>
                  ))}
            </div>
        ) : (
            <p className="flex justify-center items-center">업로드된 사진이 없습니다.</p>
        )}


      </div>


  )


}