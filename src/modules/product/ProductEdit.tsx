import { Button } from "antd";
import { EditProductData } from "./type";
import { useProductEdit } from "./context/useProductEdit";

function ProductEdit({ data }: { data: EditProductData }) {
  const { handleOpen } = useProductEdit();

  return <Button onClick={() => handleOpen(false, data)}>Edit</Button>;
}

export default ProductEdit;
