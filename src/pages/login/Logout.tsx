import { Button } from "antd";
import { useLogout } from "../../hooks/useAuth";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <Button onClick={handleLogout} disabled={isLoggingOut}>
      退出
    </Button>
  );
}

export default Logout;
