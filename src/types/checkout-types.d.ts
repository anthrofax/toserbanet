export interface CheckoutLineItemType {
  id: string;
  itemType: orders.ItemTypeItemType;
  price: number;
  productName: string;
  quantity: number;
  image: string;
  weight: number;
}

export interface CheckoutDataType {
  nama: string;
  nomorHp: string;
  email: string;
  alamat: string;
  lineItems: CheckoutLineItemType[];
  catatan?: string;
  ongkir: number;
  layananKurir: string;
}
