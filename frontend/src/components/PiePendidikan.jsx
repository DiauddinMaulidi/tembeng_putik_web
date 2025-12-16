import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759"];

export default function PiePendidikan({ dataGender }) {
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLabel(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   const pieData = dataDusun.map((d) => ({
//     name: d.name,
//     value: d.laki + d.perempuan,
//   }));

  return (
    <div className="h-[350px] md:h-[400px] mt-10 bg-gray-100 p-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataGender}
            cx="50%"
            cy="50%"
            dataKey="value"
            label={showLabel ? ({ name }) => name : false}
          >
            {dataGender.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(v) => `${v}`} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
