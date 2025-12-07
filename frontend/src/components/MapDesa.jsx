import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapDesa() {
  return (
    <div className="w-full h-96 mb-80">
        <div className="px-6 md:pl-12 mt-40 mb-8">
            <h1 className="text-2xl text-[40px] font-bold text-blue-600 font-exstrabold tracking-wider">
                PETA DESA
            </h1>
            <p className="text-gray-800 text-xl md: text-1xl leading-snug w-4/5 mt-1 text-bold">
            Menampilkan Peta Desa dengan <i>interest Poin Desa</i> Tembeng Putik
            </p>
        </div>
        <div className="px-6 md:px-12">
            <MapContainer
              center={[-8.58593619824125, 116.58506570469594]}
              zoom={14}
              scrollWheelZoom={false}
              className="w-full h-[500px] rounded-xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[-8.58593619824125, 116.58506570469594]} icon={markerIcon}>
                <Popup>
                  Desa Tembeng Putik <br /> Kec. Wanasaba, Lombok Timur
                </Popup>
              </Marker>
            </MapContainer>
        </div>
    </div>
  );
}
