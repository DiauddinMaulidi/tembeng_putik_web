import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function DownloadOptions({ data }) {
  const [open, setOpen] = useState(false);

  // DOWNLOAD CSV
  const downloadCSV = () => {
    const header = Object.keys(data[0]);
    const rows = data.map((row) =>
      header.map((key) => row[key]).join(",")
    );

    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data_penduduk.csv";
    a.click();
  };

  // DOWNLOAD XLSX
  const downloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Styling border + bold header
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[addr]) continue;

        ws[addr].s = {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
          font: R === 0 ? { bold: true } : {},
        };
      }
    }

    // auto width
    ws["!cols"] = Object.keys(data[0]).map((key) => ({
      wch: Math.max(
        key.length,
        ...data.map((i) => String(i[key]).length)
      ) + 2,
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Penduduk");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buf], { type: "application/octet-stream" });
    saveAs(file, "data_penduduk.xlsx");
  };

  return (
    <div className="relative inline-block">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-white text-black border rounded-lg shadow hover:bg-gray-100 transition"
      >
        Download Data ▼
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 left-0 w-40 bg-white text-black border rounded-lg shadow-lg z-10">

          <div
            onClick={() => {
              downloadCSV();
              setOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-200 rounded-t-lg cursor-pointer border-b"
          >
            Download CSV
          </div>

          <div
            onClick={() => {
              downloadXLSX();
              setOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-200 rounded-b-lg cursor-pointer"
          >
            Download XLSX
          </div>

        </div>
      )}

    </div>
  );
}
