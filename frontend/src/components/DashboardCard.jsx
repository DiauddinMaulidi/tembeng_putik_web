// src/components/DashboardCard.jsx
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function DashboardCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(item.link)}
      className={`${item.color} cursor-pointer rounded-xl p-6 text-white
      shadow-lg transition hover:scale-105`}
    >
      <h2 className="text-3xl font-bold">{item.value}</h2>
      <p className="mt-1 text-lg">{item.title}</p>

      <div className="mt-6 flex items-center gap-2 text-sm opacity-90">
        <span>Lihat Detail</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
