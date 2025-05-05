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
    <div className="w-26% h-1/2 bg-[#F5F5F5] rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">업로드 수</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>

)


}

