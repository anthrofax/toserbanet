import { ImDropbox } from "react-icons/im";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiLuggageCartLine } from "react-icons/ri";

function ShopService() {
  return (
    <div className="pt-5 flex flex-col gap-1">
      <div className="px-3 flex items-center justify-center gap-2">
        <div className="h-1 rounded-full flex-grow bg-slate-400" />
        <h3 className="ml-2 font-bold text-lg sm:text-xl shrink-0">Layanan Toko Kami</h3>
        <div className="h-1 rounded-full flex-grow bg-slate-400" />
      </div>

      <div className="h-[16rem] relative">
        <div className="h-2/4"></div>
        <div className="h-2/4 bg-blue-500"></div>
        <div className="absolute w-full h-full flex items-center justify-center py-5 top-0">
          <div className="flex gap-3 xl:justify-center overflow-x-auto scrollbar-hide px-3">
            <div className="flex flex-col items-center gap-2 text-center shrink-0 w-72 lg:w-96 bg-slate-200/80 py-10 px-5 rounded-lg">
              <ImDropbox className="text-5xl" />

              <div className="space-y-2">
                <h4 className="font-medium text-xl">Produk Original</h4>
                <p>
                  Kami pastikan Anda mendapatkan produk dengan kualitas Original
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center shrink-0 w-72 lg:w-96 bg-slate-200/80 py-10 px-5 rounded-lg">
              <RiLuggageCartLine className="text-5xl" />

              <div className="space-y-2">
                <h4 className="font-medium text-xl">Easy Checkout</h4>
                <p>Pesanan Anda otomatis terhubung ke Nomer WhatsApp.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center shrink-0 w-72 lg:w-96 bg-slate-200/80 py-10 px-5 rounded-lg">
              <IoChatbubbleEllipsesOutline className="text-5xl" />

              <div className="space-y-2">
                <h4 className="font-medium text-xl">CS Ramah</h4>
                <p>
                  Anda dapat menghubungi CS Kami kapan saja untuk konfirmasi
                  pesanan Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopService;
