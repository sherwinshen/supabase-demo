import { Button, Popconfirm } from "antd";
import { useDeleteUser } from "../../../hooks/useUsers";

function UserDelete({ id }: { id: number }) {
  const { isDeleting, handleDeleteUser } = useDeleteUser();
  const confirm = () => handleDeleteUser(id);

  return (
    <Popconfirm title="删除用户" description="请确认是否删除当前用户?" onConfirm={confirm} okText="是" cancelText="否">
      <Button danger disabled={isDeleting}>
        删除
      </Button>
    </Popconfirm>
  );
}

export default UserDelete;
