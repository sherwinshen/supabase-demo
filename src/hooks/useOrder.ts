import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrders, deleteOrder, getOrders } from "../services/apis/apiOrder";
import { OrderData } from "../modules/order/type";

const QUERY_KEY = "orders";

export const useGetOrders = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrders(),
  });
  return { data, isLoading, isFetching } as { data: OrderData[]; isLoading: boolean; isFetching: boolean };
};

export const useCreateOrders = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: handleCreateOrders } = useMutation({
    mutationFn: createOrders,
    onSuccess: () => {
      message.open({ type: "success", content: "Orders successfully created" });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isCreating, handleCreateOrders };
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: handleDeleteOrder } = useMutation({
    mutationFn: (id: number) => deleteOrder(id),
    onSuccess: () => {
      message.open({ type: "success", content: "Order successfully deleted" });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isDeleting, handleDeleteOrder };
};
