import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PopulationPyramid() {
  const labels = [
    "85+","80-84","75-79","70-74","65-69",
    "60-64","55-59","50-54","45-49","40-44",
    "35-39","30-34","25-29","20-24","15-19",
    "10-14","5-9","0-4"
  ];

  const male = [
    -4, -5, -6, -8, -8, -20, -31, -27, -45,
    -50, -29, -46, -52, -65, -66, -74, -51, -19
  ];

  const female = [
    5, 3, 4, 9, 6, 19, 21, 34, 43, 37,
    42, 40, 54, 57, 53, 57, 48, 20
  ];

  // ===============================
  // 🔹 DATA UNTUK SEMUA CHART
  // ===============================
  const dataHorizontal = {
    labels,
    datasets: [
      {
        label: "Laki-Laki",
        data: male,
        backgroundColor: "rgba(28, 181, 11, 0.52)",
      },
      {
        label: "Perempuan",
        data: female,
        backgroundColor: "rgba(162, 16, 16, 0.65)",
      },
    ],
  };

  const dataVertical = {
    labels,
    datasets: [
      {
        label: "Laki-Laki",
        data: male.map((v) => Math.abs(v)),
        backgroundColor: "rgba(28, 181, 11, 0.52)",
      },
      {
        label: "Perempuan",
        data: female,
        backgroundColor: "rgba(162, 16, 16, 0.65)",
      },
    ],
  };

  // ===============================
  // 🔹 OPTIONS PYRAMID (HORIZONTAL)
  // ===============================
  const optionsHorizontal = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => Math.abs(value),
        },
      },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          boxWidth: 20,
          usePointStyle: true,
        },
      },
    },
  };

  // ===============================
  // 🔹 OPTIONS VERTICAL BAR UNTUK MOBILE
  // ===============================
  const optionsVertical = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="mx-auto px-4 md:px-24 py-20 w-full">
      <h2 className="text-[40px] md:text-3xl lg:text-4xl font-bold text-red-600 mb-6">
        Berdasarkan Kelompok Umur
      </h2>

      {/* Tampilan Desktop */}
      <div className="hidden sm:block bg-gray-100 p-5 rounded-sm shadow-md w-full h-[600px]">
        <Bar data={dataHorizontal} options={optionsHorizontal} />
      </div>

      {/* Tampilan Mobile */}
      <div className="block sm:hidden bg-gray-100 p-5 rounded-sm shadow-md w-full h-[500px] mt-6">
        <Bar data={dataVertical} options={optionsVertical} />
      </div>
    </div>
  );
}
