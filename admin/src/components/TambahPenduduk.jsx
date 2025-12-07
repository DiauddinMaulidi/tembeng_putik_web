import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TambahPenduduk() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    tempatLahir: "",
    tanggalLahir: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    kewarganegaraan: "",
    alamat: "",
    kedudukan: "",
    nik: "",
    nomorKK: "",
    ket: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addData = async () => {
    await axios.post("http://localhost:5000/penduduk_tembeng", form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Penduduk</h2>

      <input name="nama" placeholder="Nama" onChange={handleChange} />
      <input name="jenisKelamin" placeholder="Jenis Kelamin" onChange={handleChange} />
      <input name="statusPerkawinan" placeholder="Status Perkawinan" onChange={handleChange} />
      <input name="tempatLahir" placeholder="Tempat Lahir" onChange={handleChange} />
      <input name="tanggalLahir" type="date" onChange={handleChange} />
      <input name="agama" placeholder="Agama" onChange={handleChange} />
      <input name="pendidikan" placeholder="Pendidikan" onChange={handleChange} />
      <input name="pekerjaan" placeholder="Pekerjaan" onChange={handleChange} />
      <input name="kewarganegaraan" placeholder="Kewarganegaraan" onChange={handleChange} />
      <input name="alamat" placeholder="Alamat" onChange={handleChange} />
      <input name="kedudukan" placeholder="Kedudukan" onChange={handleChange} />
      <input name="nik" placeholder="NIK" onChange={handleChange} />
      <input name="nomorKK" placeholder="Nomor KK" onChange={handleChange} />

      <button
        onClick={addData}
        style={{ background: "green", color: "#fff", padding: "8px", marginTop: "10px" }}
      >
        Simpan
      </button>
    </div>
  );
}
