import { orders } from "@wix/ecom";

export type ProductItemType = {
  imageObj: {
    imageUrl: string;
    imageAlt: string;
    width?: number;
    height?: number;
  };
  title: string;
  price: {
    normalPrice: number;
    discountPrice: number;
  };
  slug: string;
  description?: string;
  identifier?: string
};
