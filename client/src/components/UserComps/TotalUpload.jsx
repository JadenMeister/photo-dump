import {useEffect, useState} from "react";
import {fetchUserUploadCount} from "@/api/fetchDataApi.js";

export default function TotalUpload() {

  const [count, setCount] = useState(null);


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchUserUploadCount();
        setCount(response.data);
      } catch (err) {
        console.error("업로드 수 가져오기 실패", err);
      }
    };

    fetchCount();



  }, []);
}