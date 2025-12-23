import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailBerita() {
  const { judul } = useParams();
  const decoded = decodeURIComponent(judul);
  const [beritas, setBeritas] = useState([])

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/berita`)
          .then((res) => setBeritas(res.data))
          .catch((err) => console.log(err));
  }, []);

  const berita = beritas.find((b) => b.judul === decoded);

  if (!berita)
    return (
      <h1 className="text-center mt-10 text-2xl font-semibold">
        Berita tidak ditemukan
      </h1>
    );

  const beritaTerbaru = beritas.filter((b) => b.judul !== berita.judul);

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* KONTEN KIRI */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
          {berita.judul}
        </h1>

        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-5">
          <span>•</span>
          <span className="w-full">Ditulis oleh <span className="font-bold">{berita.penulis}</span></span>
        </div>

        <img
          src={berita.images}
          className="w-full rounded-lg object-cover mb-6"
          alt={berita.judul}
        />

        <div className="prose prose-lg max-w-none text-justify leading-relaxed">
          {berita.subJudul.split("\n").map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* SIDEBAR KANAN */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-3">Berita Terbaru</h2>

        {beritaTerbaru.map((b) => (
          <Link
            key={b.id}
            to={`/berita/${encodeURIComponent(b.judul)}`}
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src={b.images}
              className="w-24 h-20 object-cover rounded-lg"
              alt={b.judul}
            />
            <div className="flex flex-col">
              <p className="font-semibold text-sm line-clamp-2">{b.judul}</p>
              <span className="text-xs text-gray-500">{b.tanggal}</span>
              <span className="text-xs text-gray-500">
                Dilihat {b.dilihat} kali
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
