import { Button } from "antd";
import UserEdit from "./UserEdit";
import { useRef } from "react";

function UserAdd() {
  const userEditRef = useRef();
  const handleAddUser = () => {
    userEditRef.current?.handleOpen({
      isCreate: true,
    });
  };

  return (
    <>
      <Button type="primary" onClick={handleAddUser}>
        新增用户
      </Button>
      <UserEdit onRef={userEditRef}></UserEdit>
    </>
  );
}

export default UserAdd;
