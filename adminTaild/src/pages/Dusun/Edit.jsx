import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pendudukList, setPendudukList] = useState([]);

  const [form, setForm] = useState({
    dusun: "",
    kepala_dusun_lama: "",
    kepala_dusun_id: "",
    searchText: "",
  });

  useEffect(() => {
    const loadData = async () => {
      // Ambil data dusun
      const dusunRes = await axios.get(
        `http://localhost:5000/penduduk_tembeng/dusun/edit/${id}`
      );
      const row = dusunRes.data;

      setForm((f) => ({
        ...f,
        dusun: row.dusun,
        kepala_dusun_lama: row.kepala_dusun,
        kepala_dusun_id: row.kepala_dusun_id,
      }));

      // Ambil list penduduk
      const pendudukRes = await axios.get(
        "http://localhost:5000/penduduk_tembeng"
      );
      setPendudukList(pendudukRes.data);
    };

    loadData();
  }, [id]);

  // Ketika user memilih dari datalist
  const handleSelectPenduduk = (value) => {
    const selected = pendudukList.find(
      (p) => `${p["NIK"]} - ${p["NAMA_LENGKAP"]}` === value
    );

    if (selected) {
      setForm({
        ...form,
        kepala_dusun_id: selected.id,
        searchText: value,
      });
    } else {
      setForm({ ...form, searchText: value });
    }
  };

  const updateData = async () => {
    await axios.put(
      `http://localhost:5000/penduduk_tembeng/dusun/${id}`,
      form
    );
    navigate("/dusun");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* Title */}
      <h2 className="text-xl text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
        Edit Data Dusun
      </h2>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 space-y-4">

        {/* Nama Dusun */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nama Dusun
          </label>
          <input
            value={form.dusun}
            onChange={(e) => setForm({ ...form, dusun: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Kepala Dusun Lama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Kepala Dusun Sebelumnya
          </label>
          <input
            readOnly
            value={form.kepala_dusun_lama}
            className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
          />
        </div>

        {/* Cari Kepala Dusun Baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cari NIK / Nama Kepala Dusun Baru
          </label>

          <input
            list="penduduk-list"
            value={form.searchText}
            onChange={(e) => handleSelectPenduduk(e.target.value)}
            placeholder="Masukkan NIK atau Nama ..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />

          <datalist id="penduduk-list">
            {pendudukList.map((p) => (
              <option
                key={p.id}
                value={`${p["NIK"]} - ${p["NAMA_LENGKAP"]}`}
              />
            ))}
          </datalist>
        </div>

        {/* Button Update */}
        <button
          onClick={updateData}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
        >
          Update
        </button>

      </div>
    </div>
  );
}
