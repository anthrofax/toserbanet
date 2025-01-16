"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(function () {
    const interval = setInterval(function () {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-56 md:h-[calc(50vh-80px)] lg:h-[calc(80vh-80px)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex gap-16`}
            key={slide.id}
          >
            {/* Text Container */}
            <div className="h-full w-full flex flex-col items-center justify-center gap-3 lg:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-3xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4 text-sm">
                  SHOW NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 absolute m-auto left-1/2 -translate-x-1/2 bottom-3 lg:bottom-8">
        {slides.map((slide, i) => (
          <div
            className={`w-3 aspect-square rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === i ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(i)}
          >
            {current === i && (
              <div className="w-[6px] aspect-square bg-gray-600 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
