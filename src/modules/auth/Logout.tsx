import { Button } from "antd";
import { useLogout } from "../../hooks/useAuth";

function Logout() {
  const { handleLogout } = useLogout();
  return <Button onClick={() => handleLogout()}>Logout</Button>;
}

export default Logout;
