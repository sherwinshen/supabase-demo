import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAuth, fetchLogin, fetchLogout } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AUTH_KEY = "auth";

export const useGetAuth = () => {
  const { data, isLoading } = useQuery({ queryKey: [AUTH_KEY], queryFn: fetchAuth });
  return { isLoading, isAuthenticated: data?.role === "authenticated" };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
      navigate("/", { replace: true });
      message.open({ type: "success", content: "Login success" });
    },
    onError: () => {
      message.open({ type: "error", content: "Login failed" });
    },
  });

  return {
    login,
    isLoggingIn,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: () => fetchLogout(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return {
    isLoggingOut,
    logout,
  };
};
