import { Card } from "flowbite-react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Berita() {
    const [beritas, setBeritas] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/berita`)
            .then((res) => setBeritas(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="mt-20">
            <div className="grid grid-cols-3 gap-6 mx-5 md:mx-24">
                <h1 className="text-[40px] text-blue-700 font-bold col-span-4 text-left mt-2 mb-1">
                    Berita Desa
                </h1>

                <p className="text-xl col-span-4 mr-10 text-left ml-1 -mt-6 mb-9">
                    Menyajikan informasi terbaru tentang peristiwa, berita terkini.
                </p>
            </div>
            <div className="grid sm:grid-cols-3 justify-center gap-3 sm:justify-between mx-5 md:mx-24">
                {beritas.slice(0, 3).map((berita) => (
                    <Link to={`/berita/${berita.judul}`} key={berita.id}>
                        <Card
                            className="max-w-sm"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={berita.images}
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
            <div className='flex justify-center mt-2 sm:justify-end rounded-sm bg-blue-700 sm:bg-blue-50 mx-5 md:mx-24'>
                <Link to={"/berita"}>
                    <h1 className="py-3 font-bold">LIHAT LEBIH BANYAK</h1>
                </Link>
            </div>
        </div>
    );
}
