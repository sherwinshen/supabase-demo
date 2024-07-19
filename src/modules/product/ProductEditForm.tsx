import { useEffect, useState } from "react";
import ProductEditContext from "./context/ProductEditContext";
import { CreateProductData, EditProductData } from "./type";
import { Form, Input, InputNumber, Modal } from "antd";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useProduct";

const defaultData = {
  product: "",
  productName: "",
  productDescription: "",
  price: 0,
};

function ProductEditForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [initData, setInitData] = useState<EditProductData | CreateProductData | undefined>(undefined);
  const { isCreating, handleCreateProduct } = useCreateProduct();
  const { isUpdating, handleUpdateProduct } = useUpdateProduct();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultData);
  }, [form]);

  const title = isCreate ? "Create Product" : "Edit Product";
  const disabled = isCreating || isUpdating;

  const handleOpen = (isCreate: boolean, data?: EditProductData | CreateProductData) => {
    setIsCreate(isCreate);
    setInitData(data || defaultData);
    form.setFieldsValue(data);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (data) => {
        if (isCreate) {
          handleCreateProduct(data, { onSuccess: () => handleClose() });
        } else {
          handleUpdateProduct(
            { id: (initData as EditProductData)!.id, updateProduct: data },
            { onSuccess: () => handleClose() }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => handleClose();

  return (
    <ProductEditContext.Provider value={{ handleOpen }}>
      {children}
      <Modal
        title={title}
        open={isOpen}
        destroyOnClose
        confirmLoading={disabled}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 7 }} labelAlign="left" className="!mt-8">
          <Form.Item label="Product" name="product" rules={[{ required: true, message: "Please input product!" }]}>
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please input productName!" }]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item label="Product Description" name="productDescription">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input price!" }]}>
            <InputNumber disabled={disabled} />
          </Form.Item>
        </Form>
      </Modal>
    </ProductEditContext.Provider>
  );
}

export default ProductEditForm;
