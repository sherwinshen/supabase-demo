import OrderAdd from "../modules/order/OrderAdd";
import OrderTable from "../modules/order/OrderTable";

function Order() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <OrderAdd />
      </div>
      <OrderTable />
    </div>
  );
}

export default Order;
