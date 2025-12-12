"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Profil Desa", href: "/profilDesa" },
  { name: "Infografis", href: "/infografis", dropdown: true },
  { name: "Berita", href: "/berita" },
  { name: "Belanja", href: "/belanja" },
]

export default function Navbar() {
  const [isScroll, setIsScroll] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === "/"

  useEffect(() => {
    if (!isHomePage) {
      setIsScroll(true)
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  return (
    <Disclosure
      as="nav"
      className={`fixed z-2000 w-full h-20 sm:h-24 lg:h-20 top-0 ${
        isScroll ? "bg-blue-950" : "bg-transparent"
      }`}
    >
      <div className="mx-auto my-2 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 flex-wrap justify-center sm:items-stretch sm:justify-between">
            <Link to="/">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Lombok Timur"
                  src="/images/lotim.png"
                  className="w-10"
                />
                <div>
                  <p className="text-xl sm:text-sm md:text-xl font-bold ml-3 text-gray-300">
                    Desa Tembeng Putik
                  </p>
                  <p className="text-sm ml-3 font-bold text-gray-300">
                    Kec. Wanasaba, Kab. Lombok Timur
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 mt-2 sm:block">
              <div className="flex items-center space-x-10 font-bold">

                {navigation.map((item) =>
                  item.dropdown ? (
                    // --- INFROGRAFIS JADI DROPDOWN SHADCN ---
                    <NavigationMenu key={item.name}>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="font-bold text-base text-gray-300 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-whitedata-[highlighted]:bg-transparent shadow-none active:text-white focus:text-white">
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className={`${isScroll ? "bg-blue-900 text-white" : "bg-blue-950/70 text-white backdrop-blur"} rounded-md`}>
                            <ul className="grid w-[300px] gap-4 p-4">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link to="/infografis">
                                    <div className="font-medium">
                                      Data Penduduk
                                    </div>
                                    <div className="text-muted-foreground">
                                      Statistik jumlah penduduk.
                                    </div>
                                  </Link>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild>
                                  <Link to="/infografis/pendidikan">
                                    <div className="font-medium">
                                      Pendidikan
                                    </div>
                                    <div className="text-muted-foreground">
                                      Informasi Pendidikan
                                    </div>
                                  </Link>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild>
                                  <Link to="/infografis/kesehatan">
                                    <div className="font-medium">
                                      Kesehatan
                                    </div>
                                    <div className="text-muted-foreground">
                                      Fasilitas dan data kesehatan desa.
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  ) : (
                    // --- MENU BIASA ---
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-3 text-white"
                          : "text-gray-300 hover:border-b-3 hover:text-white"
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">

          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="bg-blue-900 rounded-md p-2">
                {/* Submenu mobile */}
                <p className="text-white font-bold">{item.name}</p>
                <div className="mt-2 ml-4 space-y-2">
                  <Link className="block text-gray-200" to="/infografis/peta">
                    Peta Wilayah
                  </Link>
                  <Link className="block text-gray-200" to="/infografis/penduduk">
                    Data Penduduk
                  </Link>
                  <Link className="block text-gray-200" to="/infografis/kesehatan">
                    Kesehatan
                  </Link>
                </div>
              </div>
            ) : (
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
            )
          )}

        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
