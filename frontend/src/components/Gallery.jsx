import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
    const [dataGallery, setDataGallery] = useState([])

    const loadGallery = async () => {
        const res = await axios.get(`http://localhost:5000/penduduk_tembeng/gallery`)
        setDataGallery(res.data)
    }

    useEffect(() => {
        loadGallery()
    }, [])


    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App justify-between mt-20 mb-10 sm:mb-0">
            <div className="mx-5 md:mx-24">
                <h1 className="text-[40px] text-blue-700 font-bold col-span-4 text-left mt-2 ml-1 mb-1">
                    GALERI DESA
                </h1>

                <p className="text-xl col-span-4 text-left ml-1 mb-9">
                    Menampilkan kegiatan-kegiatan yang berlangsung di Desa.
                </p>
            </div>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-4 mx-10 md:mx-24 sm:grid-cols-[repeat(auto-fill,minmax(300px, 1fr))]"
            >
                {dataGallery.slice(0, 6).map((item) => (
                    <a href={item.images}>
                        <img alt={item.nama} src={item.images} className='h-64 object-cover' />
                    </a>
                ))}
            </LightGallery>

            <div className='flex justify-center sm:justify-end mt-3 rounded-sm bg-blue-700 sm:bg-blue-50 mx-5 md:mx-24'>
                <Link to={"/gallery"}>
                    <h1 className="py-3 font-bold">LIHAT LEBIH BANYAK</h1>
                </Link>
            </div>
        </div>
    );
}
