import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPenduduk() {
  const { id } = useParams();
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
  });

  const fixDate = (d) => (d ? d.split("T")[0] : "");

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(`http://localhost:5000/penduduk_tembeng/edit/${id}`);
      const row = res.data;

      setForm({
        nama: row["NAMA_LENGKAP"] || "",
        jenisKelamin: row["JENIS_KELAMIN"] || "",
        statusPerkawinan: row["STATUS_PERKAWINAN"] || "",
        tempatLahir: row["TEMPAT_LAHIR"] || "",
        tanggalLahir: fixDate(row["TANGGAL_LAHIR"]) || "",
        agama: row["AGAMA"] || "",
        pendidikan: row["PENDIDIKAN_TERAKHIR"] || "",
        pekerjaan: row["PEKERJAAN"] || "",
        kewarganegaraan: row["KEWARGANEGARAAN"] || "",
        alamat: row["ALAMAT_LENGKAP"] || "",
        kedudukan: row["KEDUDUKAN_DALAM_KELUARGA"] || "",
        nik: row["NIK"] || "",
        nomorKK: row["NOMOR_KK"] || "",
      });
    };

    getDetail();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateData = async () => {
    await axios.put(`http://localhost:5000/penduduk_tembeng/${id}`, form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Penduduk</h2>

      <input name="nama" value={form.nama} onChange={handleChange} />
      <input name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange} />
      <input name="statusPerkawinan" value={form.statusPerkawinan} onChange={handleChange} />
      <input name="tempatLahir" value={form.tempatLahir} onChange={handleChange} />
      <input name="tanggalLahir" type="date" value={form.tanggalLahir} onChange={handleChange} />
      <input name="agama" value={form.agama} onChange={handleChange} />
      <input name="pendidikan" value={form.pendidikan} onChange={handleChange} />
      <input name="pekerjaan" value={form.pekerjaan} onChange={handleChange} />
      <input name="kewarganegaraan" value={form.kewarganegaraan} onChange={handleChange} />
      <input name="alamat" value={form.alamat} onChange={handleChange} />
      <input name="kedudukan" value={form.kedudukan} onChange={handleChange} />
      <input name="nik" value={form.nik} onChange={handleChange} />
      <input name="nomorKK" value={form.nomorKK} onChange={handleChange} />

      <button
        onClick={updateData}
        style={{ background: "orange", color: "#fff", padding: "8px", marginTop: "10px" }}
      >
        Update
      </button>
    </div>
  );
}
