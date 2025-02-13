"use client";

import { orders } from "@wix/ecom";
import OrderItem from "./order-item";
import { rupiahFormatter } from "@/utils/number-formatter";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

function OrderItemList({
  order,
}: {
  order: orders.Order & orders.OrderNonNullableFields;
}) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  function handleToggle() {
    setIsToggleOpen((val) => !val);
  }

  return (
    <>
      <hr className="w-full border-2" />
      {order.lineItems.map((item) => {
        return (
          <div
            key={item._id}
            className={`space-y-2 duration-500 delay-75 overflow-hidden ${
              isToggleOpen ? "h-max" : "max-h-[10rem]"
            }`}
          >
            <OrderItem
              key={item._id}
              itemImage={item.image || "/product.png"}
              itemName={item.productName?.original || ""}
              price={item.price?.formattedAmount || rupiahFormatter.format(0)}
              quantity={item.quantity || 0}
              catalogReference={{
                appId: item.catalogReference?.appId || "",
                catalogItemId: item.catalogReference?.catalogItemId || "",
                options: item.catalogReference?.options,
              }}
            />
            <hr className="w-full border-2" />
          </div>
        );
      })}
      <button
        className="bg-transparent p-2 text-blue-500 w-max mx-auto flex items-center gap-2 font-medium"
        onClick={handleToggle}
      >
        {isToggleOpen ? (
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
    </>
  );
}

export default OrderItemList;
