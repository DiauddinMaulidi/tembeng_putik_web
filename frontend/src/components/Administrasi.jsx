import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Administrasi() {
  const [dataPenduduk, setDataPenduduk] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/penduduk_tembeng/sum")
      .then((res) => setDataPenduduk(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-96 mb-[500px] px-4 md:pl-12 md:pr-7 sm:mb-50">
        <div className="grid grid-cols-3 gap-2 w-full px-4">
          <h1 className="text-[40px] text-blue-700 font-bold col-span-4 mr-10 text-left mt-2 -ml-3 mb-1">
              Administrasi Penduduk
          </h1>
          <p className="text-xl col-span-4 mr-10 text-left -ml-3 mb-9">
          Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien.
          </p>
        </div>
              {/* 12 item untuk 3 baris x 4 kolom */}
              <div className="grid grid-cols-none sm:grid-cols-2 gap-4">
                <div className="satu flex">
                  <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl py-6 rounded-lg w-[97%]">{dataPenduduk.totalPenduduk}</p>
                  <p className="bg-blue-800 text-center p-2 text-white font-bold text-xl py-6 rounded-lg w-[97%]">PENDUDUK</p>
                </div>
                <div className="dua flex">
                  <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl py-6 rounded-lg w-[97%]">{dataPenduduk.totalLaki}</p>
                  <p className="bg-blue-800 text-center p-2 text-white font-bold text-xl py-6 rounded-lg w-[97%]">LAKI LAKI</p>
                </div>
                <div className="tiga flex">
                  <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl py-6 rounded-lg w-[97%]">{dataPenduduk.totalKK}</p>
                  <p className="bg-blue-800 text-center p-2 text-white font-bold text-xl py-6 rounded-lg w-[97%]">KEPALA KELUARGA</p>
                </div>
                <div className="empat flex">
                  <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl py-6 rounded-lg w-[97%]">{dataPenduduk.totalPr}</p>
                  <p className="bg-blue-800 text-center p-2 text-white font-bold text-xl py-6 rounded-lg w-[97%]">PEREMPUAN</p>
                </div>
              </div>
    </div>
  );
}
