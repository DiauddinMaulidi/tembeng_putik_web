import { useState } from "react";
import PiePendidikan from "./PiePendidikan";

export default function Kesehatan() {
  const [activeIndex, setActiveIndex] = useState(null);

  const dataSekolah = [
    {
      nama: "Remaja putri",
      jumlah: 271,
      img: "/images/posyandu.png",
      dusun: [
        { name: "Laki-laki", value: 210 },
        { name: "Perempuan", value: 481 },
      ],
    },
    {
      nama: "Ibu Hamil Perkadus",
      jumlah: 83,
      img: "/images/posyandu.png",
      dusun: [
        { name: "TB baret I", value: 18 },
        { name: "TB putik T1", value: 10 },
        { name: "TB baret II", value: 17 },
        { name: "TB timuk II", value: 23 },
        { name: "Lengkok Lendang", value: 15 },
      ],
    },
    {
      nama: "Lansia",
      jumlah: 854,
      img: "/images/posyandu.png",
      dusun: [
        { name: "TB baret I", value: 118 },
        { name: "TB putik TI", value: 217 },
        { name: "TB baret II", value: 167 },
        { name: "TB timuk II", value: 232 },
        { name: "Lengkok Lendang", value: 120 },
      ],
    },
    {
      nama: "Balita",
      jumlah: 950,
      img: "/images/posyandu.png",
      dusun: [
        { name: "TB baret I", value: 223 },
        { name: "TB putik TI", value: 120 },
        { name: "TB baret II", value: 221 },
        { name: "TB timuk II", value: 226 },
        { name: "Lengkok Lendang", value: 160 },
      ],
    },
  ];

  return (
    <div className="py-16 mx-5 md:mx-24">
      <h1 className="text-3xl lg:text-4xl mt-10 text-red-700 font-bold">
        Berdasarkan Data Stunting Kesehatan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {dataSekolah.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className={`cursor-pointer bg-gray-100 rounded-xl shadow
                transition-all duration-500 hover:bg-blue-50 hover:shadow-lg
                ${isActive ? "col-span-1 sm:col-span-2 p-8" : "p-5"}
              `}
            >
              <div className="flex items-center">
                <img src={item.img} className="w-20" alt="school" />
                <div className="ml-5">
                  <p className="text-xl font-bold">{item.nama}</p>
                  <p className="text-lg">
                    <span className="text-2xl text-blue-700 font-extrabold">
                      {item.jumlah}
                    </span>{" "}
                  </p>
                </div>
              </div>

              {isActive && (
                <>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700 text-lg">
                    <p>{item.status}</p>
                    <p>{item.kepsek}</p>
                    <p>{item.guru}</p>
                  </div>

                  <div className="mt-6">
                    <PiePendidikan dataDusun={item.dusun} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
