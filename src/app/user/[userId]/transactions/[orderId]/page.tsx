import { wixClientServer } from "@/lib/wix-client-server";
import { formatDate } from "@/utils/date-formatter";
import Image from "next/image";
import { RiShoppingBagFill } from "react-icons/ri";
import { media as wixMedia } from "@wix/sdk";
import { notFound } from "next/navigation";
import { MdOutlineContentCopy } from "react-icons/md";
import DateLabel from "@/components/date-label";
import { rupiahFormatter } from "@/utils/number-formatter";
import OrderItem from "@/components/order-detail/order-item";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { createPortal } from "react-dom";
import OrderItemList from "@/components/order-detail/order-item-list";
import { handleCopy } from "@/utils/handle-copy";
import CopyButton from "@/components/copy-button";

export const metodePembayaran = new Map([
  ["gopay", "GO PAY"],
  ["qris", "QRIS"],
  ["shopeepay", "ShopeePay"],
  ["bca", "Bank Central Asia (BCA)"],
  ["bni", "Bank Nasional Indonesia (BNI)"],
  ["bri", "Bank Republik Indonesia (BRI)"],
  [null, "Pembayaran Online"],
]);

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

  console.log(metodePembayaran.get(null));

  console.dir(order, { depth: null });

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
            <CopyButton copyObject="Invoice Order" text={order._id} />
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
        <OrderItemList order={order} />
      </div>

      <div className="flex flex-col gap-2 bg-slate-50 shadow p-3">
        <h3 className="text-base font-semibold">Info Pengiriman</h3>

        <div
          className="grid place-items-start gap-y-2"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <p className="col-span-1">Kurir</p>
          <p className="col-span-3">
            {order.customFields
              .find((field) => field.title === "layananKurir")
              ?.value.split(" | ")
              .slice(0, 2)
              .join(" | ")}
          </p>
          <div className="flex gap-2 items-center col-span-1">
            <span className="line-clamp-1">Alamat</span>
            <CopyButton
              copyObject="Alamat"
              text={order.billingInfo?.address?.addressLine1}
            />
          </div>{" "}
          <div className="flex flex-col gap-1 col-span-3">
            <p className="font-medium">
              {`${order.billingInfo?.contactDetails?.firstName}${
                order.billingInfo?.contactDetails?.lastName &&
                order.billingInfo?.contactDetails?.lastName !== ""
                  ? ` ${order.billingInfo?.contactDetails?.lastName}`
                  : ""
              }`}
            </p>
            <p>{order.billingInfo?.contactDetails?.phone}</p>
            <p>{order.billingInfo?.address?.addressLine1}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50 shadow p-3">
        <h3 className="text-base font-semibold">Rincian Pembayaran</h3>

        <div className="grid grid-cols-2 gap-y-2">
          <p>Metode Pembayaran</p>
          <p className="text-end">
            {metodePembayaran.get(
              order.customFields.find(
                (field) => field.title === "metodePembayaran"
              )?.value || null
            )}
          </p>
          <hr className="col-span-2" />
          <p>Subtotal Harga Barang</p>
          <p className="text-end">
            {" "}
            {rupiahFormatter.format(
              order.priceSummary?.subtotal
                ? +order.priceSummary?.subtotal.amount
                : 0
            )}
          </p>
          <p>Total Ongkos Kirim</p>
          <p className="text-end">
            {rupiahFormatter.format(
              order.priceSummary?.shipping
                ? +order.priceSummary?.shipping.amount
                : 0
            )}
          </p>
          {/* <p>Biaya Layanan</p>
          <p className="text-end">Rp.112</p> */}
          <hr className="col-span-2" />
          <p className="text-base font-semibold">Total Belanja</p>
          <p className="text-base font-semibold text-end">
            {rupiahFormatter.format(
              order.priceSummary?.total ? +order.priceSummary?.total.amount : 0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
