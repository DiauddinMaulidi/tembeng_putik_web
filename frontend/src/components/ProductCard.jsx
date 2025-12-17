import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailBelanja() {
  const { judul } = useParams();
  const [dataUmkm, setDataUmkm] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  const BASE_IMG = "http://localhost:5000/assets/";

    const loadData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/penduduk_tembeng/umkm"
          );
          setDataUmkm(res.data);
        } catch (err) {
          console.error("Gagal memuat UMKM:", err);
        }
      };

    useEffect(() => {
      loadData();
    }, []);

    const produk = dataUmkm.find((item) => item.judul === judul);

    useEffect(() => {
      if (produk && produk.images?.length > 0) {
        setActiveImage(produk.images[0]);
      }
    }, [produk]);

  if (!produk)
    return (
      <h1 className="text-center mt-10 text-2xl">
        Produk tidak ditemukan
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto mt-36 p-6 bg-white rounded-2xl shadow-xl md:flex gap-12">

      {/* ===== IMAGE CARD ===== */}
      <div className="md:w-1/2">
        <div className="rounded-2xl border bg-gray-100 p-4 shadow-inner">

          {/* GAMBAR UTAMA */}
          <div className="rounded-xl bg-white p-3 shadow-md">
            <img
              src={`${BASE_IMG}${activeImage}`}
              alt={produk.judul}
              className="w-full h-[360px] object-cover rounded-lg transition"
            />
          </div>

          {/* THUMBNAIL */}
          <div className="flex gap-3 mt-4">
            {produk.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 border rounded-lg p-1 bg-white shadow
                ${
                  activeImage === img
                    ? "ring-2 ring-red-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <img
                  src={`${BASE_IMG}${img}`}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== INFO PRODUK ===== */}
      <div className="md:w-1/2">
        <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{produk.judul}</h1> <button className="text-red-500 text-3xl hover:scale-110 transition"> ❤️ </button>
        </div>
        {/* Rating & Kategori */}
        <div className="flex items-center gap-3 mt-2 text-gray-500">
            <span className="text-yellow-400 text-xl">★★★★★</span>
            <span>Penilaian (0)</span> <span>•</span>
            <span>{produk.kategori}</span>
        </div>
        {/* Harga */}
        <p className="text-3xl font-bold text-red-600 mt-5">Rp{produk.harga.toLocaleString("id-ID")}</p>
        {/* Deskripsi */}
        <p className="mt-5 text-gray-700 leading-relaxed"> {produk.subJudul} </p>
        {/* Tombol WA */}
        <a href={`https://wa.me/${produk.no_wa}?text=Saya ingin membeli ${produk.judul}}`}
        target="_blank"
        className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg mt-6 font-semibold hover:bg-green-700 transition" > Hubungi Penjual </a>
      </div>
    </div>
  );
}
