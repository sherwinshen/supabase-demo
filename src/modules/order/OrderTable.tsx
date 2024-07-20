import { Table } from "antd";
import { useGetOrders } from "../../hooks/useOrder";
import OrderDelete from "./OrderDelete";
import { OrderData } from "./type";

function OrderTable() {
  const { Column } = Table;
  const { isLoading, isFetching, data } = useGetOrders();

  const orders = (data || []).map((item) => ({
    ...item,
    product: item.products.product,
    productName: item.products.productName,
  }));

  return (
    <Table
      dataSource={orders}
      loading={isLoading || isFetching}
      pagination={false}
      rowKey="id"
      className="w-full"
      bordered
    >
      <Column title="Order ID" dataIndex="id" key="id" />
      <Column title="Product" dataIndex="product" key="product" />
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column title="Product Number" dataIndex="productNum" key="productNum" />
      <Column title="Total Price" dataIndex="totalPrice" key="totalPrice" />
      <Column
        title="操作"
        key="operations"
        render={(data: OrderData) => {
          return (
            <div className="flex items-center gap-2">
              <OrderDelete id={data.id} />
            </div>
          );
        }}
      ></Column>
    </Table>
  );
}

export default OrderTable;
