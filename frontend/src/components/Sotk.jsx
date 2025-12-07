import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const stafs = [
    {
        id: 1,
        image: "/images/pertama.jpeg",
        nama: "Hj. Suryadi",
        jabatan: "Stap Desa"
    },
    {
        id: 2,
        image: "/images/kedua.jpeg",
        nama: "Hj. Suryadi",
        jabatan: "Stap Desa"
    },
    {
        id: 3,
        image: "/images/ketiga.jpeg",
        nama: "Muhammad Syauqi, SH",
        jabatan: "Kasi Pemerintahan"
    },
    {
        id: 4,
        image: "/images/keempat.jpeg",
        nama: "Hj. Suryadi",
        jabatan: "Stap Desa"
    },
]

const Sotk = () => {
    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
        <div className="grid grid-cols-3 gap-2 w-full px-4">
          <h1 className="text-[40px] text-blue-700 font-bold col-span-4 mr-10 text-left mt-2 ml-9 -mb-3">
              SOTK
          </h1>
          <p className="text-xl col-span-4 mr-10 text-left ml-9 mb-9">
                Struktur Organisasi dan Tata Kerja Desa Tembeng Putik
          </p>
        </div>
        <div className="bg-neutral-primary-soft rounded-base shadow-xs mx-12 grid justify-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {stafs.map((staf) => (
              <div className='grid justify-center'>
                <img className="rounded-t-md" src={staf.image} alt="" />
                <div className='bg-blue-700 rounded-b-md'>
                    <h5 className="mt-3 mb-2 text-2xl font-semibold tracking-tight text-center">{staf.nama}</h5>
                    <h6 className="mb-6 mr-30 text-[15px] tracking-tight w-full text-center">{staf.jabatan}</h6>
                </div>
              </div>
            ))}
        </div>
        <div className='flex justify-end mt-3'>
            <Link to={"/pemerintah"}>
                <h1 className="p-5 font-bold mb-5">LIHAT LEBIH BANYAK</h1>
            </Link>
        </div>
    </div>
  )
}

export default Sotk
