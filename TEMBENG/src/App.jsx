
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Populasi from "./components/Populasi";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CarouselPlugin />
              <Sambutan />
              <MapSelong/>
              <Administrasi />
              <Berita />
              <Populasi/>
            </>
          }>
        </Route>
        <Route path="/profilDesa" element={<Profil />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/infografis" element={<Infografis />}>
          <Route index element={<Navigate to="penduduk" replace />} />
          {/* <Route path="penduduk" element={<Penduduk />} /> */}
          {/* <Route path="apbdes" element={<APBDes />} /> */}
          {/* <Route path="stunting" element={<Stunting />} /> */}
          {/* <Route path="bansos" element={<Bansos />} /> */}
        </Route>
        <Route path="/Login" element={<Login/>} />
        {/* <Route path="/Penduduk" element={<Penduduk/>} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
