import { Table } from "antd";
import type { TableProps } from "antd";
import { useGetProducts } from "../../hooks/useProduct";
import ProductDelete from "./ProductDelete";
import { ProductData } from "./type";
import ProductEdit from "./ProductEdit";
import { useSearchParams } from "react-router-dom";

function ProductTable() {
  const { Column } = Table;
  const { data, isLoading, isFetching } = useGetProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange: TableProps<ProductData>["onChange"] = (_, __, sorter) => {
    if (sorter?.order) {
      searchParams.set("sortby", `${sorter?.field}_${sorter?.order}`);
    } else {
      searchParams.delete("sortby");
    }
    setSearchParams(searchParams);
  };

  return (
    <Table
      dataSource={data || []}
      loading={isLoading || isFetching}
      pagination={false}
      rowKey="id"
      className="w-full"
      bordered
      onChange={handleChange}
    >
      <Column title="Product" dataIndex="product" key="product" />
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column title="Product Description" dataIndex="productDescription" key="productDescription" ellipsis={true} />
      <Column title="Price" dataIndex="price" key="price" sorter={true} />
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
