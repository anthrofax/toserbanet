
import banner1 from "../../public/banner1.jpg";
import banner2 from "../../public/banner2.jpg";
import Image from "next/image";

function CustomerTestimoni() {
  return (
    <div className="py-5 flex flex-col gap-3">
      <div className="px-3">
        <h3 className="ml-2 font-bold text-xl">Testimoni Pelanggan</h3>
      </div>

      <div className="container mx-auto">
        <div className="px-3 flex gap-3 overflow-x-scroll scrollbar-hide">
          <div className="h-56 flex-shrink-0">
            <Image
              src={banner1}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>

          <div className="h-56 flex-shrink-0">
            <Image
              src={banner2}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
          <div className="h-56 flex-shrink-0">
            <Image
              src={banner1}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
          <div className="h-56 flex-shrink-0">
            <Image
              src={banner2}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerTestimoni;
