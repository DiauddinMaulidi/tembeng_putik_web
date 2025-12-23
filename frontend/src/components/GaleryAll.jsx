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

export default function GaleryAll() {
    const [dataGallery, setDataGallery] = useState([])

        const loadGallery = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk_tembeng/gallery`)
            setDataGallery(res.data)
        }

        useEffect(() => {
            loadGallery()
        }, [])

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App w-full md:pl-12 md:pr-7 mb-50 justify-between">
            <div className="w-full px-4 sm:px-0 mt-20">
                <h1 className="text-[40px] text-red-700 font-bold col-span-4 text-left mt-2 ml-1 mb-1">
                    GALERI DESA
                </h1>

                <p className="text-xl col-span-4 text-left ml-1 mb-9">
                    Menampilkan kegiatan-kegiatan yang berlangsung di Desa
                </p>
            </div>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mx-4 md:mx-0"
            >
                {dataGallery.map((item) => (
                    <a href={item.images}>
                        <img alt={item.nama} src={item.images} className='h-64 object-cover' />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}
