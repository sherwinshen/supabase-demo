import { Button, Table } from "antd";
import { useGetUsers } from "../../../hooks/useUsers";
import { EditUserData } from "../../../types";
import UserDelete from "./UserDelete";
import UserEdit from "./UserEdit";
import { useRef } from "react";

function UserTable() {
  const { Column } = Table;
  const { isLoading, data } = useGetUsers();
  const userEditRef = useRef();

  const handleEdit = (data: EditUserData) => {
    userEditRef.current?.handleOpen({
      isCreate: false,
      initFormData: data,
    });
  };

  return (
    <>
      <Table
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={false}
        rowKey={(text) => text.id}
        size="middle"
        scroll={{ x: 600 }}
        className="w-full"
        bordered
      >
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="年龄" dataIndex="age" key="age" />
        <Column title="地址" dataIndex="address" key="address" />
        <Column
          title="操作"
          key="operations"
          render={(text) => {
            return (
              <div className="flex items-center gap-2">
                <Button type="primary" onClick={() => handleEdit(text)}>
                  编辑
                </Button>
                <UserDelete id={text.id}></UserDelete>
              </div>
            );
          }}
        ></Column>
      </Table>
      <UserEdit onRef={userEditRef}></UserEdit>
    </>
  );
}

export default UserTable;
