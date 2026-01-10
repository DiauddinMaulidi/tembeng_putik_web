import axios from "axios";
import { useEffect, useState } from "react";

export default function Pekerjaan() {
  const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:5000/penduduk_tembeng/perPekerjaan`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center ">
      <div className="w-full max-w-6xl bg-white rounded-xl p-6 shadow">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-red-600">
          Berdasarkan Pekerjaan
        </h1>

        {/* Table */}
        <div className="max-h-[350px] overflow-y-auto overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left text-lg">Jenis Pekerjaan</th>
                <th className="p-3 text-left text-lg">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-700">{row.name}</td>
                  <td className="p-3 font-semibold text-gray-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Grid Statistik */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="bg-white border shadow-sm rounded-xl flex flex-col justify-between p-6 h-40">
              <h2 className="text-gray-600 font-medium">{item.name}</h2>
              <p className="text-3xl font-bold text-gray-700 text-right">
                {item.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}