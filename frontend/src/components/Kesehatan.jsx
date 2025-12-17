import { useState, useEffect } from "react";
import axios from "axios";
import PieKesehatan from "./PieKesehatan";

export default function Kesehatan() {
  const [dataGabungan, setDataGabungan] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/stunting"),
      fetch("http://localhost:5000/kesehatan").then(res => res.json())
    ]).then(([stuntingRes, kesehatanRes]) => {

      const stunting = stuntingRes.data.map(item => ({
        id: `stunting-${item.id}`,
        kategori: item.nama,
        jumlah: item.jumlah,
        dusun: item.dusun,
        tipe: "gender"
      }));

      const kesehatan = kesehatanRes.map(item => ({
        id: `kesehatan-${item.nama}`,
        kategori: item.nama,
        jumlah: item.jumlah,
        dusun: item.dusun,
        tipe: "desa"
      }));

      setDataGabungan([...stunting, ...kesehatan]);
    });
  }, []);

  return (
  <div className="py-16 mx-5 md:mx-24">
    <h1 className="text-3xl lg:text-4xl mt-10 text-red-700 font-bold">
      Data Kesehatan
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
      {dataGabungan.map((item, index) => {
    const isActive = activeIndex === index;

    return (
      <div
        key={item.id}
        onClick={() => setActiveIndex(isActive ? null : index)}
        className={`cursor-pointer bg-gray-100 rounded-xl shadow
          transition-all duration-500 hover:bg-blue-50 hover:shadow-lg
          ${isActive ? "col-span-1 sm:col-span-2 p-8" : "p-5"}
        `}
      >
        <div className="flex items-center">
          <img
            src="/images/posyandu.png"
            className="w-20"
            alt={item.kategori}
          />
          <div className="ml-5">
            <p className="text-xl font-bold capitalize">
              {item.kategori}
            </p>
            <p className="text-lg">
              <span className="text-2xl text-blue-700 font-extrabold">
                {item.jumlah}
              </span>
            </p>
          </div>
        </div>

        {isActive && (
          <div className="mt-6">
            <p className="mb-3 text-gray-600">
              {item.tipe === "gender"
                ? "Distribusi berdasarkan jenis kelamin"
                : "Distribusi berdasarkan dusun"}
            </p>

            <PieKesehatan dataDusun={item.dusun} />
          </div>
        )}
      </div>
    );
  })}
    </div>
  </div>
);
}
