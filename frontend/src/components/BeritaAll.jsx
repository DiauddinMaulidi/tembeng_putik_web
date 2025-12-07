import { Card } from "flowbite-react";
import { Link,} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BeritaAll() {
    const [beritas, setBeritas] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/berita")
            .then((res) => setBeritas(res.data))
            .catch((err) => console.log(err));
    }, []);

  return (
    <div className="w-full mb-40">
        <div className="grid grid-cols-3 gap-6 w-full px-4 md:pl-12 md:pr-7 mt-20">
            <h1 className="text-[40px] text-red-700 font-bold col-span-4 mr-10 text-left mt-2 ml-1 mb-1">
                Berita Desa
            </h1>

            <p className="text-xl col-span-4 mr-10 text-left ml-1 -mt-6 mb-9">
            Menyajikan informasi terbaru tentang peristiwa, berita terkini.
            </p>
        </div>
        <div className="grid sm:grid-cols-3 justify-center gap-3 sm:justify-between md:pl-12 md:pr-7">
            {beritas.map((berita) => (
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
    </div>
  );
}
