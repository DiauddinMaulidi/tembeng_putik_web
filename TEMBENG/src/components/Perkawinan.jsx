export default function BerdasarkanPerkawinan() {
  const data = [
    { title: "Belum Kawin", jumlah: 623, img: "images/belum kawin.svg" },
    { title: "Kawin", jumlah: 458, img: "images/Kawin.svg" },
    { title: "Cerai Mati", jumlah: 69, img: "images/cerai mati.svg" },
    { title: "Cerai Hidup", jumlah: 4, img: "images/cerai hidup.svg" },
    { title: "Kawin Tercatat", jumlah: 3, img: "https://img.icons8.com/fluency/64/approval.png" },
    { title: "Kawin Tidak Tercatat", jumlah: 0, img: "images/kawin tidak tercatat.svg" },
  ];

  return (
    <div className="w-[95%] md:w-[85%] mx-auto mt-10">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Berdasarkan Perkawinan
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40 border">
            <div className="flex items-center gap-2">
              <img src={item.img} alt={item.title} className="w-12 h-12" />
              <p className="text-gray-700 font-semibold">{item.title}</p>
            </div>
            <p className="text-3xl font-bold text-red-700 mt-2">{item.jumlah}</p>
          </div>
        ))}
      </div>
    </div>
  );
}