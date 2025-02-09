import { wixClientServer } from "@/lib/wix-client-server";
import { notFound } from "next/navigation";
import { MdOutlineContentCopy } from "react-icons/md";
import DateLabel from "@/components/date-label";
import { rupiahFormatter } from "@/utils/number-formatter";
import OrderItem from "@/components/order-item";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const wixClient = await wixClientServer();
  const order = await wixClient.orders.getOrder((await params).orderId);

  if (!order) {
    notFound();
  }

  console.log(order);
  console.log("Route Intercepted");

  return (
    <div className="overflow-y-auto flex flex-col gap-3 text-xs py-3 pr-1 lg:pr-3">
      <div className="bg-slate-50 p-3 flex flex-col gap-2">
        <h1 className="text-base font-semibold">Detail Pesanan</h1>
        <hr className="w-full border-2" />

        <div
          className="gap-y-2 place-content-between"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1rem",
          }}
        >
          <div className="flex gap-2 items-center">
            <span className="line-clamp-1">{order._id}</span>
            <MdOutlineContentCopy className="shrink-0" />
          </div>

          <p className="text-blue-500 font-semibold text-end">Lihat Invoice</p>

          <p>Tanggal Pembelian</p>

          <DateLabel
            date={order.purchasedDate || null}
            options={{
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hourCycle: "h24",
            }}
            className="text-end"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50 shadow p-3">
        <h3 className="text-base font-semibold">Detail Produk</h3>

        <OrderItem
          itemImage={
            (order.lineItems && order?.lineItems[0].image) || "/product.png"
          }
          itemName={
            (order.lineItems && order.lineItems[0].productName?.translated) ||
            ""
          }
          price={
            order.lineItems[0].price?.formattedAmount ||
            rupiahFormatter.format(0)
          }
          quantity={order.lineItems[0].quantity}
        />
        <hr className="w-full border-2" />
        {order.lineItems.length > 1 &&
          order.lineItems.slice(1).map((item) => {
            return (
              <>
                <OrderItem
                  key={item._id}
                  itemImage={item.image || "/product.png"}
                  itemName={item.productName?.translated || ""}
                  price={
                    item.price?.formattedAmount || rupiahFormatter.format(0)
                  }
                  quantity={item.quantity || 0}
                />
                <hr className="w-full border-2" />
              </>
            );
          })}

        <button className="bg-transparent p-2 text-blue-500 w-max mx-auto flex items-center gap-2 font-medium">
          {false ? (
            <>
              <span>Lihat Semua Barang</span>
              <IoIosArrowDown className="text-xl" />
            </>
          ) : (
            <>
              {" "}
              <span>Lihat Lebih Sedikit</span>
              <IoIosArrowUp className="text-xl" />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50 shadow p-3">
        <h3 className="text-base font-semibold">Detail Produk</h3>

        <div
          className="grid place-items-start gap-y-2"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <p className="col-span-1">Kurir</p>
          <p className="col-span-3">JNE - Reguler</p>
          <div className="flex gap-2 items-center col-span-1">
            <span className="line-clamp-1">Alamat</span>
            <MdOutlineContentCopy className="shrink-0" />
          </div>{" "}
          <div className="flex flex-col gap-1 col-span-3">
            <p className="font-medium">Afridho Ikhsan</p>
            <p>6285770006121</p>
            <p>Komplek BCA Jatisari Jln Pangrango V Blok DE-2 RT.007/0.16</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50 shadow p-3">
        <h3 className="text-base font-semibold">Rincian Pembayaran</h3>

        <div className="grid grid-cols-2 gap-y-2">
          <p>Metode Pembayaran</p>
          <p className="text-end">COD (Bayar di Tempat)</p>
          <hr className="col-span-2" />
          <p>Subtotal Harga Barang</p>
          <p className="text-end">Rp.11.000</p>
          <p>Total Ongkos Kirim</p>
          <p className="text-end">Rp.11.500</p>
          <p>Biaya Layanan</p>
          <p className="text-end">Rp.112</p>
          <hr className="col-span-2" />
          <p className="text-base font-semibold">Total Belanja</p>
          <p className="text-base font-semibold text-end">Rp.11.312</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
