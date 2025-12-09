
export default function Profil() {
  return (
    <div className="visi-misi-container mt-15 w-full bg-blue-50 h-full pt-0.5">

      <div>
        {/* Visi */}
        <div>
          <div className="card bg-gray-300 mx-5 lg:mx-50 rounded-l-lg rounded-r-lg p-10 mt-15">
            <h2 className="title text-center font-bold text-[45px] text-red-700 mb-5">Visi</h2>
            <p className="visi-text text-xl text-center">
              “Visi Desa Tembeng Putik, mewujudkan masyarakat desa tembeng putik yang MAKMUR (Maju, Aman, Keadilan Sosial, Musyawarah Mufakat dan Religius.)”</p>
          </div>

          {/* Misi */}
          <div className="card bg-gray-300 mx-5 lg:mx-50 rounded-l-lg rounded-r-lg mt-5 p-5">
            <h2 className="title text-center font-bold text-[45px] text-red-700 mb-5">Misi</h2>
            <p className="misi-list text-lg text-justify mt-1">
            <p>Bersama masyarakat memajukan dan memperkuat kelembagaan desa yang sudah ada sehingga dapat melayani. Bersama masyarakat dan kelembagaan desa dalam mewujubkan desa tembeng putik yang aman dan tenteram. Bersama masyarakat kelembagaan desa membangun desa tembeng putik sampai puncak pembangunan yang berhasil. Bersama masyarakat kelembagaan desa menggali gagasan program pembangunan desa dari musyawarah. Bersama masyarakat kelembagaan desa membantu masyarakat dalam mengembangkan karakter religius.</p>
            </p>
          </div>
        </div>
      </div>

{/* Struktur Organisasi Desa Tembeng Putik */}
      <div className="bg-gray-300 mt-10">

        <div>
          <div className="mx-5 py-20 md:mx-24">
            <h1 className="font-bold text-[40px] text-red-700">Bagan Desa</h1>
            <p className="text-[20px] font-bold">Struktur Organisasi Desa Tembeng Putik</p>
          </div>
          <div className="flex justify-center">
              <img src="/images/foto.jpg" alt="struktur desa" className="w-[90%] rounded-2xl" />
          </div>
          <div className="flex justify-center mt-5">
              <img src="/images/struktur desa.jpg" alt="struktur desa" className="w-[90%] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
