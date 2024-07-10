import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { deleteUser, getUsers, createUser, updateUser } from "../services/apiUsers";

const USERS_KEY = "users";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: handleCreateUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.open({ type: "success", content: "User successfully created" });
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isCreating, handleCreateUser };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: handleDeleteUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.open({ type: "success", content: "User successfully deleted" });
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isDeleting, handleDeleteUser };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: handleUpdateUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.open({ type: "success", content: "User successfully edited" });
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isUpdating, handleUpdateUser };
}

export function useGetUsers() {
  const { data, isLoading } = useQuery({ queryKey: [USERS_KEY], queryFn: getUsers });
  return { data, isLoading };
}
