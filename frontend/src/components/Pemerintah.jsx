import React from 'react'
import { Link } from 'react-router-dom'

const stafs = [
    {
        id: 11,
        image: "/images/kesebelas.jpg",
        nama: "Samsurijal Jami, S.Pd",
        jabatan: "Sekretaris"
    },
    {
        id: 2,
        image: "/images/kedua.jpeg",
        nama: "Saiful Wathani HK, SE",
        jabatan: "Kaur Tu dan dan Umum"
    },
    {
        id: 8,
        image: "/images/kedelapan.jpeg",
        nama: "Musip",
        jabatan: "Kaur Keuangan"
    },
    {
        id: 1,
        image: "/images/pertama.jpeg",
        nama: "Suryadi H MR, S.Pd",
        jabatan: "Kasi Pelayanan"
    },
    {
        id: 3,
        image: "/images/ketiga.jpeg",
        nama: "Muhammad Syauqi, SH",
        jabatan: "Kasi Pemerintahan"
    },
    {
        id: 5,
        image: "/images/kelima.jpeg",
        nama: "Saparwadi, S.Pd",
        jabatan: "Kasi Kesra"
    },
    {
        id: 7,
        image: "/images/ketuju.jpeg",
        nama: "Rohman Sani, S.Pd",
        jabatan: "Operator"
    },
    {
        id: 4,
        image: "/images/keempat.jpeg",
        nama: "Sarapuddin",
        jabatan: "Kawil TB. Baret I"
    },
    {
        id: 6,
        image: "/images/keenam.jpeg",
        nama: "Rohani, S.Pt",
        jabatan: "Kawil TB. Timuk II"
    },
    {
        id: 9,
        image: "/images/kesepuluh.jpg",
        nama: "Jaelani",
        jabatan: "Kawil TB. Baret II"
    },
    {
        id: 10,
        image: "/images/kesembilan.jpg",
        nama: "Habiburrahman, S.Pd",
        jabatan: "Kaur Perencanaan"
    },
    {
        id: 12,
        image: "/images/duabelas.jpeg",
        nama: "Hammi",
        jabatan: "Kawil TB. TImuk I"
    },
]

const Pemerintah = () => {
  return (
    <div className='mb-30'>
        <div className="grid grid-cols-3 gap-2 w-full px-4 mt-20">
          <h1 className="text-[40px] text-blue-700 font-bold col-span-4 mr-10 text-left mt-2 ml-9 -mb-3">
              STOK
          </h1>
          <p className="text-xl col-span-4 mr-10 text-left ml-9 mb-9">
                Struktur Organisasi dan Tata Kerja Desa Desa Tembeng Putik
          </p>
        </div>
        <div className="ml-60 mb-20 mt-5">
            <img src="/images/struktur.jpg" alt="" />
        </div>
        <div className="bg-neutral-primary-soft rounded-base shadow-xs mx-12 grid justify-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {stafs.map((staf) => (
              <div className='grid justify-center'>
                <img className="rounded-t-md object-cover" src={staf.image} alt="" />
                <div className='bg-blue-700 rounded-b-md'>
                    <h5 className="mt-3 mb-2 text-2xl font-semibold tracking-tight text-center">{staf.nama}</h5>
                    <h6 className="mb-6 mr-30 text-[15px] tracking-tight w-full text-center">{staf.jabatan}</h6>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Pemerintah
