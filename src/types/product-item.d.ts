export type ProductItemType = {
  imageObj: {
    imageUrl: string;
    imageAlt: string;
    width?: number,
    height?: number
  };
  title: string;
  price: number;
  slug: string
  description?: string
};
