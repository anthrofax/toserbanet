"use server";

import axios from "axios";
import { randomUUID } from "crypto";
import { MidtransClient } from "midtrans-node-client";

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
  formData.append("origin", "17423");
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

    const data = response.data.data.map((item) => item.zip_code);

    return {
      message: "Lokasi berhasil diakses.",
      data: [...new Set(data)],
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

export async function orderTokenizer({}) {
  try {
    const parameter = {
      item_details: {
        price: 0,
        quantity: "",
        name: `Pesanan #123132`,
      },
      customer_details: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      transaction_details: {
        order_id: randomUUID(),
        gross_amount: 0,
      },
      metadata: {
        test: "",
      },
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

    return { error };
  }
}
