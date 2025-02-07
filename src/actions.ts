"use server";

import axios from "axios";

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
}) {
  const formData = new URLSearchParams();
  formData.append("origin", "17423");
  formData.append("destination", destination);
  formData.append("weight", String(weight));
  formData.append("courier", courier);
  formData.append("price", price);

  try {
    const response = await axios.post(
      `https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost?${formData.toString()}`,
      {},
      {
        headers: {
          key: "o3gfc3EQa029da2e311e2db238H0W7rU",
          "Content-Type": "application/json",
        },
      }
    );

    return {
      message: "Ongkir berhasil diakses.",
      data: response.data.data,
    };
  } catch (error) {
    return {
      error: "Terjadi kesalahan internal",
    };
  }
}
