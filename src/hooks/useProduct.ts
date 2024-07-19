import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/apis/apiProduct";
import { message } from "antd";
import { ProductData } from "../modules/product/type";

const QUERY_KEY = "products";

export const useGetProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getProducts,
  });
  return { data, isLoading } as { data: ProductData[]; isLoading: boolean };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: handleCreateProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.open({ type: "success", content: "Product successfully created" });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isCreating, handleCreateProduct };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: handleUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.open({ type: "success", content: "Product successfully updated" });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isUpdating, handleUpdateProduct };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: handleDeleteProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      message.open({ type: "success", content: "Product successfully deleted" });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => message.open({ type: "error", content: err.message }),
  });
  return { isDeleting, handleDeleteProduct };
};
