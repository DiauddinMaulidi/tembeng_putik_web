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
    "85+","80-84","75-79","70-74","65-69","60-64","55-59","50-54",
    "45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14",
    "5-9","0-4"
  ];

  const male = [
    -4, -5, -6, -8, -8, -20, -31, -27,
    -45, -50, -29, -46, -52, -65, -66, -74,
    -51, -19
  ];

  const female = [
    5, 3, 4, 9, 6, 19, 21, 34,
    43, 37, 42, 40, 54, 57, 53, 57,
    48, 20
  ];

  const data = {
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

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // ⭐ AGAR RESPONSIF
    layout: {
      padding: {
        right: 40, // kurangi padding agar di HP tidak kepotong
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => Math.abs(value),
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Math.abs(context.raw);
            return `${context.dataset.label}: ${value}`;
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full max-w-[900px] mx-auto p-4">
      <h2 className="text-[40px] font-bold text-red-700 mb-6 -ml-40">
        Berdasarkan Kelompok Umur
      </h2>

      {/* Kontainer fleksibel untuk Chart */}
      <div className="w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
