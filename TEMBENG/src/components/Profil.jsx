
export default function Profil() {
  return (
    <div className="visi-misi-container mt-15 w-full bg-blue-50 h-full">
      
      {/* Visi */}
      <div className="card bg-gray-300 mx-50 rounded-l-lg rounded-r-lg p-10 mt-15">
        <h2 className="title text-center font-bold text-[45px] text-red-700 mb-5">Visi</h2>
        <p className="visi-text text-xl text-center">
          “Visi Desa Tembeng Putik, mewujudkan masyarakat desa tembeng putik yang MAKMUR (Maju, Aman, Keadilan Sosial, Musyawarah Mufakat dan Religius.)”</p>
      </div>

      {/* Misi */}
      <div className="card bg-gray-300 mx-50 rounded-l-lg rounded-r-lg mt-5 p-5">
        <h2 className="title text-center font-bold text-[45px] text-red-700 mb-5">Misi</h2>
        <ol className="misi-list text-lg text-justify mt-1">
        <p>Bersama masyarakat memajukan dan memperkuat kelembagaan desa yang sudah ada sehingga dapat melayani. Bersama masyarakat dan kelembagaan desa dalam mewujubkan desa tembeng putik yang aman dan tenteram. Bersama masyarakat kelembagaan desa membangun desa tembeng putik sampai puncak pembangunan yang berhasil. Bersama masyarakat kelembagaan desa menggali gagasan program pembangunan desa dari musyawarah. Bersama masyarakat kelembagaan desa membantu masyarakat dalam mengembangkan karakter religius.</p>
        </ol>
        <a href="#" className="more-link"></a>
      </div>

{/* Struktur Organisasi Desa Tembeng Putik */}
      <div className="bg-gray-300">
        <div className="header mx-10 sm:mx-40">
          <h1 className="mt-40 font-bold text-[40px] text-red-700 mt-10">Bagan Desa</h1>
          <p className="text-[20px] mt-1">Struktur Organisasi Desa Tembeng Putik</p>
        </div>
          <div className="w-full py-10 px-4 flex justify-center">
                <div className="max-w-5xl w-full bg-white shadow-xl rounded-xl p-6 border">

                  {/* ========================== */}
                  {/*        HEADER TITLE        */}
                  {/* ========================== */}
                  <div className="text-center mb-8">
                    <h1 className=" font-extrabold text-xl">
                      STRUKTUR ORGANISASI DAN TATA KERJA (SOTK)
                    </h1>

                    <h2 className="text-3xl font-extrabold text-red-900">
                      PEMERINTAH DESA TEMBENG PUTIK
                    </h2>

                    <h3 className=" font-bold mt-1">
                      KECAMATAN WANASABA • KABUPATEN LOMBOK TIMUR
                    </h3>
                  </div>

                  {/* ========================== */}
                  {/*            BPD             */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 bg-white-200 text-black-500 font-bold rounded shadow border-2 border-red-500">
                      BPD
                    </div>
                  </div>

                  {/* ========================== */}
                  {/*        KEPALA DESA         */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 border-2 border-red-500 rounded font-bold bg-white-200">
                      KEPALA DESA <br />
                      <span className="font-semibold text-black-500">Drs. FAHMI</span>
                    </div>
                  </div>

                  {/* ========================== */}
                  {/*        SEKRETARIS          */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 bg-black-500 text-black border-2 border-red-500 rounded font-bold">
                      SEKRETARIS <br />
                      <span className="font-semibold text-black-500">SAMSURIJAL JAMIL, S.Pd</span>
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/*          ROW: KASI + KAUR (5 KOTAK HORIZONTAL)                   */}
                  {/* ================================================================= */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

                    {/* Kasi Kesra */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KASI KESRA</div>
                      <div className="text-sm font-semibold text-black-500">SAPARWADI, S.Pd</div>
                    </div>

                    {/* Kasi Pelayanan */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KASI PELAYANAN</div>
                      <div className="text-sm font-semibold text-black-500">SURYAIDI HMR, S.Pd</div>
                    </div>
                    {/* Kasi Pelayanan */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KASI PEMERINTAHAN</div>
                      <div className="text-sm font-semibold text-black-500">MUHAMMAD SYAUQI, SH</div>
                    </div>

                    {/* Kasi Pemerintahan */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAUR KEUANGAN</div>
                      <div className="text-sm font-semibold text-black-500">MUSIP</div>
                    </div>

                    {/* Kaur Keuangan */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAUR PERENCANAAN</div>
                      <div className="text-sm font-semibold text-black-500">HABIBURRAHMAN</div>
                    </div>

                    {/* Kaur Perencanaan */}
                    <div className="p-3 border-2 border-red-500 rounded bg-white">
                      <div className="font-bold text-black-500">KAUR TU DAN UMUM</div>
                      <div className="text-sm font-semibold text-black-500">SAIFUL WATHANI, SE</div>
                    </div>
                  </div>

                  {/* ========================== */}
                  {/*            OPERATOR          */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-10">
                    <div className="px-6 py-3 bg-white border-2 border-red-500 rounded text-center">
                      <div className="font-bold text-black-500">OPERATOR</div>
                      <div className="text-sm font-semibold text-balck-500">ROHANI SAMI, S.Pd</div>
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/*          ROW: KAWIL (5 KOTAK BAWAH)                              */}
                  {/* ================================================================= */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAWIL LENGKOK LENDANG</div>
                      <div className="text-sm font-semibold text-black-500">AWALUDDIN S.Pdi</div>
                    </div>

                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAWIL TB. BARET I</div>
                      <div className="text-sm font-semibold text-black-500">H. SHARAFUDIN</div>
                    </div>

                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAWIL TB. BARET II</div>
                      <div className="text-sm font-semibold text-black-500">JAELANI</div>
                    </div>

                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAWIL TB. TIMUK I</div>
                      <div className="text-sm font-semibold text-black-500">HAMNI</div>
                    </div>

                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">KAWIL TB. TIMUK II</div>
                      <div className="text-sm font-semibold text-black-500">ROHANI, S.Pt</div>
                    </div>

                  </div>

                </div>
          </div>
      </div>

      <div>
                  <div className="w-full bg-gray-300 py-10 px-4 flex justify-center">
                <div className="max-w-5xl w-full bg-white shadow-xl rounded-xl p-6 border">

                  {/* ========================== */}
                  {/*        HEADER TITLE        */}
                  {/* ========================== */}
                  <div className="text-center mb-8">
                    <h1 className=" font-extrabold text-xl">
                      STRUKTUR ORGANISASI
                    </h1>

                    <h2 className="text-3xl font-extrabold text-red-900">
                      BADAN PERMUSYAWARATAN DESA (BPD)
                    </h2>

                    <h3 className=" font-bold mt-1">
                      DESA TEMBENG PUTIK • KABUPATEN LOMBOK TIMUR KABUPATEN LOMBOK TIMUR
                    </h3>
                  </div>

                  {/* ========================== */}
                  {/*        KEPALA BPD          */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 border-2 border-red-500 rounded font-bold bg-white-200">
                      KETUA BPD <br />
                      <span className="font-semibold text-black-500 text-base">SUHANDI, S.Pdi</span>
                    </div>
                  </div>
              <div>{/* ========================== */}
                  {/*        WAKIL KETUA          */}
                  {/* ==========================  */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 bg-black-500 text-black border-2 border-red-500 rounded font-bold text-center">
                      WAKIL KETUA <br />
                      <span className="font-semibold text-black-500">HASMAN, S.Pd</span>
                    </div>
                  </div>
                </div>

                  {/* ========================== */}
                  {/*        SEKRETARIS          */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-6">
                    <div className="px-6 py-3 bg-black-500 text-black border-2 border-red-500 rounded font-bold text-center">
                      SEKRETARIS <br />
                      <span className="font-semibold text-black-500">FATHURRAHMAN, S.Pd</span>
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/*                           ROW: 6 ANGGOTA                          */}
                  {/* ================================================================= */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

                    {/* ANGGOTA */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-black-500">HAMBALI, S.Pd</div>
                    </div>

                    {/* ANGGOTA */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-black-500">KUSUMA WARDANI</div>
                    </div>

                    {/* ANGGOTA */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-black-500">SUHANI</div>
                    </div>

                    {/* ANGGOTA */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-black-500">BAIQ FITRI HANDAYANI, S.Pd</div>
                    </div>

                    {/* ANGGOTA */}
                    <div className="p-3 border-2 border-red-500 rounded text-center bg-white">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-black-500">SUHPAN</div>
                    </div>
                  </div>

                  {/* ========================== */}
                  {/*            ANGGOTA         */}
                  {/* ========================== */}
                  <div className="flex justify-center mb-10">
                    <div className="px-6 py-3 bg-white border-2 border-red-500 rounded text-center">
                      <div className="font-bold text-black-500">ANGGOTA</div>
                      <div className="text-sm font-semibold text-balck-500">DEDI YANTO</div>
                    </div>
                  </div>
                </div>
          </div>  
      <div>
    </div>
      </div>
    </div>
  );
}
