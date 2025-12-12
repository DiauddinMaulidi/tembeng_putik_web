import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";

const data = [
  {
    id: 1,
    user: { image: "/images/user/user-17.jpg", name: "Abram Schleifer" },
    position: "Sales Assistant",
    office: "Edinburgh",
    age: 57,
    start: "25 Apr, 2027",
    salary: "$89,000",
  },
  {
    id: 2,
    user: { image: "/images/user/user-18.jpg", name: "Carla George" },
    position: "Sales Assistant",
    office: "London",
    age: 45,
    start: "11 May, 2027",
    salary: "$155,000",
  },
];

export default function DatatableTailAdmin() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm w-full overflow-hidden">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span>entries</span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md pl-10 pr-3 py-2 w-64 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Table */}
      <div className="table-scroll-wrapper">
        <Table className="min-w-[1300px]">
          <TableHeader>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.user.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{item.user.name}</span>
                  </div>
                </TableCell>

                <TableCell>{item.position}</TableCell>
                <TableCell>{item.office}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.start}</TableCell>

                {/* Many Salary Columns */}
                {[...Array(10)].map((_, i) => (
                  <TableCell key={i}>{item.salary}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
