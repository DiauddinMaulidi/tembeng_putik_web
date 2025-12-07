import { FaInstagram, FaFacebook, FaYoutube, FaPlay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Desa Info */}
        <div>
          <h2 className="text-base font-bold mb-2">Pemerintah Desa Tembeng Putik</h2>
          <p className="text-sm leading-relaxed">
            Jalan Langaseng Dusun Empang RT. 001/003,<br />
            Desa Tembeng Putik, Kec. Wanasaba,<br />
            Kabupaten Lombok Timur,<br />
            Provinsi Nusa Tenggara Barat 75385
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold mb-2">Hubungi Kami</h2>
          <p className="text-sm mb-1">📞 0813-3070-3717</p>

          <div className="flex space-x-3 mt-3 text-xl">
            <a href="#" className="hover:text-gray-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaYoutube /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaPlay /></a>
          </div>
        </div>

        {/* Important Numbers */}
        <div>
          <h2 className="text-lg font-bold mb-2">Nomor Telepon Penting</h2>
          <p className="text-sm">• Drs. FAHMI (Kades Tembeng Putik)</p>
          <p className="text-sm">• Yony (Ambulan Tembeng Putik)</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-bold mb-2">Jelajahi</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-gray-300 transition">Website Tembeng Putik</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Website Kabupaten</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Siskeudes</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Siskeudes Online</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="text-center text-sm mt-8 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Powered by PT Digital Desa Indonesia
      </div>
    </footer>
  );
}
