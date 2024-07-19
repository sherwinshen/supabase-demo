import { useContext } from "react";
import ProductEditContext from "./ProductEditContext";

export function useProductEdit() {
  const context = useContext(ProductEditContext);
  if (context === undefined) throw new Error("Context was used outside the Provider");
  return context;
}
