import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/penduduk_tembeng/perPendidikan`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mx-5 md:mx-24 mt-20">
      <h2 className="text-[40px] md:text-3xl lg:text-4xl font-bold text-red-600 mb-8">
        Berdasarkan Pendidikan
      </h2>

      {/* ================= DESKTOP ================= */}
      <div className="block md:hidden bg-white p-6 rounded-xl shadow-md w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#B71C1C" radius={[0, 6, 6, 0]}>
              <LabelList dataKey="value" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="hidden md:block bg-white p-4 rounded-xl shadow-md w-full h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              interval={0}
              tick={{ fontSize: 10 }}
              angle={-30}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#B71C1C" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="value" position="top" fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
