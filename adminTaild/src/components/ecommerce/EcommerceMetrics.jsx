import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { useNavigate } from "react-router";
import axios from "axios";

export default function EcommerceMetrics() {
  const navigate = useNavigate()

  const [jumlah, setJumlah] = useState(0)
  const [jumlahDusun, setJumlahDusun] = useState(0)
  const [jumlahKeluarga, setJumlahKeluarga] = useState(0)

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng/sum");
    setJumlah(res.data);
  };
  const loadDataDusun = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng/dusun/sum");
    setJumlahDusun(res.data);
  };
  const loadDataKeluarga = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng/keluarga");
    setJumlahKeluarga(res.data);
  };
  useEffect(()=> {
    loadData()
    loadDataDusun()
    loadDataKeluarga()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* <!-- Dusun Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <PinDropIcon className="text-red-500 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Wilayah Desa
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {jumlahDusun}
            </h4>
          </div>

          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
            onClick={() => navigate("/dusun")}
            className="!text-gray-800 dark:!text-white/90">
            Lihat Detail
          </Button>
        </div>
      </div>
      {/* <!-- Dusun Item End --> */}

      {/* <!-- Penduduk Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Penduduk
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {jumlah.totalPenduduk}
            </h4>
          </div>

          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
            onClick={() => navigate("/penduduk")}
            className="!text-gray-800 dark:!text-white/90">
            Lihat Detail
          </Button>
        </div>
      </div>
      {/* <!-- Penduduk Item End --> */}

      {/* <!-- Penduduk Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Keluarga
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {jumlahKeluarga.jumlah}
            </h4>
          </div>

          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
            onClick={() => navigate("/keluarga")}
            className="!text-gray-800 dark:!text-white/90">
            Lihat Detail
          </Button>
        </div>
      </div>
      {/* <!-- Penduduk Item End --> */}
    </div>
  );
}
