export const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const gramFormatter = new Intl.NumberFormat("id-ID", {
  style: "unit",
  unit: "gram",
  unitDisplay: "narrow",
});
