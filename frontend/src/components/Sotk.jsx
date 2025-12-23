import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const stafs = [
    {
        id: 1,
        image: "/images/kesebelas.jpg",
        nama: "Samsurijal Jamil, S.Pd",
        jabatan: "Sekretaris"
    },
    {
        id: 2,
        image: "/images/kedua.jpeg",
        nama: "Saiful Wathani HK, SE",
        jabatan: "Kaur Tu dan dan Umum"
    },
    {
        id: 3,
        image: "/images/ketiga.jpeg",
        nama: "Muhammad Syauqi, SH",
        jabatan: "Kasi Pemerintahan"
    },
    {
        id: 4,
        image: "/images/ketuju.jpeg",
        nama: "Rohman Sani, S.Pd",
        jabatan: "Operator"
    },
]

const Sotk = () => {
    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
        <div className="grid grid-cols-3 gap-2 mx-5 md:mx-24 bg-blue-50">
          <h1 className="text-[40px] text-blue-700 font-bold col-span-4 mr-10 text-left mt-2 -mb-3">
              SOTK
          </h1>
          <p className="text-xl col-span-4 mr-10 text-left mb-9">
                Struktur Organisasi dan Tata Kerja Desa Tembeng Putik
          </p>
        </div>

        <div className='hidden sm:block'>
            <div className="bg-neutral-primary-soft rounded-base shadow-xs mx-24 grid justify-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
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
        </div>

        <div className='block sm:hidden'>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="bg-neutral-primary-soft rounded-base shadow-xs mx-20 sm:mx-24"
                >
                <CarouselContent>
                    {stafs.map((staf, index) => (
                        <CarouselItem key={index} className="basis-3/4">
                        <div className="p-1">
                            <Card>
                                <CardContent className="p-0">
                                    <img className="rounded-t-md w-full" src={staf.image} alt={staf.nama} />
                                    <div className="bg-blue-700 rounded-b-md pb-4">
                                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-center">
                                        {staf.nama}
                                    </h5>
                                    <h6 className="text-[15px] text-center">
                                        {staf.jabatan}
                                    </h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        <div className='flex justify-center mt-2 sm:justify-end rounded-sm bg-blue-700 sm:bg-blue-50 mx-5 md:mx-24'>
            <Link to={"/pemerintah"}>
                <h1 className="py-3 font-bold">LIHAT LEBIH BANYAK</h1>
            </Link>
        </div>
    </div>
  )
}

export default Sotk
