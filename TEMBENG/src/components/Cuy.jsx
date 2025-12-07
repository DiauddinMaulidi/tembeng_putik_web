export default function BerdasarkanPekerjaan() {
  const data = [
    { jenis: "Pelajar/Mahasiswa", jumlah: 326 },
    { jenis: "Belum/Tidak Bekerja", jumlah: 273 },
    { jenis: "Mengurus Rumah Tangga", jumlah: 271 },
    { jenis: "Buruh Harian Lepas", jumlah: 117 },
    { jenis: "Nelayan/Perikanan", jumlah: 50 },
    { jenis: "Petani/Pekebun", jumlah: 39 },
    { jenis: "Wiraswasta", jumlah: 27 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-[95%] md:w-[85%] bg-white rounded-xl p-6 shadow">
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-red-600">
          Berdasarkan Pekerjaan
        </h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="p-3 text-left text-lg">Jenis Pekerjaan</th>
                <th className="p-3 text-left text-lg">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-700">{row.jenis}</td>
                  <td className="p-3 font-semibold text-gray-700">{row.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grid Statistik */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="bg-white border shadow-sm rounded-xl flex flex-col justify-between p-6 h-40">
              <h2 className="text-gray-600 font-medium">{item.jenis}</h2>
              <p className="text-3xl font-bold text-gray-700 text-right">
                {item.jumlah}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}