import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/apis/apiProduct";
import { message } from "antd";
import { ProductData } from "../modules/product/type";
import { useSearchParams } from "react-router-dom";

const QUERY_KEY = "products";

export const useGetProducts = () => {
  const [searchParams] = useSearchParams();
  // 排序
  const sortbyValue = searchParams.get("sortby");
  let sortby = undefined as undefined | { field: string; ascending: boolean };
  if (sortbyValue) {
    const [field, order] = sortbyValue.split("_");
    sortby = { field, ascending: order === "ascend" };
  }
  // 过滤
  const priceGreaterThanValue = searchParams.get("priceGreaterThan");
  let filter = undefined as undefined | { field: string; method: string; value: string | number };
  if (priceGreaterThanValue) {
    filter = {
      method: "gt",
      field: "price",
      value: Number(priceGreaterThanValue),
    };
  }
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEY, sortby, filter],
    queryFn: () => getProducts({ sortby, filters: filter ? [filter] : [] }),
  });
  return { data, isLoading, isFetching } as { data: ProductData[]; isLoading: boolean; isFetching: boolean };
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
