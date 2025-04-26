import {useEffect, useState} from "react";
import {fetchCountries} from "../../api/fetchDataApi.js";


export default function UploadChart() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData =async()=>{
            try{
                const countryData = await fetchCountries();
                setCountries(countryData);
            } catch(err){
                console.error("국가별 업로드 통계 가져오기 실패", err);
            } finally{
                setIsLoading(false);
            }
        }
        getData()
    }, []);

    if(isLoading){
        return(
            <div className="w-108 h-170.25 flex items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
                <p>Loading...</p>
            </div>
        )
    }

    if(!countries || countries.length === 0){
        return(
            <div className="w-108 h-170.25 flex items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
                <p>업로드 통계가 없습니다.</p>
            </div>
        )
    }


    return(

        <div className="w-108 h-170.25 flex items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
            나라별 업로드통계 데이터
        </div>



    )
}
