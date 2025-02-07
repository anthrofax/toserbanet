"use client";

import React, { useState } from "react";
import axios from "axios";
import { getOngkir } from "@/actions";

const OngkirForm = () => {
  const [origin, setOrigin] = useState("31555");
  const [destination, setDestination] = useState("68423");
  const [weight, setWeight] = useState(1000); // default 1000g
  const [courier, setCourier] = useState("jne");
  const [ongkir, setOngkir] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const actionResponse = await getOngkir({
        destination,
        weight,
        courier,
        price: "lowest",
      });

      console.log(actionResponse);

      // console.log(response);
      // setOngkir(result);
    } catch (error) {
      console.error("Error fetching ongkir:", error);
    }
  };

  return (
    <div>
      <h1>Form Hitung Ongkir</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Origin:
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Masukkan kode asal"
            />
          </label>
        </div>
        <div>
          <label>
            Destination:
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Masukkan kode tujuan"
            />
          </label>
        </div>
        <div>
          <label>
            Weight (grams):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
              placeholder="Berat dalam gram"
            />
          </label>
        </div>
        <div>
          <label>
            Courier:
            <select
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
            >
              <option value="jne">JNE</option>
              <option value="sicepat">Sicepat</option>
              <option value="ide">IDE</option>
              <option value="sap">SAP</option>
              <option value="jnt">J&T</option>
              <option value="ninja">Ninja</option>
              <option value="tiki">Tiki</option>
              <option value="lion">Lion</option>
              <option value="anteraja">Anteraja</option>
              <option value="pos">POS</option>
              <option value="ncs">NCS</option>
              <option value="rex">REX</option>
              <option value="rpx">RPX</option>
              <option value="sentral">Sentral</option>
              <option value="star">Star</option>
              <option value="wahana">Wahana</option>
              <option value="dse">DSE</option>
            </select>
          </label>
        </div>
        <button type="submit">Hitung Ongkir</button>
      </form>

      {ongkir && (
        <div>
          <h2>Hasil Ongkir:</h2>
          <pre>{JSON.stringify(ongkir, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OngkirForm;
