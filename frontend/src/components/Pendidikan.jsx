import { useState } from "react";
import PiePendidikan from "./PiePendidikan";

export default function Pendidikan() {
  const [activeIndex, setActiveIndex] = useState(null);
  // const [dataSekolah, setDataSekolah] = useState({
  //   nama: "",
  //   kepsek: "",
  //   jumlahMurid: 0,
  //   totalLaki: 0,
  //   totalPr: 0,
  //   statusSekolah: "",
  //   jumlahGuru: 0,
  //   img: null,
  // })

  const dataSekolah = [
    {
      nama: "TK PGRI 06 TB PUTIK",
      jumlah: 36,
      img: "/images/school.svg",
      kepsek: "qwerty",
      dusun: [
        { name: "Laki-laki", value: 20 },
        { name: "Perempuan", value: 30 },
      ],
    },
    {
      nama: "SD 1 NEGERI TB PUTIK",
      jumlah: 148,
      img: "/images/school.svg",
      kepsek: "asdfg",
      dusun: [
        { name: "Laki-laki", value: 40 },
        { name: "Perempuan", value: 10 },
      ],
    },
  ];



  return (
    <div>
      <div className="py-16 mx-5 md:mx-24">
        <h1 className="text-[40px] md:text-3xl lg:text-4xl mt-10 text-blue-600 font-bold">
          Distribusi Jumlah Siswa/i Berdasarkan Jenjang
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {dataSekolah.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(isActive ? null : index)}
                className={`
                  cursor-pointer bg-gray-100 rounded-xl shadow
                  transition-all duration-500
                  hover:bg-blue-50 hover:shadow-lg
                  ${isActive ? "col-span-1 sm:col-span-2 p-8" : "p-5"}
                `}
              >
                <div className="flex items-center">
                  <img src={item.img} className="w-20" alt="" />
                  <div className="ml-5">
                    <p className="text-xl font-bold">{item.nama}</p>
                    <p className="text-xl font-bold text-black">
                      <span className="text-2xl text-blue-700 font-extrabold">
                        {item.jumlah}
                      </span>{" "}
                      Siswa/i
                    </p>
                  </div>
                </div>

                {isActive && (
                  <>
                    <div className="mt-6 text-xl grid grid-cols-2 gap-4 text-gray-700">
                      <p>Status Sekolah: Swasta</p>
                      <p>Kepala Sekolah: {item.kepsek}</p>
                      <p>Jumlah Guru: 5</p>
                    </div>

                    {/* KIRIM DATA KE PIE */}
                    <PiePendidikan dataDusun={item.dusun} />
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
