import { useParams } from "react-router-dom";

const belanjas = [
  {
    id: 1,
    img: "/images/tempe.jpeg",
    judul: "Tempe",
    slug: "Tempe",
    harga: "Rp5.000",
    kategori: "Kerajinan",
    deskripsi:
      "Pembuatan Tempe",
    rating: 0,
  },
  {
    id: 2,
    img: "/images/kerajinan.jpeg",
    judul: "Kerajinan Tangan",
    slug: "Kerajinan Tangan",
    harga: "Rp50.000",
    kategori: "Kerajinan",
    deskripsi:
      "Kerajinan buatan tangan, kuat, awet dan cocok untuk dekorasi rumah.",
    rating: 0,
  },
  {
    id: 3,
    img: "/images/tikar_pandan.jpg",
    judul: "Tikar Pandan",
    slug: "tikar-pandan",
    harga: "Rp25.000",
    kategori: "Kerajinan",
    deskripsi:
      "Tikar pandan buatan tangan, kuat, awet dan cocok untuk dekorasi rumah.",
    rating: 0,
  },
];

export default function DetailBelanja() {
  const { judul } = useParams();
  const produk = belanjas.find((item) => item.slug === judul);

  if (!produk) return <h1 className="text-center mt-10 text-2xl">Produk tidak ditemukan</h1>;

  return (
    <div className="max-w-6xl mx-auto mt-40 p-5 md:flex gap-10 bg-white rounded-xl shadow">

      {/* FOTO BESAR */}
      <div className="md:w-1/2">
        <img
          src={produk.img}
          alt={produk.judul}
          className="w-full h-[350px] object-cover rounded-lg shadow-md"
        />

        {/* Thumbnail kecil */}
        <div className="flex gap-3 mt-4">
          <img
            src={produk.img}
            className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
          />
        </div>
      </div>

      {/* INFORMASI PRODUK */}
      <div className="md:w-1/2">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{produk.judul}</h1>

          <button className="text-red-500 text-3xl hover:scale-110 transition">
            ❤️
          </button>
        </div>

        {/* Rating & Kategori */}
        <div className="flex items-center gap-3 mt-2 text-gray-500">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <span>Penilaian (0)</span>
          <span>•</span>
          <span>{produk.kategori}</span>
        </div>

        {/* Harga */}
        <p className="text-3xl font-bold text-red-600 mt-5">{produk.harga}</p>

        {/* Deskripsi */}
        <p className="mt-5 text-gray-700 leading-relaxed">
          {produk.deskripsi}
        </p>

        {/* Tombol WA */}
        <a
          href={`https://wa.me/6281234567890?text=Saya ingin membeli ${produk.judul}`}
          target="_blank"
          className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg mt-6 font-semibold hover:bg-green-700 transition"
        >
          Hubungi Penjual
        </a>

        {/* Bagikan */}
        {/* <div className="mt-6">
          <p className="font-semibold mb-2">Bagikan:</p>
          <div className="flex gap-4 text-2xl text-gray-600">
            <i className="bx bxl-facebook-circle hover:text-blue-600 cursor-pointer"></i>
            <i className="bx bxl-whatsapp hover:text-green-600 cursor-pointer"></i>
            <i className="bx bx-link hover:text-gray-800 cursor-pointer"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
}
