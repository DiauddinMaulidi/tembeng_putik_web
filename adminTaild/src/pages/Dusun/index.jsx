import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DownloadOptions from "../../components/common/DownloadOptions";

export default function Dusun() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/penduduk_tembeng/dusun");
      setData(res.data);
    } catch (error) {
      console.error("Load error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // KOLOM DATA GRID
  const columns = [
    { field: "id", headerName: "No", width: 70 },

    {
      field: "aksi",
      headerName: "Aksi",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => navigate(`/dusun/edit/${params.row.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
        >
          Edit
        </button>
      ),
    },

    { field: "dusun", headerName: "Nama Dusun", width: 200 },
    { field: "kepala_dusun", headerName: "Kepala Dusun", width: 180 },
    { field: "nik", headerName: "NIK", width: 180 },
  ];

  return (
    <div className="p-6">

      {/* TITLE & DOWNLOAD BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Data Dusun Tembeng Putik
        </h2>

        <DownloadOptions data={data} />
      </div>

      {/* CARD CONTAINER (TAILWIND) */}
        <div className="w-full bg-gray-800 dark:b-white/90">
          <DataGrid
            rows={data}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </div>
    </div>
  );
}
