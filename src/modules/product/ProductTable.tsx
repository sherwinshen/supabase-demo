import { Table } from "antd";
import { useGetProducts } from "../../hooks/useProduct";
import ProductDelete from "./ProductDelete";
import { ProductData } from "./type";
import ProductEdit from "./ProductEdit";

function ProductTable() {
  const { Column } = Table;
  const { isLoading, data } = useGetProducts();

  return (
    <Table dataSource={data || []} loading={isLoading} pagination={false} rowKey="id" className="w-full" bordered>
      <Column title="Product" dataIndex="product" key="product" />
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column title="Product Description" dataIndex="productDescription" key="productDescription" ellipsis={true} />
      <Column title="Price" dataIndex="price" key="price" />
      <Column
        title="操作"
        key="operations"
        render={(data: ProductData) => {
          return (
            <div className="flex items-center gap-2">
              <ProductEdit data={data} />
              <ProductDelete id={data.id} />
            </div>
          );
        }}
      ></Column>
    </Table>
  );
}

export default ProductTable;
