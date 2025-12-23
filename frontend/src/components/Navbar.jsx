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
  { name: "Produk UMKM", href: "/belanja" },
]

const infografisMenu = [
  {
    name: "Penduduk",
    href: "/infografis",
    desc: "Statistik jumlah penduduk.",
  },
  {
    name: "Pendidikan",
    href: "/infografis/pendidikan",
    desc: "Informasi pendidikan.",
  },
  {
    name: "Kesehatan",
    href: "/infografis/kesehatan",
    desc: "Informasi kesehatan masyarakat.",
  },
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
      setIsScroll(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  return (
    <Disclosure
      as="nav"
      className={`fixed z-2000 w-full h-20 sm:h-24 lg:h-20 top-0 ${isScroll ? "bg-blue-950" : "bg-transparent"
        }`}
    >
      <div className="mx-auto my-2 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <DisclosureButton className="group rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 justify-center sm:justify-between">
            <Link to="/">
              <div className="flex items-center">
                <img src="/images/lotim.png" alt="Lombok Timur" className="w-10" />
                <div className="ml-3 text-gray-300">
                  <p className="text-xl font-bold">Desa Tembeng Putik</p>
                  <p className="text-sm font-bold">
                    Kec. Wanasaba, Kab. Lombok Timur
                  </p>
                </div>
              </div>
            </Link>

            <div className="hidden sm:block mt-2">
              <div className="flex items-center space-x-10 font-bold">
                {navigation.map((item) =>
                  item.dropdown ? (
                    <NavigationMenu key={item.name}>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="text-gray-300 text-base bg-transparent hover:text-white data-[state=open]:text-white shadow-none">
                            {item.name}
                          </NavigationMenuTrigger>

                          <NavigationMenuContent
                            className={`${isScroll
                              ? "bg-blue-900"
                              : "bg-blue-950/70 backdrop-blur"
                              } text-white rounded-md`}
                          >
                            <ul className="grid w-[320px] gap-4 p-4">
                              {infografisMenu.map((sub) => (
                                <li key={sub.name}>
                                  <NavigationMenuLink asChild>
                                    <Link to={sub.href}>
                                      <div className="font-medium">
                                        {sub.name}
                                      </div>
                                      <div className="text-sm text-gray-300">
                                        {sub.desc}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  ) : (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white border-b-2"
                          : "text-gray-300 hover:text-white"
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

      {/* MOBILE MENU */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="bg-blue-900 rounded-md p-3">
                <p className="text-white font-bold">{item.name}</p>
                <div className="mt-2 ml-4 space-y-2">
                  {infografisMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block text-gray-200 hover:text-white"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 bg-blue-900 text-white rounded-md"
                    : "block px-3 py-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md"
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
