import { useEffect, useImperativeHandle, useState } from "react";
import { Form, Input, InputNumber, Modal, Upload } from "antd";
import { CreateUserData, EditUserData } from "../../../types";
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const title = isCreate ? "创建用户" : "编辑用户";

  const { isCreating, handleCreateUser } = useCreateUser();
  const { isUpdating, handleUpdateUser } = useUpdateUser();
  const disabled = isCreating || isUpdating;

  useEffect(() => {
    form.setFieldsValue(initUser);
  }, [form]);

  const handleClose = () => {
    setIsOpen(false);
    setAvatarFile(null);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (data) => {
        if (isCreate) {
          handleCreateUser({ ...data, avatarFile }, { onSuccess: () => handleClose() });
        } else {
          handleUpdateUser({ id: id, updateData: { ...data, avatarFile } }, { onSuccess: () => handleClose() });
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
    setAvatarFile(null);
    form.setFieldsValue(initFormData || initUser);
  };

  useImperativeHandle(onRef, () => {
    return {
      handleOpen,
    };
  });

  const handleBeforeUpload = (file: File) => {
    setAvatarFile(file);
    return false;
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      destroyOnClose
      confirmLoading={disabled}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
    >
      <Form form={form} labelCol={{ span: 3 }} className="!mt-6">
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: "请输入姓名!" }]}>
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item label="年龄" name="age" rules={[{ required: true, message: "请输入年龄!" }]}>
          <InputNumber disabled={disabled} />
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item label="头像">
          <Upload
            key={String(isOpen)}
            maxCount={1}
            listType="picture-card"
            beforeUpload={handleBeforeUpload}
            disabled={disabled}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              +<div style={{ marginTop: 8 }}>选择图片</div>
            </button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserEdit;
