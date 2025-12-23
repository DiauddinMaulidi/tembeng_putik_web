// src/pages/Dashboard.jsx
import DashboardCard from "../components/DashboardCard";
import { dashboardData } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">DASHBOARD</h1>

      <div
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      "
      >
        {dashboardData.map((item) => (
          <DashboardCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
