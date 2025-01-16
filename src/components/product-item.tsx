import Image from "next/image";
import Link from "next/link";

function ProductItem({ className }: { className?: string }) {
  return (
    <Link
      href=""
      className={`bg-slate-50 rounded-lg h-max ${
        className ? className : ""
      }`}
    >
      <div className="h-56 w-full relative">
        <Image
          src={
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEheMiY4rsn326_nVFAg7l-0j-f5gxUld1n9HX93QlYCepz8cobuLtXmkik9y_2zZ-9jd08NXiAeDIaACauMBTaOQvIwbU9Ys5ewdarfEMTn_rImpqVUvizI08JAzjTh0VdQXLdMhXlrAn3yVLZK9CdB7dk70IExmRuIKvLqfu-nubGq13zeYPfq-XbXZ3iW/w400-h400/FireShot%20Capture%20050%20-%20Men-Spring-Autumn-Casual-Shoes-Men-Sneakers-Light-Shoes-Vulcanize-Sho_%20-%20ae01.alicdn.com.jpg"
          }
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h4 className="">Frame Kacamata Bulat & Kotak 2227</h4>
        <p className="font-bold text-xl">Rp.55.000</p>
      </div>
    </Link>
  );
}

export default ProductItem;
