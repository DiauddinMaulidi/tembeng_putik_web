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
    slug: "Kerajinan-Tangan",
    harga: "Rp25.000"
  },
  {
    id: 3,
    img: "/images/tikar_pandan.jpg",
    judul: "Tikar Pandan",
    slug: "Tikar-Pandan",
    harga: "Rp25.000"
  },
];

export default function Belanja() {
  return (
    <div className="w-full justify-between mb-50">
      <div className="grid grid-cols-3 gap-2 w-full px-4 md:pl-12 md:pr-7 mt-20">
        <h1 className="text-[40px] text-red-700 font-bold col-span-4 mr-10 text-left mt-2 ml-1 mb-1">
          Beli Dari Desa
        </h1>

        <p className="text-xl col-span-4 mr-10 text-left ml-1 mb-9 -mt-3">
          Melayanan yang disediakan promosi produk UMKM Desa sehingga mampu meningkatkan perekonomian masyarakat Desa
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 justify-center sm:justify-between md:pl-12 md:pr-7">
        {belanjas.map((belanja) => (
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
    </div>
  );
}
