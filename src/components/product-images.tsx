"use client";

import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { products } from "@wix/stores";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";

function ProductImages({ imageItems }: { imageItems: products.MediaItem[] | undefined }) {
  const [index, setIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1); // Default ratio 1:1
  const [imageOpenIndex, setImageOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (imageItems && imageItems[index]?.image) {
      const { width, height } = imageItems[index].image;
      if (width && height) {
        setAspectRatio(width / height);
      }
      console.log(aspectRatio)
    }
  }, [index, imageItems]);

  if (!imageItems) return null;

  return (
    <div>
      {/* Main Image - Dynamically Adjust Height */}
      <div className="relative w-full cursor-pointer" style={{ paddingTop: `${100 / aspectRatio}%` }} onClick={() => {
        setImageOpenIndex(index)
      }}>
        <Image
          src={imageItems[index]?.image?.url || "/product.png"}
          alt="Main Product Image"
          fill
          sizes="50vw"
          className="shadow object-contain rounded-md"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-between gap-4 mt-1 lg:mt-8 overflow-auto">
        {imageItems.map((imageObj: any, i: number) => (
          <div
            className="w-1/4 aspect-square relative gap-4 mt-8 cursor-pointer shrink-0"
            key={imageObj._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={imageObj?.image.url || "/product.png"}
              alt={`Thumbnail ${i}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {
        typeof window !== 'undefined' && imageOpenIndex !== null &&
        createPortal(
          <div className="fixed top-0 right-0 bottom-0 left-0">
            <div className="w-full h-full bg-slate-900/50 cursor-pointer" onClick={() => setImageOpenIndex(null)} />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10">
              <div className="relative w-[35rem] cursor-default" style={{ paddingTop: `${100 / aspectRatio}%` }}>
                <Image
                  src={imageItems[index]?.image?.url || "/product.png"}
                  alt="Main Product Image"
                  fill
                  sizes="50vw"
                  className="shadow object-contain rounded-md"
                />
              </div>
            </div>

            <button className="fixed cursor-default left-0 rounded-r-lg bg-slate-900/50 py-10 top-1/2 -translate-y-1/2">
              <IoIosArrowBack className="text-5xl text-slate-50" />
            </button>
          </div>
          ,
          document.body)
      }
    </div>
  );
}

export default ProductImages;