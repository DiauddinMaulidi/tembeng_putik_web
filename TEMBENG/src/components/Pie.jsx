import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataDusun = [
  { name: "Tembeng Putik Timuk I", value: 120 },
  { name: "Tembeng Putik Timuk II", value: 180 },
  { name: "Tembeng Putik Baret I", value: 150 },
  { name: "Tembeng Putik Baret II", value: 110 },
  { name: "Lengkok Lendang", value: 200 },
];

const COLORS = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759", "#76b7b2"];

export default function PieDusun() {
  return (
    <div className="w-full max-w-[900px] mx-auto p-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-6 text-red-700 -ml-40">
        Berdasarkan Dusun
      </h2>

      <div className="w-full h-[350px] md:h-[400px] lg:h-[450px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataDusun}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius="70%"  // otomatis menyesuaikan layar
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} : ${(percent * 100).toFixed(1)}%`
              }
            >
              {dataDusun.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
