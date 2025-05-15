import {useEffect, useState} from "react";
import {fetchUserUploadCount} from "@/api/fetchDataApi.js";

export default function TotalUpload() {

  const [count, setCount] = useState(0);


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchUserUploadCount();
        setCount(response.upload_count);
      } catch (err) {
        console.error("업로드 수 가져오기 실패", err);
      }
    };

    fetchCount();



  }, [])

return (
    <div className="w-108.5 h-30.25 flex flex-col items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
      <h2 className="text-2xl font-bold">업로드 수</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>

)


}

