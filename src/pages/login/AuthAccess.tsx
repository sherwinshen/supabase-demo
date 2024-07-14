import { useNavigate } from "react-router-dom";
import { useGetAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

function AuthAccess() {
  const { isLoading, isAuthenticated } = useGetAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]);

  return isLoading ? <Spin fullscreen={true} /> : isAuthenticated ? <Outlet /> : null;
}

export default AuthAccess;
