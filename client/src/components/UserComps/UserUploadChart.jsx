
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useEffect, useState} from "react";
import { fetchUserUploadsCountry} from "@/api/fetchDataApi.js";


const COLORS = ["#0088FE", "#de09ec", "#FFBB28", "#FF8042"];

export default function UserUploadChart() {


  const [data, setData] = useState([]);

  useEffect(() => {
    const countryData = async (req, res) =>{

      try{
        const res = await fetchUserUploadsCountry();

        const formattedData = res.map((item) => ({

          country: item.country_name === undefined || item.country_name === "undefined"
              ? "알 수 없음"
              : item.country_name,
          count: item.upload_count,

        }));

        setData(formattedData);


        if(!formattedData || formattedData.length === 0){
          setData([
            { country: "업로드 없음", count: 0 },
          ]);
        }


      }catch(err){
        console.error("업로드 카운트 조회 오류:", err);

      }

    }
      countryData()
  }, []);

  return (
      <div className="w-108 h-170.25 flex flex-col items-center justify-center bg-[#F5F5F5] hover:scale-102 transition-all duration-300 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">업로드 비율</h2>

        <ResponsiveContainer width="60%" height="60%">
          <PieChart>
            <Pie
                data={data}
                dataKey="count"
                nameKey="country"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                label
            >
              {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
  );

}