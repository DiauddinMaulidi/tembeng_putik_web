import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HalamanBerita() {
  const navigate = useNavigate();
  const [dataBerita, setDataBerita] = useState([]);


  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/berita");
      setDataBerita(res.data);
    } catch (err) {
      console.error("Gagal memuat berita:", err);
    }
  };

  // DELETE DATA
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/berita/${id}`);
      loadData(); // refresh setelah delete
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Berita Tembeng Putik</h2>

      <button className="btn-tambah" onClick={() => navigate("/berita/tambah")}>
        Tambah Berita
      </button>

      <div className="berita-wrapper">
        {dataBerita.map((item) => (
          <div key={item.id} className="card">
            <img className="card-image" src={item.images} alt={item.judul} />

            <h5 className="card-title text-3baris">{item.judul}</h5>
            <p className="card-text text-3baris">{item.subJudul}</p>

            <button
              onClick={() => navigate(`/berita/edit/${item.id}`)}
              className="btn-edit"
            >
              Edit
            </button>

          <button
            onClick={() => deleteData(item.id)}
            style={{
              background: "#e74c3c",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Hapus
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}
