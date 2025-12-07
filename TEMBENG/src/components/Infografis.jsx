
import Agama from "./Agama";
import Perkawinan from "./Perkawinan";
import Cuy from "./Cuy";
import Data from "./Data";
import IconPenduduk from "./IconPenduduk";
import PieDusun from "./Pie";
import PopulationPyramid from "./Populasi";
export default function Infografis() {
    return (
        <div className="">
            <div className="flex sm:justify-end">
                <IconPenduduk/>
            </div>
            <div className="hidden md:block">
                <h1 className="md:text-[30px] lg:text-[40px] text-red-500 font-bold grid grid-cols-2 -mt-25 ml-10">INFOGRAFIS DESA</h1>
                <h2 className="md:text-[30px] lg:text-[40px] text-red-500 font-bold ml-10">TEMBENG PUTIK</h2>
            </div>
            <div className="grid grid-cols-1 pr-3 sm:grid-cols-2 mt-25 ml-10">
                <div>
                    <p className="text-[30px] text-red-500 font-bold sm:text-[40px] mt-15">DEMOGRAFI PENDUDUK</p>
                    <p className="text-xl text-justify">Memberikan informasi lengkap mengenai karakteristik demografi penduduk suatu wilayah. 
                        Mulai dari jumlah penduduk, usia, jenis kelamin, tingkat pendidikan, pekerjaan, agama,
                        dan aspek penting lainnya yang menggambarkan komposisi populasi secara rinci.

                    </p>
                </div>
                <div className="hidden sm:block">
                    <img src="images/grafis.png" className="w-90 ml-40 -mt-10 my-10" alt="demografis" />
                </div>
            </div>

           <div className="w-full max-w-[1200px] mx-auto p-4">
  <h1 className="text-[40px] md:text-3xl lg:text-4xl mt-10 text-red-600 font-bold">
    Jumlah Penduduk dan Kepala Keluarga
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

    {/* Total Penduduk */}
    <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
      <img src="images/cihuy.png" className="w-20" alt="total_penduduk" />
      <div className="ml-5">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold">Total Penduduk</p>
        <p className="text-2xl md:text-3xl font-extrabold text-red-700">1.590</p>
      </div>
    </div>

    {/* Kepala Keluarga */}
    <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
      <img src="images/kepala keluarga.png" className="w-20" alt="kk" />
      <div className="ml-5">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold">Kepala Keluarga</p>
        <p className="text-2xl md:text-3xl font-extrabold text-red-700">1.900</p>
      </div>
    </div>

    {/* Perempuan */}
    <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
      <img src="images/prempuan.png" className="w-20" alt="prempuan" />
      <div className="ml-5">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold">Perempuan</p>
        <p className="text-2xl md:text-3xl font-extrabold text-red-700">790</p>
      </div>
    </div>

    {/* Laki-laki */}
    <div className="flex items-center bg-gray-100 p-5 rounded-xl shadow">
      <img src="images/ICON LAKI CUY.png" className="w-20" alt="laki" />
      <div className="ml-5">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold">Laki-Laki</p>
        <p className="text-2xl md:text-3xl font-extrabold text-red-700">650</p>
      </div>
    </div>

  </div>
</div>

            <PopulationPyramid />
            <PieDusun />
            <Data/>
            <Cuy/>
            <Perkawinan/>
            <Agama/>
        </div>
    );
}