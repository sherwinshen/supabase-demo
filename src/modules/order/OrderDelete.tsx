import { Button, Popconfirm } from "antd";
import { useDeleteOrder } from "../../hooks/useOrder";

function OrderDelete({ id }: { id: number }) {
  const { isDeleting, handleDeleteOrder } = useDeleteOrder();
  const confirm = () => handleDeleteOrder(id);

  return (
    <Popconfirm
      title="Delete the order"
      description="Are you sure to delete this order?"
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

export default OrderDelete;
