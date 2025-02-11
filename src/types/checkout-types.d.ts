import { orders } from "@wix/ecom";

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
  informasiPembeli: {
    contactId: string;
    nama: string;
    nomorHp: string;
    email: string;
  };
  alamat: {
    alamatUtama: string;
    kota: string
  };
  catatan?: string;
  lineItems: CheckoutLineItemType[];
  ongkir: number;
  layananKurir: string;
}

export interface MidtransNotificationMetadata {
  lineItems: CheckoutLineItemType[];
  buyerInfo: {
    contactId: string;
    email: string;
    phone: string;
    fullName: string;
  };
  alamat: {
    alamatUtama: string;
    kota: string;
  };
  layananKurir: string
  catatan: string;
  ongkir: number;
}
