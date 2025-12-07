import React from "react";
import { Link, useLocation  } from "react-router-dom";

// Simple, accessible SVG icon components for: Penduduk, APBDes, Stunting, Bansos
// Tailwind-friendly props: size (number, default 48), className (string) for colors/spacing

export const IconPenduduk = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Ikon penduduk"
  >
    <title>Ikon Penduduk</title>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
    <path d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1H4v-1z" fill="currentColor" />
  </svg>
);

export const IconAPBDes = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Ikon APBDes"
  >
    <title>Ikon APBDes</title>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconStunting = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Ikon stunting"
  >
    <title>Ikon Stunting</title>
    <path d="M12 2c-2.21 0-4 1.79-4 4v3H7a1 1 0 00-1 1v6h12v-6a1 1 0 00-1-1h-1V6c0-2.21-1.79-4-4-4z" fill="currentColor" />
    <path d="M9 21v-2a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IconBansos = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Ikon bansos"
  >
    <title>Ikon Bansos</title>
    <path d="M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M12 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Default export: a small demo grid showing the icons with labels (ready to paste into your app)
export default function IconsDemo() {
  const [active, setActive] = React.useState(null);
    const location = useLocation();

  const items = [
    { id: 1, label: "Penduduk", icon: IconPenduduk, tujuan: '/infografis' },
    { id: 2, label: "APBDes", icon: IconAPBDes, tujuan: '/infografis/apbdes' },
    { id: 3, label: "Stunting", icon: IconStunting, tujuan: '/infografis/stunting' },
    { id: 4, label: "Bansos", icon: IconBansos, tujuan: '/infografis/bansos' },
  ];

  return (
    <div className="p-1 mt-26">
      <h2 className="text-lg font-semibold"></h2>
      <div className="grid grid-cols-4 gap-4 w-[500px]">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname.startsWith(item.tujuan);

          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center gap-2 p-2 rounded-lg border cursor-pointer select-none"
            >
              <Link to={item.tujuan}>
                <Icon size={56} className={isActive ? "text-blue-600" : "text-gray-700"} />
                <span className={`text-sm ${isActive ? "font-bold text-blue-600" : ""}`}>
                  {item.label}
                </span>
                <div
                  className={`w-full h-[3px] rounded-full transition-all duration-200 ${
                    isActive ? "bg-blue-600" : "bg-transparent"
                  }`}
                ></div>

              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
