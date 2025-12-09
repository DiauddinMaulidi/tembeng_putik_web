import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const belanjas = [
  {
    id: 1,
    img: "/images/tempe.jpeg",
    judul: "Tempe",
    slug: "Tempe",
    harga: "Rp5.000"
  },
  {
    id: 2,
    img: "/images/kerajinan.jpeg",
    judul: "Kerajinan Tangan",
    slug: "Kerajinan Tangan",
    harga: "Rp25.000"
  },
  {
    id: 3,
    img: "/images/tikar_pandan.jpg",
    judul: "Tikar Pandan",
    slug: "tikar-pandan",
    harga: "Rp25.000"
  },
];

export default function Belanja() {
  return (
    <div className="w-full justify-between mt-20">
      <div className="grid grid-cols-3 gap-2 mx-5 md:mx-24">
        <h1 className="text-[40px] text-blue-700 font-bold col-span-4 text-left mt-2 mb-1">
          Beli Dari Desa
        </h1>

        <p className="text-xl col-span-4 text-left mb-9">
          Melayanan yang disediakan promosi produk UMKM Desa sehingga mampu meningkatkan perekonomian masyarakat Desa.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 justify-center mx-5 md:mx-24 sm:justify-between">
        {belanjas.slice(0, 3).map((belanja) => (
          <Link to={`/belanja/${belanja.slug}`} key={belanja.id}>
            <Card
              className="max-w-sm"
              renderImage={() => (
                <img
                  src={belanja.img}
                  alt={belanja.judul}
                  className="h-56 w-full object-cover rounded-t-lg"
                />
              )}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {belanja.judul}
              </h5>
              <p className="font-normal text-gray-700 flex justify-end">
                {belanja.harga}
              </p>
            </Card>
          </Link>
        ))}
      </div>

        <div className='flex justify-center mt-2 sm:justify-end rounded-sm bg-blue-700 sm:bg-blue-50 mx-5 md:mx-24'>
            <Link to={"/belanja"}>
                <h1 className="py-3 font-bold">LIHAT LEBIH BANYAK</h1>
            </Link>
        </div>
    </div>
  );
}
