import Perkawinan from "./Perkawinan";
import Data from "./Data";
import PieDusun from "./Pie";
import PopulationPyramid from "./Populasi";
import Pekerjaan from "./Pekerjaan";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Infografis() {
  const [dataPenduduk, setDataPenduduk] = useState(0);

    useEffect(() => {
      axios.get("http://localhost:5000/penduduk_tembeng/sum")
        .then((res) => setDataPenduduk(res.data))
        .catch((err) => console.log(err));
    }, []);

    return (
        <div>
          <div className="mt-20 mx-5 md:mx-24">
              <h1 className="text-4xl md:text-[30px] lg:text-[40px] text-red-500 font-bold">INFOGRAFIS DESA</h1>
              <h2 className="md:text-[30px] lg:text-[40px] text-red-500 font-bold">TEMBENG PUTIK</h2>
          </div>
          <div className="grid grid-cols-1 pr-3 md:grid-cols-2 md:justify-between mt-0 mx-5 md:mx-24">
            <div>
                <p className="text-[30px] text-red-500 font-bold sm:text-[40px] mt-15">DEMOGRAFI PENDUDUK</p>
                <p className="text-xl text-justify">Memberikan informasi lengkap mengenai karakteristik demografi penduduk suatu wilayah.
                    Mulai dari jumlah penduduk, usia, jenis kelamin, tingkat pendidikan, pekerjaan, agama,
                    dan aspek penting lainnya yang menggambarkan komposisi populasi secara rinci.
                </p>
            </div>
            <div className="flex justify-center">
                <img src="images/grafis.png" className="w-90 mt-10 bg-gray-100 rounded-full md:rounded-none md:bg-white" alt="demografis" />
            </div>
          </div>

          <div className="mx-5 md:mx-24">
            <h1 className="text-[40px] md:text-3xl lg:text-4xl mt-10 text-red-600 font-bold">
              Jumlah Penduduk dan Kepala Keluarga
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

              {/* Total Penduduk */}
              <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
                <img src="images/total_penduduk.png" className="w-20" alt="total_penduduk" />
                <div className="ml-5">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">Total Penduduk</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-700">{dataPenduduk.totalPenduduk}</p>
                </div>
              </div>

              {/* Kepala Keluarga */}
              <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
                <img src="images/kepala_keluarga.png" className="w-20" alt="kk" />
                <div className="ml-5">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">Kepala Keluarga</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-700">{dataPenduduk.totalKK}</p>
                </div>
              </div>

              {/* Perempuan */}
              <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
                <img src="images/perempuan.png" className="w-20" alt="prempuan" />
                <div className="ml-5">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">Perempuan</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-700">{dataPenduduk.totalPr}</p>
                </div>
              </div>

              {/* Laki-laki */}
              <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
                <img src="images/laki_laki.png" className="w-20" alt="laki" />
                <div className="ml-5">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">Laki-Laki</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-red-700">{dataPenduduk.totalLaki}</p>
                </div>
              </div>

            </div>
          </div>
          {/* <PopulationPyramid /> */}
          <PieDusun/>
          <Data/>
          <Pekerjaan/>
          <Perkawinan/>
        </div>
    );
}