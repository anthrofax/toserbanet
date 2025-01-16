const language = navigator.language;

export const rupiahFormatter = new Intl.NumberFormat(language, {
  style: "currency",
  currency: "IDR",
});
