import ProductAdd from "../modules/product/ProductAdd";
import ProductEditForm from "../modules/product/ProductEditForm";
import ProductFilter from "../modules/product/ProductFilter";
import ProductTable from "../modules/product/ProductTable";

function Product() {
  return (
    <ProductEditForm>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <ProductAdd />
          <ProductFilter />
        </div>
        <ProductTable />
      </div>
    </ProductEditForm>
  );
}

export default Product;
