import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";

const data = [
  { name: "Tidak/Belum Sekolah", value: 177 },
  { name: "Belum Tamat SD/Sederajat", value: 203 },
  { name: "Tamat SD/Sederajat", value: 288 },
  { name: "SLTP/Sederajat", value: 139 },
  { name: "SLTA/Sederajat", value: 288 },
  { name: "Diploma I/II", value: 21 },
  { name: "Diploma III/Sarjana Muda", value: 14 },
  { name: "Diploma IV/Strata I", value: 26 },
  { name: "Strata II", value: 2 },
  { name: "Tidak/ Belum Sekolah", value: 200 },
];

export default function EducationChart() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-red-700 mb-6">
        Berdasarkan Pendidikan
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} interval={0}/>
          <YAxis />
          <Tooltip wrapperStyle={{ borderRadius: "10px", padding: "5px" }} />

          <Bar dataKey="value" fill="#B71C1C" radius={[5, 5, 0, 0]}>
            <LabelList dataKey="value" position="top" style={{ fill: "#000", fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}