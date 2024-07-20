export type CreateProductData = {
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
  pictureFile?: File;
  pictureUrl?: string;
};

export type EditProductData = {
  id: number;
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
  pictureFile?: File;
  pictureUrl?: string;
};

export type ProductData = {
  id: number;
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
  pictureUrl?: string;
};
