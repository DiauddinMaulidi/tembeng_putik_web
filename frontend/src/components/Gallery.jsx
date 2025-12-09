import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Link } from 'react-router-dom';

export default function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App justify-between mt-20">
            <div className="mx-5 md:mx-24">
                <h1 className="text-[40px] text-red-700 font-bold col-span-4 text-left mt-2 ml-1 mb-1">
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
                elementClassNames="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mx-10 md:mx-24 sm:grid-cols-[repeat(auto-fill,minmax(300px, 1fr))]"
            >
                <a href="/images/mtq.jpeg">
                    <img alt="img1" src="/images/mtq.jpeg" className='h-64 object-cover' />
                </a>
                <a href="/images/PKH.jpeg">
                    <img alt="img2" src="/images/PKH.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/Pelatihan.jpeg">
                    <img alt="img3" src="/images/Pelatihan.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/rapat.jpeg">
                    <img alt="img4" src="/images/rapat.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/mtq2.jpeg">
                    <img alt="img5" src="/images/mtq2.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/posyandu.jpeg">
                    <img alt="img6" src="/images/posyandu.jpeg" className='h-64 object-cover'/>
                </a>
            </LightGallery>

        <div className='flex justify-center sm:justify-end mt-3 rounded-sm bg-blue-700 sm:bg-blue-50 mx-5 md:mx-24'>
            <Link to={"/gallery"}>
                <h1 className="py-3 font-bold">LIHAT LEBIH BANYAK</h1>
            </Link>
        </div>
        </div>
    );
}
