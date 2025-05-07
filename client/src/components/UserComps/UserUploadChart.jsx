
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useEffect, useState} from "react";
import { fetchUserUploadsCountry} from "@/api/fetchDataApi.js";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function UserUploadChart() {


  const [data, setData] = useState([]);

  useEffect(() => {
    const countryData = async (req, res) =>{

      try{
        const res = await fetchUserUploadsCountry();

        const formattedData = res.map((item) => ({
          country: item.country_name,
          count: item.upload_count,
        }));

        setData(formattedData);
        console.log("업로드 카운트 데이터:", formattedData );


        if(!data || data.length === 0){
          return res.status(404).json({msg: "업로드 카운트 데이터 없음"});
        }
        res.status(200).json(data);


      }catch(err){
        console.error("업로드 카운트 조회 오류:", err);
        return res.status(500).json({ msg: "서버 오류" });
      }

    }
      countryData()
  }, []);

  return (
      <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">업로드 비율</h2>

        <ResponsiveContainer width="100%" height="100%">
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