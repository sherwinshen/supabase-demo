export type CreateProductData = {
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
};

export type EditProductData = {
  id: number;
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
};

export type ProductData = {
  id: number;
  product: string;
  productName: string;
  productDescription?: string;
  price: number;
};
