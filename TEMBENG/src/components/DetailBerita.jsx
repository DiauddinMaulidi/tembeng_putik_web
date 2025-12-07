import { useParams } from "react-router-dom";

export default function DetailBerita() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Detail Berita #{id}
      </h1>

      <p className="text-gray-700">
        Konten lengkap berita bisa kamu tampilkan di sini.
      </p>
    </div>
  );
}
