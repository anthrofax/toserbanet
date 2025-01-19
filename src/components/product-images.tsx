/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { products } from "@wix/stores";
// import { MediaItems } from "@wix/stores";
import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/39716/pexels-photo-39716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];

function ProductImages({
  imageItems,
}: {
  imageItems: products.MediaItem[] | undefined;
}) {
  const [index, setIndex] = useState(0);

  if (!imageItems) return null;

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={imageItems[index]?.image?.url || "/product.png"}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {imageItems.map((imageObj: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={imageObj._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={imageObj?.image.url || "/product.png"}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
