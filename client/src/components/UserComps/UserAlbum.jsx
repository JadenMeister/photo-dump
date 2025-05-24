import {useState, useEffect} from "react";
import {fetchUserPhotoDelete, fetchUserPhotos} from "../../api/fetchDataApi.js"
// Charkra ui v3부턴 modal이 아닌 Dialog로 바뀜
import {CloseButton, Dialog, Portal, Stack} from "@chakra-ui/react";
import {HiDotsHorizontal} from "react-icons/hi";
import Select from "react-select";


export default function UserAlbum() {


  const [photos, setPhotos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("ALL");

  const countryList = [...new Set(photos.map(photo => photo.country_name).filter(Boolean))]
  const selectOptions = [
    { label: "전체", value: "ALL" },
    ...countryList.map(country => ({ label: country, value: country }))
  ]

  const handleToggle = (photo) => {
    setIsMenuOpen(isMenuOpen === photo ? null : photo);

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
        console.log("API 리턴값", res);


        setPhotos(res);


      } catch (err) {
        console.error("사진 데이터 가져오기 실패", err);
      }
      setIsLoading(false);

    }
    photoData();

  }, []);



  if (isLoading) return <div>로딩중...</div>;
  if(!photos || photos.length === 0) return <div>업로드된 사진이 없습니다.</div>;
  if (countryList.length === 0) return <div>국가 데이터 없음</div>;


  return (

      <div className="w-200 h-170.25 flex flex-col pt-10 bg-[#F5F5F5] transition-all duration-300 shadow-lg overflow-y-scroll">
        <h2 className="text-3xl font-bold mb-4 text-center top-0 justify-center items-center ">Gallery</h2>
        <div className="mb-6 w-full justify-center items-center px-10 ">
          <div className="mb-15">
          <Select
              options={selectOptions}
              value={selectOptions.find(option => option.value === selectedCountry)}
              onChange={option => setSelectedCountry(option.value)}
              placeholder="국가를 선택하세요"
              isSearchable
          />
          </div>
        </div>



        {photos.length > 0 ? (
            <div className="grid w-full grid-cols-3 px-5 gap-3">

              {photos
                  .filter(photo => selectedCountry === "ALL" ? true : photo.country_name === selectedCountry)
                  .map((photo, index) => (
                      <Dialog.Root key={index}>
                        <Dialog.Trigger asChild>
                          {/*table안에 있는 s3 사진 경로 */}
                          <div className="w-full h-1/2 flex justify-center items-center">
                          <img
                              src={photo.photo_url}
                              alt={`Photo ${index + 1}`}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                          />
                          </div>
                        </Dialog.Trigger>

                        {/*//다이얼로그 세팅 */}

                        <Portal>
                          <Dialog.Backdrop/>
                          <Dialog.Positioner>

                            <Dialog.Content className=" bg-black rounded-lg shadow-lg flex flex-col  justify-center">
                              <button onClick={()=>{handleToggle(photo.id)}} className="text-black px-2 py-1rounded">

                                <HiDotsHorizontal className="text-sm cursor-pointer mt-5"/>
                              </button>

                              {isMenuOpen === photo.id && (
                                  <div className="absolute top-0 left-2 mt-8 bg-white shadow-lg rounded-md mt-2">
                                    <ul className="py-2">
                                      <li onClick={()=>{handleDeletePhoto(photo.id)}} className=" px-4  hover:bg-red-200 text-red-500 cursor-pointer">삭제</li>
                                    </ul>
                                  </div>
                              )}

                              <Dialog.CloseTrigger asChild>
                                <CloseButton size="lg"/>
                              </Dialog.CloseTrigger>
                              <Dialog.Header display="flex" flex-direction="col"  justifyContent="center" alignItems="center" width="auto" mt="2">
                                <div className="flex flex-col items-center">
                                <h2 className="text-xl font-bold mb-4 text-center">{photo.country_name}</h2>
                                <h2 className="text-sm font-semibold mb-4 text-center">{new Date(photo.travel_date).toLocaleDateString()}</h2>
                                </div>
                              </Dialog.Header>

                              {/*모달 바디*/}
                              <Dialog.Body className="flex justify-center items-center">
                                <img
                                    src={photo.photo_url}
                                    alt="자세히 볼 사진"
                                    className="w-auto h-auto object-contain rounded-lg flex "
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