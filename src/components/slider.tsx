"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, MouseEvent, TouchEvent } from "react";
import banner1 from "../../public/banner1.webp";
import banner2 from "../../public/banner2.webp";
import banner4 from "../../public/banner4.webp";

const slides = [
  {
    id: 1,
    img: banner4,
    url: "#",
  },
  {
    id: 2,
    img: banner2,
    url: "https://www.tokopedia.com/toserbanet/oakley-badman-006020-03-polarized-fire-lenses-outdoor-sports-glasses",
  },
  {
    id: 3,
    img: banner1,
    url: "https://www.tokopedia.com/toserbanet/tag-heuer-aquaracer-calibre-7-gmt-way201f-pepsi-mens",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  // Function to start interval for auto slide
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  // Stop interval
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Effect hook to start the interval on component mount
  useEffect(() => {
    startInterval();
    return () => stopInterval(); // Cleanup the interval when the component unmounts
  }, []);

  // Logic for handling drag/move on mouse down
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    stopInterval(); // Stop interval on manual interaction
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (offsetX > 100) {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (offsetX < -100) {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
    setOffsetX(0);

    startInterval(); // Restart the interval after manual interaction
  };

  // Logic for handling touch swipe
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);

    stopInterval(); // Stop interval on manual interaction
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setOffsetX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (offsetX > 100) {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (offsetX < -100) {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
    setOffsetX(0);
    startInterval(); // Restart the interval after manual interaction
  };

  // console.log(slides[0].img)

  return (
    <div
      className="h-56 md:h-[calc(50vh-80px)] lg:h-[calc(80vh-80px)] overflow-hidden relative"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`w-screen h-full flex justify-center items-center gap-16`}
            key={slide.id}
          >
            <Link
              href={slide.url}
              className={`w-full relative lg:rounded-lg shrink-0`}
              draggable="false"
              style={{
                paddingBottom: `${100 / (slide.img.width / slide.img.height)}%`,
              }}
            >
              <Image
                src={slide.img}
                alt=""
                fill
                draggable="false"
                layout="contain"
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
