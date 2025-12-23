export default function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-xl p-6 text-white ${color}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1">{title}</p>
      <button className="mt-4 text-sm flex items-center gap-2">
        Lihat Detail →
      </button>
    </div>
  );
}
