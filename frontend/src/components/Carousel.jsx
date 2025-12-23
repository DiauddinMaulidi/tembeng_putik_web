"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const slides = [
    {
      image: "/images/Desa.jpg",
      title: "Selamat Datang\nWebsite Resmi Desa Tembeng Putik",
      subtitle: "Kecamatan Wanasaba",
    },
    {
      image: "/images/mtq.jpeg",
      title: "Kegiatan Desa",
      subtitle: "MTQ (Musabaqah Tilawatil Qur'an)",
    },
    {
      image: "/images/jembatan.jpg",
      title: "Pembangunan Desa",
      subtitle: "Maju, Mandiri, dan Sejahtera",
    },
  ];

  return (
    <div className="w-full bg-cover h-screen overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative w-full bg-cover h-screen"
            >
              <div
                className="w-full h-full bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-24 transition-all duration-700"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 bg-black/0 p-6 rounded-lg mb-5 text-center text-white">
                  <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mt-3">{slide.subtitle}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 text-white bg-black/40 hover:bg-black/70" />
        <CarouselNext className="right-4 text-white bg-black/40 hover:bg-black/70" />
      </Carousel>
    </div>
  );
}
