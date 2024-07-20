import { Button } from "antd";
import { useCreateOrders } from "../../hooks/useOrder";

function OrderAdd() {
  const { isCreating, handleCreateOrders } = useCreateOrders();
  return (
    <Button type="primary" onClick={() => handleCreateOrders()} loading={isCreating}>
      Add Order
    </Button>
  );
}

export default OrderAdd;
