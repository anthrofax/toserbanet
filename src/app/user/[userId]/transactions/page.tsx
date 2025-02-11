import { wixClientServer } from "@/lib/wix-client-server";
import { formatDate } from "@/utils/date-formatter";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import { RiShoppingBagFill } from "react-icons/ri";
import { media as wixMedia } from "@wix/sdk";
import Link from "next/link";
import { notFound } from "next/navigation";
import NotFoundInfo from "@/components/not-found-info";

async function UserTransactionPage() {
  const wixClient = await wixClientServer();

  const currentMember = await wixClient.members.getCurrentMember();
  const orders = await wixClient.orders.searchOrders({
    search: {
      filter: {
        "buyerInfo.contactId": { $eq: currentMember.member?.contactId },
      },
    },
  });

  return (
    <div className="mt-5 px-3 overflow-hidden h-full">
      {!orders || orders.orders.length < 1 ? (
        <NotFoundInfo
          description="Pesanan anda akan tampil disini, saat sudah melakukan pemesanan nanti"
          object="Pesanan"
          customIconUrl="/order-delivery.svg"
          customTitle="Anda belum memiliki pesanan saat ini"
        />
      ) : (
        <>
          <h1 className="text-xl font-semibold mb-3">Daftar Transaksi</h1>

          <div
            className="grid gap-2"
            style={{
              gridTemplateRows: "auto",
              gridTemplateColumns: "repeat(4, 1fr) repeat(2, max-content)",
            }}
          >
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

            <select
              name=""
              id=""
              className="bg-slate-300 rounded-full p-2 text-xs w-[135px] col-span-3 sm:col-span-1"
            >
              <option value="">Semua Status</option>
              <option value="">Belum Bayar</option>
              <option value="">Sedang diproses</option>
              <option value="">Selesai</option>
            </select>
            <select
              name=""
              id=""
              className="bg-slate-300 rounded-full p-2 text-xs w-[135px] col-span-3 sm:col-span-1"
            >
              <option value="">Semua Tanggal</option>
              <option value="">30 Hari Terakhir</option>
              <option value="">90 Hari Terakhir</option>
              <option value="">Pilih Tanggal Sendiri</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 text-xs lg:max-h-[38rem] my-5 px-3 overflow-y-auto scrollbar">
            {orders.orders.map((order) => (
              <Link
                href={`/user/${currentMember.member?.contactId}/transactions/${order._id}`}
                key={order._id}
                className="flex flex-col gap-2 bg-slate-50 shadow p-3 rounded-lg"
              >
                <div className="flex justify-between gap-3 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <RiShoppingBagFill className="text-2xl" />

                    <div>
                      <p className="font-semibold text-xs sm:text-base">
                        Pesanan #{order.number}
                      </p>
                      <p className="text-slate-500 ">
                        {" "}
                        {formatDate(new Date(`${order.purchasedDate}`))}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <div
                      className={`rounded-lg p-2 ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-300 text-green-700"
                          : "bg-red-300 text-red-500"
                      }`}
                    >
                      {order.paymentStatus === "PAID"
                        ? "Sudah Bayar"
                        : "Belum Bayar"}
                    </div>

                    <IoMdHelpCircle className="text-2xl" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="relative row-span-2 w-16 aspect-square rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        (order.lineItems && order?.lineItems[0].image) ||
                          "/product.png",
                        128,
                        128,
                        {}
                      )}
                      alt=""
                      fill
                      layout="cover"
                      sizes="33vw"
                    />
                  </div>

                  <div>
                    <p className="font-semibold ">
                      {(order.lineItems &&
                        order.lineItems[0].productName?.translated) ||
                        ""}
                    </p>
                    <p className="text-slate-500">
                      {(order.lineItems && order.lineItems[0].quantity) || 0}{" "}
                      Barang
                    </p>
                  </div>
                </div>

                {order.lineItems && order.lineItems.length > 1 && (
                  <p className="mt-2">
                    +{order.lineItems.length - 1} produk lainnya
                  </p>
                )}

                <div>
                  <p className=" text-slate-500">Total Belanja</p>
                  <p className="font-semibold text-sm">
                    {order.priceSummary?.total?.formattedAmount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserTransactionPage;
