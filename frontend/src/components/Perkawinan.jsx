import { useEffect, useState } from "react";
import axios from "axios";

export default function Perkawinan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/penduduk_tembeng/perPerkawinan`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const iconMap = {
    "BELUM KAWIN": "/images/belum-kawin.svg",
    "KAWIN": "/images/kawin.svg",
    "CERAI MATI": "/images/cerai-mati.svg",
    "CERAI HIDUP": "/images/cerai-hidup.svg",
    "CERAI": "/images/cerai-hidup.svg",
  };

  return (
    <div className="md:w-[85%] mx-5 md:mx-24 mt-10">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Berdasarkan Perkawinan
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, i) => {
          const status = item.name.trim().toUpperCase();

          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40 border"
            >
              <div className="flex items-center gap-2">
                <img
                  src={iconMap[status] || "/images/belum-kawin.svg"}
                  alt={status}
                  className="w-12 h-12"
                />
                <p className="text-gray-700 font-semibold">
                  {status}
                </p>
              </div>

              <p className="text-3xl font-bold text-red-700 mt-2">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
