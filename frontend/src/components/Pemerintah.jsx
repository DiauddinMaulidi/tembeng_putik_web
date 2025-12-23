import React from "react"
import { Link } from "react-router-dom"

const stafs = [
  { id: 13, image: "/images/kadess.jpg", nama: "Drs Fahmi", jabatan: "Sekretaris" },
  { id: 11, image: "/images/kesebelas.jpg", nama: "Samsurijal Jami, S.Pd", jabatan: "Sekretaris" },
  { id: 2, image: "/images/kedua.jpeg", nama: "Saiful Wathani HK, SE", jabatan: "Kaur TU dan Umum" },
  { id: 8, image: "/images/kedelapan.jpeg", nama: "Musip", jabatan: "Kaur Keuangan" },
  { id: 1, image: "/images/pertama.jpeg", nama: "Suryadi H MR, S.Pd", jabatan: "Kasi Pelayanan" },
  { id: 3, image: "/images/ketiga.jpeg", nama: "Muhammad Syauqi, SH", jabatan: "Kasi Pemerintahan" },
  { id: 5, image: "/images/kelima.jpeg", nama: "Saparwadi, S.Pd", jabatan: "Kasi Kesra" },
  { id: 7, image: "/images/ketuju.jpeg", nama: "Rohman Sani, S.Pd", jabatan: "Operator" },
  { id: 10, image: "/images/kesembilan.jpg", nama: "Habiburrahman, S.Pd", jabatan: "Kaur Perencanaan" },
  { id: 4, image: "/images/keempat.jpeg", nama: "Sarapuddin", jabatan: "Kawil TB. Baret I" },
  { id: 6, image: "/images/keenam.jpeg", nama: "Rohani, S.Pt", jabatan: "Kawil TB. Timuk II" },
  { id: 9, image: "/images/kesepuluh.jpg", nama: "Jaelani", jabatan: "Kawil TB. Baret II" },
  { id: 12, image: "/images/duabelas.jpeg", nama: "Hammi", jabatan: "Kawil TB. Timuk I" },
]

const Pemerintah = () => {
  return (
    <div className="mb-24">

      {/* JUDUL */}
      <div className="px-6 mt-20">
        <h1 className="text-3xl sm:text-4xl text-blue-700 font-bold">
          STOK
        </h1>
        <p className="text-lg mt-2">
          Struktur Organisasi dan Tata Kerja Desa Tembeng Putik
        </p>
      </div>

      {/* GAMBAR STRUKTUR */}
      <div className="flex justify-center my-10 px-4">
        <img
          src="/images/struktur.jpg"
          alt="Struktur Organisasi"
          className="max-w-full rounded-md"
        />
      </div>

      {/* GRID CARD */}
      <div className="mx-4 sm:mx-8 lg:mx-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stafs.map((staf) => (
          <div
            key={staf.id}
            className="bg-white rounded-md shadow-md overflow-hidden"
          >
            {/* FOTO */}
            <div className="w-full aspect-3/4 overflow-hidden">
              <img
                src={staf.image}
                alt={staf.nama}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="bg-blue-700 px-3 py-4 text-center">
              <h5 className="text-white text-sm sm:text-base font-semibold leading-snug">
                {staf.nama}
              </h5>
              <p className="text-blue-100 text-xs sm:text-sm mt-1">
                {staf.jabatan}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pemerintah
