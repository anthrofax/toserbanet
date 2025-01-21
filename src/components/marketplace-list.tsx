import { products } from "@wix/stores";
import Image from "next/image";
import shopeeIcon from "@/assets/shopee.png";
import tokopediaIcon from "@/assets/tokopedia.png";
import tiktokIcon from "@/assets/tiktok.png";
import Link from "next/link";
import { JSDOM } from "jsdom";

function MarketplaceList({
  marketplaceLinks,
}: {
  marketplaceLinks: products.AdditionalInfoSection[];
}) {
  return (
    <div className="flex gap-3">
      {marketplaceLinks.map((additionalInfo, i) => {
        const dom = new JSDOM(additionalInfo.description || "");
        const sanitizedUrl =
          dom.window.document.querySelector("p")?.textContent || "";

        if (additionalInfo.title === "tokopedia")
          return (
            <Link
              className="w-12 h-12 bg-slate-50 flex justify-center items-center rounded-full relative border-2 border-green-500 hover:bg-green-300 transition-all"
              href={sanitizedUrl}
              key={i}
              target="_blank"
            >
              <Image
                src={tokopediaIcon}
                alt="tokopedia"
                className="object-cover w-6 h-6"
              />
            </Link>
          );
        if (additionalInfo.title === "shopee")
          return (
            <Link
              className="w-12 h-12 bg-slate-50 flex justify-center items-center rounded-full relative border-2 border-orange-500 hover:bg-orange-200 transition-all"
              href={sanitizedUrl}
              key={i}
              target="_blank"
            >
              <Image
                src={shopeeIcon}
                alt="shopee"
                className="object-cover w-10 h-10"
              />
            </Link>
          );
        if (additionalInfo.title === "tiktok")
          return (
            <Link
              className="w-12 h-12 bg-slate-50 flex justify-center items-center rounded-full relative border-2 border-gray-500 hover:bg-gray-200 transition-all"
              href={sanitizedUrl}
              key={i}
              target="_blank"
            >
              <Image
                src={tiktokIcon}
                alt="Tiktok Marketplace"
                className="object-cover w-10 h-10"
              />
            </Link>
          );

        return null;
      })}
    </div>
  );
}

export default MarketplaceList;
