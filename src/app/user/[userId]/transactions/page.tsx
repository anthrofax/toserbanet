import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import { RiShoppingBagFill } from "react-icons/ri";

function UserTransactionPage() {
  return (
    <div className="mt-5 px-3">
      <h1 className="text-xl font-semibold mb-3">Daftar Transaksi</h1>

      <div className="grid gap-2 mb-5" style={{gridTemplateRows: 'auto', gridTemplateColumns: 'repeat(4, 1fr) repeat(2, max-content)'}}>
        <div className="w-full flex justify-between items-center gap-3 flex-wrap rounded-full bg-slate-50 border-2 border-slate-500 overflow-hidden relative sm:max-w-[15rem] mx-auto sm:mx-0 col-span-6 sm:col-span-4">
          <input
            type="text"
            placeholder="Cari berdasarkan invoice"
            className="w-full h-full bg-transparent border-slate-50 ring-slate-50 ring-0 border-0 p-2 text-sm"
          />

          <button className="text-2xl absolute right-3 top-1/2 -translate-y-1/2">
            <CiSearch />
          </button>
        </div>

        <select name="" id="" className="bg-slate-300 rounded-full p-2 text-xs w-[135px] col-span-3 sm:col-span-1">
          <option value="">Semua Status</option>
          <option value="">Belum Bayar</option>
          <option value="">Sedang diproses</option>
          <option value="">Selesai</option>
        </select>
        <select name="" id="" className="bg-slate-300 rounded-full p-2 text-xs w-[135px] col-span-3 sm:col-span-1">
          <option value="">Semua Tanggal</option>
          <option value="">30 Hari Terakhir</option>
          <option value="">90 Hari Terakhir</option>
          <option value="">Pilih Tanggal Sendiri</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <div className="flex flex-col gap-2 bg-slate-50 shadow p-3 rounded-lg">
          <div className="flex justify-between gap-3 flex-wrap">
            <div className="flex gap-2 items-center">
              <RiShoppingBagFill className="text-2xl" />

              <div>
                <p className="font-semibold">18 Des 2024</p>
                <p className="text-slate-500 ">Rayban</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className="bg-red-300 rounded-lg text-red-500 p-2">
                Belum Bayar
              </div>

              <IoMdHelpCircle className="text-2xl" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative row-span-2 w-16 aspect-square rounded-lg overflow-hidden shrink-0">
              <Image
                src={"/clubmaster.webp"}
                alt=""
                fill
                layout="cover"
                sizes="33vw"
              />
            </div>

            <div>
              <p className="font-semibold ">Kacamata Original Rayban RB 4175 Clubmaster Oversized Black Doff</p>
              <p className="text-slate-500">1 Barang</p>
            </div>
          </div>

         <p>+2 produk lainnya</p>

         <div>
            <p className=" text-slate-500">Total Belanja</p>
            <p className="font-semibold text-sm">Rp.11. 312</p>
         </div>
        </div>
        <div className="flex flex-col gap-2 bg-slate-50 shadow p-3 rounded-lg">
          <div className="flex justify-between gap-3 flex-wrap">
            <div className="flex gap-2 items-center">
              <RiShoppingBagFill className="text-2xl" />

              <div>
                <p className="font-semibold">18 Des 2024</p>
                <p className="text-slate-500 ">Rayban</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className="bg-green-300 rounded-lg text-green-700 p-2">
                Belum Bayar
              </div>

              <IoMdHelpCircle className="text-2xl" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative row-span-2 w-16 aspect-square rounded-lg overflow-hidden shrink-0">
              <Image
                src={"/clubmaster.webp"}
                alt=""
                fill
                layout="cover"
                sizes="33vw"
              />
            </div>

            <div>
              <p className="font-semibold ">Kacamata Original Rayban RB 4175 Clubmaster Oversized Black Doff</p>
              <p className="text-slate-500">2 Barang</p>
            </div>
          </div>

         <div>
            <p className=" text-slate-500">Total Belanja</p>
            <p className="font-semibold text-sm">Rp.15. 515</p>
         </div>
        </div>
      </div>
    </div>
  );
}

export default UserTransactionPage;
