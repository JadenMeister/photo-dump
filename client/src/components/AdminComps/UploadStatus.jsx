import { useEffect, useState } from "react";
import { fetchTotalCount } from "@/api/fetchDataApi.js";





export default function UploadStatus({ status }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try{
        const res = await fetchTotalCount();
        setCount(res.upload_count);


      }catch (err){
        console.error("업로드 통계 가져오기 실패", err);
      }
    }
    fetchCount();
  }, []);

  return (
      <div className="w-108.5 h-30 flex flex-col items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">

        <h2 className="text-2xl font-bold">총 사진 업로드 수</h2>
        <p className="text-xl ">{count}</p>

      </div>
  );
}

