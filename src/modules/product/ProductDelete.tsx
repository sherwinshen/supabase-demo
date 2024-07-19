import { Button, Popconfirm } from "antd";
import { useDeleteProduct } from "../../hooks/useProduct";

function ProductDelete({ id }: { id: number }) {
  const { isDeleting, handleDeleteProduct } = useDeleteProduct();

  const confirm = () => handleDeleteProduct(id);

  return (
    <Popconfirm
      title="Delete the product"
      description="Are you sure to delete this product?"
      onConfirm={confirm}
      okText="yes"
      cancelText="no"
    >
      <Button danger disabled={isDeleting}>
        Delete
      </Button>
    </Popconfirm>
  );
}

export default ProductDelete;
