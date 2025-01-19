export type ProductItemType = {
  imageObj: {
    imageUrl: string;
    imageAlt: string;
  };
  title: string;
  price: number;
  slug: string
  description?: string
};
