import { useEffect, useImperativeHandle, useState } from "react";
import { CreateUserData, EditUserData } from "../../../types";
import { Form, Input, InputNumber, Modal } from "antd";
import { useCreateUser, useUpdateUser } from "../../../hooks/useUsers";

const initUser = {
  name: "",
  age: 18,
  address: "",
} as CreateUserData;

function UserEdit({ onRef }: { onRef: any }) {
  const [isCreate, setIsCreate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [form] = Form.useForm();

  const title = isCreate ? "创建用户" : "编辑用户";

  const { isCreating, handleCreateUser } = useCreateUser();
  const { isUpdating, handleUpdateUser } = useUpdateUser();

  useEffect(() => {
    form.setFieldsValue(initUser);
  }, [form]);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (data) => {
        if (isCreate) {
          handleCreateUser(data, {
            onSuccess: () => setIsOpen(false),
          });
        } else {
          handleUpdateUser(
            {
              id: id,
              updateData: data,
            },
            {
              onSuccess: () => setIsOpen(false),
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    handleClose();
  };

  const handleOpen = ({
    isCreate,
    initFormData,
  }: {
    isCreate?: boolean;
    initFormData?: CreateUserData | EditUserData;
  }) => {
    setIsCreate(!!isCreate);
    setIsOpen(true);
    setId(initFormData?.id || -1);
    form.setFieldsValue(initFormData || initUser);
  };

  useImperativeHandle(onRef, () => {
    return {
      handleOpen,
    };
  });

  return (
    <Modal
      title={title}
      open={isOpen}
      destroyOnClose
      confirmLoading={isUpdating || isCreating}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
    >
      <Form form={form} labelCol={{ span: 3 }} className="!mt-6">
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: "请输入姓名!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="年龄" name="age" rules={[{ required: true, message: "请输入年龄!" }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserEdit;
