export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">Diak</h1>

      <nav className="space-y-6">
        <div>
          <p className="text-slate-400 text-sm mb-2">Menu</p>
          <ul className="space-y-2">
            <li className="text-blue-400">Dashboard</li>
            <li className="text-slate-300 hover:text-white">Halaman Berita</li>
            <li className="text-slate-300 hover:text-white">Halaman UMKM</li>
            <li className="text-slate-300 hover:text-white">Gallery</li>
          </ul>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-2">Pages</p>
          <ul className="space-y-2">
            <li className="text-slate-300 hover:text-white">Admin Form</li>
            <li className="text-slate-300 hover:text-white">Calendar</li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
