import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/"},
  { name: "Profil Desa", href: "/profilDesa"},
  { name: "Infografis", href: "/infografis"},
  { name: "Berita", href: "/berita"},
  { name: "Belanja", href: "/belanja"},
  { name: "Login", href: "/login"},
];

export default function Navbar() {
  const [isScroll, setIsScroll] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsScroll(true); // halaman lain langsung biru
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <Disclosure
      as="nav"
      className={`fixed z-2000 w-full h-20 top-0 ${
        isScroll
          ? "bg-blue-950"
          : "bg-transparent shadow-none border-b-0 backdrop-blur-0"
      }`}
    >
      <div className="mx-auto my-2 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 justify-center my-center sm:items-stretch sm:justify-between">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/images/lotim.png"
                className="w-10"
              />
              <div>
                <p className="text-xl font-bold ml-3 text-gray-300">
                  Desa Tembeng Putik
                </p>
                <p className="text-sm ml-3 font-bold text-gray-300">
                  Kec. Wanasaba, Kab. Lombok Timur
                </p>
              </div>
            </div>
            <div className="hidden sm:ml-6 mt-2 sm:block">
              <div className="flex w-full space-x-10">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({isActive}) =>
                      isActive
                        ? "border-b-3 text-white"
                        : "text-gray-300 hover:border-b-3 hover:text-white "
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-md px-3 py-2 bg-blue-900 text-white"
                  : "block rounded-md px-3 py-2 text-gray-300 hover:bg-blue-800 hover:text-white"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
