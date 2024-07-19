import { Button } from "antd";
import { faker } from "@faker-js/faker";
import { useProductEdit } from "./context/useProductEdit";
import { CreateProductData } from "./type";

function ProductAdd() {
  const getMockData = (): CreateProductData => {
    return {
      product: faker.commerce.product(),
      productName: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      productDescription: faker.commerce.productDescription(),
    };
  };

  const { handleOpen } = useProductEdit();

  return (
    <Button type="primary" onClick={() => handleOpen(true, getMockData())}>
      Add Product
    </Button>
  );
}

export default ProductAdd;
