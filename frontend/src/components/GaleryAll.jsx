import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Link } from 'react-router-dom';

export default function GaleryAll() {
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
                elementClassNames="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 mx-10 sm:mx-0 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
            >
                <a href="/images/mtq.jpeg">
                    <img alt="img1" src="/images/mtq.jpeg" className='h-64 object-cover' />
                </a>
                <a href="/images/Pendataan.jpeg">
                    <img alt="img2" src="/images/Pendataan.jpeg" className='h-64 w-full object-cover'/>
                </a>
                <a href="/images/Pelatihan.jpeg">
                    <img alt="img2" src="/images/Pelatihan.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/rapat.jpeg">
                    <img alt="img2" src="/images/rapat.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/posyandu.jpeg">
                    <img alt="img2" src="/images/posyandu.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/posyandu.jpeg">
                    <img alt="img2" src="/images/posyandu.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/posyandu.jpeg">
                    <img alt="img2" src="/images/posyandu.jpeg" className='h-64 object-cover'/>
                </a>
                <a href="/images/posyandu.jpeg">
                    <img alt="img2" src="/images/posyandu.jpeg" className='h-64 object-cover'/>
                </a>
            </LightGallery>
        </div>
    );
}
