import axios from "axios";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759", "#76b7b2"];

export default function PieDusun() {
  const [dataDusun, setDataDusun] = useState([]);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/penduduk_tembeng/dusun/jumlah`)
      .then(res => setDataDusun(res.data))
      .catch(err => console.error(err));
  }, []);

  // DETECT SCREEN SIZE
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowLabel(false); // Sembunyikan label
      } else {
        setShowLabel(true); // Tampilkan label kembali
      }
    };

    handleResize(); // Trigger saat render awal
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto mb-16 mt-10">
      <h2 className="text-[40px] md:text-3xl lg:text-4xl font-bold mt-6 mx-5 md:mx-24 text-red-700">
        Berdasarkan Dusun
      </h2>

      <div className="h-[350px] md:h-[400px] lg:h-[450px] mt-6 bg-gray-100 p-5 mx-5 md:mx-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataDusun}
              cx="50%"
              cy="50%"
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
              label={showLabel ? ({ name }) => `${name}` : false}
            >
              {dataDusun.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, props) => {
                return [`${value} jiwa`, `${props.payload.name}`];
              }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
