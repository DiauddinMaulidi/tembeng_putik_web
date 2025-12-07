import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Administrasi() {
  return (
    <div className="w-full h-96 mb-80">
        <div>
              <div className="grid grid-cols-4 gap-6 w-full px-4 px-6 md:pl-12 md:pr-7"> 
              <h1 className="text-[40px] text-red-700 font-bold col-span-4 mr-10 text-left mt-2 ml-1 mb-1"> 
                Administrasi Penduduk 
              </h1> 
              <p className="text-xl col-span-4 mr-10 text-left ml-1 -mt-6 mb-4"> 
                Efisiensi pengelolaan data dan informasi kependudukan yang lebih efektif. 
              </p>
              {/* 12 item untuk 3 baris x 4 kolom */}
              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">Penduduk</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg w-[97%]">7.970</p>
              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">LAKI LAKI</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg w-[97%]">1.980</p>

              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">Kepala Keluarga</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg w-[97%]">3.900</p>
              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">Perempuan</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg w-[97%]">3.200</p>

              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">Penduduk Keluarga</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg w-[97%]">5.980</p>
              <p className="bg-red-800 text-center p-2 text-white font-bold text-xl rounded-lg w-[97%]">Penduduk Sementara</p>
              <p className="bg-gray-400 text-center p-2 text-black font-bold text-xl rounded-lg  w-[97%]">8.220</p>
              </div>
        </div>

    </div>
  );
}
