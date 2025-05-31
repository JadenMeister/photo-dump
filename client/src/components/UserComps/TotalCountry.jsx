import {useEffect, useState} from "react";
import {fetchCountryCount, } from "@/api/fetchDataApi.js";

export default function TotalCountry() {

  const [countryCount, setCountryCount] = useState(0);


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetchCountryCount();
        setCountryCount(res.country_name);
      } catch (err) {
        console.error("업로드 수 가져오기 실패", err);
      }
    };

    fetchCount();

    console.log("country count:", countryCount);



  }, [])

return (
    <div className="w-108.5 h-30.25 flex flex-col items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
      <h2 className="text-2xl font-bold">여행 국가 수</h2>
      <p className="text-2xl font-bold">{countryCount}</p>
    </div>

)


}

