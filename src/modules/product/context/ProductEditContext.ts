import { createContext } from "react";
import { CreateProductData, EditProductData } from "../type";

const ProductEditContext = createContext<{
  handleOpen: (isCreate: boolean, data?: EditProductData | CreateProductData) => void;
}>({
  handleOpen: () => {},
});

export default ProductEditContext;
