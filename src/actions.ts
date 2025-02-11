"use server";

import axios from "axios";
import { randomUUID } from "crypto";
import { MidtransClient } from "midtrans-node-client";
import {
  CheckoutDataType,
  MidtransNotificationMetadata,
} from "./types/checkout-types";

interface RajaOngkirDomesticLocationType {
  meta: {
    message: string;
    code: number;
    status: string;
  };
  data: {
    id: number;
    label: string;
    subdistrict_name: string;
    district_name: string;
    city_name: string;
    province_name: string;
    zip_code: string;
  }[];
}

interface RajaOngkirCostType {
  meta: {
    message: string;
    code: number;
    status: string;
  };
  data: {
    name: string;
    code: string;
    service: string;
    description: string;
    cost: number;
    etd: string;
  }[];
}

type GetOngkirReturnType = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
}[];

export async function getOngkir({
  destination,
  weight,
  courier,
  price = "lowest",
}: {
  destination: string;
  weight: number;
  courier: string;
  price: "lowest" | "highest";
}): Promise<GetOngkirReturnType | { error: string }> {
  const formData = new URLSearchParams();
  formData.append("origin", "6542");
  formData.append("destination", destination);
  formData.append("weight", String(weight));
  formData.append("courier", courier);
  formData.append("price", price);

  try {
    const response = await axios.post<RajaOngkirCostType>(
      `https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost?${formData.toString()}`,
      {},
      {
        headers: {
          key: "o3gfc3EQa029da2e311e2db238H0W7rU",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.data || response.data.data.length < 1)
      throw new Error("Data tidak ditemukan.");

    return response.data.data;
  } catch (error) {
    console.log(error);
    return {
      error: "Terjadi kesalahan internal",
    };
  }
}

export async function getRajaOngkirLocationsData(district: string) {
  try {
    const response = await axios.get<RajaOngkirDomesticLocationType>(
      `https://rajaongkir.komerce.id/api/v1/destination/domestic-destination?search=${district}`,
      {
        headers: {
          key: "o3gfc3EQa029da2e311e2db238H0W7rU",
        },
      }
    );

    if (!response.data.data || response.data.data.length < 1)
      throw new Error("Data tidak ditemukan.");

    return {
      message: "Lokasi berhasil diakses.",
      data: response.data.data[0].id,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Terjadi kesalahan internal",
    };
  }
}

const snap = new MidtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  serverKey: process.env.MIDTRANS_ID_SECRET,
});

export async function orderTokenizer({
  alamat,
  lineItems,
  catatan,
  ongkir,
  informasiPembeli: { email, nama, nomorHp, contactId },
  layananKurir,
}: CheckoutDataType) {
  try {
    const item_details = lineItems.map((item) => {
      return {
        price: item.price,
        quantity: item.quantity,
        name:
          item.productName.length > 45
            ? `${item.productName.slice(0, 22)}...${item.productName.slice(
                -22
              )}`
            : item.productName,
      };
    });

    item_details.push({
      price: ongkir,
      quantity: 1,
      name: "Ongkos Kirim",
    });

    const parameter = {
      item_details,
      customer_details: {
        first_name: nama.trim().split(" ")[0],
        last_name: nama.trim().split(" ").slice(1).join(" "),
        email,
        phone: nomorHp,
      },
      transaction_details: {
        order_id: randomUUID(),
        gross_amount:
          lineItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
          ongkir,
      },
      metadata: {
        lineItems,
        buyerInfo: {
          contactId,
          email,
          phone: nomorHp,
          fullName: nama,
        },
        alamat: {
          alamatUtama: alamat.alamatUtama,
          kota: alamat.kota, // You need to provide the city name here
        },
        catatan: catatan || "",
        ongkir,
        layananKurir,
      } as MidtransNotificationMetadata,
    };

    console.log(
      "Sending parameter to Midtrans:",
      JSON.stringify(parameter, null, 2)
    );

    const token = await snap.createTransactionToken(parameter);
    console.log(token);

    return { token };
  } catch (error) {
    console.error("Midtrans Error: ", error);

    throw new Error("Midtrans Error: " + error);
  }
}
