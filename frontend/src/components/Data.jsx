import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/penduduk_tembeng/perPendidikan")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mx-5 md:mx-24">
      <h2 className="text-3xl font-bold text-red-700 mb-6">
        Berdasarkan Pendidikan
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} interval={0}/>
          <YAxis />
          <Tooltip wrapperStyle={{ borderRadius: "10px", padding: "5px" }} />

          <Bar dataKey="value" fill="#B71C1C" radius={[5, 5, 0, 0]}>
            <LabelList dataKey="value" position="top" style={{ fill: "#000", fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}