import { Card } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const beritas = [
    {
        id: 1,
        img: "/images/mtq.jpeg",
        judul: "Pelaksanaan Lomba Musabaqah Tilawatil Qur'an (MTQ)",
        subJudul: "Tembeng Putik - Dalam rangka pelaksanaa lomba MTQ yang ke-31 Desa tembeng putik, Kecamatan Wanasaba yang bertepatan dengan tanggal"
    },
    {
        id: 2,
        img: "/images/mtq.jpeg",
        judul: "Meaningful alt text for an image that is not purely decorative",
        subJudul: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
    },
    {
        id: 3,
        img: "/images/mtq.jpeg",
        judul: "Meaningful alt text for an image that is not purely decorative",
        subJudul: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
    }
];

export default function Berita() {
  return (
    <div className="w-full">
        <div className="grid grid-cols-3 gap-6 w-full px-4 px-6 md:pl-12 md:pr-7">
            <h1 className="text-[40px] text-red-700 font-bold col-span-4 mr-10 text-left mt-2 ml-1 mb-1"> 
                Berita Desa
            </h1>

            <p className="text-xl col-span-4 mr-10 text-left ml-1 -mt-6 mb-9"> 
            Menyajikan informasi terbaru tentang peristiwa, berita terkini.
            </p>
        </div>
        <div className="grid grid-cols-3 gap-3 justify-between md:pl-12 md:pr-7">
            {beritas.map((berita) => (
                <Link to={`/berita/${berita.judul}`} key={berita.id}>
                    <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={berita.img}
                    >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {berita.judul}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                        {berita.subJudul}
                    </p>
                    </Card>
                </Link>
            ))}
        </div>
        <div>
            <Link to={"/berita"}>
                <h1 className="flex justify-end p-5">LIHAT LEBIH BANYAK</h1>
            </Link>
        </div>
    </div>
  );
}
