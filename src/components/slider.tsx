"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    img: "/banner4.webp",
    url: "#",
  },
  {
    id: 2,
    img: "/banner2.webp",
    url: "https://www.tokopedia.com/toserbanet/oakley-badman-006020-03-polarized-fire-lenses-outdoor-sports-glasses",
  },
  {
    id: 3,
    img: "/banner1.webp",
    url: "https://www.tokopedia.com/toserbanet/tag-heuer-aquaracer-calibre-7-gmt-way201f-pepsi-mens",
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
        className="w-max h-full flex transition-all ease-in-out duration-1000 "
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`w-screen h-full flex gap-16`}
            key={slide.id}
          >
            <Link href={slide.url} className="mx-auto aspect-video relative overflow-hidden lg:rounded-lg">
              <Image
                src={slide.img}
                alt=""
                fill
                className="object-cover overflow-hidden w-full h-full"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex gap-4 absolute m-auto left-1/2 -translate-x-1/2 bottom-3 lg:bottom-8 z-50">
        {slides.map((slide, i) => (
          <div
            className={`w-3 aspect-square rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center z-50 ${
              current === i ? "scale-150" : ""
            } relative`}
            key={slide.id}
            onClick={() => {
              setCurrent(i);
            }}
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
