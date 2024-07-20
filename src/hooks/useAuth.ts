import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logout, signIn, signUp, verifyOpt } from "../services/apis/apiAuth";
import { useNavigate } from "react-router-dom";

const QUERY_KEY = "user";

export const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getUser,
  });
  return { data, isLoading, isAuthenticated: data?.role === "authenticated" };
};

export const useSignUp = () => {
  const { isPending: isSigningUp, mutate: handleSignUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      message.open({ type: "success", content: "Sign Up Successfully" });
    },
  });

  return { isSigningUp, handleSignUp };
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isSignInning, mutate: handleSignIn } = useMutation({
    mutationFn: signIn,
    onSuccess: (user) => {
      message.open({ type: "success", content: "Sign In Successfully" });
      queryClient.setQueryData(["QUERY_KEY"], user.user);
      navigate("/", { replace: true });
    },
  });

  return { isSignInning, handleSignIn };
};

export const useVerifyOpt = () => {
  const { isPending: isVerifying, mutate: handleVerifyOpt } = useMutation({
    mutationFn: verifyOpt,
    onSuccess: () => {
      message.open({ type: "success", content: "Verify Successfully" });
    },
  });

  return { isVerifying, handleVerifyOpt };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      message.open({ type: "success", content: "Logout Successfully" });
      navigate("/login");
    },
  });
  return { handleLogout };
};
