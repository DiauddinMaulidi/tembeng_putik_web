import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import CarouselPlugin from "./components/Carousel";
import Navbar from "./components/Navbar";
import Sambutan from "./components/Sambutan";
import MapSelong from "./components/MapDesa";
import Profil from "./components/Profil";
import Footer from "./components/Footer";
import Administrasi from "./components/Administrasi";
import Berita from "./components/Berita";
import DetailBerita from "./components/DetailBerita";
import Infografis from "./components/Infografis";
import Belanja from "./components/Belanja";
import Gallery from "./components/Gallery";
import ProductCard from "./components/ProductCard";
import Sotk from "./components/Sotk";
import Pemerintah from "./components/Pemerintah";

import "leaflet/dist/leaflet.css";
import BeritaAll from "./components/BeritaAll";
import GaleryAll from "./components/GaleryAll";
import BelanjaAll from "./components/BelanjaAll";
import Pendidikan from "./components/Pendidikan";
import Kesehatan from "./components/Kesehatan"
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarouselPlugin />
                <Sambutan />
                <MapSelong />
                <Sotk />
                <Administrasi />
                <Berita />
                <Belanja />
                <Gallery />
              </>
            }
          />
          <Route path="/profilDesa" element={<Profil />} />
          <Route path="/berita/:judul" element={<DetailBerita />} />
          <Route path="/infografis" element={<Infografis />} />
          <Route path="/belanja/:judul" element={<ProductCard />} />
          <Route path="/pemerintah" element={<Pemerintah />} />
          <Route path="/berita" element={<BeritaAll />} />
          <Route path="/gallery" element={<GaleryAll />} />
          <Route path="/belanja" element={<BelanjaAll />} />
          <Route path="/infografis/pendidikan" element={<Pendidikan />} />
          <Route path="/infografis/Kesehatan" element={<Kesehatan />} />
        </Routes>
      </main>

      <Footer />
    </div>

  );
}

export default App;
